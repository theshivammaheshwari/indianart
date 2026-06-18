'use client';

import { useEffect } from 'react';
import { onAuthChange } from '@/lib/api/auth';
import { useAuthStore, useCartStore, useWishlistStore } from '@/store';
import { loadCartFromStorage, loadWishlistFromStorage } from '@/components/providers/cart-sync-provider';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, logout } = useAuthStore();
  const { setItems: setCartItems, clearCart } = useCartStore();
  const { setItems: setWishlistItems, clearWishlist } = useWishlistStore();

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      if (user) {
        setUser({
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          phone: user.phone,
          role: user.role || 'customer',
        });

        // Restore cart + wishlist from user-specific localStorage key
        const savedCart = loadCartFromStorage(user.id);
        const savedWishlist = loadWishlistFromStorage(user.id);

        if (savedCart.length > 0) setCartItems(savedCart);
        if (savedWishlist.length > 0) setWishlistItems(savedWishlist);
      } else {
        // On logout: clear in-memory state only.
        // Data stays safe in localStorage under the user's specific key.
        logout();
        clearCart();
        clearWishlist();
      }
    });
    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
