'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ShoppingBag, Heart, Search, User, Globe
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore, useWishlistStore, useLocaleStore, useUIStore, useSearchStore, useAuthStore } from '@/store';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', en: 'Home', hi: 'होम' },
  { href: '/gallery', en: 'Gallery', hi: 'गैलरी' },
  { href: '/about', en: 'About', hi: 'हमारे बारे में' },
  { href: '/contact', en: 'Contact', hi: 'संपर्क' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { locale, setLocale, t } = useLocaleStore();
  const { items } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { isMobileMenuOpen, setMobileMenuOpen, setCartOpen, setWishlistOpen } = useUIStore();
  const { setOpen: setSearchOpen } = useSearchStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-border shadow-md'
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 shadow-md"
            >
              <Image
                src="/logo.png"
                alt="The Indian Canvas Logo"
                fill
                className="object-cover"
                sizes="40px"
                priority
              />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="font-display text-lg lg:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600">
                The Indian Canvas
              </h1>
              <p className="text-xs text-muted-foreground leading-none">
                {t('Art Gallery', 'आर्ट गैलरी')}
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative group"
              >
                <span className="text-sm font-medium text-foreground/80 group-hover:text-amber-600 transition-colors">
                  {t(link.en, link.hi)}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1 lg:gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="relative group"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setWishlistOpen(true)}
              className="relative group"
            >
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  {wishlistItems.length}
                </Badge>
              )}
              <span className="sr-only">Wishlist</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCartOpen(true)}
              className="relative group"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-amber-500 text-white text-xs">
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>

            <Link href={isAuthenticated ? '/dashboard' : '/auth/login'}>
              <Button variant="ghost" size="icon" className="group">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocale(locale === 'en' ? 'hi' : 'en')}
              className="group"
            >
              <Globe className="h-5 w-5" />
              <span className="absolute -bottom-4 text-[10px] font-bold text-amber-600">
                {locale === 'en' ? 'EN' : 'हि'}
              </span>
              <span className="sr-only">Toggle language</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden border-t border-border"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-lg font-medium hover:bg-muted rounded-lg transition-colors"
                  >
                    {t(link.en, link.hi)}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
