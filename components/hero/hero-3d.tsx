'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocaleStore } from '@/store';
import type { Painting } from '@/types';

interface Hero3DProps {
  paintings: Painting[];
}

export default function Hero3D({ paintings }: Hero3DProps) {
  const { t } = useLocaleStore();

  return (
    <div className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-amber-50/50 via-orange-50/30 to-background">
      <div className="absolute inset-0 canvas-container opacity-30">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#f59e0b" />
          <pointLight position={[-10, -10, -10]} intensity={0.4} color="#dc2626" />
          <GoldenRing />
        </Canvas>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-orb orb-1" />
        <div className="floating-orb orb-2" />
        <div className="floating-orb orb-3" />
        <div className="floating-orb orb-4" />
      </div>

      <div className="relative z-20 container mx-auto px-4 text-center pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block"
          >
            <span className="px-4 py-2 rounded-full bg-amber-100 border border-amber-300 text-amber-700 text-sm font-medium">
              {t('Welcome to', 'स्वागत है')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight"
          >
            <span className="block text-foreground">{t('Indian Movies', 'इंडियन मूवीज')}</span>
            <span className="block gold-text">
              {t('Art Gallery', 'आर्ट गैलरी')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            {t(
              'Where Bollywood Meets the Soul of India',
              'जहां बॉलीवुड भारत की आत्मा से मिलता है'
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 py-6 text-lg shadow-lg"
            >
              <Link href="/gallery">
                {t('Explore Collection', 'संग्रह देखें')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-amber-400 hover:border-amber-500 hover:bg-amber-50 px-8 py-6 text-lg"
            >
              <Link href="/about">{t('Learn More', 'और जानें')}</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-center gap-8 pt-8"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-amber-600">500+</div>
              <div className="text-sm text-muted-foreground">{t('Paintings', 'पेंटिंग्स')}</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-amber-600">1000+</div>
              <div className="text-sm text-muted-foreground">{t('Happy Customers', 'खुश ग्राहक')}</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-amber-600">20+</div>
              <div className="text-sm text-muted-foreground">{t('Years', 'वर्ष')}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground">{t('Scroll to explore', 'एक्सप्लोर करने के लिए स्क्रॉल करें')}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 rounded-full border-2 border-amber-400 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .canvas-container {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .floating-orb {
          position: absolute;
          border-radius: 50%;
          animation: float 8s ease-in-out infinite;
        }
        .orb-1 {
          width: 300px;
          height: 300px;
          top: 10%;
          left: -5%;
          background: radial-gradient(circle, rgba(251,191,36,0.2) 0%, transparent 70%);
          animation-delay: 0s;
        }
        .orb-2 {
          width: 250px;
          height: 250px;
          top: 60%;
          right: -5%;
          background: radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%);
          animation-delay: -2s;
        }
        .orb-3 {
          width: 180px;
          height: 180px;
          top: 20%;
          right: 15%;
          background: radial-gradient(circle, rgba(220,38,38,0.1) 0%, transparent 70%);
          animation-delay: -4s;
        }
        .orb-4 {
          width: 150px;
          height: 150px;
          top: 70%;
          left: 10%;
          background: radial-gradient(circle, rgba(251,191,36,0.12) 0%, transparent 70%);
          animation-delay: -1s;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-15px) translateX(8px);
          }
          50% {
            transform: translateY(-8px) translateX(-8px);
          }
          75% {
            transform: translateY(-25px) translateX(4px);
          }
        }
      `}</style>
    </div>
  );
}

function GoldenRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      ringRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2.5, 0.05, 16, 100]} />
      <meshStandardMaterial color="#f59e0b" metalness={1} roughness={0.3} />
    </mesh>
  );
}
