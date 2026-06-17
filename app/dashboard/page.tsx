'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { User, Package, Heart, MapPin, Settings, LogOut, ShoppingBag, Eye, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore, useLocaleStore, useWishlistStore } from '@/store';
import { getOrdersByUser } from '@/lib/api/orders';
import { getPaintingById } from '@/lib/api/paintings';
import { signOut } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';
import type { Order, Painting } from '@/types';
import { toast } from 'sonner';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { t } = useLocaleStore();
  const { items: wishlistItems } = useWishlistStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlistPaintings, setWishlistPaintings] = useState<Painting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login?redirect=/dashboard');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      setLoading(true);
      try {
        const userOrders = await getOrdersByUser(user.id);
        setOrders(userOrders);

        const paintings = await Promise.all(
          wishlistItems.map((id) => getPaintingById(id))
        );
        setWishlistPaintings(paintings.filter((p): p is Painting => p !== null));
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user, wishlistItems]);

  const handleSignOut = async () => {
    try {
      await signOut();
      logout();
      router.push('/');
    } catch (error) {
      toast.error(t('Failed to sign out', 'साइन आउट विफल'));
    }
  };

  if (!user) return null;

  const stats = [
    { label: t('Orders', 'ऑर्डर'), value: orders.length, icon: Package, color: 'text-blue-500' },
    { label: t('Wishlist', 'इच्छा सूची'), value: wishlistItems.length, icon: Heart, color: 'text-velvet-500' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="glass-card sticky top-24">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-background">
                      {user.fullName?.[0] || user.email[0].toUpperCase()}
                    </span>
                  </div>
                  <h2 className="font-semibold text-lg">{user.fullName || 'User'}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center p-3 rounded-lg bg-muted/50">
                      <stat.icon className={cn('h-5 w-5 mx-auto mb-1', stat.color)} />
                      <div className="text-xl font-bold">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/dashboard"><User className="mr-2 h-4 w-4" />{t('Profile', 'प्रोफाइल')}</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/dashboard/orders"><Package className="mr-2 h-4 w-4" />{t('Orders', 'ऑर्डर')}</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/dashboard/addresses"><MapPin className="mr-2 h-4 w-4" />{t('Addresses', 'पते')}</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />{t('Sign Out', 'साइन आउट')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-gold-500" />
                  {t('Recent Orders', 'हाल के ऑर्डर')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
                    ))}
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">{t('No orders yet', 'अभी तक कोई ऑर्डर नहीं')}</p>
                    <Button asChild className="mt-4">
                      <Link href="/gallery">{t('Start Shopping', 'खरीदारी शुरू करें')}</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.slice(0, 5).map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center">
                            <Package className="h-6 w-6 text-gold-500" />
                          </div>
                          <div>
                            <p className="font-medium">{order.orderNumber}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">Rs.{order.grandTotal.toLocaleString('en-IN')}</p>
                          <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-velvet-500" />
                  {t('Wishlist', 'इच्छा सूची')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded-lg" />
                    ))}
                  </div>
                ) : wishlistPaintings.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">{t('No favorites yet', 'अभी तक कोई पसंदीदा नहीं')}</p>
                    <Button asChild className="mt-4">
                      <Link href="/gallery">{t('Browse Gallery', 'गैलरी देखें')}</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {wishlistPaintings.slice(0, 4).map((painting) => (
                      <Link key={painting.id} href={`/painting/${painting.slug}`}>
                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted group">
                          <img
                            src={painting.images[0] || '/placeholder.jpg'}
                            alt={painting.title_en}
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white text-xs line-clamp-1">{painting.title_en}</p>
                            <p className="text-gold-400 text-sm font-semibold">Rs.{painting.price.toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
