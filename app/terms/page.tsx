'use client';

import { motion } from 'framer-motion';
import { useLocaleStore } from '@/store';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

const sections = [
  {
    title_en: '1. Acceptance of Terms',
    title_hi: '1. शर्तों की स्वीकृति',
    content_en: `By accessing or purchasing from Indian Movies Art Gallery, you agree to be bound by these Terms and Conditions. If you do not agree to any part of these terms, please do not use our website or services.`,
    content_hi: `Indian Movies Art Gallery से एक्सेस करने या खरीदारी करने से, आप इन नियमों और शर्तों से बंधे होने से सहमत होते हैं। यदि आप इन शर्तों के किसी भी भाग से सहमत नहीं हैं, तो कृपया हमारी वेबसाइट या सेवाओं का उपयोग न करें।`,
  },
  {
    title_en: '2. Products & Orders',
    title_hi: '2. उत्पाद और ऑर्डर',
    content_en: `All paintings are original handmade artworks. Colors may vary slightly from screen displays due to monitor calibration and photography lighting. We reserve the right to refuse or cancel any order at our discretion, including cases of pricing errors. In such cases, a full refund will be issued.`,
    content_hi: `सभी पेंटिंग्स मूल हस्तनिर्मित कलाकृतियां हैं। मॉनिटर कैलिब्रेशन और फोटोग्राफी प्रकाश के कारण रंग स्क्रीन डिस्प्ले से थोड़े भिन्न हो सकते हैं। हम मूल्य निर्धारण त्रुटियों सहित अपने विवेक पर किसी भी ऑर्डर को अस्वीकार करने या रद्द करने का अधिकार सुरक्षित रखते हैं। ऐसे मामलों में, पूर्ण धनवापसी जारी की जाएगी।`,
  },
  {
    title_en: '3. Pricing & Payment',
    title_hi: '3. मूल्य निर्धारण और भुगतान',
    content_en: `All prices are listed in Indian Rupees (INR) and include applicable taxes. Shipping charges are calculated at checkout. Payment is processed securely through Razorpay. We accept UPI, credit/debit cards, and net banking. International orders may be subject to additional customs duties paid by the buyer.`,
    content_hi: `सभी कीमतें भारतीय रुपये (INR) में सूचीबद्ध हैं और लागू करों को शामिल करती हैं। शिपिंग शुल्क चेकआउट पर गणना किए जाते हैं। भुगतान Razorpay के माध्यम से सुरक्षित रूप से संसाधित किया जाता है। हम UPI, क्रेडिट/डेबिट कार्ड और नेट बैंकिंग स्वीकार करते हैं। अंतरराष्ट्रीय ऑर्डर खरीदार द्वारा भुगतान किए जाने वाले अतिरिक्त सीमा शुल्क के अधीन हो सकते हैं।`,
  },
  {
    title_en: '4. Shipping',
    title_hi: '4. शिपिंग',
    content_en: `We aim to dispatch orders within 2–3 business days. Delivery timelines are estimates and not guarantees. We are not responsible for delays caused by shipping carriers, natural events, or customs processes. Risk of loss passes to you upon delivery to the carrier.`,
    content_hi: `हम 2–3 कार्यदिवसों के भीतर ऑर्डर भेजने का लक्ष्य रखते हैं। डिलीवरी टाइमलाइन अनुमान हैं और गारंटी नहीं हैं। हम शिपिंग कैरियर, प्राकृतिक घटनाओं या सीमा शुल्क प्रक्रियाओं के कारण होने वाली देरी के लिए जिम्मेदार नहीं हैं। कैरियर को डिलीवरी पर नुकसान का जोखिम आपको हस्तांतरित हो जाता है।`,
  },
  {
    title_en: '5. Returns & Refunds',
    title_hi: '5. रिटर्न और रिफंड',
    content_en: `We accept returns within 7 days of delivery only for damaged or incorrect items. Items must be in original condition and packaging. Custom or commissioned paintings are non-refundable. To initiate a return, contact us with photos of the damage within 48 hours of delivery.`,
    content_hi: `हम केवल क्षतिग्रस्त या गलत वस्तुओं के लिए डिलीवरी के 7 दिनों के भीतर रिटर्न स्वीकार करते हैं। वस्तुएं मूल स्थिति और पैकेजिंग में होनी चाहिए। कस्टम या कमीशन पेंटिंग वापस नहीं की जा सकतीं। रिटर्न शुरू करने के लिए, डिलीवरी के 48 घंटों के भीतर नुकसान की तस्वीरों के साथ हमसे संपर्क करें।`,
  },
  {
    title_en: '6. Intellectual Property',
    title_hi: '6. बौद्धिक संपदा',
    content_en: `All images, artwork photographs, descriptions, and website content are the property of Indian Movies Art Gallery. Purchasing a painting grants you ownership of the physical artwork only — not reproduction rights. You may not reproduce, distribute, or create derivative works from our content without written permission.`,
    content_hi: `सभी छवियां, कलाकृति फोटोग्राफ, विवरण और वेबसाइट सामग्री Indian Movies Art Gallery की संपत्ति हैं। एक पेंटिंग खरीदने से आपको केवल भौतिक कलाकृति का स्वामित्व मिलता है — प्रजनन अधिकार नहीं। आप लिखित अनुमति के बिना हमारी सामग्री से पुनरुत्पादन, वितरण या व्युत्पन्न कार्य नहीं बना सकते।`,
  },
  {
    title_en: '7. Limitation of Liability',
    title_hi: '7. दायित्व की सीमा',
    content_en: `Indian Movies Art Gallery shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our maximum liability for any claim shall not exceed the purchase price of the item in question.`,
    content_hi: `Indian Movies Art Gallery हमारे उत्पादों या वेबसाइट के उपयोग से उत्पन्न किसी भी अप्रत्यक्ष, आकस्मिक या परिणामी क्षति के लिए उत्तरदायी नहीं होगी। किसी भी दावे के लिए हमारी अधिकतम देनदारी प्रश्न में वस्तु की खरीद मूल्य से अधिक नहीं होगी।`,
  },
  {
    title_en: '8. Governing Law',
    title_hi: '8. शासकीय कानून',
    content_en: `These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Jaipur, Rajasthan, India.`,
    content_hi: `ये शर्तें भारत के कानूनों द्वारा शासित हैं। किसी भी विवाद के लिए जयपुर, राजस्थान, भारत की अदालतों का विशेष क्षेत्राधिकार होगा।`,
  },
];

export default function TermsPage() {
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
              <FileText className="h-8 w-8 text-amber-500" />
            </div>
            <Badge className="mb-4 bg-amber-500/10 text-amber-600 border-amber-500/20">
              {t('Legal', 'कानूनी')}
            </Badge>
            <h1 className="font-display text-4xl lg:text-5xl font-bold">
              {t('Terms & Conditions', 'नियम और शर्तें')}
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
                'Please read these Terms and Conditions carefully before using our website. By using Indian Movies Art Gallery, you confirm that you are at least 18 years of age and accept these terms.',
                'हमारी वेबसाइट का उपयोग करने से पहले कृपया इन नियमों और शर्तों को ध्यान से पढ़ें। Indian Movies Art Gallery का उपयोग करके, आप पुष्टि करते हैं कि आपकी आयु कम से कम 18 वर्ष है और इन शर्तों को स्वीकार करते हैं।'
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
              {t('Questions about these terms?', 'इन शर्तों के बारे में प्रश्न?')}{' '}
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
