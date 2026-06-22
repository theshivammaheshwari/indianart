'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Share2, ShoppingBag, Minus, Plus, Star, Truck, Shield, Package,
  ChevronRight, ChevronLeft, Check, MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { getPaintingBySlug, getRelatedPaintings } from '@/lib/api/paintings';
import { useCartStore, useWishlistStore, useLocaleStore, useUIStore } from '@/store';
import type { Painting } from '@/types';
import { PaintingCard } from '@/components/paintings/painting-card';
import { defaultSettings } from '@/types';
import { toast } from 'sonner';
import { formatINR, formatUSD } from '@/lib/utils';

export default function PaintingDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { t } = useLocaleStore();
  const { addItem, items } = useCartStore();
  const { isInWishlist, toggleItem } = useWishlistStore();
  const { addToRecentlyViewed, setCartOpen } = useUIStore();
  const router = useRouter();

  const [painting, setPainting] = useState<Painting | null>(null);
  const [relatedPaintings, setRelatedPaintings] = useState<Painting[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const inWishlist = painting ? isInWishlist(painting.id) : false;
  const inCart = items.some((item) => item.painting.id === painting?.id);
  const isSold = painting ? painting.stock < 1 : true;

  useEffect(() => {
    async function loadPainting() {
      setLoading(true);
      const data = await getPaintingBySlug(slug);
      if (data) {
        setPainting(data);
        addToRecentlyViewed(data.id);
        const related = await getRelatedPaintings(data.id);
        setRelatedPaintings(related);
      }
      setLoading(false);
    }
    loadPainting();
  }, [slug, addToRecentlyViewed]);

  const handleAddToCart = () => {
    if (!painting || isSold) return;
    addItem(painting, quantity);
    toast.success(t('Added to cart!', 'कार्ट में जोड़ा गया!'));
  };

  // Buy Now: add to cart + open cart drawer so user can proceed to checkout
  const handleBuyNow = () => {
    if (!painting || isSold) return;
    addItem(painting, quantity);
    setCartOpen(true);
    toast.success(t('Added to cart! Review your order below.', 'कार्ट में जोड़ा गया!'));
  };

  const handleToggleWishlist = () => {
    if (!painting) return;
    toggleItem(painting.id);
    toast.success(
      inWishlist
        ? t('Removed from wishlist', 'इच्छा सूची से हटाया गया')
        : t('Added to wishlist', 'इच्छा सूची में जोड़ा गया')
    );
  };

  const handleShare = async () => {
    if (!painting) return;
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({
        title: painting.title_en,
        text: painting.description_en,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success(t('Link copied!', 'लिंक कॉपी किया गया!'));
    }
  };

  const shipping = painting && painting.price >= defaultSettings.freeShippingThreshold ? 0 : defaultSettings.shippingCharge;

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="aspect-[4/5] bg-muted animate-pulse rounded-2xl" />
            <div className="space-y-6">
              <div className="h-8 bg-muted animate-pulse rounded w-3/4" />
              <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
              <div className="h-20 bg-muted animate-pulse rounded" />
              <div className="h-10 bg-muted animate-pulse rounded w-1/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!painting) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h2 className="text-2xl font-semibold mb-2">{t('Painting not found', 'पेंटिंग नहीं मिली')}</h2>
          <Button asChild>
            <Link href="/gallery">{t('Back to Gallery', 'गैलरी पर वापस जाएं')}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">{t('Home', 'होम')}</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/gallery" className="hover:text-foreground">{t('Gallery', 'गैलरी')}</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{t(painting.title_en, painting.title_hi)}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div
              className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted cursor-zoom-in"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={painting.images[selectedImageIndex] || '/placeholder.jpg'}
                    alt={painting.title_en}
                    fill
                    className={cn(
                      'object-cover transition-transform duration-500',
                      isZoomed && 'scale-150'
                    )}
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {painting.stock > 0 && (
                <div className="absolute top-4 left-4 flex gap-2">
                  {painting.featured && (
                    <Badge className="bg-gold-500 text-background">
                      {t('Featured', 'विशेष')}
                    </Badge>
                  )}
                  {painting.trending && (
                    <Badge className="bg-velvet-500 text-white">
                      {t('Trending', 'ट्रेंडिंग')}
                    </Badge>
                  )}
                </div>
              )}

              {painting.stock < 1 && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <Badge variant="secondary" className="text-lg px-6 py-3">
                    {t('Sold Out', 'बिक चुकी')}
                  </Badge>
                </div>
              )}

              <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
                <MessageCircle className="h-5 w-5" />
              </button>
            </div>

            {painting.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                {painting.images.map((img, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      'relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0',
                      selectedImageIndex === index ? 'ring-2 ring-gold-500' : 'ring-1 ring-border'
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${painting.title_en} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <p className="text-sm text-gold-500 font-medium mb-2">
                {t(painting.category, painting.category_hi)}
              </p>
              <h1 className="font-display text-3xl lg:text-4xl font-bold">
                {t(painting.title_en, painting.title_hi)}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-gold-500">
                    {formatINR(painting.price)}
                  </span>
                  {painting.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {formatINR(painting.originalPrice)}
                    </span>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatUSD(painting.price)}
                  {painting.originalPrice && (
                    <span className="line-through ml-2">{formatUSD(painting.originalPrice)}</span>
                  )}
                </span>
              </div>
              {painting.originalPrice && (
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                  {Math.round((1 - painting.price / painting.originalPrice) * 100)}% {t('OFF', 'छूट')}
                </Badge>
              )}
            </div>

            <Separator />

            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {t(painting.description_en, painting.description_hi)}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">{t('Size', 'आकार')}:</span>
                  <span className="ml-2 font-medium">{painting.size}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t('Medium', 'माध्यम')}:</span>
                  <span className="ml-2 font-medium">{painting.medium}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t('Artist', 'कलाकार')}:</span>
                  <span className="ml-2 font-medium">{painting.artist}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t('Weight', 'वजन')}:</span>
                  <span className="ml-2 font-medium">{painting.weight}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t('Availability', 'उपलब्धता')}:</span>
                  <span className={cn('ml-2 font-medium', painting.stock > 0 ? 'text-green-500' : 'text-red-500')}>
                    {painting.stock > 0
                      ? t(`In Stock (${painting.stock} available)`, `स्टॉक में (${painting.stock} उपलब्ध)`)
                      : t('Out of Stock', 'स्टॉक में नहीं')}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="rounded-r-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.min(painting.stock, quantity + 1))}
                  disabled={quantity >= painting.stock}
                  className="rounded-l-none"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={isSold || inCart}
                className="flex-1 bg-gold-500 hover:bg-gold-600 text-background"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {inCart ? t('In Cart', 'कार्ट में') : t('Add to Cart', 'कार्ट में डालें')}
              </Button>

              <Button variant="outline" size="icon" onClick={handleToggleWishlist}>
                <Heart className={cn('h-5 w-5', inWishlist && 'fill-velvet-500 text-velvet-500')} />
              </Button>

              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {painting.stock > 0 && (
              <Button
                onClick={handleBuyNow}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                size="lg"
              >
                {t('Buy Now', 'अभी खरीदें')}
              </Button>
            )}

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Truck className="h-5 w-5 text-gold-500" />
                <div className="text-xs">
                  <span className="font-medium block">{t('Free Shipping', 'मुफ्त शिपिंग')}</span>
                  <span className="text-muted-foreground">
                    {shipping === 0 ? t('Free', 'मुक्त') : `Rs.${shipping}`}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Shield className="h-5 w-5 text-gold-500" />
                <div className="text-xs">
                  <span className="font-medium block">{t('Secure', 'सुरक्षित')}</span>
                  <span className="text-muted-foreground">{t('Payment', 'भुगतान')}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Package className="h-5 w-5 text-gold-500" />
                <div className="text-xs">
                  <span className="font-medium block">{t('Packaging', 'पैकेजिंग')}</span>
                  <span className="text-muted-foreground">{t('Premium', 'प्रीमियम')}</span>
                </div>
              </div>
            </div>

            <Separator />

            <Tabs defaultValue="details">
              <TabsList className="w-full">
                <TabsTrigger value="details" className="flex-1">{t('Details', 'विवरण')}</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">{t('Reviews', 'समीक्षाएं')}</TabsTrigger>
                <TabsTrigger value="shipping" className="flex-1">{t('Shipping', 'शिपिंग')}</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-4">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">{t('About this Painting', 'इस पेंटिंग के बारे में')}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t(painting.description_en, painting.description_hi)}
                      </p>
                    </div>
                    {painting.tags.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">{t('Tags', 'टैग')}</h4>
                        <div className="flex flex-wrap gap-2">
                          {painting.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        {t('No reviews yet. Be the first to review!', 'अभी तक कोई समीक्षा नहीं। पहले समीक्षा करें!')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="shipping" className="mt-4">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">{t('Delivery Information', 'डिलीवरी की जानकारी')}</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          {t('Free shipping on orders above Rs.5,000', '₹5,000 से ऊपर के ऑर्डर पर मुफ्त शिपिंग')}
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          {t('Secure packaging in protective tube', 'सुरक्षात्मक ट्यूब में सुरक्षित पैकेजिंग')}
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          {t('Delivery within 5-7 business days', '5-7 कार्य दिवस में डिलीवरी')}
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          {t('Shipping to all of India', 'पूरे भारत में शिपिंग')}
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        {relatedPaintings.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-2xl lg:text-3xl font-bold mb-8">
              {t('You May Also Like', 'आपको यह भी पसंद आ सकती हैं')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {relatedPaintings.map((p, i) => (
                <PaintingCard key={p.id} painting={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
