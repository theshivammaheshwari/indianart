'use client';

import { motion } from 'framer-motion';
import { useLocaleStore } from '@/store';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    category_en: 'Orders & Payment',
    category_hi: 'ऑर्डर और भुगतान',
    items: [
      {
        q_en: 'How do I place an order?',
        q_hi: 'मैं ऑर्डर कैसे दूं?',
        a_en: 'Browse our gallery, select a painting you love, add it to cart, and proceed to checkout. We accept all major UPI apps, credit/debit cards, and net banking via Razorpay.',
        a_hi: 'हमारी गैलरी ब्राउज़ करें, अपनी पसंदीदा पेंटिंग चुनें, कार्ट में जोड़ें और चेकआउट करें। हम Razorpay के माध्यम से UPI, क्रेडिट/डेबिट कार्ड और नेट बैंकिंग स्वीकार करते हैं।',
      },
      {
        q_en: 'Is online payment secure?',
        q_hi: 'क्या ऑनलाइन भुगतान सुरक्षित है?',
        a_en: 'Yes, all payments are processed through Razorpay, a PCI DSS compliant payment gateway. We never store your card details.',
        a_hi: 'हां, सभी भुगतान Razorpay के माध्यम से संसाधित होते हैं जो PCI DSS अनुपालक गेटवे है। हम आपके कार्ड की जानकारी कभी संग्रहीत नहीं करते।',
      },
      {
        q_en: 'Can I get a custom size or custom painting?',
        q_hi: 'क्या मुझे कस्टम साइज़ या कस्टम पेंटिंग मिल सकती है?',
        a_en: 'Absolutely! Contact us via WhatsApp or the Contact page with your requirements. Custom orders take 15–25 days and may have additional charges.',
        a_hi: 'बिल्कुल! अपनी आवश्यकताओं के साथ WhatsApp या संपर्क पेज के माध्यम से हमसे संपर्क करें। कस्टम ऑर्डर में 15–25 दिन लगते हैं और अतिरिक्त शुल्क हो सकते हैं।',
      },
    ],
  },
  {
    category_en: 'Shipping & Delivery',
    category_hi: 'शिपिंग और डिलीवरी',
    items: [
      {
        q_en: 'How long does delivery take?',
        q_hi: 'डिलीवरी में कितना समय लगता है?',
        a_en: 'Standard delivery within India takes 5–8 business days. Express delivery (2–3 days) is available for metro cities at an additional charge.',
        a_hi: 'भारत में मानक डिलीवरी 5–8 कार्यदिवस लेती है। मेट्रो शहरों के लिए अतिरिक्त शुल्क पर एक्सप्रेस डिलीवरी (2–3 दिन) उपलब्ध है।',
      },
      {
        q_en: 'Do you ship internationally?',
        q_hi: 'क्या आप अंतरराष्ट्रीय शिपिंग करते हैं?',
        a_en: 'Yes, we ship worldwide. International delivery takes 10–20 business days. Shipping charges and customs duties vary by country.',
        a_hi: 'हां, हम दुनिया भर में शिप करते हैं। अंतरराष्ट्रीय डिलीवरी में 10–20 कार्यदिवस लगते हैं। शिपिंग शुल्क और सीमा शुल्क देश के अनुसार भिन्न होते हैं।',
      },
      {
        q_en: 'How are paintings packed?',
        q_hi: 'पेंटिंग्स कैसे पैक की जाती हैं?',
        a_en: 'Each painting is wrapped in acid-free tissue paper, bubble wrap, and placed in a sturdy cardboard box with foam padding. We ensure zero damage during transit.',
        a_hi: 'प्रत्येक पेंटिंग एसिड-फ्री टिशू पेपर, बबल रैप में लपेटी जाती है और फोम पैडिंग के साथ मजबूत कार्डबोर्ड बॉक्स में रखी जाती है। हम पारगमन के दौरान शून्य क्षति सुनिश्चित करते हैं।',
      },
    ],
  },
  {
    category_en: 'Authenticity & Quality',
    category_hi: 'प्रामाणिकता और गुणवत्ता',
    items: [
      {
        q_en: 'Are the paintings original and handmade?',
        q_hi: 'क्या पेंटिंग्स मूल और हस्तनिर्मित हैं?',
        a_en: 'Yes, every painting in our gallery is 100% original and handmade by skilled Indian artists. Each comes with a Certificate of Authenticity.',
        a_hi: 'हां, हमारी गैलरी में हर पेंटिंग 100% मूल और कुशल भारतीय कलाकारों द्वारा हस्तनिर्मित है। प्रत्येक के साथ प्रामाणिकता का प्रमाण पत्र आता है।',
      },
      {
        q_en: 'What materials are used?',
        q_hi: 'कौन सी सामग्री उपयोग की जाती है?',
        a_en: 'We use premium quality stretched canvas, archival-grade acrylic and oil paints. All materials are UV-resistant and long-lasting.',
        a_hi: 'हम प्रीमियम क्वालिटी स्ट्रेच्ड कैनवास, आर्काइवल-ग्रेड एक्रिलिक और ऑयल पेंट का उपयोग करते हैं। सभी सामग्री UV-प्रतिरोधी और लंबे समय तक चलने वाली हैं।',
      },
      {
        q_en: 'Do paintings come framed?',
        q_hi: 'क्या पेंटिंग्स फ्रेम के साथ आती हैं?',
        a_en: 'Most paintings are shipped unframed (rolled in tube) or on stretcher bars. Framing options are available on request. Contact us for details.',
        a_hi: 'अधिकांश पेंटिंग्स बिना फ्रेम (ट्यूब में रोल) या स्ट्रेचर बार पर शिप की जाती हैं। अनुरोध पर फ्रेमिंग विकल्प उपलब्ध हैं। विवरण के लिए हमसे संपर्क करें।',
      },
    ],
  },
  {
    category_en: 'Returns & Refunds',
    category_hi: 'रिटर्न और रिफंड',
    items: [
      {
        q_en: 'What is your return policy?',
        q_hi: 'आपकी रिटर्न नीति क्या है?',
        a_en: 'We offer a 7-day return policy for damaged or incorrect items. The painting must be unused and in original packaging. Custom orders are non-returnable.',
        a_hi: 'हम क्षतिग्रस्त या गलत आइटम के लिए 7-दिन की रिटर्न नीति प्रदान करते हैं। पेंटिंग अप्रयुक्त और मूल पैकेजिंग में होनी चाहिए। कस्टम ऑर्डर वापस नहीं किए जा सकते।',
      },
      {
        q_en: 'How long does refund take?',
        q_hi: 'रिफंड में कितना समय लगता है?',
        a_en: 'Once the return is received and verified, refunds are processed within 5–7 business days to your original payment method.',
        a_hi: 'एक बार रिटर्न प्राप्त और सत्यापित होने के बाद, रिफंड 5–7 कार्यदिवसों के भीतर आपके मूल भुगतान विधि में संसाधित किया जाता है।',
      },
    ],
  },
];

export default function FAQPage() {
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
              <HelpCircle className="h-8 w-8 text-amber-500" />
            </div>
            <Badge className="mb-4 bg-amber-500/10 text-amber-600 border-amber-500/20">
              {t('Help Center', 'सहायता केंद्र')}
            </Badge>
            <h1 className="font-display text-4xl lg:text-5xl font-bold">
              {t('Frequently Asked Questions', 'अक्सर पूछे जाने वाले प्रश्न')}
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              {t(
                'Find answers to the most common questions about our paintings, shipping, and more.',
                'हमारी पेंटिंग्स, शिपिंग और अधिक के बारे में सबसे सामान्य प्रश्नों के उत्तर खोजें।'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {faqs.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIdx * 0.1 }}
              className="mb-10"
            >
              <h2 className="font-display text-xl font-semibold mb-4 gold-text">
                {t(category.category_en, category.category_hi)}
              </h2>
              <Accordion type="single" collapsible className="space-y-2">
                {category.items.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`${catIdx}-${idx}`}
                    className="border border-border rounded-xl px-4 bg-card"
                  >
                    <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
                      {t(item.q_en, item.q_hi)}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                      {t(item.a_en, item.a_hi)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center py-12 border-t border-border"
          >
            <p className="text-muted-foreground mb-4">
              {t("Still have questions? We're happy to help!", 'अभी भी प्रश्न हैं? हम मदद के लिए खुश हैं!')}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-medium transition-colors"
            >
              {t('Contact Us', 'हमसे संपर्क करें')}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
