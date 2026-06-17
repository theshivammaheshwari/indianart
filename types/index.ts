export type Locale = 'en' | 'hi';

export interface Painting {
  id: number;
  slug: string;
  title_en: string;
  title_hi: string;
  description_en: string;
  description_hi: string;
  category: string;
  category_hi: string;
  price: number;
  originalPrice?: number;
  stock: number;
  size: string;
  medium: string;
  artist: string;
  weight: string;
  tags: string[];
  featured: boolean;
  trending: boolean;
  images: string[];
  createdAt: string;
  rating?: number;
  reviewCount?: number;
}

export interface CartItem {
  painting: Painting;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  fullName?: string;
  phone?: string;
  role: 'customer' | 'admin';
  avatarUrl?: string;
}

export interface Address {
  id: string;
  userId: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentId?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  totalAmount: number;
  shippingCharge: number;
  grandTotal: number;
  shippingAddress: Address;
  items: OrderItem[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  paintingId: number;
  paintingSlug: string;
  paintingTitleEn: string;
  paintingTitleHi: string;
  price: number;
  quantity: number;
}

export interface Review {
  id: string;
  userId: string;
  paintingId: number;
  rating: number;
  comment?: string;
  user?: {
    fullName?: string;
    avatarUrl?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface WishlistItem {
  id: string;
  paintingId: number;
  painting: Painting;
  createdAt: string;
}

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  size: string;
  inStock: boolean | null;
  search: string;
}

export interface Category {
  name_en: string;
  name_hi: string;
  count: number;
}

export interface SiteSettings {
  siteName: string;
  tagline_en: string;
  tagline_hi: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
  freeShippingThreshold: number;
  shippingCharge: number;
}

export const defaultSettings: SiteSettings = {
  siteName: 'Indian Movies Art Gallery',
  tagline_en: 'Where Bollywood Meets the Soul of India',
  tagline_hi: 'जहां बॉलीवुड भारत की आत्मा से मिलता है',
  phone: '+91 9468955596',
  whatsapp: '+91 9468955596',
  email: 'shivamtensor@gmail.com',
  address: 'Jaipur, Rajasthan, India',
  instagram: 'https://instagram.com/indianmoviesart',
  facebook: 'https://facebook.com/indianmoviesart',
  freeShippingThreshold: 5000,
  shippingCharge: 200,
};
