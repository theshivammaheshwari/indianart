'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <span className="font-display text-[10rem] font-bold leading-none gold-text select-none">
              404
            </span>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 text-5xl"
            >
              🎨
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="font-display text-2xl font-bold mb-3">
            Page Not Found
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            The page you are looking for doesn&apos;t exist or may have been moved.
            Let&apos;s get you back to our gallery.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            <Link href="/">
              <Button className="gap-2 bg-amber-500 hover:bg-amber-600 text-white w-full sm:w-auto">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link href="/gallery">
              <Button variant="outline" className="gap-2 w-full sm:w-auto">
                <Search className="h-4 w-4" />
                Browse Gallery
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
