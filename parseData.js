const fs = require('fs');

try {
  const data = fs.readFileSync('script_tag_93.js', 'utf-8');
  
  // Extract the "initialItems" array
  const match = data.match(/"initialItems":(\[.*?\]),"initialPosts"/);
  let itemsArray = [];
  if (match && match[1]) {
    // The string has backslash escapes because it's a JSON string inside a JS array.
    // Wait, the match is inside a giant string.
    try {
      itemsArray = JSON.parse(match[1]);
    } catch(e) {
      // Let's try parsing the whole JSON string
      const jsonStrMatch = data.match(/14:(\[.*\])$/);
      if (jsonStrMatch) {
         // Not trivial. Let's just use regex to extract the objects.
      }
    }
  }

  // A safer way: The text is `self.__next_f.push([1,"..."])`. We can evaluate it!
  const fakeSelf = { __next_f: { push: (args) => {
    if (args[0] === 1 && typeof args[1] === 'string') {
      const match2 = args[1].match(/"initialItems":(\[.*?\]),"initialPosts"/);
      if (match2) {
        itemsArray = JSON.parse(match2[1]);
      } else {
        const match3 = args[1].match(/"initialItems":(\[.*?\])}/);
        if (match3) itemsArray = JSON.parse(match3[1]);
      }
    }
  }}};
  
  eval(`const self = fakeSelf; ${data}`);

  if (itemsArray.length === 0) {
    console.log("Could not extract items array!");
    process.exit(1);
  }

  console.log(`Successfully extracted ${itemsArray.length} items!`);

  // Now format into TypeScript code
  let tsCode = `export type Category = "FRUITS" | "GAMEPASSES" | "SCROLLS" | "SWORDS" | "MATERIALS" | "LIMITEDS";
export type Rarity = "Common" | "Uncommon" | "Rare" | "Legendary" | "Mythical" | "Limited";
export type Trend = "Stable" | "Rising" | "Falling" | "Underpaid" | "Overpaid";

export interface MockTradeItem {
  id: string;
  name: string;
  slug: string;
  category: Category;
  rarity: Rarity;
  imageUrl: string;
  currentTradingValue: number;
  permanentValue?: number;
  demand: string;
  demandScore: number;
  trend: Trend;
  robuxPrice?: number;
  beliPrice?: number;
}

const makeSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export const ALL_ITEMS: MockTradeItem[] = [\n`;

  itemsArray.forEach((item, index) => {
    let category = "LIMITEDS";
    if (item.category === "Fruits") category = "FRUITS";
    if (item.category === "Gamepasses") category = "GAMEPASSES";
    if (item.category === "Scrolls" || item.name.toLowerCase().includes("scroll")) category = "SCROLLS";
    if (item.category === "Swords" || item.name.toLowerCase().includes("blade")) category = "SWORDS";

    const meta = item.metadata || {};
    const currentTradingValue = meta.regValue || 0;
    const permanentValue = meta.permValue || undefined;
    const demandScore = meta.regDemand || 5;
    const trend = meta.regTrend || "Stable";
    
    // Some values might be string or null
    const safeNum = (v) => (typeof v === 'number' ? v : 0);

    tsCode += `  {
    id: "real-${index}",
    name: ${JSON.stringify(item.name)},
    slug: makeSlug(${JSON.stringify(item.name)}),
    category: "${category}",
    rarity: "${meta.tier || item.rarity || 'Common'}" as Rarity,
    imageUrl: ${JSON.stringify(item.image)},
    currentTradingValue: ${safeNum(currentTradingValue)},
    ${permanentValue !== undefined ? `permanentValue: ${safeNum(permanentValue)},` : ''}
    demand: "${demandScore}/10",
    demandScore: ${demandScore},
    trend: "${trend}" as Trend,
    robuxPrice: ${safeNum(meta.robuxPrice)},
    beliPrice: ${safeNum(meta.beliPrice)}
  },\n`;
  });

  tsCode += `];\n`;

  fs.writeFileSync('src/lib/mockData.ts', tsCode);
  console.log("Successfully generated real mockData.ts!");

} catch (error) {
  console.error(error);
}
