'use client';

import { motion } from 'framer-motion';
import { useLocaleStore } from '@/store';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sun, Droplets, Wind, Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';

const careTips = [
  {
    icon: Sun,
    title_en: 'Sunlight & UV Protection',
    title_hi: 'धूप और UV सुरक्षा',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    tips_en: [
      'Avoid placing paintings in direct sunlight.',
      'Indirect natural light is ideal for display.',
      'UV-filtering glass or acrylic glazing helps preserve colors.',
      'Rotate paintings periodically to ensure even exposure.',
    ],
    tips_hi: [
      'पेंटिंग्स को सीधी धूप में न रखें।',
      'प्रदर्शन के लिए अप्रत्यक्ष प्राकृतिक प्रकाश आदर्श है।',
      'UV-फ़िल्टरिंग ग्लास या एक्रिलिक ग्लेज़िंग रंगों को संरक्षित करने में मदद करता है।',
      'समान एक्सपोज़र सुनिश्चित करने के लिए समय-समय पर पेंटिंग्स को घुमाएं।',
    ],
  },
  {
    icon: Droplets,
    title_en: 'Humidity & Moisture',
    title_hi: 'नमी और आर्द्रता',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    tips_en: [
      'Maintain indoor humidity between 40–60%.',
      'Avoid bathrooms and kitchens for display.',
      'Do not hang paintings on exterior walls susceptible to dampness.',
      'If canvas warps slightly, a mild temperature adjustment usually corrects it.',
    ],
    tips_hi: [
      'इनडोर आर्द्रता 40–60% के बीच बनाए रखें।',
      'प्रदर्शन के लिए बाथरूम और रसोई से बचें।',
      'नमी के लिए अतिसंवेदनशील बाहरी दीवारों पर पेंटिंग न लगाएं।',
      'यदि कैनवास थोड़ा मुड़ जाए, तो हल्का तापमान समायोजन आमतौर पर इसे ठीक करता है।',
    ],
  },
  {
    icon: Wind,
    title_en: 'Cleaning & Dusting',
    title_hi: 'सफाई और धूल हटाना',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    tips_en: [
      'Use a soft, dry brush or microfiber cloth for gentle dusting.',
      'Never use water, cleaning sprays, or chemical solvents directly on canvas.',
      'Dust lightly in the direction of brushstrokes.',
      'For stubborn grime, consult a professional art conservator.',
    ],
    tips_hi: [
      'हल्की धूल हटाने के लिए मुलायम, सूखे ब्रश या माइक्रोफाइबर कपड़े का उपयोग करें।',
      'कभी भी कैनवास पर सीधे पानी, सफाई स्प्रे या रासायनिक सॉल्वेंट का उपयोग न करें।',
      'ब्रशस्ट्रोक की दिशा में हल्के से धूल हटाएं।',
      'जिद्दी गंदगी के लिए, एक पेशेवर कला संरक्षक से परामर्श लें।',
    ],
  },
  {
    icon: Shield,
    title_en: 'Storage & Handling',
    title_hi: 'भंडारण और हैंडलिंग',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    tips_en: [
      'Always handle paintings with clean, dry hands.',
      'Hold paintings from the frame or stretcher bars, never touch the painted surface.',
      'Store unframed canvases vertically, wrapped in acid-free paper.',
      'Never stack canvases face-to-face without padding.',
    ],
    tips_hi: [
      'हमेशा साफ, सूखे हाथों से पेंटिंग्स को संभालें।',
      'फ्रेम या स्ट्रेचर बार से पेंटिंग्स को पकड़ें, चित्रित सतह को कभी न छुएं।',
      'बिना फ्रेम वाले कैनवास को एसिड-फ्री पेपर में लपेटकर लंबवत स्टोर करें।',
      'पैडिंग के बिना कैनवास को आमने-सामने कभी न रखें।',
    ],
  },
];

const doNots = [
  { en: 'Do not use glass cleaner or household sprays near the artwork.', hi: 'कलाकृति के पास ग्लास क्लीनर या घरेलू स्प्रे का उपयोग न करें।' },
  { en: 'Do not hang in rooms with constant temperature fluctuation.', hi: 'निरंतर तापमान उतार-चढ़ाव वाले कमरों में न लगाएं।' },
  { en: 'Do not place near vents, heaters, or air conditioners.', hi: 'वेंट, हीटर या एयर कंडीशनर के पास न रखें।' },
  { en: 'Do not use tape or adhesives directly on the canvas.', hi: 'कैनवास पर सीधे टेप या चिपकने वाले पदार्थ का उपयोग न करें।' },
];

export default function CarePage() {
  const { t } = useLocaleStore();

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 bg-gradient-to-b from-muted/50 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <Badge className="mb-4 bg-amber-500/10 text-amber-600 border-amber-500/20">
              {t('Preservation Guide', 'संरक्षण गाइड')}
            </Badge>
            <h1 className="font-display text-4xl lg:text-5xl font-bold">
              {t('Painting Care Guide', 'पेंटिंग देखभाल गाइड')}
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              {t(
                'Proper care ensures your paintings remain vibrant and beautiful for generations to come.',
                'उचित देखभाल सुनिश्चित करती है कि आपकी पेंटिंग्स आने वाली पीढ़ियों के लिए जीवंत और सुंदर बनी रहें।'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {careTips.map((tip, idx) => {
              const Icon = tip.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-xl ${tip.bg} flex items-center justify-center mb-4`}>
                        <Icon className={`h-6 w-6 ${tip.color}`} />
                      </div>
                      <h3 className="font-display text-xl font-semibold mb-4">
                        {t(tip.title_en, tip.title_hi)}
                      </h3>
                      <ul className="space-y-2">
                        {tip.tips_en.map((tipText, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                            <span>{t(tipText, tip.tips_hi[i])}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <h2 className="font-display text-2xl font-semibold">
                {t('Things to Avoid', 'इनसे बचें')}
              </h2>
            </div>
            <ul className="space-y-3">
              {doNots.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">✕</span>
                  <span>{t(item.en, item.hi)}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              {t('Questions about caring for your specific painting?', 'अपनी विशेष पेंटिंग की देखभाल के बारे में प्रश्न?')}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-medium transition-colors"
            >
              {t('Ask Our Experts', 'हमारे विशेषज्ञों से पूछें')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
