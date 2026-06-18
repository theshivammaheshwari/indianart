'use client';

import { useEffect, useRef } from 'react';
import { useCartStore, useWishlistStore, useAuthStore } from '@/store';
import { saveUserCart, saveUserWishlist } from '@/lib/api/database';

// Debounce helper
function useDebounce<T>(value: T, delay: number): T {
  const ref = useRef(value);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (JSON.stringify(value) !== JSON.stringify(ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export function CartSyncProvider({ children }: { children: React.ReactNode }) {
  const { items: cartItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { user, isAuthenticated } = useAuthStore();

  const cartTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wishlistTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Save cart to Firebase 2s after last change
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    if (cartTimer.current) clearTimeout(cartTimer.current);
    cartTimer.current = setTimeout(() => {
      saveUserCart(user.id, cartItems);
    }, 2000);

    return () => {
      if (cartTimer.current) clearTimeout(cartTimer.current);
    };
  }, [cartItems, isAuthenticated, user]);

  // Save wishlist to Firebase 2s after last change
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    if (wishlistTimer.current) clearTimeout(wishlistTimer.current);
    wishlistTimer.current = setTimeout(() => {
      saveUserWishlist(user.id, wishlistItems);
    }, 2000);

    return () => {
      if (wishlistTimer.current) clearTimeout(wishlistTimer.current);
    };
  }, [wishlistItems, isAuthenticated, user]);

  return <>{children}</>;
}
