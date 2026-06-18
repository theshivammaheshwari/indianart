import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import type { Order, CartItem } from '@/types';

export interface CreateOrderInput {
  userId: string;
  items: CartItem[];
  shippingAddress: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  totalAmount: number;
  shippingCharge: number;
  grandTotal: number;
  notes?: string;
}

function mapOrderDoc(id: string, data: any): Order {
  return {
    id,
    orderNumber: data.order_number,
    userId: data.user_id,
    status: data.status,
    paymentStatus: data.payment_status,
    razorpayOrderId: data.razorpay_order_id,
    razorpayPaymentId: data.razorpay_payment_id,
    razorpaySignature: data.razorpay_signature,
    totalAmount: data.total_amount,
    shippingCharge: data.shipping_charge,
    grandTotal: data.grand_total,
    shippingAddress: {
      id: '',
      userId: data.user_id,
      name: data.shipping_name,
      phone: data.shipping_phone,
      address: data.shipping_address,
      city: data.shipping_city,
      state: data.shipping_state,
      pincode: data.shipping_pincode,
      isDefault: false,
    },
    items: (data.items || []).map((item: any) => ({
      id: item.painting_id?.toString() || '',
      orderId: id,
      paintingId: item.painting_id,
      paintingSlug: item.painting_slug,
      paintingTitleEn: item.painting_title_en,
      paintingTitleHi: item.painting_title_hi,
      price: item.price,
      quantity: item.quantity,
    })),
    notes: data.notes,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  const now = new Date().toISOString();

  const orderData = {
    order_number: orderNumber,
    user_id: input.userId,
    total_amount: input.totalAmount,
    shipping_charge: input.shippingCharge,
    grand_total: input.grandTotal,
    shipping_name: input.shippingAddress.name,
    shipping_phone: input.shippingAddress.phone,
    shipping_email: input.shippingAddress.email,
    shipping_address: input.shippingAddress.address,
    shipping_city: input.shippingAddress.city,
    shipping_state: input.shippingAddress.state,
    shipping_pincode: input.shippingAddress.pincode,
    notes: input.notes || '',
    status: 'pending',
    payment_status: 'pending',
    items: input.items.map((item) => ({
      painting_id: item.painting.id,
      painting_slug: item.painting.slug,
      painting_title_en: item.painting.title_en,
      painting_title_hi: item.painting.title_hi,
      price: item.painting.price,
      quantity: item.quantity,
    })),
    created_at: now,
    updated_at: now,
  };

  const docRef = await addDoc(collection(db, 'orders'), orderData);
  return mapOrderDoc(docRef.id, orderData);
}

export async function updatePaymentStatus(
  orderId: string,
  paymentId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
): Promise<void> {
  await updateDoc(doc(db, 'orders', orderId), {
    payment_status: 'paid',
    payment_id: paymentId,
    razorpay_payment_id: razorpayPaymentId,
    razorpay_signature: razorpaySignature,
    status: 'processing',
    updated_at: new Date().toISOString(),
  });
}

export async function getOrdersByUser(userId: string): Promise<Order[]> {
  const q = query(
    collection(db, 'orders'),
    where('user_id', '==', userId)
  );
  const snapshot = await getDocs(q);
  const orders = snapshot.docs.map((d) => mapOrderDoc(d.id, d.data()));
  
  // Only show orders where payment was completed ('paid', 'refunded') or failed ('failed')
  const completedOrFailedOrders = orders.filter(
    (o) => o.paymentStatus === 'paid' || o.paymentStatus === 'failed' || o.paymentStatus === 'refunded'
  );

  // Sort in-memory to avoid Firestore composite index requirement
  return completedOrFailedOrders.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getAllOrders(): Promise<Order[]> {
  const q = query(collection(db, 'orders'), orderBy('created_at', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => mapOrderDoc(d.id, d.data()));
}

export async function updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
  await updateDoc(doc(db, 'orders', orderId), {
    status,
    updated_at: new Date().toISOString(),
  });
}
