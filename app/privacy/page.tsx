'use client';

import { motion } from 'framer-motion';
import { useLocaleStore } from '@/store';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

const sections = [
  {
    title_en: '1. Information We Collect',
    title_hi: '1. हम क्या जानकारी एकत्र करते हैं',
    content_en: `When you create an account or place an order, we collect your name, email address, phone number, and shipping address. We also automatically collect usage data such as pages visited and device information to improve our service. Payment information is processed securely through Razorpay and is never stored on our servers.`,
    content_hi: `जब आप खाता बनाते हैं या ऑर्डर देते हैं, तो हम आपका नाम, ईमेल पता, फोन नंबर और शिपिंग पता एकत्र करते हैं। हम अपनी सेवा को बेहतर बनाने के लिए उपयोग डेटा जैसे विजिट किए गए पेज और डिवाइस जानकारी भी स्वचालित रूप से एकत्र करते हैं। भुगतान जानकारी Razorpay के माध्यम से सुरक्षित रूप से संसाधित की जाती है और हमारे सर्वर पर कभी संग्रहीत नहीं की जाती।`,
  },
  {
    title_en: '2. How We Use Your Information',
    title_hi: '2. हम आपकी जानकारी का उपयोग कैसे करते हैं',
    content_en: `We use your information to process and fulfill your orders, send order confirmations and shipping updates, respond to your inquiries, and improve our website and services. We may also send you promotional emails about new paintings and offers — you can unsubscribe at any time.`,
    content_hi: `हम आपकी जानकारी का उपयोग आपके ऑर्डर को संसाधित करने और पूरा करने, ऑर्डर पुष्टिकरण और शिपिंग अपडेट भेजने, आपकी पूछताछ का जवाब देने और हमारी वेबसाइट और सेवाओं को बेहतर बनाने के लिए करते हैं। हम नई पेंटिंग्स और ऑफ़र के बारे में प्रचारक ईमेल भी भेज सकते हैं — आप किसी भी समय अनसब्सक्राइब कर सकते हैं।`,
  },
  {
    title_en: '3. Data Sharing',
    title_hi: '3. डेटा साझाकरण',
    content_en: `We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers such as Razorpay (payment processing) and shipping partners solely to complete your order. These partners are bound by confidentiality agreements.`,
    content_hi: `हम आपकी व्यक्तिगत जानकारी को तृतीय पक्षों को नहीं बेचते, व्यापार करते या किराये पर देते हैं। हम आपके ऑर्डर को पूरा करने के लिए केवल Razorpay (भुगतान प्रसंस्करण) और शिपिंग भागीदारों जैसे विश्वसनीय सेवा प्रदाताओं के साथ आपकी जानकारी साझा कर सकते हैं। ये भागीदार गोपनीयता समझौतों से बंधे हैं।`,
  },
  {
    title_en: '4. Data Security',
    title_hi: '4. डेटा सुरक्षा',
    content_en: `We use Firebase (Google) for authentication and data storage, which provides industry-standard security. All data is transmitted over HTTPS. We regularly review our security practices to protect your information from unauthorized access, disclosure, or destruction.`,
    content_hi: `हम प्रमाणीकरण और डेटा स्टोरेज के लिए Firebase (Google) का उपयोग करते हैं, जो उद्योग-मानक सुरक्षा प्रदान करता है। सभी डेटा HTTPS पर प्रेषित किया जाता है। हम अनधिकृत पहुंच, प्रकटीकरण या विनाश से आपकी जानकारी की सुरक्षा के लिए नियमित रूप से अपनी सुरक्षा प्रथाओं की समीक्षा करते हैं।`,
  },
  {
    title_en: '5. Cookies',
    title_hi: '5. कुकीज़',
    content_en: `Our website uses cookies to maintain your session, remember your preferences (such as language and theme), and analyze site traffic. You can disable cookies in your browser settings, but some features of the site may not function properly.`,
    content_hi: `हमारी वेबसाइट आपके सत्र को बनाए रखने, आपकी प्राथमिकताओं (जैसे भाषा और थीम) को याद रखने और साइट ट्रैफिक का विश्लेषण करने के लिए कुकीज़ का उपयोग करती है। आप अपने ब्राउज़र सेटिंग में कुकीज़ अक्षम कर सकते हैं, लेकिन साइट की कुछ सुविधाएं ठीक से काम नहीं कर सकती हैं।`,
  },
  {
    title_en: '6. Your Rights',
    title_hi: '6. आपके अधिकार',
    content_en: `You have the right to access, correct, or delete your personal data. You can update your profile information from your dashboard. To request data deletion or a copy of your data, contact us at shivamtensor@gmail.com. We will respond within 30 days.`,
    content_hi: `आपके पास अपने व्यक्तिगत डेटा तक पहुंचने, सुधारने या हटाने का अधिकार है। आप अपने डैशबोर्ड से अपनी प्रोफ़ाइल जानकारी अपडेट कर सकते हैं। डेटा हटाने या अपने डेटा की एक प्रति का अनुरोध करने के लिए, shivamtensor@gmail.com पर हमसे संपर्क करें। हम 30 दिनों के भीतर जवाब देंगे।`,
  },
  {
    title_en: '7. Changes to This Policy',
    title_hi: '7. इस नीति में परिवर्तन',
    content_en: `We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the "Last Updated" date. Continued use of our website after changes constitutes acceptance of the new policy.`,
    content_hi: `हम समय-समय पर इस गोपनीयता नीति को अपडेट कर सकते हैं। हम इस पेज पर नई नीति पोस्ट करके और "अंतिम अपडेट" तिथि अपडेट करके आपको महत्वपूर्ण परिवर्तनों के बारे में सूचित करेंगे। परिवर्तनों के बाद हमारी वेबसाइट का निरंतर उपयोग नई नीति की स्वीकृति का गठन करता है।`,
  },
];

export default function PrivacyPage() {
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
              <Shield className="h-8 w-8 text-amber-500" />
            </div>
            <Badge className="mb-4 bg-amber-500/10 text-amber-600 border-amber-500/20">
              {t('Legal', 'कानूनी')}
            </Badge>
            <h1 className="font-display text-4xl lg:text-5xl font-bold">
              {t('Privacy Policy', 'गोपनीयता नीति')}
            </h1>
            <p className="text-muted-foreground mt-4">
              {t('Last updated: June 2026', 'अंतिम अपडेट: जून 2026')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6 mb-10"
          >
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t(
                'Indian Movies Art Gallery ("we", "our", "us") is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you visit our website or make a purchase.',
                'Indian Movies Art Gallery ("हम", "हमारा") आपकी गोपनीयता की रक्षा करने के लिए प्रतिबद्ध है। यह नीति बताती है कि जब आप हमारी वेबसाइट पर जाते हैं या खरीदारी करते हैं तो हम आपकी व्यक्तिगत जानकारी कैसे एकत्र, उपयोग और सुरक्षित करते हैं।'
              )}
            </p>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="border-b border-border pb-8 last:border-0"
              >
                <h2 className="font-display text-xl font-semibold mb-3">
                  {t(section.title_en, section.title_hi)}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {t(section.content_en, section.content_hi)}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              {t('Questions about our privacy practices?', 'हमारी गोपनीयता प्रथाओं के बारे में प्रश्न?')}{' '}
              <a href="mailto:shivamtensor@gmail.com" className="text-amber-500 hover:underline">
                shivamtensor@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
