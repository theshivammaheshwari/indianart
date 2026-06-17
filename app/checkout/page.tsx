'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  CreditCard, Truck, ShoppingBag, ArrowRight, MapPin, Phone, Mail, User, Loader2, CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useCartStore, useAuthStore, useLocaleStore } from '@/store';
import { defaultSettings } from '@/types';
import { createOrder, updatePaymentStatus } from '@/lib/api/orders';
import { toast } from 'sonner';
import Image from 'next/image';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
  address: z.string().min(10, 'Complete address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().length(6, 'Valid 6-digit pincode is required'),
  notes: z.string().optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const { t } = useLocaleStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: user?.fullName || '',
      phone: user?.phone || '',
      email: user?.email || '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      notes: '',
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.fullName || '',
        phone: user.phone || '',
        email: user.email || '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        notes: '',
      });
    }
  }, [user, form]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login?redirect=/checkout');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const subtotal = getTotal();
  const shipping = subtotal >= defaultSettings.freeShippingThreshold ? 0 : defaultSettings.shippingCharge;
  const grandTotal = subtotal + shipping;

  if (items.length === 0 && !paymentSuccess) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">{t('Your cart is empty', 'आपका कार्ट खाली है')}</h2>
          <Button asChild>
            <Link href="/gallery">{t('Browse Gallery', 'गैलरी देखें')}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: CheckoutForm) => {
    if (!user) return;
    setIsProcessing(true);

    try {
      const order = await createOrder({
        userId: user.id,
        items,
        shippingAddress: data,
        totalAmount: subtotal,
        shippingCharge: shipping,
        grandTotal,
        notes: data.notes,
      });

      setOrderId(order.id);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_key',
        amount: grandTotal * 100,
        currency: 'INR',
        name: 'Maheshwari Art Gallery',
        description: 'Payment for paintings',
        order_id: undefined,
        handler: async function (response: any) {
          try {
            await updatePaymentStatus(
              order.id,
              response.razorpay_payment_id,
              response.razorpay_payment_id,
              response.razorpay_signature
            );
            setPaymentSuccess(true);
            clearCart();
            toast.success(t('Payment successful!', 'भुगतान सफल!'));
          } catch (error) {
            toast.error(t('Payment verification failed', 'भुगतान सत्यापन विफल'));
          }
        },
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: '#d4af37',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error(t('Failed to create order', 'ऑर्डर बनाने में विफल'));
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md p-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">{t('Order Confirmed!', 'ऑर्डर की पुष्टि!')}</h2>
          <p className="text-muted-foreground mb-6">
            {t(
              'Thank you for your order. We will ship your paintings soon.',
              'आपके ऑर्डर के लिए धन्यवाद। हम जल्द ही आपकी पेंटिंग्स शिप करेंगे।'
            )}
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link href="/dashboard">{t('View Orders', 'ऑर्डर देखें')}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/gallery">{t('Continue Shopping', 'खरीदारी जारी रखें')}</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl font-bold mb-8">{t('Checkout', 'चेकआउट')}</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-gold-500" />
                      {t('Shipping Address', 'शिपिंग पता')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('Full Name', 'पूरा नाम')}</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('Phone Number', 'फोन नंबर')}</FormLabel>
                            <FormControl>
                              <Input placeholder="+91 9876543210" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('Email', 'ईमेल')}</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('Full Address', 'पूरा पता')}</FormLabel>
                          <FormControl>
                            <Textarea placeholder="House No., Street, Area..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('City', 'शहर')}</FormLabel>
                            <FormControl>
                              <Input placeholder="Jaipur" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('State', 'राज्य')}</FormLabel>
                            <FormControl>
                              <Input placeholder="Rajasthan" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pincode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('PIN Code', 'पिन कोड')}</FormLabel>
                            <FormControl>
                              <Input placeholder="302001" maxLength={6} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('Order Notes (Optional)', 'ऑर्डर नोट्स (वैकल्पिक)')}</FormLabel>
                          <FormControl>
                            <Textarea placeholder={t('Any special instructions...', 'कोई विशेष निर्देश...')} {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-gold-500" />
                      {t('Payment Method', 'भुगतान विधि')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 rounded-lg border border-gold-500/30 bg-gold-500/5">
                      <p className="text-sm">
                        {t(
                          'Pay securely using Razorpay. All major cards, UPI, and wallets are supported.',
                          'Razorpay का उपयोग करके सुरक्षित रूप से भुगतान करें। सभी प्रमुख कार्ड, UPI और वॉलेट समर्थित हैं।'
                        )}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gold-500 hover:bg-gold-600 text-background py-6 text-lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {t('Processing...', 'प्रोसेसिंग...')}
                    </>
                  ) : (
                    <>
                      {t('Pay Rs.' + grandTotal.toLocaleString('en-IN'), '₹' + grandTotal.toLocaleString('en-IN') + ' का भुगतान करें')}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>

          <div className="lg:col-span-1">
            <Card className="glass-card sticky top-24">
              <CardHeader>
                <CardTitle>{t('Order Summary', 'ऑर्डर सारांश')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.painting.id} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={item.painting.images[0] || '/placeholder.jpg'}
                        alt={item.painting.title_en}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{item.painting.title_en}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-gold-500 mt-1">
                        Rs.{(item.painting.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('Subtotal', 'उप-योग')}</span>
                    <span>Rs.{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('Shipping', 'शिपिंग')}</span>
                    <span className={shipping === 0 ? 'text-green-500' : ''}>
                      {shipping === 0 ? t('Free', 'मुक्त') : `Rs.${shipping}`}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>{t('Total', 'कुल')}</span>
                    <span className="text-gold-500">Rs.{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
