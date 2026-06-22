'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Instagram, Facebook, Mail, Phone, MapPin, Heart, Linkedin
} from 'lucide-react';
import { useLocaleStore } from '@/store';
import { defaultSettings } from '@/types';

const footerLinks = {
  shop: [
    { href: '/gallery', en: 'All Paintings', hi: 'सभी पेंटिंग्स' },
    { href: '/gallery?featured=true', en: 'Featured', hi: 'विशेष' },
    { href: '/gallery?category=Spiritual', en: 'Spiritual', hi: 'धार्मिक' },
    { href: '/gallery?category=Traditional', en: 'Traditional', hi: 'पारंपरिक' },
  ],
  company: [
    { href: '/about', en: 'About Us', hi: 'हमारे बारे में' },
    { href: '/contact', en: 'Contact', hi: 'संपर्क' },
    { href: '/shipping', en: 'Shipping Info', hi: 'शिपिंग जानकारी' },
    { href: '/returns', en: 'Returns', hi: 'रिटर्न' },
  ],
  support: [
    { href: '/faq', en: 'FAQ', hi: 'अक्सर पूछे जाने वाले प्रश्न' },
    { href: '/care', en: 'Painting Care', hi: 'पेंटिंग देखभाल' },
    { href: '/privacy', en: 'Privacy Policy', hi: 'गोपनीयता नीति' },
    { href: '/terms', en: 'Terms & Conditions', hi: 'नियम और शर्तें' },
  ],
};

export function Footer() {
  const { t } = useLocaleStore();

  return (
    <footer className="relative bg-muted/30 border-t border-border overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-2xl font-bold gold-text mb-2">
                Devdas Arts
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(
                  'Where Bollywood Meets the Soul of India',
                  'जहां बॉलीवुड भारत की आत्मा से मिलता है'
                )}
              </p>
            </div>

            <div className="space-y-3">
              <a
                href={`tel:${defaultSettings.phone}`}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-amber-600 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>{defaultSettings.phone}</span>
              </a>
              <a
                href={`mailto:${defaultSettings.email}`}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-amber-600 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>{defaultSettings.email}</span>
              </a>
              <a
                href={defaultSettings.locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-muted-foreground hover:text-amber-600 transition-colors"
              >
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{defaultSettings.address}</span>
              </a>
            </div>

            <div className="flex gap-3">
              <motion.a
                href={defaultSettings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600 hover:text-white transition-all"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a
                href={defaultSettings.facebook}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a
                href={defaultSettings.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a
                href={`https://wa.me/${defaultSettings.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-green-600 hover:text-white transition-all"
              >
                <Phone className="h-5 w-5" />
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-amber-600">
              {t('Shop', 'खरीदें')}
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-amber-600 transition-colors"
                  >
                    {t(link.en, link.hi)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-amber-600">
              {t('Company', 'कंपनी')}
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-amber-600 transition-colors"
                  >
                    {t(link.en, link.hi)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-amber-600">
              {t('Support', 'सहायता')}
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-amber-600 transition-colors"
                  >
                    {t(link.en, link.hi)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            {t('© 2026 Devdas Arts. All rights reserved.', '© 2026 देवदास आर्ट्स। सर्वाधिकार सुरक्षित।')}
          </p>

          <p className="text-sm text-muted-foreground flex items-center gap-1">
            {t('Made with', 'बनाया गया')}
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            {t('in India', 'भारत में')}
          </p>
        </div>
      </div>
    </footer>
  );
}
