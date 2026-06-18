'use client';

import { useEffect } from 'react';
import { onAuthChange } from '@/lib/api/auth';
import { useAuthStore, useCartStore, useWishlistStore } from '@/store';
import { saveUserCart, loadUserCart, saveUserWishlist, loadUserWishlist } from '@/lib/api/database';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, logout } = useAuthStore();
  const { items: cartItems, setItems: setCartItems, clearCart } = useCartStore();
  const { items: wishlistItems, setItems: setWishlistItems, clearWishlist } = useWishlistStore();

  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      if (user) {
        // Login: restore cart + wishlist from Firebase, merge with any local items
        setUser({
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          phone: user.phone,
          role: user.role || 'customer',
        });

        const [savedCart, savedWishlist] = await Promise.all([
          loadUserCart(user.id),
          loadUserWishlist(user.id),
        ]);

        // Merge saved cart with any current local items (add local items not in saved cart)
        if (savedCart.length > 0) {
          const localCart = useCartStore.getState().items;
          const merged = [...savedCart];
          for (const localItem of localCart) {
            const exists = merged.find((i) => i.painting.id === localItem.painting.id);
            if (!exists) merged.push(localItem);
          }
          setCartItems(merged);
        }

        // Merge saved wishlist with local
        if (savedWishlist.length > 0) {
          const localWishlist = useWishlistStore.getState().items;
          const merged = Array.from(new Set([...savedWishlist, ...localWishlist]));
          setWishlistItems(merged);
        }
      } else {
        // Logout: save current cart/wishlist to Firebase if user was logged in
        const currentUser = useAuthStore.getState().user;
        if (currentUser) {
          const currentCart = useCartStore.getState().items;
          const currentWishlist = useWishlistStore.getState().items;
          await Promise.all([
            saveUserCart(currentUser.id, currentCart),
            saveUserWishlist(currentUser.id, currentWishlist),
          ]);
        }

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
