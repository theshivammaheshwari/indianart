import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, Painting, Locale, WishlistItem } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (painting: Painting, quantity?: number) => void;
  removeItem: (paintingId: number) => void;
  updateQuantity: (paintingId: number, quantity: number) => void;
  clearCart: () => void;
  setItems: (items: CartItem[]) => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (painting, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find((item) => item.painting.id === painting.id);

        if (existingItem) {
          if (existingItem.quantity >= painting.stock) return;
          set({
            items: items.map((item) =>
              item.painting.id === painting.id
                ? { ...item, quantity: Math.min(item.quantity + quantity, painting.stock) }
                : item
            ),
          });
        } else {
          set({ items: [...items, { painting, quantity }] });
        }
      },
      removeItem: (paintingId) => {
        set({ items: get().items.filter((item) => item.painting.id !== paintingId) });
      },
      updateQuantity: (paintingId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(paintingId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.painting.id === paintingId
              ? { ...item, quantity: Math.min(quantity, item.painting.stock) }
              : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      setItems: (items) => set({ items }),
      getTotal: () => get().items.reduce((total, item) => total + item.painting.price * item.quantity, 0),
      getItemCount: () => get().items.reduce((count, item) => count + item.quantity, 0),
    }),
    {
      name: 'maheshwari-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface WishlistState {
  items: number[];
  addItem: (paintingId: number) => void;
  removeItem: (paintingId: number) => void;
  isInWishlist: (paintingId: number) => boolean;
  toggleItem: (paintingId: number) => void;
  setItems: (items: number[]) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (paintingId) => {
        if (!get().items.includes(paintingId)) {
          set({ items: [...get().items, paintingId] });
        }
      },
      removeItem: (paintingId) => {
        set({ items: get().items.filter((id) => id !== paintingId) });
      },
      isInWishlist: (paintingId) => get().items.includes(paintingId),
      toggleItem: (paintingId) => {
        if (get().isInWishlist(paintingId)) {
          get().removeItem(paintingId);
        } else {
          get().addItem(paintingId);
        }
      },
      setItems: (items) => set({ items }),
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'maheshwari-wishlist',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (en: string, hi?: string) => string;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set, get) => ({
      locale: 'en',
      setLocale: (locale) => set({ locale }),
      t: (en, hi) => (get().locale === 'hi' && hi ? hi : en),
    }),
    {
      name: 'maheshwari-locale',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDark: true,
      toggleTheme: () => set({ isDark: !get().isDark }),
    }),
    {
      name: 'maheshwari-theme',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface SearchState {
  isOpen: boolean;
  query: string;
  setOpen: (open: boolean) => void;
  setQuery: (query: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  isOpen: false,
  query: '',
  setOpen: (open) => set({ isOpen: open }),
  setQuery: (query) => set({ query }),
}));

interface AuthState {
  user: null | { id: string; email: string; fullName?: string; phone?: string; role: string };
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: AuthState['user']) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
      setLoading: (loading) => set({ isLoading: loading }),
      logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),
    }),
    {
      name: 'indianart-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

interface UIState {
  isMobileMenuOpen: boolean;
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setCartOpen: (open: boolean) => void;
  setWishlistOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  recentlyViewed: number[];
  addToRecentlyViewed: (paintingId: number) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isMobileMenuOpen: false,
      isCartOpen: false,
      isWishlistOpen: false,
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
      setCartOpen: (open) => set({ isCartOpen: open }),
      setWishlistOpen: (open) => set({ isWishlistOpen: open }),
      setSearchOpen: (open) => set({ isCartOpen: open }),
      recentlyViewed: [],
      addToRecentlyViewed: (paintingId) =>
        set((state) => ({
          recentlyViewed: [
            paintingId,
            ...state.recentlyViewed.filter((id) => id !== paintingId),
          ].slice(0, 10),
        })),
    }),
    {
      name: 'maheshwari-ui',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
