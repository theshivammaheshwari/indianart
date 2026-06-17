'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { searchPaintings } from '@/lib/api/paintings';
import { useSearchStore, useLocaleStore } from '@/store';
import type { Painting } from '@/types';

export function SearchModal() {
  const { isOpen, setOpen } = useSearchStore();
  const { t } = useLocaleStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Painting[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const performSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery.length < 2) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      const searchResults = await searchPaintings(searchQuery);
      setResults(searchResults);
      setIsLoading(false);
    }, 300),
    []
  );

  useEffect(() => {
    if (query.length >= 2) {
      setIsLoading(true);
      performSearch(query);
    } else {
      setResults([]);
    }
  }, [query, performSearch]);

  const handleSelect = () => {
    setOpen(false);
    setQuery('');
    setResults([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl bg-background/95 backdrop-blur-xl border-gold-500/20">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder={t('Search paintings...', 'पेंटिंग खोजें...')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 h-14 text-lg bg-transparent border-gold-500/30 focus:border-gold-500"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>

        <ScrollArea className="max-h-[60vh] mt-4">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-12"
              >
                <Loader2 className="h-8 w-8 animate-spin text-gold-500" />
              </motion.div>
            ) : results.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2"
              >
                {results.map((painting) => (
                  <Link
                    key={painting.id}
                    href={`/painting/${painting.slug}`}
                    onClick={handleSelect}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={painting.images[0] || '/placeholder.jpg'}
                        alt={painting.title_en}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium group-hover:text-gold-500 transition-colors line-clamp-1">
                        {t(painting.title_en, painting.title_hi)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {painting.category} • {painting.size}
                      </p>
                      <p className="text-sm font-semibold text-gold-500 mt-1">
                        ₹{painting.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-gold-500 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </motion.div>
            ) : query.length >= 2 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <p className="text-muted-foreground">
                  {t('No paintings found', 'कोई पेंटिंग नहीं मिली')}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('Try a different search term', 'एक अलग खोज शब्द आज़माएं')}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {t('Type at least 2 characters to search', 'खोजने के लिए कम से कम 2 अक्षर टाइप करें')}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
