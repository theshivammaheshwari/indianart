import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile as firebaseUpdateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/client';
import type { User } from '@/types';

export async function signUp(email: string, password: string, fullName: string) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const { user } = credential;

  await firebaseUpdateProfile(user, { displayName: fullName });

  await setDoc(doc(db, 'profiles', user.uid), {
    full_name: fullName,
    role: 'customer',
    created_at: new Date().toISOString(),
  });

  return {
    user: {
      id: user.uid,
      email: user.email ?? '',
      user_metadata: { full_name: fullName },
    },
  };
}

export async function signIn(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const { user } = credential;
  return {
    user: {
      id: user.uid,
      email: user.email ?? '',
      user_metadata: { full_name: user.displayName ?? undefined },
    },
  };
}

export async function signOut() {
  await firebaseSignOut(auth);
}

export async function getCurrentUser(): Promise<User | null> {
  const user = auth.currentUser;
  if (!user) return null;

  const profileDoc = await getDoc(doc(db, 'profiles', user.uid));
  const profile = profileDoc.data();

  return {
    id: user.uid,
    email: user.email!,
    fullName: profile?.full_name,
    phone: profile?.phone,
    role: profile?.role || 'customer',
    avatarUrl: user.photoURL || undefined,
  };
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (!firebaseUser) {
      callback(null);
      return;
    }
    try {
      const profileDoc = await getDoc(doc(db, 'profiles', firebaseUser.uid));
      const profile = profileDoc.data();
      callback({
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        fullName: profile?.full_name || firebaseUser.displayName || undefined,
        phone: profile?.phone,
        role: profile?.role || 'customer',
        avatarUrl: firebaseUser.photoURL || undefined,
      });
    } catch {
      callback(null);
    }
  });
}

export async function updateProfile(userId: string, updates: { fullName?: string; phone?: string }) {
  await updateDoc(doc(db, 'profiles', userId), {
    full_name: updates.fullName,
    phone: updates.phone,
  });
}

export async function resetPassword(email: string) {
  await sendPasswordResetEmail(auth, email, {
    url: `${window.location.origin}/auth/reset-password`,
  });

}

export async function updatePassword(newPassword: string) {
  const { updatePassword: firebaseUpdatePassword } = await import('firebase/auth');
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  await firebaseUpdatePassword(user, newPassword);
}
