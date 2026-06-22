'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight, Star, Palette, Award, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PaintingCard } from '@/components/paintings/painting-card';
import { getFeaturedPaintings, getTrendingPaintings } from '@/lib/api/paintings';
import { useLocaleStore } from '@/store';
import type { Painting } from '@/types';

const Hero3D = dynamic(() => import('@/components/hero/hero-3d'), { ssr: false });

interface HomePageProps {
  params: {};
  searchParams: {};
}

export default async function HomePage() {
  const [featuredPaintings, trendingPaintings] = await Promise.all([
    getFeaturedPaintings(),
    getTrendingPaintings(),
  ]);

  return (
    <div className="relative">
      <Hero3D paintings={featuredPaintings.slice(0, 3)} />

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <TrendingSection paintings={trendingPaintings} />
        </div>
      </section>

      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-amber-50/30 to-orange-50/20">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <FeaturedSection paintings={featuredPaintings} />
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <WhyChooseUs />
        </div>
      </section>

      <section className="py-20 relative overflow-hidden bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <AboutArtist />
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <Testimonials />
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-amber-50/50 to-orange-50/30">
        <div className="container mx-auto px-4 lg:px-8">
          <CallToAction />
        </div>
      </section>
    </div>
  );
}

function TrendingSection({ paintings }: { paintings: Painting[] }) {
  const { t } = useLocaleStore();

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-amber-600 text-sm font-semibold tracking-wider uppercase">
          {t('Most Loved', 'सबसे पसंद किए गए')}
        </span>
        <h2 className="font-display text-3xl lg:text-5xl font-bold mt-2">
          {t('Trending Paintings', 'ट्रेंडिंग पेंटिंग्स')}
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          {t(
            'Discover the most popular artworks loved by our customers',
            'हमारे ग्राहकों द्वारा सबसे अधिक पसंद किए गए artworks खोजें'
          )}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {paintings.slice(0, 8).map((painting, index) => (
          <PaintingCard key={painting.id} painting={painting} index={index} />
        ))}
      </div>

      <div className="text-center mt-10">
        <Button asChild variant="outline" className="border-amber-400 hover:border-amber-500 hover:bg-amber-50">
          <Link href="/gallery">
            {t('View All Paintings', 'सभी पेंटिंग्स देखें')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function FeaturedSection({ paintings }: { paintings: Painting[] }) {
  const { t } = useLocaleStore();

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-orange-600 text-sm font-semibold tracking-wider uppercase">
          {t('Exclusive Collection', 'विशिष्ट संग्रह')}
        </span>
        <h2 className="font-display text-3xl lg:text-5xl font-bold mt-2">
          {t('Featured Artworks', 'विशेष कलाकृतियां')}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {paintings.slice(0, 6).map((painting, index) => (
          <PaintingCard key={painting.id} painting={painting} index={index} />
        ))}
      </div>
    </div>
  );
}

function WhyChooseUs() {
  const { t } = useLocaleStore();

  const features = [
    {
      icon: Palette,
      title_en: 'Handcrafted Art',
      title_hi: 'हस्तनिर्मित कला',
      description_en: 'Each painting is carefully handcrafted by skilled Indian artists',
      description_hi: 'प्रत्येक पेंटिंग कुशल भारतीय कलाकारों द्वारा हस्तनिर्मित',
    },
    {
      icon: Award,
      title_en: 'Premium Quality',
      title_hi: 'प्रीमियम गुणवत्ता',
      description_en: 'Finest materials and vibrant, lasting colors',
      description_hi: 'उत्कृष्ट सामग्री और जीवंत, टिकाऊ रंग',
    },
    {
      icon: Shield,
      title_en: 'Secure Packaging',
      title_hi: 'सुरक्षित पैकेजिंग',
      description_en: 'Carefully packed for perfect delivery',
      description_hi: 'सही डिलीवरी के लिए सावधानीपूर्वक पैक',
    },
    {
      icon: Truck,
      title_en: 'Free Shipping',
      title_hi: 'मुफ्त शिपिंग',
      description_en: 'Free shipping on orders above Rs.5,000',
      description_hi: '₹5,000 से ऊपर के ऑर्डर पर मुफ्त शिपिंग',
    },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-amber-600 text-sm font-semibold tracking-wider uppercase">
          {t('Why Choose Us', 'हमें क्यों चुनें')}
        </span>
        <h2 className="font-display text-3xl lg:text-5xl font-bold mt-2">
          {t('Our Promise', 'हमारा वादा')}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title_en}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative p-6 rounded-2xl bg-white border border-border hover:border-amber-400 hover:shadow-lg transition-all duration-300 text-center"
          >
            <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
              <feature.icon className="h-7 w-7 text-amber-600" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">
              {t(feature.title_en, feature.title_hi)}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t(feature.description_en, feature.description_hi)}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AboutArtist() {
  const { t } = useLocaleStore();

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100"
      >
        <div className="absolute inset-4 rounded-xl bg-white shadow-lg flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 mx-auto mb-6 flex items-center justify-center">
              <span className="font-display text-4xl font-bold text-white">I</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-amber-600">The Indian Canvas</h3>
            <p className="text-muted-foreground mt-2">Jaipur, Rajasthan</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <span className="text-amber-600 text-sm font-semibold tracking-wider uppercase">
          {t('About Us', 'हमारे बारे में')}
        </span>
        <h2 className="font-display text-3xl lg:text-4xl font-bold">
          {t(
            'Where Bollywood Meets the Soul of India',
            'जहां बॉलीवुड भारत की आत्मा से मिलता है'
          )}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {t(
            'For over two decades, we have been creating exquisite Indian paintings inspired by Bollywood cinema and traditional art forms.',
            'दो दशकों से अधिक समय से, हम बॉलीवुड सिनेमा और पारंपरिक कला रूपों से प्रेरित उत्कृष्ट भारतीय पेंटिंग्स बना रहे हैं।'
          )}
        </p>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-white border">
            <div className="text-2xl font-bold text-amber-600">500+</div>
            <div className="text-sm text-muted-foreground">{t('Paintings', 'पेंटिंग्स')}</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white border">
            <div className="text-2xl font-bold text-amber-600">20+</div>
            <div className="text-sm text-muted-foreground">{t('Years', 'वर्ष')}</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white border">
            <div className="text-2xl font-bold text-amber-600">1000+</div>
            <div className="text-sm text-muted-foreground">{t('Happy Customers', 'खुश ग्राहक')}</div>
          </div>
        </div>

        <Button asChild className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
          <Link href="/about">
            {t('Learn More', 'और जानें')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}

function Testimonials() {
  const { t } = useLocaleStore();

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Delhi',
      rating: 5,
      comment_en: 'The painting I received was absolutely stunning! The colors are so vibrant and the quality is exceptional.',
      comment_hi: 'जो पेंटिंग मुझे मिली वह बिल्कुल शानदार थी! रंग बहुत जीवंत हैं और गुणवत्ता असाधारण है।',
    },
    {
      name: 'Rajesh Kumar',
      location: 'Mumbai',
      rating: 5,
      comment_en: 'The attention to detail is remarkable. Thank you for creating such beautiful art.',
      comment_hi: 'विवरण पर ध्यान उल्लेखनीय है। इतनी सुंदर कला बनाने के लिए धन्यवाद।',
    },
    {
      name: 'Anita Patel',
      location: 'Bangalore',
      rating: 5,
      comment_en: 'The packaging was excellent and the painting arrived in perfect condition.',
      comment_hi: 'पैकेजिंग उत्कृष्ट थी और पेंटिंग सही स्थिति में पहुंची।',
    },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-amber-600 text-sm font-semibold tracking-wider uppercase">
          {t('Customer Love', 'ग्राहक प्रेम')}
        </span>
        <h2 className="font-display text-3xl lg:text-5xl font-bold mt-2">
          {t('What People Say', 'लोग क्या कहते हैं')}
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white border hover:shadow-lg transition-shadow"
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-foreground/90 mb-6 leading-relaxed">
              &quot;{t(testimonial.comment_en, testimonial.comment_hi)}&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <span className="text-sm font-bold text-white">{testimonial.name[0]}</span>
              </div>
              <div>
                <div className="font-medium text-sm">{testimonial.name}</div>
                <div className="text-xs text-muted-foreground">{testimonial.location}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CallToAction() {
  const { t } = useLocaleStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center space-y-6 py-12"
    >
      <h2 className="font-display text-3xl lg:text-5xl font-bold">
        {t('Ready to Own a Masterpiece?', 'एक उत्कृष्ट कृति के मालिक बनने के लिए तैयार हैं?')}
      </h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        {t(
          'Browse our collection of exquisite Indian paintings and find the perfect piece for your home.',
          'भारतीय पेंटिंग्स के हमारे संग्रह को ब्राउज़ करें और अपने घर के लिए सही टुकड़ा खोजें।'
        )}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8">
          <Link href="/gallery">
            {t('Explore Gallery', 'गैलरी एक्सप्लोर करें')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="border-amber-400 hover:border-amber-500 hover:bg-amber-50 px-8">
          <Link href="/contact">{t('Contact Us', 'संपर्क करें')}</Link>
        </Button>
      </div>
    </motion.div>
  );
}
