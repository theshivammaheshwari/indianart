const fs = require('fs');
const path = require('path');

const paintingsPath = path.join(__dirname, 'public', 'paintings', 'paintings.json');

try {
  const data = JSON.parse(fs.readFileSync(paintingsPath, 'utf8'));
  
  let removedCount = 0;
  let remainingPaintings = [];

  for (const painting of data) {
    if (painting.stock === 0) {
      // Remove associated images
      if (painting.images && painting.images.length > 0) {
        for (const imgUrl of painting.images) {
          // imgUrl looks like "/paintings/filename.jpg"
          const imgFilename = path.basename(imgUrl);
          const imgPath = path.join(__dirname, 'public', 'paintings', imgFilename);
          
          if (fs.existsSync(imgPath)) {
            try {
              fs.unlinkSync(imgPath);
              console.log(`Deleted image: ${imgFilename}`);
            } catch (err) {
              console.error(`Failed to delete image ${imgFilename}:`, err.message);
            }
          }
        }
      }
      removedCount++;
      console.log(`Removed painting from DB: ${painting.title_en} (${painting.slug})`);
    } else {
      remainingPaintings.push(painting);
    }
  }

  // Write the filtered data back to the JSON file
  fs.writeFileSync(paintingsPath, JSON.stringify(remainingPaintings, null, 4), 'utf8');
  
  console.log(`\nSuccess! Removed ${removedCount} sold out paintings.`);
  console.log(`Remaining paintings in database: ${remainingPaintings.length}`);

} catch (err) {
  console.error("Error processing paintings:", err);
}
