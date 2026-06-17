'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Award, Heart, Palette, Users, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLocaleStore } from '@/store';

export default function AboutPage() {
  const { t } = useLocaleStore();

  const journey = [
    { year: '2004', title_en: 'The Beginning', title_hi: 'शुरुआत', description_en: 'Started with a small studio in Jaipur, passionate about preserving traditional Indian art.', description_hi: 'जयपुर में एक छोटे से स्टूडियो के साथ शुरुआत, पारंपरिक भारतीय कला को संरक्षित करने के प्रति उत्साही।' },
    { year: '2010', title_en: 'Growing Recognition', title_hi: 'बढ़ती पहचान', description_en: 'Featured in local exhibitions and began shipping paintings across India.', description_hi: 'स्थानीय प्रदर्शनियों में प्रदर्शित और पूरे भारत में पेंटिंग्स शिप करना शुरू किया।' },
    { year: '2018', title_en: 'Going Digital', title_hi: 'डिजिटल बनना', description_en: 'Launched our online gallery, making Indian art accessible worldwide.', description_hi: 'हमारी ऑनलाइन गैलरी लॉन्च की, भारतीय कला को दुनिया भर में सुलभ बनाया।' },
    { year: '2024', title_en: 'Today', title_hi: 'आज', description_en: 'Over 500+ original paintings delivered to art lovers across the globe.', description_hi: 'दुनिया भर के कला प्रेमियों को 500+ मूल पेंटिंग्स डिलीवर की गईं।' },
  ];

  const values = [
    { icon: Palette, title_en: 'Authentic Art', title_hi: 'प्रामाणिक कला', description_en: 'Every painting is handmade using traditional techniques passed down through generations.', description_hi: 'प्रत्येक पेंटिंग पीढ़ियों से चली आ रही पारंपरिक तकनीकों का उपयोग करके हस्तनिर्मित है।' },
    { icon: Heart, title_en: 'Passion & Dedication', title_hi: 'जुनून और समर्पण', description_en: 'Each piece is created with love, care, and attention to every detail.', description_hi: 'प्रत्येक टुकड़ा प्रेम, देखभाल और हर विवरण पर ध्यान के साथ बनाया जाता है।' },
    { icon: Award, title_en: 'Premium Quality', title_hi: 'प्रीमियम गुणवत्ता', description_en: 'We use only the finest canvas and premium paints for lasting beauty.', description_hi: 'हम स्थायी सुंदरता के लिए केवल उत्कृष्ट कैनवास और प्रीमियम पेंट्स का उपयोग करते हैं।' },
    { icon: Users, title_en: 'Customer First', title_hi: 'ग्राहक पहले', description_en: 'Your satisfaction is our priority. From selection to delivery, we are here for you.', description_hi: 'आपकी संतुष्टि हमारी प्राथमिकता है। चयन से लेकर डिलीवरी तक, हम आपके लिए यहां हैं।' },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 bg-gradient-to-b from-muted/50 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-gold-500 text-sm font-semibold tracking-wider uppercase">
              {t('Our Story', 'हमारी कहानी')}
            </span>
            <h1 className="font-display text-4xl lg:text-6xl font-bold mt-4">
              {t('About Maheshwari Art Gallery', 'माहेश्वरी आर्ट गैलरी के बारे में')}
            </h1>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
              {t(
                'For over two decades, we have been dedicated to preserving and promoting the rich heritage of Indian painting traditions.',
                'दो दशकों से अधिक समय से, हम भारतीय पेंटिंग परंपराओं की समृद्ध विरासत को संरक्षित और प्रोत्साहित करने के लिए समर्पित हैं।'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square max-w-md mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-velvet-500/20 rounded-full blur-3xl" />
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-gold-400/30 to-gold-600/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-display text-6xl font-bold gold-text">20+</div>
                  <div className="text-lg text-muted-foreground">{t('Years of Excellence', 'उत्कृष्टता के वर्ष')}</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-display text-3xl font-bold">
                {t('The Artist Behind the Art', 'कला के पीछे का कलाकार')}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t(
                  'Born in the colorful state of Rajasthan, our founder grew up surrounded by the rich artistic traditions of Indian miniature paintings, wall art, and spiritual iconography. With formal training in traditional art forms and a deep passion for preserving heritage, each painting tells a story of devotion, culture, and timeless beauty.',
                  'राजस्थान की रंगीन राज्य में जन्मे, हमारे संस्थापक भारतीय लघु पेंटिंग, दीवार कला और आध्यात्मिक चिह्न चित्रण की समृद्ध कलात्मक परंपराओं से घिरे हुए बड़े हुए। पारंपरिक कला रूपों में औपचारिक प्रशिक्षण और विरासत को संरक्षित करने के गहरे जुनून के साथ, प्रत्येक पेंटिंग भक्ति, संस्कृति और कालातीत सुंदरता की कहानी कहती है।'
                )}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <Card className="glass-card">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-gold-500">500+</div>
                    <div className="text-sm text-muted-foreground">{t('Paintings Created', 'पेंटिंग्स बनाई गईं')}</div>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-gold-500">1000+</div>
                    <div className="text-sm text-muted-foreground">{t('Happy Collectors', 'खुश कलेक्टर')}</div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold">{t('Our Journey', 'हमारी यात्रा')}</h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />

            {journey.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 mb-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 text-center md:text-inherit">
                  <Card className={`glass-card inline-block ${index % 2 === 0 ? 'md:ml-auto md:mr-8' : 'md:mr-auto md:ml-8'}`}>
                    <CardContent className="p-6">
                      <Badge className="bg-gold-500 text-background mb-3">{item.year}</Badge>
                      <h3 className="font-semibold text-lg mb-2">{t(item.title_en, item.title_hi)}</h3>
                      <p className="text-sm text-muted-foreground">{t(item.description_en, item.description_hi)}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold-500 border-4 border-background" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold">{t('What We Stand For', 'हम किसके लिए खड़े हैं')}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title_en}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-xl bg-gold-500/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-7 w-7 text-gold-500" />
                    </div>
                    <h3 className="font-semibold mb-2">{t(value.title_en, value.title_hi)}</h3>
                    <p className="text-sm text-muted-foreground">{t(value.description_en, value.description_hi)}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-3xl font-bold mb-4">
              {t('Ready to Start Your Collection?', 'अपना संग्रह शुरू करने के लिए तैयार हैं?')}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t(
                'Browse our gallery and discover the perfect piece for your home.',
                'हमारी गैलरी ब्राउज़ करें और अपने घर के लिए सही टुकड़ा खोजें।'
              )}
            </p>
            <Button asChild size="lg" className="bg-gold-500 hover:bg-gold-600 text-background">
              <Link href="/gallery">
                {t('Explore Gallery', 'गैलरी एक्सप्लोर करें')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
