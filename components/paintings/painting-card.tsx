'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore, useWishlistStore, useLocaleStore, useUIStore } from '@/store';
import type { Painting } from '@/types';
import { cn } from '@/lib/utils';

interface PaintingCardProps {
  painting: Painting;
  index?: number;
  showQuickView?: boolean;
}

export function PaintingCard({ painting, index = 0, showQuickView = true }: PaintingCardProps) {
  const { t } = useLocaleStore();
  const { addItem, items } = useCartStore();
  const { isInWishlist, toggleItem } = useWishlistStore();
  const { addToRecentlyViewed } = useUIStore();

  const inCart = items.some((item) => item.painting.id === painting.id);
  const inWishlist = isInWishlist(painting.id);
  const isSold = painting.stock < 1;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isSold && !inCart) {
      addItem(painting, 1);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(painting.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link href={`/painting/${painting.slug}`} onClick={() => addToRecentlyViewed(painting.id)}>
        <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border hover:border-gold-500/50 transition-all duration-500 hover-lift">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={painting.images[0] || '/placeholder.jpg'}
              alt={painting.title_en}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {painting.featured && (
                <Badge className="bg-gold-500 text-background text-xs">
                  {t('Featured', 'विशेष')}
                </Badge>
              )}
              {painting.trending && (
                <Badge className="bg-velvet-500 text-white text-xs">
                  {t('Trending', 'ट्रेंडिंग')}
                </Badge>
              )}
              {isSold && (
                <Badge className="bg-muted text-muted-foreground text-xs">
                  {t('Sold', 'बिक चुकी')}
                </Badge>
              )}
            </div>

            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggleWishlist}
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center transition-colors",
                  inWishlist
                    ? "bg-velvet-500 text-white"
                    : "bg-white/80 text-foreground hover:bg-velvet-500 hover:text-white"
                )}
              >
                <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
              </motion.button>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
              <Button
                size="sm"
                className="flex-1 bg-gold-500 hover:bg-gold-600 text-background"
                onClick={handleAddToCart}
                disabled={isSold || inCart}
              >
                <ShoppingBag className="h-4 w-4 mr-1" />
                {inCart ? t('In Cart', 'कार्ट में') : t('Add to Cart', 'कार्ट में डालें')}
              </Button>
            </div>
          </div>

          <div className="p-4 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-sm line-clamp-1 group-hover:text-gold-500 transition-colors">
                {t(painting.title_en, painting.title_hi)}
              </h3>
              {painting.rating && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 fill-gold-500 text-gold-500" />
                  {painting.rating}
                </div>
              )}
            </div>

            <p className="text-xs text-muted-foreground">
              {painting.category} • {painting.size}
            </p>

            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gold-500">
                ₹{painting.price.toLocaleString('en-IN')}
              </span>
              {painting.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{painting.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
