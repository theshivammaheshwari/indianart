'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight, Award, Heart, Palette, Users, Brush,
  Star, Globe2, MapPin, Instagram, Facebook, Linkedin,
  ChevronRight, Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLocaleStore } from '@/store';
import { defaultSettings } from '@/types';

const stats = [
  { value: '500+', label_en: 'Original Paintings', label_hi: 'मूल पेंटिंग्स' },
  { value: '1000+', label_en: 'Happy Collectors', label_hi: 'खुश कलेक्टर' },
  { value: '20+', label_en: 'Years of Excellence', label_hi: 'उत्कृष्टता के वर्ष' },
  { value: '50+', label_en: 'Countries Reached', label_hi: 'देशों में पहुंच' },
];

const journey = [
  {
    year: '2004',
    title_en: 'The Beginning',
    title_hi: 'शुरुआत',
    description_en: 'Started with a small studio in Jaipur, passionate about preserving traditional Indian art.',
    description_hi: 'जयपुर में एक छोटे से स्टूडियो के साथ शुरुआत, पारंपरिक भारतीय कला को संरक्षित करने के प्रति उत्साही।',
    icon: Brush,
  },
  {
    year: '2010',
    title_en: 'Growing Recognition',
    title_hi: 'बढ़ती पहचान',
    description_en: 'Featured in local exhibitions and began shipping paintings across India.',
    description_hi: 'स्थानीय प्रदर्शनियों में प्रदर्शित और पूरे भारत में पेंटिंग्स शिप करना शुरू किया।',
    icon: Star,
  },
  {
    year: '2018',
    title_en: 'Going Digital',
    title_hi: 'डिजिटल बनना',
    description_en: 'Launched our online gallery, making Indian art accessible worldwide.',
    description_hi: 'हमारी ऑनलाइन गैलरी लॉन्च की, भारतीय कला को दुनिया भर में सुलभ बनाया।',
    icon: Globe2,
  },
  {
    year: '2024',
    title_en: 'Going Global',
    title_hi: 'वैश्विक होना',
    description_en: 'Over 500+ original paintings delivered to art lovers across the globe.',
    description_hi: 'दुनिया भर के कला प्रेमियों को 500+ मूल पेंटिंग्स डिलीवर की गईं।',
    icon: Sparkles,
  },
];

const values = [
  {
    icon: Palette,
    title_en: 'Authentic Art',
    title_hi: 'प्रामाणिक कला',
    description_en: 'Every painting is 100% handmade using traditional techniques passed down through generations.',
    description_hi: 'प्रत्येक पेंटिंग पीढ़ियों से चली आ रही पारंपरिक तकनीकों का उपयोग करके 100% हस्तनिर्मित है।',
    gradient: 'from-amber-500/20 to-orange-500/10',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-500',
  },
  {
    icon: Heart,
    title_en: 'Passion & Soul',
    title_hi: 'जुनून और आत्मा',
    description_en: 'Each piece is created with love, devotion, and attention to every brushstroke.',
    description_hi: 'प्रत्येक टुकड़ा प्रेम, भक्ति और हर ब्रशस्ट्रोक पर ध्यान के साथ बनाया जाता है।',
    gradient: 'from-red-500/20 to-pink-500/10',
    iconBg: 'bg-red-500/10',
    iconColor: 'text-red-500',
  },
  {
    icon: Award,
    title_en: 'Premium Quality',
    title_hi: 'प्रीमियम गुणवत्ता',
    description_en: 'Archival-grade canvas and paints. UV resistant. Built to last for generations.',
    description_hi: 'आर्काइवल-ग्रेड कैनवास और पेंट। UV प्रतिरोधी। पीढ़ियों तक टिकाऊ।',
    gradient: 'from-yellow-500/20 to-amber-500/10',
    iconBg: 'bg-yellow-500/10',
    iconColor: 'text-yellow-600',
  },
  {
    icon: Users,
    title_en: 'Customer First',
    title_hi: 'ग्राहक पहले',
    description_en: 'Your satisfaction is everything. From selection to doorstep — we care.',
    description_hi: 'आपकी संतुष्टि ही सब कुछ है। चयन से दरवाजे तक — हम परवाह करते हैं।',
    gradient: 'from-blue-500/20 to-cyan-500/10',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
  },
];

export default function AboutPage() {
  const { t } = useLocaleStore();

  return (
    <div className="min-h-screen pt-20 overflow-hidden">

      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-amber-500/10 text-amber-600 border-amber-500/20 px-4 py-1.5 text-sm">
                🎨 {t('Our Story', 'हमारी कहानी')}
              </Badge>
              <h1 className="font-display text-5xl lg:text-7xl font-bold leading-tight mb-6">
                {t('Where', 'जहाँ')}
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-orange-500 to-red-500">
                  {t('Bollywood Meets', 'बॉलीवुड मिलता है')}
                </span>
                {t('Indian Soul', 'भारत की आत्मा से')}
              </h1>
              <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
                {t(
                  'For over two decades, we have been breathing life into canvas — preserving the timeless traditions of Indian art and bringing them to homes across the world.',
                  'दो दशकों से अधिक समय से, हम कैनवास में जान फूंक रहे हैं — भारतीय कला की शाश्वत परंपराओं को संरक्षित करते हुए और उन्हें दुनिया भर के घरों तक पहुंचाते हुए।'
                )}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{t(stat.label_en, stat.label_hi)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Artist section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Decorative frame */}
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-orange-600/20 rounded-3xl rotate-3" />
                <div className="absolute inset-0 bg-gradient-to-tl from-amber-500/20 to-transparent rounded-3xl -rotate-3" />
                <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/10 rounded-3xl overflow-hidden flex items-center justify-center border border-amber-200/50">
                  {/* Central art motif */}
                  <div className="text-center p-12">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center mx-auto mb-6 shadow-2xl">
                      <span className="font-display text-5xl font-bold text-white">S</span>
                    </div>
                    <div className="font-display text-2xl font-bold text-amber-700 dark:text-amber-400">Shivam Maheshwari</div>
                    <div className="text-sm text-muted-foreground mt-1">{t('Founder & Artist', 'संस्थापक और कलाकार')}</div>
                    <div className="flex justify-center gap-3 mt-4">
                      <a href={defaultSettings.instagram} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-amber-500/10 hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600 hover:text-white flex items-center justify-center transition-all text-amber-600">
                        <Instagram className="h-4 w-4" />
                      </a>
                      <a href={defaultSettings.facebook} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-amber-500/10 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all text-amber-600">
                        <Facebook className="h-4 w-4" />
                      </a>
                      <a href={defaultSettings.linkedin} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-amber-500/10 hover:bg-blue-700 hover:text-white flex items-center justify-center transition-all text-amber-600">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -right-4 bg-background border border-border rounded-2xl px-4 py-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium">{t('Accepting custom orders', 'कस्टम ऑर्डर ले रहे हैं')}</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <Badge className="mb-3 bg-orange-500/10 text-orange-600 border-orange-500/20">
                  {t('The Artist', 'कलाकार के बारे में')}
                </Badge>
                <h2 className="font-display text-3xl lg:text-4xl font-bold leading-tight">
                  {t('Born from the Colors of Rajasthan', 'राजस्थान के रंगों से जन्मे')}
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {t(
                  'Born in the colorful land of Rajasthan, Shivam Maheshwari grew up surrounded by the rich artistic traditions of Indian miniature paintings, wall art, and spiritual iconography. With over 20 years of experience in traditional and contemporary Indian art, each painting is a story of devotion, culture, and timeless beauty.',
                  'राजस्थान की रंगीन भूमि में जन्मे, शिवम माहेश्वरी भारतीय लघु पेंटिंग, दीवार कला और आध्यात्मिक चिह्न चित्रण की समृद्ध कलात्मक परंपराओं से घिरे हुए बड़े हुए। पारंपरिक और समकालीन भारतीय कला में 20+ वर्षों के अनुभव के साथ, प्रत्येक पेंटिंग भक्ति, संस्कृति और कालातीत सुंदरता की कहानी है।'
                )}
              </p>

              <p className="text-muted-foreground leading-relaxed">
                {t(
                  'Inspired by Bollywood\'s vibrant storytelling and India\'s ancient art forms, the gallery bridges the gap between cinema culture and classical Indian painting traditions — creating pieces that are both visually stunning and deeply meaningful.',
                  'बॉलीवुड की जीवंत कहानी और भारत के प्राचीन कला रूपों से प्रेरित होकर, गैलरी सिनेमा संस्कृति और शास्त्रीय भारतीय पेंटिंग परंपराओं के बीच की खाई को पाटती है।'
                )}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {['Rajasthani Art', 'Bollywood Portraits', 'Spiritual', 'Traditional', 'Custom Work'].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-sm rounded-full border border-amber-500/20">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a href={defaultSettings.locationUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-amber-600 transition-colors">
                  <MapPin className="h-4 w-4 text-amber-500" />
                  Jaipur, Rajasthan, India
                  <ChevronRight className="h-3 w-3" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-amber-500/10 text-amber-600 border-amber-500/20">
              {t('Timeline', 'समयरेखा')}
            </Badge>
            <h2 className="font-display text-3xl lg:text-4xl font-bold">
              {t('Our Journey', 'हमारी यात्रा')}
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {journey.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 mb-10 last:mb-0"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0 shadow-lg">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    {index < journey.length - 1 && (
                      <div className="w-px flex-1 bg-gradient-to-b from-amber-500/50 to-transparent mt-2" />
                    )}
                  </div>
                  <div className="pb-10 last:pb-0 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className="bg-amber-500 text-white border-0">{item.year}</Badge>
                      <h3 className="font-display text-xl font-semibold">{t(item.title_en, item.title_hi)}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{t(item.description_en, item.description_hi)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-amber-500/10 text-amber-600 border-amber-500/20">
              {t('Our Values', 'हमारे मूल्य')}
            </Badge>
            <h2 className="font-display text-3xl lg:text-4xl font-bold">
              {t('What We Stand For', 'हम किसके लिए खड़े हैं')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title_en}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  <Card className={`h-full border-0 bg-gradient-to-br ${value.gradient} backdrop-blur-sm`}>
                    <CardContent className="p-6 text-center">
                      <div className={`w-14 h-14 rounded-2xl ${value.iconBg} flex items-center justify-center mx-auto mb-4`}>
                        <Icon className={`h-7 w-7 ${value.iconColor}`} />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{t(value.title_en, value.title_hi)}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{t(value.description_en, value.description_hi)}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social / Connect section */}
      <section className="py-16 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-red-500/10 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl lg:text-3xl font-bold mb-3">
                {t('Follow the Art Journey', 'कला यात्रा का अनुसरण करें')}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t('Behind-the-scenes, new arrivals, and art stories on social media.', 'पर्दे के पीछे, नई आवक और सोशल मीडिया पर कला की कहानियां।')}
              </p>
              <div className="flex justify-center gap-4">
                <motion.a
                  href={defaultSettings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium shadow-lg hover:shadow-pink-500/25 transition-shadow"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </motion.a>
                <motion.a
                  href={defaultSettings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-medium shadow-lg hover:shadow-blue-600/25 transition-shadow"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </motion.a>
                <motion.a
                  href={defaultSettings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-700 text-white text-sm font-medium shadow-lg hover:shadow-blue-700/25 transition-shadow"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="text-4xl mb-4">🎨</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              {t('Ready to Own a Masterpiece?', 'एक कृति का मालिक बनने के लिए तैयार हैं?')}
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              {t(
                'Browse our gallery and discover the perfect piece that speaks to your soul.',
                'हमारी गैलरी ब्राउज़ करें और वह सही टुकड़ा खोजें जो आपकी आत्मा से बात करे।'
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-amber-500/25 border-0">
                <Link href="/gallery">
                  {t('Explore Gallery', 'गैलरी एक्सप्लोर करें')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">
                  {t('Get in Touch', 'संपर्क करें')}
                </Link>
              </Button>
            </div>
          </motion.div>
    </div>
  );
}
