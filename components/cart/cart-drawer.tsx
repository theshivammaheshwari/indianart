'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useCartStore, useUIStore, useLocaleStore } from '@/store';
import { defaultSettings } from '@/types';
import { formatINR, formatUSD } from '@/lib/utils';

export function CartDrawer() {
  const { isCartOpen, setCartOpen } = useUIStore();
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const { t } = useLocaleStore();

  const total = getTotal();
  const shipping = total >= defaultSettings.freeShippingThreshold ? 0 : defaultSettings.shippingCharge;
  const grandTotal = total + shipping;

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full max-w-md flex flex-col p-0 border-l border-gold-500/20">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2 font-display">
            <ShoppingBag className="h-5 w-5 text-gold-500" />
            {t('Shopping Cart', 'शॉपिंग कार्ट')}
            {items.length > 0 && (
              <span className="text-sm text-muted-foreground">({items.length})</span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2">{t('Your cart is empty', 'आपका कार्ट खाली है')}</h3>
            <p className="text-sm text-muted-foreground mb-6">
              {t('Add some beautiful paintings to get started', 'शुरुआत करने के लिए कुछ सुंदर पेंटिंग्स जोड़ें')}
            </p>
            <Button onClick={() => setCartOpen(false)} asChild>
              <Link href="/gallery">{t('Browse Gallery', 'गैलरी देखें')}</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.painting.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="py-4"
                  >
                    <div className="flex gap-4">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={item.painting.images[0] || '/placeholder.jpg'}
                          alt={item.painting.title_en}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/painting/${item.painting.slug}`}
                          onClick={() => setCartOpen(false)}
                          className="font-medium text-sm hover:text-gold-500 transition-colors line-clamp-1"
                        >
                          {t(item.painting.title_en, item.painting.title_hi)}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.painting.size}
                        </p>
                        <p className="text-sm font-semibold text-gold-500 mt-1">
                          {formatINR(item.painting.price)}
                          <span className="text-xs font-normal text-muted-foreground ml-1">({formatUSD(item.painting.price)})</span>
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.painting.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.painting.id, item.quantity + 1)}
                            disabled={item.quantity >= item.painting.stock}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 ml-auto text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.painting.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </ScrollArea>

            <div className="border-t border-border p-6 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('Subtotal', 'उप-योग')}</span>
                  <span className="font-medium">{formatINR(total)} <span className="text-xs text-muted-foreground">({formatUSD(total)})</span></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('Shipping', 'शिपिंग')}</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-500">{t('Free', 'मुक्त')}</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>
                {total < defaultSettings.freeShippingThreshold && (
                  <p className="text-xs text-muted-foreground">
                    {t(
                      `Add ₹${(defaultSettings.freeShippingThreshold - total).toLocaleString('en-IN')} more for free shipping`,
                      `मुफ्त शिपिंग के लिए ₹${(defaultSettings.freeShippingThreshold - total).toLocaleString('en-IN')} और जोड़ें`
                    )}
                  </p>
                )}
                <Separator />
                <div className="flex justify-between text-base font-bold">
                  <span>{t('Total', 'कुल')}</span>
                  <span className="text-gold-500">{formatINR(grandTotal)} <span className="text-xs font-normal text-muted-foreground">({formatUSD(grandTotal)})</span></span>
                </div>
              </div>

              <div className="grid gap-2">
                <Button onClick={() => setCartOpen(false)} asChild className="bg-gold-500 hover:bg-gold-600 text-background">
                  <Link href="/checkout">{t('Proceed to Checkout', 'चेकआउट करें')}</Link>
                </Button>
                <Button variant="outline" onClick={() => setCartOpen(false)} asChild>
                  <Link href="/gallery">{t('Continue Shopping', 'खरीदारी जारी रखें')}</Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-destructive hover:text-destructive"
                >
                  {t('Clear Cart', 'कार्ट साफ करें')}
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
