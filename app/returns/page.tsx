'use client';

import { motion } from 'framer-motion';
import { useLocaleStore } from '@/store';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, CheckCircle2, XCircle, AlertCircle, Clock, Phone } from 'lucide-react';

const eligibleItems = [
  { en: 'Painting arrived damaged or broken', hi: 'पेंटिंग क्षतिग्रस्त या टूटी हुई मिली' },
  { en: 'Wrong painting received (different from order)', hi: 'गलत पेंटिंग मिली (ऑर्डर से अलग)' },
  { en: 'Significant color difference from product images', hi: 'उत्पाद छवियों से महत्वपूर्ण रंग अंतर' },
  { en: 'Missing parts (certificate, frame if ordered, etc.)', hi: 'गुम भाग (प्रमाण पत्र, फ्रेम यदि ऑर्डर किया था, आदि)' },
];

const notEligible = [
  { en: 'Change of mind or personal preference', hi: 'मन बदलना या व्यक्तिगत पसंद' },
  { en: 'Custom or commissioned paintings', hi: 'कस्टम या कमीशन पेंटिंग' },
  { en: 'Slight color variation due to monitor calibration', hi: 'मॉनिटर कैलिब्रेशन के कारण थोड़ा रंग अंतर' },
  { en: 'Damage caused after delivery', hi: 'डिलीवरी के बाद हुई क्षति' },
  { en: 'Items reported after 7 days of delivery', hi: '7 दिनों के बाद रिपोर्ट की गई वस्तुएं' },
];

const steps = [
  {
    step: '01',
    title_en: 'Report within 48 hours',
    title_hi: '48 घंटों के भीतर रिपोर्ट करें',
    desc_en: 'Contact us via WhatsApp or email with your order number and photos/video of the damage.',
    desc_hi: 'अपने ऑर्डर नंबर और क्षति की फोटो/वीडियो के साथ WhatsApp या ईमेल से हमसे संपर्क करें।',
  },
  {
    step: '02',
    title_en: 'We review your request',
    title_hi: 'हम आपके अनुरोध की समीक्षा करते हैं',
    desc_en: 'Our team reviews the evidence within 24 hours and approves the return if eligible.',
    desc_hi: 'हमारी टीम 24 घंटों के भीतर साक्ष्य की समीक्षा करती है और यदि योग्य हो तो रिटर्न को मंजूरी देती है।',
  },
  {
    step: '03',
    title_en: 'Ship the painting back',
    title_hi: 'पेंटिंग वापस भेजें',
    desc_en: 'Pack the painting in its original packaging and ship to our address. We will share return shipping label.',
    desc_hi: 'पेंटिंग को उसकी मूल पैकेजिंग में पैक करें और हमारे पते पर भेजें। हम रिटर्न शिपिंग लेबल साझा करेंगे।',
  },
  {
    step: '04',
    title_en: 'Refund processed',
    title_hi: 'रिफंड संसाधित',
    desc_en: 'Once received and verified, refund is credited within 5–7 business days to your original payment method.',
    desc_hi: 'प्राप्त और सत्यापित होने के बाद, रिफंड 5–7 कार्यदिवसों के भीतर आपके मूल भुगतान विधि में जमा किया जाता है।',
  },
];

export default function ReturnsPage() {
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
            <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
              <RefreshCw className="h-8 w-8 text-amber-500" />
            </div>
            <Badge className="mb-4 bg-amber-500/10 text-amber-600 border-amber-500/20">
              {t('Return Policy', 'रिटर्न नीति')}
            </Badge>
            <h1 className="font-display text-4xl lg:text-5xl font-bold">
              {t('Returns & Refunds', 'रिटर्न और रिफंड')}
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              {t(
                'We stand behind the quality of every painting. If something goes wrong, we make it right.',
                'हम हर पेंटिंग की गुणवत्ता के पीछे खड़े हैं। अगर कुछ गलत होता है, हम इसे ठीक करते हैं।'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* Policy window */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4 bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 mb-12"
          >
            <Clock className="h-8 w-8 text-amber-500 shrink-0" />
            <div>
              <p className="font-semibold text-lg">{t('7-Day Return Window', '7-दिन रिटर्न विंडो')}</p>
              <p className="text-sm text-muted-foreground">
                {t(
                  'Returns must be initiated within 7 days of delivery. Damage must be reported within 48 hours.',
                  'रिटर्न डिलीवरी के 7 दिनों के भीतर शुरू होना चाहिए। क्षति 48 घंटों के भीतर रिपोर्ट की जानी चाहिए।'
                )}
              </p>
            </div>
          </motion.div>

          {/* Eligible / Not Eligible */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-green-500/20 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <h3 className="font-semibold text-green-600">{t('Eligible for Return', 'रिटर्न के लिए योग्य')}</h3>
                  </div>
                  <ul className="space-y-3">
                    {eligibleItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                        {t(item.en, item.hi)}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-red-500/20 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <XCircle className="h-5 w-5 text-red-500" />
                    <h3 className="font-semibold text-red-600">{t('Not Eligible', 'योग्य नहीं')}</h3>
                  </div>
                  <ul className="space-y-3">
                    {notEligible.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                        {t(item.en, item.hi)}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Process Steps */}
          <h2 className="font-display text-2xl font-semibold mb-8">
            {t('Return Process', 'रिटर्न प्रक्रिया')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-5">
                    <span className="text-3xl font-display font-bold gold-text">{step.step}</span>
                    <h4 className="font-semibold mt-2 mb-1">{t(step.title_en, step.title_hi)}</h4>
                    <p className="text-sm text-muted-foreground">{t(step.desc_en, step.desc_hi)}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center bg-muted/50 rounded-2xl p-8"
          >
            <AlertCircle className="h-8 w-8 text-amber-500 mx-auto mb-3" />
            <h3 className="font-display text-xl font-semibold mb-2">
              {t('Need Help With a Return?', 'रिटर्न में मदद चाहिए?')}
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              {t("Our team responds within a few hours. Don't worry — we'll sort it out.", 'हमारी टीम कुछ घंटों में जवाब देती है। चिंता न करें — हम इसे सुलझा लेंगे।')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-medium transition-colors"
              >
                {t('Contact Support', 'सहायता से संपर्क करें')}
              </a>
              <a
                href="https://wa.me/919024244567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:bg-muted font-medium transition-colors"
              >
                <Phone className="h-4 w-4" />
                {t('WhatsApp Us', 'WhatsApp करें')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
