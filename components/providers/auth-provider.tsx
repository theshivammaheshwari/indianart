'use client';

import { useEffect } from 'react';
import { onAuthChange } from '@/lib/api/auth';
import { useAuthStore } from '@/store';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, logout } = useAuthStore();

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
      } else {
        logout();
      }
    });
    return () => unsubscribe();
  }, [setUser, logout]);

  return <>{children}</>;
}
