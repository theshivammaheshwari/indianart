import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { WishlistDrawer } from '@/components/wishlist/wishlist-drawer';
import { SearchModal } from '@/components/search/search-modal';
import { WhatsAppButton } from '@/components/ui/whatsapp-button';
import { ParticleBackground } from '@/components/effects/particle-background';
import { AuthProvider } from '@/components/providers/auth-provider';
import { CartSyncProvider } from '@/components/providers/cart-sync-provider';
import { GlobalErrorBoundary } from '@/components/providers/error-boundary';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Indian Canvas | Where Bollywood Meets the Soul of India',
  description: 'Discover exquisite handmade Indian paintings inspired by Bollywood cinema. Traditional Rajasthani art, spiritual masterpieces, and contemporary Indian paintings.',
  keywords: 'Indian paintings, Bollywood art, Rajasthani art, canvas paintings, handmade paintings, Indian art gallery, traditional art, spiritual paintings, movie posters',
  authors: [{ name: 'The Indian Canvas' }],
  creator: 'The Indian Canvas',
  openGraph: {
    title: 'The Indian Canvas',
    description: 'Where Bollywood Meets the Soul of India',
    url: 'https://indianart-one.vercel.app',
    siteName: 'The Indian Canvas',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Indian Canvas',
    description: 'Where Bollywood Meets the Soul of India',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          disableTransitionOnChange
        >
          <GlobalErrorBoundary>
            <AuthProvider>
              <CartSyncProvider>
                <ParticleBackground />
                <div className="relative z-10 flex min-h-screen flex-col">
                  <Navbar />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
                <CartDrawer />
                <WishlistDrawer />
                <SearchModal />
                <WhatsAppButton />
              </CartSyncProvider>
            </AuthProvider>
          </GlobalErrorBoundary>
          <Toaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
