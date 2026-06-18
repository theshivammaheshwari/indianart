'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useAuthStore, useLocaleStore } from '@/store';
import { getOrdersByUser } from '@/lib/api/orders';
import type { Order } from '@/types';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-600',
  processing: 'bg-blue-500/10 text-blue-600',
  shipped: 'bg-purple-500/10 text-purple-600',
  delivered: 'bg-green-500/10 text-green-600',
  cancelled: 'bg-red-500/10 text-red-600',
};

export default function OrdersPage() {
  const { user } = useAuthStore();
  const { t } = useLocaleStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!user) return;
      setLoading(true);
      try {
        const data = await getOrdersByUser(user.id);
        setOrders(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user]);

  if (!user) return null;

  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold flex items-center gap-2">
          <Package className="h-6 w-6 text-amber-500" />
          {t('My Orders', 'मेरे ऑर्डर')}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {t('Track and manage all your orders', 'अपने सभी ऑर्डर ट्रैक और प्रबंधित करें')}
        </p>
      </motion.div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <ShoppingBag className="h-14 w-14 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">{t('No orders yet', 'अभी तक कोई ऑर्डर नहीं')}</h3>
            <p className="text-muted-foreground text-sm mb-4">
              {t('Explore our gallery and find your first painting!', 'हमारी गैलरी एक्सप्लोर करें और अपनी पहली पेंटिंग खोजें!')}
            </p>
            <Button asChild className="bg-amber-500 hover:bg-amber-600 text-white">
              <Link href="/gallery">{t('Browse Gallery', 'गैलरी देखें')}</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {orders.map((order, idx) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  {/* Order header */}
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                        <Package className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{order.orderNumber}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'long', year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right hidden sm:block">
                        <p className="font-semibold text-sm">₹{order.grandTotal.toLocaleString('en-IN')}</p>
                        <p className="text-xs text-muted-foreground">{order.items.length} {t('item(s)', 'आइटम')}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${statusColors[order.status] || 'bg-muted text-muted-foreground'}`}>
                        {order.status}
                      </span>
                      {expandedOrder === order.id
                        ? <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        : <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      }
                    </div>
                  </div>

                  {/* Expanded items */}
                  {expandedOrder === order.id && (
                    <div className="border-t border-border">
                      <div className="p-4 space-y-3">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          {t('Order Items', 'ऑर्डर आइटम')}
                        </h4>
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between text-sm">
                            <div>
                              <p className="font-medium">{item.paintingTitleEn}</p>
                              <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                          </div>
                        ))}
                        <div className="border-t border-border pt-3 space-y-1 text-sm">
                          <div className="flex justify-between text-muted-foreground">
                            <span>{t('Subtotal', 'उप-योग')}</span>
                            <span>₹{order.totalAmount.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between text-muted-foreground">
                            <span>{t('Shipping', 'शिपिंग')}</span>
                            <span>{order.shippingCharge === 0 ? t('Free', 'मुफ्त') : `₹${order.shippingCharge}`}</span>
                          </div>
                          <div className="flex justify-between font-semibold">
                            <span>{t('Total', 'कुल')}</span>
                            <span>₹{order.grandTotal.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                        {order.shippingAddress && (
                          <div className="border-t border-border pt-3">
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                              {t('Delivered to', 'डिलीवरी पता')}
                            </h4>
                            <p className="text-sm">{order.shippingAddress.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
