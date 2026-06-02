const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function scrape() {
  try {
    const { data } = await axios.get('https://bloxfruitsvalues.com/values', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      }
    });

    const $ = cheerio.load(data);
    const nextData = $('#__NEXT_DATA__').html();
    
    if (nextData) {
      const parsed = JSON.parse(nextData);
      const items = parsed.props?.pageProps?.trpcState?.json?.queries?.[0]?.state?.data || [];
      console.log(`Found ${items.length} items from NEXT_DATA!`);
      
      if (items.length > 0) {
        fs.writeFileSync('real_data.json', JSON.stringify(items, null, 2));
        console.log("Saved to real_data.json");
        return;
      }
    }

    // Fallback: search for inline JSON in script tags
    let found = false;
    $('script').each((i, el) => {
      const scriptContent = $(el).html() || '';
      if (scriptContent.includes('Kitsune') && scriptContent.includes('demand')) {
        console.log("Found potential data in a script tag!");
        fs.writeFileSync(`script_tag_${i}.js`, scriptContent);
        found = true;
      }
    });

    if (!found) {
      console.log("Could not find data. Cloudflare might be blocking.");
      fs.writeFileSync('failed_scrape.html', data);
    }

  } catch (error) {
    console.error("Error scraping:", error.message);
  }
}

scrape();
