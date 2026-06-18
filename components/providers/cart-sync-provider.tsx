'use client';

import { useEffect, useRef } from 'react';
import { useCartStore, useWishlistStore, useAuthStore } from '@/store';
import type { CartItem } from '@/types';

function cartKey(uid: string) { return `indianart-cart-${uid}`; }
function wishlistKey(uid: string) { return `indianart-wishlist-${uid}`; }

export function loadCartFromStorage(uid: string): CartItem[] {
  try {
    const raw = localStorage.getItem(cartKey(uid));
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch { return []; }
}

export function loadWishlistFromStorage(uid: string): number[] {
  try {
    const raw = localStorage.getItem(wishlistKey(uid));
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch { return []; }
}

function saveCartToStorage(uid: string, items: CartItem[]) {
  try { localStorage.setItem(cartKey(uid), JSON.stringify(items)); } catch { /* ignore */ }
}

function saveWishlistToStorage(uid: string, items: number[]) {
  try { localStorage.setItem(wishlistKey(uid), JSON.stringify(items)); } catch { /* ignore */ }
}

export function CartSyncProvider({ children }: { children: React.ReactNode }) {
  const { items: cartItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { user, isAuthenticated } = useAuthStore();

  const cartTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wishlistTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce-save cart to localStorage on every change
  useEffect(() => {
    if (!isAuthenticated || !user) return;
    if (cartTimer.current) clearTimeout(cartTimer.current);
    cartTimer.current = setTimeout(() => {
      saveCartToStorage(user.id, cartItems);
    }, 500);
    return () => { if (cartTimer.current) clearTimeout(cartTimer.current); };
  }, [cartItems, isAuthenticated, user]);

  // Debounce-save wishlist to localStorage on every change
  useEffect(() => {
    if (!isAuthenticated || !user) return;
    if (wishlistTimer.current) clearTimeout(wishlistTimer.current);
    wishlistTimer.current = setTimeout(() => {
      saveWishlistToStorage(user.id, wishlistItems);
    }, 500);
    return () => { if (wishlistTimer.current) clearTimeout(wishlistTimer.current); };
  }, [wishlistItems, isAuthenticated, user]);

  return <>{children}</>;
}
