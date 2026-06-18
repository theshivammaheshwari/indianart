'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Package, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuthStore, useLocaleStore } from '@/store';
import { getOrdersByUser } from '@/lib/api/orders';
import { loadUserWishlist } from '@/lib/api/database';
import { getPaintingById } from '@/lib/api/paintings';
import type { Order, Painting } from '@/types';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { t } = useLocaleStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlistPaintings, setWishlistPaintings] = useState<Painting[]>([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      setLoading(true);
      try {
        // Fetch orders
        try {
          const userOrders = await getOrdersByUser(user.id);
          setOrders(userOrders);
        } catch (orderError) {
          console.error('Failed to load orders:', orderError);
        }

        // Fetch wishlist
        try {
          const savedWishlistIds = await loadUserWishlist(user.id);
          setWishlistCount(savedWishlistIds.length);
          const paintings = await Promise.all(
            savedWishlistIds.map((id) => getPaintingById(id))
          );
          setWishlistPaintings(paintings.filter((p): p is Painting => p !== null));
        } catch (wishlistError) {
          console.error('Failed to load wishlist:', wishlistError);
        }
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user]);

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold">
          {t('Welcome back', 'वापस स्वागत है')}, {user.fullName?.split(' ')[0] || t('there', 'यहाँ')} 👋
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {t("Here's a summary of your account.", 'यहां आपके खाते का सारांश है।')}
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
              <Package className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{loading ? '—' : orders.length}</p>
              <p className="text-sm text-muted-foreground">{t('Orders', 'ऑर्डर')}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
              <Heart className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{loading ? '—' : wishlistCount}</p>
              <p className="text-sm text-muted-foreground">{t('Wishlist', 'इच्छा सूची')}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Package className="h-4 w-4 text-amber-500" />
            {t('Recent Orders', 'हाल के ऑर्डर')}
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/orders" className="text-amber-500 flex items-center gap-1">
              {t('View all', 'सभी देखें')} <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />)}
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">{t('No orders yet', 'अभी तक कोई ऑर्डर नहीं')}</p>
              <Button asChild size="sm" className="mt-3">
                <Link href="/gallery">{t('Start Shopping', 'खरीदारी शुरू करें')}</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-sm">{order.orderNumber}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">₹{order.grandTotal.toLocaleString('en-IN')}</p>
                    <Badge variant="secondary" className="text-xs capitalize">{order.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Wishlist */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Heart className="h-4 w-4 text-red-500" />
            {t('Wishlist', 'इच्छा सूची')}
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/gallery" className="text-amber-500 flex items-center gap-1">
              {t('Browse more', 'और देखें')} <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded-lg" />)}
            </div>
          ) : wishlistPaintings.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">{t('No favorites yet', 'अभी तक कोई पसंदीदा नहीं')}</p>
              <Button asChild size="sm" className="mt-3">
                <Link href="/gallery">{t('Browse Gallery', 'गैलरी देखें')}</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {wishlistPaintings.slice(0, 6).map((painting) => (
                <Link key={painting.id} href={`/painting/${painting.slug}`}>
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted group">
                    <img
                      src={painting.images[0] || '/placeholder.jpg'}
                      alt={painting.title_en}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs line-clamp-1">{painting.title_en}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
