import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  setDoc,
  query,
  where,
  orderBy,
  writeBatch,
} from 'firebase/firestore';
import { updatePassword as firebaseUpdatePassword } from 'firebase/auth';
import { db, auth } from '@/lib/firebase/client';
import type { Address, Review, CartItem } from '@/types';

// ---- Addresses ----

export async function getAddresses(userId: string): Promise<Address[]> {
  const q = query(collection(db, 'addresses'), where('user_id', '==', userId), orderBy('created_at', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      userId: data.user_id,
      name: data.name,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      isDefault: data.is_default,
    };
  });
}

export async function addAddress(
  userId: string,
  address: Omit<Address, 'id' | 'userId' | 'isDefault'>
): Promise<Address> {
  const docRef = await addDoc(collection(db, 'addresses'), {
    user_id: userId,
    name: address.name,
    phone: address.phone,
    address: address.address,
    city: address.city,
    state: address.state,
    pincode: address.pincode,
    is_default: false,
    created_at: new Date().toISOString(),
  });
  return {
    id: docRef.id,
    userId,
    name: address.name,
    phone: address.phone,
    address: address.address,
    city: address.city,
    state: address.state,
    pincode: address.pincode,
    isDefault: false,
  };
}

export async function updateAddress(addressId: string, address: Partial<Address>): Promise<void> {
  const updateData: Record<string, any> = {};
  if (address.name) updateData.name = address.name;
  if (address.phone) updateData.phone = address.phone;
  if (address.address) updateData.address = address.address;
  if (address.city) updateData.city = address.city;
  if (address.state) updateData.state = address.state;
  if (address.pincode) updateData.pincode = address.pincode;
  if (address.isDefault !== undefined) updateData.is_default = address.isDefault;
  await updateDoc(doc(db, 'addresses', addressId), updateData);
}

export async function deleteAddress(addressId: string): Promise<void> {
  await deleteDoc(doc(db, 'addresses', addressId));
}

export async function setDefaultAddress(userId: string, addressId: string): Promise<void> {
  const q = query(collection(db, 'addresses'), where('user_id', '==', userId));
  const snap = await getDocs(q);
  const batch = writeBatch(db);
  snap.docs.forEach((d) => {
    batch.update(d.ref, { is_default: d.id === addressId });
  });
  await batch.commit();
}

// ---- Reviews ----

export async function getReviews(paintingId: number): Promise<Review[]> {
  const q = query(
    collection(db, 'reviews'),
    where('painting_id', '==', paintingId),
    orderBy('created_at', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      userId: data.user_id,
      paintingId: data.painting_id,
      rating: data.rating,
      comment: data.comment,
      user: data.user || undefined,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  });
}

export async function addReview(
  userId: string,
  paintingId: number,
  rating: number,
  comment: string
): Promise<Review> {
  const now = new Date().toISOString();
  const docRef = await addDoc(collection(db, 'reviews'), {
    user_id: userId,
    painting_id: paintingId,
    rating,
    comment,
    created_at: now,
    updated_at: now,
  });
  return {
    id: docRef.id,
    userId,
    paintingId,
    rating,
    comment,
    createdAt: now,
    updatedAt: now,
  };
}

export async function updateReview(reviewId: string, rating: number, comment: string): Promise<void> {
  await updateDoc(doc(db, 'reviews', reviewId), {
    rating,
    comment,
    updated_at: new Date().toISOString(),
  });
}

export async function deleteReview(reviewId: string): Promise<void> {
  await deleteDoc(doc(db, 'reviews', reviewId));
}

// ---- Auth ----

export async function updatePassword(newPassword: string): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  await firebaseUpdatePassword(user, newPassword);
}

// ---- Cart & Wishlist Sync (per user) ----

export async function saveUserCart(userId: string, items: CartItem[]): Promise<void> {
  try {
    await setDoc(doc(db, 'user_carts', userId), {
      items: items.map((item) => ({
        painting_id: item.painting.id,
        quantity: item.quantity,
        painting: item.painting,
      })),
      updated_at: new Date().toISOString(),
    });
  } catch (e) {
    console.error('[saveUserCart]', e);
  }
}

export async function loadUserCart(userId: string): Promise<CartItem[]> {
  try {
    const snap = await getDoc(doc(db, 'user_carts', userId));
    if (!snap.exists()) return [];
    const data = snap.data();
    return (data.items || []).map((item: any) => ({
      painting: item.painting,
      quantity: item.quantity,
    })) as CartItem[];
  } catch (e) {
    console.error('[loadUserCart]', e);
    return [];
  }
}

export async function saveUserWishlist(userId: string, items: number[]): Promise<void> {
  try {
    await setDoc(doc(db, 'user_wishlists', userId), {
      items,
      updated_at: new Date().toISOString(),
    });
  } catch (e) {
    console.error('[saveUserWishlist]', e);
  }
}

export async function loadUserWishlist(userId: string): Promise<number[]> {
  try {
    const snap = await getDoc(doc(db, 'user_wishlists', userId));
    if (!snap.exists()) return [];
    return snap.data().items || [];
  } catch (e) {
    console.error('[loadUserWishlist]', e);
    return [];
  }
}

