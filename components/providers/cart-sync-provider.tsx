'use client';

import { useEffect, useRef } from 'react';
import { useCartStore, useWishlistStore, useAuthStore } from '@/store';
import { saveUserCart, saveUserWishlist } from '@/lib/api/database';

export function CartSyncProvider({ children }: { children: React.ReactNode }) {
  const { items: cartItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { user, isAuthenticated } = useAuthStore();

  const cartTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wishlistTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Track whether the initial Firebase restore has been completed
  const readyRef = useRef(false);

  // Mark ready only after user is authenticated and data has been loaded
  // AuthProvider calls setItems before this runs, so this fires after restore
  useEffect(() => {
    if (isAuthenticated && user) {
      // Small delay to let AuthProvider finish setItems first
      const t = setTimeout(() => { readyRef.current = true; }, 1500);
      return () => clearTimeout(t);
    } else {
      readyRef.current = false;
    }
  }, [isAuthenticated, user]);

  // Save cart to Firebase (debounced, only after initial restore)
  useEffect(() => {
    if (!isAuthenticated || !user || !readyRef.current) return;
    if (cartTimer.current) clearTimeout(cartTimer.current);
    cartTimer.current = setTimeout(() => {
      saveUserCart(user.id, cartItems).catch(console.error);
    }, 1000);
    return () => { if (cartTimer.current) clearTimeout(cartTimer.current); };
  }, [cartItems, isAuthenticated, user]);

  // Save wishlist to Firebase (debounced, only after initial restore)
  useEffect(() => {
    if (!isAuthenticated || !user || !readyRef.current) return;
    if (wishlistTimer.current) clearTimeout(wishlistTimer.current);
    wishlistTimer.current = setTimeout(() => {
      saveUserWishlist(user.id, wishlistItems).catch(console.error);
    }, 1000);
    return () => { if (wishlistTimer.current) clearTimeout(wishlistTimer.current); };
  }, [wishlistItems, isAuthenticated, user]);

  return <>{children}</>;
}

