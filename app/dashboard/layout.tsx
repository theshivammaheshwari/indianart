'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { User, Package, MapPin, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuthStore, useLocaleStore } from '@/store';
import { signOut } from '@/lib/api/auth';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label_en: 'Overview', label_hi: 'अवलोकन', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/profile', label_en: 'Profile', label_hi: 'प्रोफाइल', icon: User },
  { href: '/dashboard/orders', label_en: 'My Orders', label_hi: 'मेरे ऑर्डर', icon: Package },
  { href: '/dashboard/addresses', label_en: 'Addresses', label_hi: 'पते', icon: MapPin },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { t } = useLocaleStore();

  // Only check auth after client mounts so Zustand stores have rehydrated from
  // localStorage. Without this, isAuthenticated is always false on first render
  // (due to skipHydration), causing a redirect loop and crashing on back navigation.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!isAuthenticated && user === null) {
      router.push('/auth/login?redirect=' + encodeURIComponent(pathname));
    }
  }, [mounted, isAuthenticated, user, router, pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
      logout();
      router.push('/');
    } catch {
      toast.error(t('Failed to sign out', 'साइन आउट विफल'));
    }
  };

  // Show nothing until we know the auth state (avoids flash of redirect)
  if (!mounted) return null;
  if (!user) return null;

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="glass-card sticky top-24">
              <CardContent className="p-6">
                {/* Avatar */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center mx-auto mb-3">
                    <span className="text-3xl font-bold text-white">
                      {user.fullName?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                    </span>
                  </div>
                  <h2 className="font-semibold text-lg">{user.fullName || 'User'}</h2>
                  <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                </div>

                {/* Nav */}
                <div className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                    return (
                      <Button
                        key={item.href}
                        variant={isActive ? 'secondary' : 'ghost'}
                        className={cn(
                          'w-full justify-start',
                          isActive && 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/15'
                        )}
                        asChild
                      >
                        <Link href={item.href}>
                          <Icon className="mr-2 h-4 w-4" />
                          {t(item.label_en, item.label_hi)}
                        </Link>
                      </Button>
                    );
                  })}
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-500/10"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('Sign Out', 'साइन आउट')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Page Content */}
          <div className="lg:col-span-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
