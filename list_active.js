const fs = require('fs');
const path = require('path');

const paintingsPath = path.join(__dirname, 'public', 'paintings', 'paintings.json');
const data = JSON.parse(fs.readFileSync(paintingsPath, 'utf8'));

const list = data.map(p => {
  return {
    id: p.id,
    image: p.images[0].split('/').pop(),
    title: p.title_en
  };
});

console.log(JSON.stringify(list, null, 2));
