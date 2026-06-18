/** @type {import('next').NextConfig} */

const fs = require('fs');
const path = require('path');

const sourcePath = 'C:\\Users\\Shivam Maheshwari\\.gemini\\antigravity-ide\\brain\\e066171d-5ef3-4f38-8c9f-d81758784325\\media__1781783955788.png';
const destPath = path.join(__dirname, 'public', 'brij-mohan-gupta.png');

try {
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log('Successfully copied Brij Mohan Gupta portrait image to public directory!');
  } else {
    console.warn('Brij Mohan Gupta portrait source image not found at:', sourcePath);
  }
} catch (e) {
  console.error('Failed to copy Brij Mohan Gupta portrait image:', e);
}

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
