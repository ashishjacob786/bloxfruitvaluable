const fs = require('fs');

const html = fs.readFileSync('test_scrape.html', 'utf8');

// The data is inside the Next.js script tags. It's likely in self.__next_f.push
// Let's just find the big JSON string.
// A common trick is to regex for an array of items.
// Let's try to find an item like "Kitsune" and extract the whole array.
const match = html.match(/\[\{"id":"[^"]+","name":"Kitsune".*?\]/);

if (match) {
  try {
    const data = JSON.parse(match[0]);
    console.log(`Found ${data.length} items!`);
    fs.writeFileSync('extracted_items.json', JSON.stringify(data, null, 2));
  } catch (e) {
    console.log("Failed to parse JSON", e.message);
  }
} else {
  console.log("Could not find Kitsune array");
  
  // Alternative: extract all JSON-like structures that look like items
  const matches = html.matchAll(/\{"id":"([^"]+)","name":"([^"]+)","slug":"([^"]+)"[^\}]+\}/g);
  const items = [];
  for (const m of matches) {
    try {
      items.push(JSON.parse(m[0]));
    } catch (e) {
      // Fix double escaping if needed
    }
  }
  console.log(`Found ${items.length} items via fallback regex`);
  if (items.length > 0) {
    fs.writeFileSync('extracted_items.json', JSON.stringify(items, null, 2));
  }
}
