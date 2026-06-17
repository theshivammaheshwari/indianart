'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { defaultSettings } from '@/types';

export function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${defaultSettings.whatsapp.replace(/[^0-9]/g, '')}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 text-white shadow-lg flex items-center justify-center hover:bg-green-600 transition-colors"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 fill-white" />
      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
    </motion.a>
  );
}
