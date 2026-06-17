/** @type {import('next').NextConfig} */

// Provide placeholder Firebase config during build when env vars aren't set.
// Real values must be set in .env.local (dev) or Vercel dashboard (production).
if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY = 'build-placeholder';
  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = 'placeholder.firebaseapp.com';
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'placeholder-project';
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = 'placeholder-project.appspot.com';
  process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = '000000000000';
  process.env.NEXT_PUBLIC_FIREBASE_APP_ID = '1:000000000000:web:build-placeholder-app';
}

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
