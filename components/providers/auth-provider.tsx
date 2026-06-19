'use client';

import { useEffect } from 'react';
import { onAuthChange } from '@/lib/api/auth';
import { useAuthStore, useCartStore, useWishlistStore, rehydrateStores } from '@/store';
import { loadUserCart, loadUserWishlist } from '@/lib/api/database';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, logout } = useAuthStore();
  const { setItems: setCartItems, clearCart } = useCartStore();
  const { setItems: setWishlistItems, clearWishlist } = useWishlistStore();

  // Rehydrate all persisted Zustand stores from localStorage on first client mount.
  // Since stores use skipHydration: true, this prevents SSR/hydration mismatches
  // that caused "Application error: a client-side exception" on back navigation.
  useEffect(() => {
    rehydrateStores();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      if (user) {
        setUser({
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          phone: user.phone,
          role: user.role || 'customer',
        });

        // Restore cart + wishlist from Firebase
        const [savedCart, savedWishlist] = await Promise.all([
          loadUserCart(user.id),
          loadUserWishlist(user.id),
        ]);

        setCartItems(savedCart);
        setWishlistItems(savedWishlist);
      } else {
        // On logout: clear in-memory state — data stays in Firebase
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
