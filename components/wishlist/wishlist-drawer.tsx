'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useWishlistStore, useCartStore, useUIStore, useLocaleStore } from '@/store';
import { getPaintingById } from '@/lib/api/paintings';
import { useEffect, useState } from 'react';
import type { Painting } from '@/types';
import { formatINR, formatUSD } from '@/lib/utils';

export function WishlistDrawer() {
  const { isWishlistOpen, setWishlistOpen } = useUIStore();
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();
  const { t } = useLocaleStore();
  const [paintings, setPaintings] = useState<Painting[]>([]);

  useEffect(() => {
    async function loadPaintings() {
      const loaded = await Promise.all(
        items.map((id) => getPaintingById(id))
      );
      setPaintings(loaded.filter((p): p is Painting => p !== null));
    }
    if (isWishlistOpen) loadPaintings();
  }, [items, isWishlistOpen]);

  const handleAddToCart = (painting: Painting) => {
    addItem(painting, 1);
    removeItem(painting.id);
  };

  return (
    <Sheet open={isWishlistOpen} onOpenChange={setWishlistOpen}>
      <SheetContent className="w-full max-w-md flex flex-col p-0 border-l border-gold-500/20">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2 font-display">
            <Heart className="h-5 w-5 text-velvet-500 fill-velvet-500" />
            {t('Wishlist', 'इच्छा सूची')}
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
              <Heart className="h-16 w-16 text-muted-foreground mb-4" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2">{t('Your wishlist is empty', 'आपकी इच्छा सूची खाली है')}</h3>
            <p className="text-sm text-muted-foreground mb-6">
              {t('Save your favorite paintings here', 'अपनी पसंदीदा पेंटिंग्स यहां सेव करें')}
            </p>
            <Button onClick={() => setWishlistOpen(false)} asChild>
              <Link href="/gallery">{t('Browse Gallery', 'गैलरी देखें')}</Link>
            </Button>
          </div>
        ) : (
          <ScrollArea className="flex-1 px-6">
            <AnimatePresence>
              {paintings.map((painting) => (
                <motion.div
                  key={painting.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="py-4"
                >
                  <div className="flex gap-4">
                    <Link
                      href={`/painting/${painting.slug}`}
                      onClick={() => setWishlistOpen(false)}
                      className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0"
                    >
                      <Image
                        src={painting.images[0] || '/placeholder.jpg'}
                        alt={painting.title_en}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/painting/${painting.slug}`}
                        onClick={() => setWishlistOpen(false)}
                        className="font-medium text-sm hover:text-gold-500 transition-colors line-clamp-1"
                      >
                        {t(painting.title_en, painting.title_hi)}
                      </Link>
                      <p className="text-sm font-semibold text-gold-500 mt-1">
                        {formatINR(painting.price)}
                        <span className="text-xs font-normal text-muted-foreground ml-1">({formatUSD(painting.price)})</span>
                      </p>

                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(painting)}
                          disabled={painting.stock < 1}
                          className="bg-gold-500 hover:bg-gold-600 text-background"
                        >
                          <ShoppingBag className="h-3 w-3 mr-1" />
                          {painting.stock > 0 ? t('Add to Cart', 'कार्ट में डालें') : t('Out of Stock', 'स्टॉक में नहीं')}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => removeItem(painting.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
}
