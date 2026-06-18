'use client';

import { motion } from 'framer-motion';
import { useLocaleStore } from '@/store';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, Clock, MapPin, Package, Globe, CheckCircle2 } from 'lucide-react';

const shippingZones = [
  {
    zone_en: 'Metro Cities',
    zone_hi: 'मेट्रो शहर',
    cities_en: 'Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad',
    cities_hi: 'दिल्ली, मुंबई, बेंगलुरु, चेन्नई, कोलकाता, हैदराबाद',
    standard_en: '3–5 business days',
    standard_hi: '3–5 कार्यदिवस',
    express_en: '1–2 business days',
    express_hi: '1–2 कार्यदिवस',
    charge_en: '₹99 (Free above ₹2,000)',
    charge_hi: '₹99 (₹2,000 से ऊपर मुफ्त)',
  },
  {
    zone_en: 'Tier 2 & 3 Cities',
    zone_hi: 'टियर 2 और 3 शहर',
    cities_en: 'Jaipur, Pune, Ahmedabad, Lucknow, Indore & more',
    cities_hi: 'जयपुर, पुणे, अहमदाबाद, लखनऊ, इंदौर और अन्य',
    standard_en: '5–8 business days',
    standard_hi: '5–8 कार्यदिवस',
    express_en: '2–4 business days',
    express_hi: '2–4 कार्यदिवस',
    charge_en: '₹149 (Free above ₹3,000)',
    charge_hi: '₹149 (₹3,000 से ऊपर मुफ्त)',
  },
  {
    zone_en: 'Remote & Rural Areas',
    zone_hi: 'दूरदराज और ग्रामीण क्षेत्र',
    cities_en: 'All other pin codes across India',
    cities_hi: 'भारत भर के अन्य सभी पिन कोड',
    standard_en: '7–12 business days',
    standard_hi: '7–12 कार्यदिवस',
    express_en: 'Not available',
    express_hi: 'उपलब्ध नहीं',
    charge_en: '₹199',
    charge_hi: '₹199',
  },
];

const packagingSteps = [
  { en: 'Painting wrapped in acid-free tissue paper', hi: 'पेंटिंग एसिड-फ्री टिशू पेपर में लपेटी गई' },
  { en: 'Double-layered bubble wrap protection', hi: 'डबल-लेयर बबल रैप सुरक्षा' },
  { en: 'Rigid foam padding on all corners', hi: 'सभी कोनों पर कठोर फोम पैडिंग' },
  { en: 'Sturdy double-walled cardboard box', hi: 'मजबूत डबल-वॉल्ड कार्डबोर्ड बॉक्स' },
  { en: '"Fragile – Handle with Care" label', hi: '"नाज़ुक – सावधानी से संभालें" लेबल' },
];

export default function ShippingPage() {
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
              <Truck className="h-8 w-8 text-amber-500" />
            </div>
            <Badge className="mb-4 bg-amber-500/10 text-amber-600 border-amber-500/20">
              {t('Delivery', 'डिलीवरी')}
            </Badge>
            <h1 className="font-display text-4xl lg:text-5xl font-bold">
              {t('Shipping Information', 'शिपिंग जानकारी')}
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              {t(
                'We ensure every painting reaches you safely, anywhere in India or the world.',
                'हम सुनिश्चित करते हैं कि हर पेंटिंग भारत या दुनिया में कहीं भी आप तक सुरक्षित पहुंचे।'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* Key Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
            {[
              { icon: Clock, label_en: 'Dispatch Time', label_hi: 'डिस्पैच समय', value_en: '2–3 Business Days', value_hi: '2–3 कार्यदिवस' },
              { icon: Package, label_en: 'Secure Packaging', label_hi: 'सुरक्षित पैकेजिंग', value_en: 'Zero Damage Guaranteed', value_hi: 'शून्य क्षति गारंटीड' },
              { icon: MapPin, label_en: 'Coverage', label_hi: 'कवरेज', value_en: 'Pan India + International', value_hi: 'पूरे भारत + अंतरराष्ट्रीय' },
            ].map(({ icon: Icon, label_en, label_hi, value_en, value_hi }, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                      <Icon className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{t(label_en, label_hi)}</p>
                      <p className="font-semibold">{t(value_en, value_hi)}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Shipping Zones */}
          <h2 className="font-display text-2xl font-semibold mb-6">
            {t('Delivery Timeline & Charges', 'डिलीवरी समयसीमा और शुल्क')}
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border mb-14">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-4 font-semibold">{t('Zone', 'क्षेत्र')}</th>
                  <th className="text-left p-4 font-semibold">{t('Standard', 'मानक')}</th>
                  <th className="text-left p-4 font-semibold">{t('Express', 'एक्सप्रेस')}</th>
                  <th className="text-left p-4 font-semibold">{t('Charge', 'शुल्क')}</th>
                </tr>
              </thead>
              <tbody>
                {shippingZones.map((zone, idx) => (
                  <tr key={idx} className="border-t border-border">
                    <td className="p-4">
                      <p className="font-medium">{t(zone.zone_en, zone.zone_hi)}</p>
                      <p className="text-muted-foreground text-xs mt-0.5">{t(zone.cities_en, zone.cities_hi)}</p>
                    </td>
                    <td className="p-4 text-muted-foreground">{t(zone.standard_en, zone.standard_hi)}</td>
                    <td className="p-4 text-muted-foreground">{t(zone.express_en, zone.express_hi)}</td>
                    <td className="p-4 font-medium text-amber-600">{t(zone.charge_en, zone.charge_hi)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Packaging */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            <div>
              <h2 className="font-display text-2xl font-semibold mb-6">
                {t('How We Pack', 'हम कैसे पैक करते हैं')}
              </h2>
              <ul className="space-y-3">
                {packagingSteps.map((step, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    {t(step.en, step.hi)}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold mb-6">
                {t('International Shipping', 'अंतरराष्ट्रीय शिपिंग')}
              </h2>
              <div className="flex items-start gap-3 mb-4">
                <Globe className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(
                    'We ship to 50+ countries worldwide. International delivery takes 10–20 business days. Shipping charges are calculated at checkout based on destination and painting size. Import duties and taxes are the buyer\'s responsibility.',
                    'हम दुनिया भर के 50+ देशों में शिप करते हैं। अंतरराष्ट्रीय डिलीवरी में 10–20 कार्यदिवस लगते हैं। शिपिंग शुल्क गंतव्य और पेंटिंग आकार के आधार पर चेकआउट पर गणना की जाती है। आयात शुल्क और कर खरीदार की जिम्मेदारी है।'
                  )}
                </p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-sm text-amber-500 hover:underline"
              >
                {t('Contact us for international shipping quote →', 'अंतरराष्ट्रीय शिपिंग कोट के लिए संपर्क करें →')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
