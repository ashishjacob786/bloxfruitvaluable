import fs from 'fs';
import path from 'path';
import https from 'https';

const mockDataPath = path.join(process.cwd(), 'src/lib/mockData.ts');
const publicItemsDir = path.join(process.cwd(), 'public/items');

if (!fs.existsSync(publicItemsDir)) {
  fs.mkdirSync(publicItemsDir, { recursive: true });
}

async function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, destPath).then(resolve).catch(reject);
      }
      
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
        return;
      }
      
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
      file.on('error', (err) => {
        fs.unlink(destPath, () => reject(err));
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function makeSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

async function main() {
  console.log('Reading mockData.ts...');
  let mockDataContent = fs.readFileSync(mockDataPath, 'utf-8');
  
  const regex = /name:\s*"([^"]+)",[\s\S]*?imageUrl:\s*"([^"]+)"/g;
  let match;
  
  let downloadPromises = [];
  let replacements = [];

  while ((match = regex.exec(mockDataContent)) !== null) {
    const name = match[1];
    const url = match[2];
    const slug = makeSlug(name);
    
    if (url.startsWith('http')) {
      const ext = path.extname(url).split('?')[0] || '.png';
      const filename = `${slug}${ext}`;
      const localPath = `/items/${filename}`;
      const destPath = path.join(publicItemsDir, filename);
      
      downloadPromises.push(
        downloadImage(url, destPath)
          .then(() => console.log(`Downloaded ${slug}`))
          .catch(e => console.error(`Failed to download ${slug}: ${e.message}`))
      );
      
      replacements.push({
        oldUrl: url,
        newUrl: localPath
      });
    }
  }
  
  console.log(`Downloading ${downloadPromises.length} images...`);
  await Promise.all(downloadPromises);
  
  console.log('Updating mockData.ts...');
  for (const {oldUrl, newUrl} of replacements) {
    mockDataContent = mockDataContent.replace(
      new RegExp(`imageUrl:\\s*"${oldUrl}"`, 'g'), 
      `imageUrl: "${newUrl}"`
    );
  }
  
  fs.writeFileSync(mockDataPath, mockDataContent);
  console.log('Done!');
}

main().catch(console.error);
