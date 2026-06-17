'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useLocaleStore } from '@/store';
import { defaultSettings } from '@/types';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ContactPage() {
  const { t } = useLocaleStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    toast.success(t('Message sent successfully!', 'संदेश सफलतापूर्वक भेजा गया!'));
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="py-12 bg-gradient-to-b from-muted/50 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl lg:text-5xl font-bold">
              {t('Contact Us', 'संपर्क करें')}
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              {t(
                'Have questions? We would love to hear from you.',
                'कोई प्रश्न हैं? हम आपसे सुनना पसंद करेंगे।'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <Card className="glass-card">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-gold-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('Phone', 'फोन')}</h3>
                      <a href={`tel:${defaultSettings.phone}`} className="text-muted-foreground hover:text-gold-500 transition-colors">
                        {defaultSettings.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('WhatsApp', 'व्हाट्सएप')}</h3>
                      <a
                        href={`https://wa.me/${defaultSettings.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-green-500 transition-colors"
                      >
                        {defaultSettings.whatsapp}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('Email', 'ईमेल')}</h3>
                      <a href={`mailto:${defaultSettings.email}`} className="text-muted-foreground hover:text-blue-500 transition-colors">
                        {defaultSettings.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-velvet-500/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-velvet-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('Address', 'पता')}</h3>
                      <p className="text-muted-foreground">{defaultSettings.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('Business Hours', 'कार्य समय')}</h3>
                      <p className="text-muted-foreground">
                        {t('Mon - Sat: 10:00 AM - 7:00 PM', 'सोम - शनि: सुबह 10:00 - शाम 7:00')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <a
                  href={defaultSettings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full py-6">
                    <Instagram className="mr-2 h-5 w-5" />
                    Instagram
                  </Button>
                </a>
                <a
                  href={defaultSettings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full py-6">
                    <Facebook className="mr-2 h-5 w-5" />
                    Facebook
                  </Button>
                </a>
              </div>

              <Card className="glass-card overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d223445.83454879572!2d75.7512646!3d26.9157208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db40942c28f49%3A0x615e5c5f5e7b8b6e!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1635789012345!5m2!1sen!2sin"
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card">
                <CardContent className="p-8">
                  <h2 className="font-display text-2xl font-bold mb-6">
                    {t('Send us a Message', 'हमें एक संदेश भेजें')}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">{t('Name', 'नाम')}</label>
                        <Input placeholder={t('Your name', 'आपका नाम')} required />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">{t('Phone', 'फोन')}</label>
                        <Input placeholder="+91 9876543210" required />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">{t('Email', 'ईमेल')}</label>
                      <Input type="email" placeholder="email@example.com" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">{t('Subject', 'विषय')}</label>
                      <Input placeholder={t('How can we help?', 'हम कैसे मदद कर सकते हैं?')} required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">{t('Message', 'संदेश')}</label>
                      <Textarea
                        placeholder={t('Write your message here...', 'अपना संदेश यहां लिखें...')}
                        rows={5}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-gold-500 hover:bg-gold-600 text-background" disabled={isSubmitting}>
                      {isSubmitting ? (
                        '...'
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          {t('Send Message', 'संदेश भेजें')}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
