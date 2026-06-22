'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import { Filter, Grid3X3, LayoutGrid, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { PaintingCard } from '@/components/paintings/painting-card';
import { getPaintings, getUniqueCategories, getPriceRange } from '@/lib/api/paintings';
import { useLocaleStore } from '@/store';
import type { Painting } from '@/types';
import { cn } from '@/lib/utils';

function GalleryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useLocaleStore();
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  const categories = useMemo(() => getUniqueCategories(), []);
  const priceRange = useMemo(() => getPriceRange(), []);

  const category = searchParams.get('category') || 'all';
  const minPrice = parseInt(searchParams.get('minPrice') || '0');
  const maxPrice = parseInt(searchParams.get('maxPrice') || String(priceRange.max));
  const inStock = searchParams.get('inStock');
  const sort = searchParams.get('sort') || 'newest';

  const [localPriceRange, setLocalPriceRange] = useState([minPrice, maxPrice || priceRange.max]);

  useEffect(() => {
    async function loadPaintings() {
      setLoading(true);
      const data = await getPaintings();
      setPaintings(data);
      setLoading(false);
    }
    loadPaintings();
  }, []);

  useEffect(() => {
    setLocalPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const filteredPaintings = useMemo(() => {
    let filtered = paintings;

    if (category !== 'all') {
      filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    filtered = filtered.filter(
      (p) => p.price >= localPriceRange[0] && p.price <= localPriceRange[1]
    );

    if (inStock === 'true') {
      filtered = filtered.filter((p) => p.stock > 0);
    }

    switch (sort) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'featured':
        filtered = [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'trending':
        filtered = [...filtered].sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
        break;
      default:
        filtered = [...filtered].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    return filtered;
  }, [paintings, category, localPriceRange, inStock, sort]);

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all' && value !== 'null') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/gallery?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/gallery');
    setLocalPriceRange([0, priceRange.max]);
  };

  const hasActiveFilters = category !== 'all' || inStock !== null || sort !== 'newest';

  return (
    <div className="min-h-screen pt-20">
      <section className="py-12 bg-gradient-to-b from-muted/50 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl lg:text-5xl font-bold">
              {t('Art Gallery', 'कला गैलरी')}
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              {t(
                'Explore our curated collection of handmade Indian paintings',
                'हमारे हस्तनिर्मित भारतीय पेंटिंग्स के क्यूरेटेड संग्रह का अन्वेषण करें'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border">
                  <h3 className="font-semibold mb-4">{t('Categories', 'श्रेणियां')}</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => updateFilters('category', 'all')}
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between',
                        category === 'all'
                          ? 'bg-gold-500/10 text-gold-500'
                          : 'hover:bg-muted'
                      )}
                    >
                      <span>{t('All Paintings', 'सभी पेंटिंग्स')}</span>
                      <Badge variant="secondary" className="text-xs">
                        {paintings.length}
                      </Badge>
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => updateFilters('category', cat.name)}
                        className={cn(
                          'w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between',
                          category === cat.name
                            ? 'bg-gold-500/10 text-gold-500'
                            : 'hover:bg-muted'
                        )}
                      >
                        <span>{t(cat.name, cat.name)}</span>
                        <Badge variant="secondary" className="text-xs">
                          {cat.count}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border">
                  <h3 className="font-semibold mb-4">{t('Price Range', 'मूल्य सीमा')}</h3>
                  <Slider
                    value={localPriceRange}
                    onValueChange={(value) => setLocalPriceRange(value as [number, number])}
                    onValueCommit={(value) => {
                      updateFilters('minPrice', value[0].toString());
                      updateFilters('maxPrice', value[1].toString());
                    }}
                    min={0}
                    max={priceRange.max}
                    step={500}
                    className="my-6"
                  />
                  <div className="flex justify-between text-sm">
                    <span>${localPriceRange[0].toLocaleString()}</span>
                    <span>Rs.{localPriceRange[1].toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="in-stock">{t('In Stock Only', 'केवल स्टॉक में')}</Label>
                    <Switch
                      id="in-stock"
                      checked={inStock === 'true'}
                      onCheckedChange={(checked) => updateFilters('inStock', checked ? 'true' : null)}
                    />
                  </div>
                </div>

                {hasActiveFilters && (
                  <Button variant="outline" onClick={clearFilters} className="w-full">
                    <X className="mr-2 h-4 w-4" />
                    {t('Clear Filters', 'फ़िल्टर साफ़ करें')}
                  </Button>
                )}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-2">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        {t('Filters', 'फ़िल्टर')}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80">
                      <SheetHeader>
                        <SheetTitle>{t('Filters', 'फ़िल्टर')}</SheetTitle>
                      </SheetHeader>
                      <div className="space-y-6 py-6">
                        <div>
                          <h4 className="font-semibold mb-3">{t('Categories', 'श्रेणियां')}</h4>
                          <div className="space-y-2">
                            <button
                              onClick={() => {
                                updateFilters('category', 'all');
                              }}
                              className={cn(
                                'w-full text-left px-3 py-2 rounded-lg transition-colors',
                                category === 'all' ? 'bg-gold-500/10 text-gold-500' : 'hover:bg-muted'
                              )}
                            >
                              {t('All Paintings', 'सभी पेंटिंग्स')}
                            </button>
                            {categories.map((cat) => (
                              <button
                                key={cat.name}
                                onClick={() => updateFilters('category', cat.name)}
                                className={cn(
                                  'w-full text-left px-3 py-2 rounded-lg transition-colors',
                                  category === cat.name
                                    ? 'bg-gold-500/10 text-gold-500'
                                    : 'hover:bg-muted'
                                )}
                              >
                                {cat.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="font-semibold mb-3">{t('In Stock Only', 'केवल स्टॉक में')}</h4>
                          <Switch
                            checked={inStock === 'true'}
                            onCheckedChange={(checked) => updateFilters('inStock', checked ? 'true' : null)}
                          />
                        </div>

                        <Separator />

                        {hasActiveFilters && (
                          <Button variant="outline" onClick={clearFilters} className="w-full">
                            {t('Clear Filters', 'फ़िल्टर साफ़ करें')}
                          </Button>
                        )}
                      </div>
                    </SheetContent>
                  </Sheet>

                  <p className="text-sm text-muted-foreground">
                    {filteredPaintings.length} {t('paintings found', 'पेंटिंग्स मिलीं')}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Select value={sort} onValueChange={(value) => updateFilters('sort', value)}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">{t('Newest First', 'नवीनतम पहले')}</SelectItem>
                      <SelectItem value="price-low">{t('Price: Low to High', 'मूल्य: कम से अधिक')}</SelectItem>
                      <SelectItem value="price-high">{t('Price: High to Low', 'मूल्य: अधिक से कम')}</SelectItem>
                      <SelectItem value="featured">{t('Featured', 'विशेष')}</SelectItem>
                      <SelectItem value="trending">{t('Trending', 'ट्रेंडिंग')}</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="hidden sm:flex items-center border rounded-lg p-1">
                    <Button
                      variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                      size="icon"
                      onClick={() => setViewMode('grid')}
                      className="h-8 w-8"
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'compact' ? 'secondary' : 'ghost'}
                      size="icon"
                      onClick={() => setViewMode('compact')}
                      className="h-8 w-8"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {category !== 'all' && (
                    <Badge variant="secondary" className="gap-1">
                      {category}
                      <button onClick={() => updateFilters('category', 'all')}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {inStock === 'true' && (
                    <Badge variant="secondary" className="gap-1">
                      {t('In Stock', 'स्टॉक में')}
                      <button onClick={() => updateFilters('inStock', null)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              )}

              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-6"
                  >
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="aspect-[3/4] rounded-xl bg-muted animate-pulse" />
                    ))}
                  </motion.div>
                ) : filteredPaintings.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-20"
                  >
                    <div className="text-6xl mb-4">🎨</div>
                    <h3 className="text-lg font-semibold">{t('No paintings found', 'कोई पेंटिंग नहीं मिली')}</h3>
                    <p className="text-muted-foreground mt-2">
                      {t('Try adjusting your filters', 'अपने फ़िल्टर एडजस्ट करें')}
                    </p>
                    <Button onClick={clearFilters} className="mt-4">
                      {t('Clear Filters', 'फ़िल्टर साफ़ करें')}
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn(
                      'grid gap-4 lg:gap-6',
                      viewMode === 'grid'
                        ? 'grid-cols-2 md:grid-cols-3'
                        : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4'
                    )}
                  >
                    {filteredPaintings.map((painting, index) => (
                      <PaintingCard key={painting.id} painting={painting} index={index} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
      </div>
    }>
      <GalleryContent />
    </Suspense>
  );
}
