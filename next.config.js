/** @type {import('next').NextConfig} */

const fs = require('fs');
const path = require('path');

// --- BEGIN PRICING MIGRATION SCRIPT ---
try {
  const paintingsJsonPath = path.join(__dirname, 'public', 'paintings', 'paintings.json');
  if (fs.existsSync(paintingsJsonPath)) {
    const data = JSON.parse(fs.readFileSync(paintingsJsonPath, 'utf8'));
    
    const priceUpdates = {
      "20220216_235701.jpg": 400000,
      "DSC_1692.JPG": 800000,
      "DSC_1694.JPG": 200000,
      "DSC_1696.JPG": 600000,
      "DSC_1698.JPG": 400000,
      "DSC_1700.JPG": 1200000,
      "DSC_1704.JPG": 700000,
      "DSC_1706.JPG": 2200000,
      "IMG-20210708-WA0014.jpg": 1500000,
      "IMG-20210811-WA0018.jpg": 20000,
      "IMG-20210811-WA0019.jpg": 20000,
      "IMG-20210811-WA0029.jpg": 20000,
      "IMG-20210811-WA0030.jpg": 20000,
      "IMG-20210903-WA0032.jpg": 20000,
      "IMG-20210903-WA0036.jpg": 20000,
      "IMG-20210903-WA0037.jpg": 20000,
      "IMG-20210903-WA0040.jpg": 20000,
      "IMG-20210903-WA0042.jpg": 20000,
      "IMG-20210903-WA0044.jpg": 20000,
      "IMG-20210903-WA0050.jpg": 20000,
      "IMG_20160813_221330.jpg": 1500000,
      "IMG_20180626_105115.jpg": 20000,
      "IMG_20180626_105337.jpg": 20000,
      "IMG_20180626_105424.jpg": 80000,
      "IMG_20180626_105505.jpg": 20000,
      "IMG_20180626_105524.jpg": 80000,
      "IMG_20180626_105658.jpg": 80000,
      "IMG_20180626_105716.jpg": 80000,
      "IMG_20180626_105915.jpg": 20000,
      "IMG_20180626_110009.jpg": 80000,
      "IMG_20180626_110157.jpg": 20000,
      "IMG_20180626_110242.jpg": 80000,
      "IMG_20180626_110659.jpg": 80000,
      "IMG_20180819_202057.jpg": 80000,
      "IMG_20180908_102623.jpg": 80000,
      "IMG_20250306_093101_084.jpg": 80000
    };

    const handbills = new Set([
      "indiancinemahandbillscan01.jpg",
      "indiancinemahandbillscan02.jpg",
      "indiancinemahandbillscan03.jpg",
      "indiancinemahandbillscan04.jpg",
      "indiancinemahandbillscan05.jpg",
      "indiancinemahandbillscan06.jpg",
      "indiancinemahandbillscan07.jpg",
      "indiancinemahandbillscan08.jpg",
      "indiancinemahandbillscan09.jpg",
      "indiancinemahandbillscan10.jpg",
      "indiancinemahandbillscan100.jpg",
      "indiancinemahandbillscan101.jpg",
      "indiancinemahandbillscan102.jpg",
      "indiancinemahandbillscan103.jpg",
      "indiancinemahandbillscan104.jpg",
      "indiancinemahandbillscan105.jpg",
      "indiancinemahandbillscan106.jpg",
      "indiancinemahandbillscan107.jpg",
      "indiancinemahandbillscan108.jpg",
      "indiancinemahandbillscan109.jpg",
      "indiancinemahandbillscan11.jpg",
      "indiancinemahandbillscan110.jpg",
      "indiancinemahandbillscan111.jpg",
      "indiancinemahandbillscan112.jpg",
      "indiancinemahandbillscan113.jpg",
      "indiancinemahandbillscan114.jpg",
      "indiancinemahandbillscan115.jpg",
      "indiancinemahandbillscan116.jpg",
      "indiancinemahandbillscan117.jpg",
      "indiancinemahandbillscan118.jpg",
      "indiancinemahandbillscan119.jpg",
      "indiancinemahandbillscan12.jpg",
      "indiancinemahandbillscan120.jpg",
      "indiancinemahandbillscan121.jpg",
      "indiancinemahandbillscan122.jpg",
      "indiancinemahandbillscan123.jpg",
      "indiancinemahandbillscan124.jpg",
      "indiancinemahandbillscan125.jpg",
      "indiancinemahandbillscan126.jpg",
      "indiancinemahandbillscan127.jpg",
      "indiancinemahandbillscan128.jpg",
      "indiancinemahandbillscan129.jpg",
      "indiancinemahandbillscan13.jpg",
      "indiancinemahandbillscan130.jpg",
      "indiancinemahandbillscan131.jpg",
      "indiancinemahandbillscan132.jpg",
      "indiancinemahandbillscan133.jpg",
      "indiancinemahandbillscan134.jpg",
      "indiancinemahandbillscan135.jpg",
      "indiancinemahandbillscan136.jpg",
      "indiancinemahandbillscan137.jpg",
      "indiancinemahandbillscan138.jpg",
      "indiancinemahandbillscan139.jpg",
      "indiancinemahandbillscan14.jpg",
      "indiancinemahandbillscan140.jpg",
      "indiancinemahandbillscan141.jpg",
      "indiancinemahandbillscan142.jpg",
      "indiancinemahandbillscan143.jpg",
      "indiancinemahandbillscan144.jpg",
      "indiancinemahandbillscan145.jpg",
      "indiancinemahandbillscan146.jpg",
      "indiancinemahandbillscan147.jpg",
      "indiancinemahandbillscan148.jpg",
      "indiancinemahandbillscan149.jpg",
      "indiancinemahandbillscan15.jpg",
      "indiancinemahandbillscan150.jpg",
      "indiancinemahandbillscan151.jpg",
      "indiancinemahandbillscan152.jpg",
      "indiancinemahandbillscan153.jpg",
      "indiancinemahandbillscan154.jpg",
      "indiancinemahandbillscan155.jpg",
      "indiancinemahandbillscan156.jpg",
      "indiancinemahandbillscan157.jpg",
      "indiancinemahandbillscan158.jpg",
      "indiancinemahandbillscan159.jpg",
      "indiancinemahandbillscan16.jpg",
      "indiancinemahandbillscan160.jpg",
      "indiancinemahandbillscan161.jpg",
      "indiancinemahandbillscan162.jpg",
      "indiancinemahandbillscan163.jpg",
      "indiancinemahandbillscan164.jpg",
      "indiancinemahandbillscan165.jpg",
      "indiancinemahandbillscan166.jpg",
      "indiancinemahandbillscan167.jpg",
      "indiancinemahandbillscan168.jpg",
      "indiancinemahandbillscan169.jpg",
      "indiancinemahandbillscan17.jpg",
      "indiancinemahandbillscan170.jpg",
      "indiancinemahandbillscan171.jpg",
      "indiancinemahandbillscan172.jpg",
      "indiancinemahandbillscan173.jpg",
      "indiancinemahandbillscan174.jpg",
      "indiancinemahandbillscan175.jpg",
      "indiancinemahandbillscan176.jpg",
      "indiancinemahandbillscan177.jpg",
      "indiancinemahandbillscan178.jpg",
      "indiancinemahandbillscan179.jpg",
      "indiancinemahandbillscan18.jpg",
      "indiancinemahandbillscan180.jpg",
      "indiancinemahandbillscan181.jpg",
      "indiancinemahandbillscan182.jpg",
      "indiancinemahandbillscan183.jpg",
      "indiancinemahandbillscan184.jpg",
      "indiancinemahandbillscan185.jpg",
      "indiancinemahandbillscan186.jpg",
      "indiancinemahandbillscan187.jpg",
      "indiancinemahandbillscan188.jpg",
      "indiancinemahandbillscan189.jpg",
      "indiancinemahandbillscan19.jpg",
      "indiancinemahandbillscan190.jpg",
      "indiancinemahandbillscan191.jpg",
      "indiancinemahandbillscan192.jpg",
      "indiancinemahandbillscan193.jpg",
      "indiancinemahandbillscan194.jpg",
      "indiancinemahandbillscan195.jpg",
      "indiancinemahandbillscan196.jpg",
      "indiancinemahandbillscan197.jpg",
      "indiancinemahandbillscan198.jpg",
      "indiancinemahandbillscan199.jpg",
      "indiancinemahandbillscan20.jpg",
      "indiancinemahandbillscan200.jpg",
      "indiancinemahandbillscan201.jpg",
      "indiancinemahandbillscan202.jpg",
      "indiancinemahandbillscan203.jpg",
      "indiancinemahandbillscan204.jpg",
      "indiancinemahandbillscan205.jpg",
      "indiancinemahandbillscan206.jpg",
      "indiancinemahandbillscan207.jpg",
      "indiancinemahandbillscan208.jpg",
      "indiancinemahandbillscan209.jpg",
      "indiancinemahandbillscan21.jpg",
      "indiancinemahandbillscan210.jpg",
      "indiancinemahandbillscan211.jpg",
      "indiancinemahandbillscan212.jpg",
      "indiancinemahandbillscan213.jpg",
      "indiancinemahandbillscan214.jpg",
      "indiancinemahandbillscan215.jpg",
      "indiancinemahandbillscan216.jpg",
      "indiancinemahandbillscan217.jpg",
      "indiancinemahandbillscan218.jpg",
      "indiancinemahandbillscan219.jpg",
      "indiancinemahandbillscan22.jpg",
      "indiancinemahandbillscan220.jpg",
      "indiancinemahandbillscan221.jpg",
      "indiancinemahandbillscan222.jpg",
      "indiancinemahandbillscan223.jpg",
      "indiancinemahandbillscan224.jpg",
      "indiancinemahandbillscan225.jpg",
      "indiancinemahandbillscan226.jpg",
      "indiancinemahandbillscan227.jpg",
      "indiancinemahandbillscan228.jpg",
      "indiancinemahandbillscan229.jpg",
      "indiancinemahandbillscan23.jpg",
      "indiancinemahandbillscan230.jpg",
      "indiancinemahandbillscan231.jpg",
      "indiancinemahandbillscan232.jpg",
      "indiancinemahandbillscan233.jpg",
      "indiancinemahandbillscan234.jpg",
      "indiancinemahandbillscan235.jpg",
      "indiancinemahandbillscan236.jpg",
      "indiancinemahandbillscan237.jpg",
      "indiancinemahandbillscan238.jpg",
      "indiancinemahandbillscan239.jpg",
      "indiancinemahandbillscan24.jpg",
      "indiancinemahandbillscan240.jpg",
      "indiancinemahandbillscan241.jpg",
      "indiancinemahandbillscan242.jpg",
      "indiancinemahandbillscan243.jpg",
      "indiancinemahandbillscan244.jpg",
      "indiancinemahandbillscan245.jpg",
      "indiancinemahandbillscan246.jpg",
      "indiancinemahandbillscan25.jpg",
      "indiancinemahandbillscan26.jpg",
      "indiancinemahandbillscan27.jpg",
      "indiancinemahandbillscan28.jpg",
      "indiancinemahandbillscan29.jpg",
      "indiancinemahandbillscan30.jpg",
      "indiancinemahandbillscan31.jpg",
      "indiancinemahandbillscan32.jpg",
      "indiancinemahandbillscan33.jpg",
      "indiancinemahandbillscan34.jpg",
      "indiancinemahandbillscan35.jpg",
      "indiancinemahandbillscan36.jpg",
      "indiancinemahandbillscan37.jpg",
      "indiancinemahandbillscan38.jpg",
      "indiancinemahandbillscan39.jpg",
      "indiancinemahandbillscan40.jpg",
      "indiancinemahandbillscan41.jpg",
      "indiancinemahandbillscan42.jpg",
      "indiancinemahandbillscan43.jpg",
      "indiancinemahandbillscan44.jpg",
      "indiancinemahandbillscan45.jpg",
      "indiancinemahandbillscan46.jpg",
      "indiancinemahandbillscan47.jpg",
      "indiancinemahandbillscan48.jpg",
      "indiancinemahandbillscan49.jpg",
      "indiancinemahandbillscan50.jpg",
      "indiancinemahandbillscan51.jpg",
      "indiancinemahandbillscan52.jpg",
      "indiancinemahandbillscan53.jpg",
      "indiancinemahandbillscan54.jpg",
      "indiancinemahandbillscan55.jpg",
      "indiancinemahandbillscan56.jpg",
      "indiancinemahandbillscan57.jpg",
      "indiancinemahandbillscan58.jpg",
      "indiancinemahandbillscan59.jpg",
      "indiancinemahandbillscan60.jpg",
      "indiancinemahandbillscan61.jpg",
      "indiancinemahandbillscan62.jpg",
      "indiancinemahandbillscan63.jpg",
      "indiancinemahandbillscan64.jpg",
      "indiancinemahandbillscan65.jpg",
      "indiancinemahandbillscan66.jpg",
      "indiancinemahandbillscan67.jpg"
    ]);

    let updatedCount = 0;
    const updatedData = data.map(item => {
      if (item.images && item.images.length > 0) {
        const imgPath = item.images[0];
        const filename = path.basename(imgPath);
        
        let newPrice = null;
        if (priceUpdates[filename] !== undefined) {
          newPrice = priceUpdates[filename];
        } else if (handbills.has(filename)) {
          newPrice = 30000;
        }

        if (newPrice !== null && item.price !== newPrice) {
          item.price = newPrice;
          item.originalPrice = Math.round(newPrice * 1.25);
          updatedCount++;
        }
      }
      return item;
    });

    if (updatedCount > 0) {
      fs.writeFileSync(paintingsJsonPath, JSON.stringify(updatedData, null, 4), 'utf8');
      console.log(`[MIGRATION SUCCESS] Updated prices for ${updatedCount} items in paintings.json!`);
    } else {
      console.log(`[MIGRATION] No pricing updates were needed.`);
    }
  }
} catch (err) {
  console.error('[MIGRATION ERROR] Failed to update paintings.json prices:', err);
}
// --- END PRICING MIGRATION SCRIPT ---

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
