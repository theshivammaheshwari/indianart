/** @type {import('next').NextConfig} */

const fs = require('fs');
const path = require('path');

// --- BEGIN PRICING & STOCK MIGRATION SCRIPT ---
try {
  const paintingsJsonPath = path.join(__dirname, 'public', 'paintings', 'paintings.json');
  if (fs.existsSync(paintingsJsonPath)) {
    const data = JSON.parse(fs.readFileSync(paintingsJsonPath, 'utf8'));

    // Price updates: filename → new price in INR
    // Crore = 10,000,000 | Lakh = 100,000
    const priceUpdates = {
      "20220216_235701.jpg":     600000,    // 6 Lakh
      "DSC_1692.JPG":            5200000,   // 52 Lakh
      "DSC_1694.JPG":            1200000,   // 12 Lakh (also Sold)
      "DSC_1696.JPG":            80000000,  // 8 Crore
      "DSC_1698.JPG":            80000000,  // 8 Crore
      "DSC_1700.JPG":            110000000, // 11 Crore
      "DSC_1704.JPG":            60000000,  // 6 Crore
      "DSC_1706.JPG":            210000000, // 21 Crore
      // IMG-20210708-WA0014.jpg → Sold only, no price change
      "IMG-20210811-WA0018.jpg": 1100000,   // 11 Lakh
      "IMG-20210811-WA0019.jpg": 1100000,   // 11 Lakh
      "IMG-20210811-WA0029.jpg": 600000,    // 6 Lakh
      "IMG-20210811-WA0030.jpg": 600000,    // 6 Lakh
      "IMG-20210903-WA0032.jpg": 200000,    // 2 Lakh
      "IMG-20210903-WA0037.jpg": 600000,    // 6 Lakh
      "IMG-20210903-WA0040.jpg": 100000,    // 1 Lakh
      "IMG-20210903-WA0042.jpg": 600000,    // 6 Lakh
      "IMG-20210903-WA0044.jpg": 600000,    // 6 Lakh
      "IMG-20210903-WA0050.jpg": 300000,    // 3 Lakh
      "IMG_20160813_221330.jpg": 120000000, // 12 Crore
      // IMG_20180626_10xxxx.jpg → Sold only, no price change
      "IMG_20180626_110157.jpg": 200000,    // 2 Lakh
      "IMG_20180626_110242.jpg": 200000,    // 2 Lakh
      "IMG_20180626_110659.jpg": 200000,    // 2 Lakh
      "IMG_20180819_202057.jpg": 600000,    // 6 Lakh
      "IMG_20180908_102623.jpg": 600000,    // 6 Lakh
      "IMG_20250306_093101_084.jpg": 300000, // 3 Lakh
    };

    // Items to mark as Sold Out (stock = 0)
    const soldOut = new Set([
      "DSC_1694.JPG",
      "IMG-20210708-WA0014.jpg",
      "IMG_20180626_105115.jpg",
      "IMG_20180626_105337.jpg",
      "IMG_20180626_105424.jpg",
      "IMG_20180626_105505.jpg",
      "IMG_20180626_105524.jpg",
      "IMG_20180626_105658.jpg",
      "IMG_20180626_105716.jpg",
      "IMG_20180626_105915.jpg",
      "IMG_20180626_110009.jpg",
    ]);

    // All handbill scans → price = 100000 (1 Lakh) and stock = 0 (Sold Out)
    const handbills = new Set([
      "indiancinemahandbillscan01.jpg","indiancinemahandbillscan02.jpg","indiancinemahandbillscan03.jpg",
      "indiancinemahandbillscan04.jpg","indiancinemahandbillscan05.jpg","indiancinemahandbillscan06.jpg",
      "indiancinemahandbillscan07.jpg","indiancinemahandbillscan08.jpg","indiancinemahandbillscan09.jpg",
      "indiancinemahandbillscan10.jpg","indiancinemahandbillscan11.jpg","indiancinemahandbillscan12.jpg",
      "indiancinemahandbillscan13.jpg","indiancinemahandbillscan14.jpg","indiancinemahandbillscan15.jpg",
      "indiancinemahandbillscan16.jpg","indiancinemahandbillscan17.jpg","indiancinemahandbillscan18.jpg",
      "indiancinemahandbillscan19.jpg","indiancinemahandbillscan20.jpg","indiancinemahandbillscan21.jpg",
      "indiancinemahandbillscan22.jpg","indiancinemahandbillscan23.jpg","indiancinemahandbillscan24.jpg",
      "indiancinemahandbillscan25.jpg","indiancinemahandbillscan26.jpg","indiancinemahandbillscan27.jpg",
      "indiancinemahandbillscan28.jpg","indiancinemahandbillscan29.jpg","indiancinemahandbillscan30.jpg",
      "indiancinemahandbillscan31.jpg","indiancinemahandbillscan32.jpg","indiancinemahandbillscan33.jpg",
      "indiancinemahandbillscan34.jpg","indiancinemahandbillscan35.jpg","indiancinemahandbillscan36.jpg",
      "indiancinemahandbillscan37.jpg","indiancinemahandbillscan38.jpg","indiancinemahandbillscan39.jpg",
      "indiancinemahandbillscan40.jpg","indiancinemahandbillscan41.jpg","indiancinemahandbillscan42.jpg",
      "indiancinemahandbillscan43.jpg","indiancinemahandbillscan44.jpg","indiancinemahandbillscan45.jpg",
      "indiancinemahandbillscan46.jpg","indiancinemahandbillscan47.jpg","indiancinemahandbillscan48.jpg",
      "indiancinemahandbillscan49.jpg","indiancinemahandbillscan50.jpg","indiancinemahandbillscan51.jpg",
      "indiancinemahandbillscan52.jpg","indiancinemahandbillscan53.jpg","indiancinemahandbillscan54.jpg",
      "indiancinemahandbillscan55.jpg","indiancinemahandbillscan56.jpg","indiancinemahandbillscan57.jpg",
      "indiancinemahandbillscan58.jpg","indiancinemahandbillscan59.jpg","indiancinemahandbillscan60.jpg",
      "indiancinemahandbillscan61.jpg","indiancinemahandbillscan62.jpg","indiancinemahandbillscan63.jpg",
      "indiancinemahandbillscan64.jpg","indiancinemahandbillscan65.jpg","indiancinemahandbillscan66.jpg",
      "indiancinemahandbillscan67.jpg","indiancinemahandbillscan100.jpg","indiancinemahandbillscan101.jpg",
      "indiancinemahandbillscan102.jpg","indiancinemahandbillscan103.jpg","indiancinemahandbillscan104.jpg",
      "indiancinemahandbillscan105.jpg","indiancinemahandbillscan106.jpg","indiancinemahandbillscan107.jpg",
      "indiancinemahandbillscan108.jpg","indiancinemahandbillscan109.jpg","indiancinemahandbillscan110.jpg",
      "indiancinemahandbillscan111.jpg","indiancinemahandbillscan112.jpg","indiancinemahandbillscan113.jpg",
      "indiancinemahandbillscan114.jpg","indiancinemahandbillscan115.jpg","indiancinemahandbillscan116.jpg",
      "indiancinemahandbillscan117.jpg","indiancinemahandbillscan118.jpg","indiancinemahandbillscan119.jpg",
      "indiancinemahandbillscan120.jpg","indiancinemahandbillscan121.jpg","indiancinemahandbillscan122.jpg",
      "indiancinemahandbillscan123.jpg","indiancinemahandbillscan124.jpg","indiancinemahandbillscan125.jpg",
      "indiancinemahandbillscan126.jpg","indiancinemahandbillscan127.jpg","indiancinemahandbillscan128.jpg",
      "indiancinemahandbillscan129.jpg","indiancinemahandbillscan130.jpg","indiancinemahandbillscan131.jpg",
      "indiancinemahandbillscan132.jpg","indiancinemahandbillscan133.jpg","indiancinemahandbillscan134.jpg",
      "indiancinemahandbillscan135.jpg","indiancinemahandbillscan136.jpg","indiancinemahandbillscan137.jpg",
      "indiancinemahandbillscan138.jpg","indiancinemahandbillscan139.jpg","indiancinemahandbillscan140.jpg",
      "indiancinemahandbillscan141.jpg","indiancinemahandbillscan142.jpg","indiancinemahandbillscan143.jpg",
      "indiancinemahandbillscan144.jpg","indiancinemahandbillscan145.jpg","indiancinemahandbillscan146.jpg",
      "indiancinemahandbillscan147.jpg","indiancinemahandbillscan148.jpg","indiancinemahandbillscan149.jpg",
      "indiancinemahandbillscan150.jpg","indiancinemahandbillscan151.jpg","indiancinemahandbillscan152.jpg",
      "indiancinemahandbillscan153.jpg","indiancinemahandbillscan154.jpg","indiancinemahandbillscan155.jpg",
      "indiancinemahandbillscan156.jpg","indiancinemahandbillscan157.jpg","indiancinemahandbillscan158.jpg",
      "indiancinemahandbillscan159.jpg","indiancinemahandbillscan160.jpg","indiancinemahandbillscan161.jpg",
      "indiancinemahandbillscan162.jpg","indiancinemahandbillscan163.jpg","indiancinemahandbillscan164.jpg",
      "indiancinemahandbillscan165.jpg","indiancinemahandbillscan166.jpg","indiancinemahandbillscan167.jpg",
      "indiancinemahandbillscan168.jpg","indiancinemahandbillscan169.jpg","indiancinemahandbillscan170.jpg",
      "indiancinemahandbillscan171.jpg","indiancinemahandbillscan172.jpg","indiancinemahandbillscan173.jpg",
      "indiancinemahandbillscan174.jpg","indiancinemahandbillscan175.jpg","indiancinemahandbillscan176.jpg",
      "indiancinemahandbillscan177.jpg","indiancinemahandbillscan178.jpg","indiancinemahandbillscan179.jpg",
      "indiancinemahandbillscan180.jpg","indiancinemahandbillscan181.jpg","indiancinemahandbillscan182.jpg",
      "indiancinemahandbillscan183.jpg","indiancinemahandbillscan184.jpg","indiancinemahandbillscan185.jpg",
      "indiancinemahandbillscan186.jpg","indiancinemahandbillscan187.jpg","indiancinemahandbillscan188.jpg",
      "indiancinemahandbillscan189.jpg","indiancinemahandbillscan190.jpg","indiancinemahandbillscan191.jpg",
      "indiancinemahandbillscan192.jpg","indiancinemahandbillscan193.jpg","indiancinemahandbillscan194.jpg",
      "indiancinemahandbillscan195.jpg","indiancinemahandbillscan196.jpg","indiancinemahandbillscan197.jpg",
      "indiancinemahandbillscan198.jpg","indiancinemahandbillscan199.jpg","indiancinemahandbillscan200.jpg",
      "indiancinemahandbillscan201.jpg","indiancinemahandbillscan202.jpg","indiancinemahandbillscan203.jpg",
      "indiancinemahandbillscan204.jpg","indiancinemahandbillscan205.jpg","indiancinemahandbillscan206.jpg",
      "indiancinemahandbillscan207.jpg","indiancinemahandbillscan208.jpg","indiancinemahandbillscan209.jpg",
      "indiancinemahandbillscan210.jpg","indiancinemahandbillscan211.jpg","indiancinemahandbillscan212.jpg",
      "indiancinemahandbillscan213.jpg","indiancinemahandbillscan214.jpg","indiancinemahandbillscan215.jpg",
      "indiancinemahandbillscan216.jpg","indiancinemahandbillscan217.jpg","indiancinemahandbillscan218.jpg",
      "indiancinemahandbillscan219.jpg","indiancinemahandbillscan220.jpg","indiancinemahandbillscan221.jpg",
      "indiancinemahandbillscan222.jpg","indiancinemahandbillscan223.jpg","indiancinemahandbillscan224.jpg",
      "indiancinemahandbillscan225.jpg","indiancinemahandbillscan226.jpg","indiancinemahandbillscan227.jpg",
      "indiancinemahandbillscan228.jpg","indiancinemahandbillscan229.jpg","indiancinemahandbillscan230.jpg",
      "indiancinemahandbillscan231.jpg","indiancinemahandbillscan232.jpg","indiancinemahandbillscan233.jpg",
      "indiancinemahandbillscan234.jpg","indiancinemahandbillscan235.jpg","indiancinemahandbillscan236.jpg",
      "indiancinemahandbillscan237.jpg","indiancinemahandbillscan238.jpg","indiancinemahandbillscan239.jpg",
      "indiancinemahandbillscan240.jpg","indiancinemahandbillscan241.jpg","indiancinemahandbillscan242.jpg",
      "indiancinemahandbillscan243.jpg","indiancinemahandbillscan244.jpg","indiancinemahandbillscan245.jpg",
      "indiancinemahandbillscan246.jpg",
    ]);

    let updatedCount = 0;
    const updatedData = data.map(item => {
      if (item.images && item.images.length > 0) {
        const filename = path.basename(item.images[0]);
        let changed = false;

        // 1. Price updates
        if (priceUpdates[filename] !== undefined) {
          item.price = priceUpdates[filename];
          item.originalPrice = Math.round(priceUpdates[filename] * 1.25);
          changed = true;
        } else if (handbills.has(filename) && item.price !== 100000) {
          item.price = 100000;
          item.originalPrice = 125000;
          changed = true;
        }

        // 2. Stock / Sold Out updates
        if (soldOut.has(filename) && item.stock !== 0) {
          item.stock = 0;
          changed = true;
        }
        if (handbills.has(filename) && item.stock !== 0) {
          item.stock = 0;
          changed = true;
        }

        if (changed) updatedCount++;
      }
      return item;
    });

    // 3. CLEANUP: Completely remove any painting that is Sold Out (stock === 0)
    let removedCount = 0;
    const finalData = [];
    for (const item of updatedData) {
      if (item.stock === 0) {
        // Delete image files from disk
        if (item.images && item.images.length > 0) {
          for (const imgUrl of item.images) {
            const imgFilename = path.basename(imgUrl);
            const imgPath = path.join(__dirname, 'public', 'paintings', imgFilename);
            if (fs.existsSync(imgPath)) {
              try { fs.unlinkSync(imgPath); } catch(e) {}
            }
          }
        }
        removedCount++;
      } else {
        finalData.push(item);
      }
    }

    if (updatedCount > 0 || removedCount > 0) {
      fs.writeFileSync(paintingsJsonPath, JSON.stringify(finalData, null, 4), 'utf8');
      console.log(`[MIGRATION SUCCESS] Updated ${updatedCount} items. Removed ${removedCount} sold out items!`);
    } else {
      console.log(`[MIGRATION] No updates or removals were needed.`);
    }
  }
} catch (err) {
  console.error('[MIGRATION ERROR] Failed to update paintings.json:', err);
}
// --- END PRICING & STOCK MIGRATION SCRIPT ---

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
