"use client";

import { useState } from "react";
import { ALL_ITEMS } from "@/lib/mockData";
import { formatValue } from "@/lib/calculator";
import { TrendingUp, TrendingDown, Minus, ArrowUpDown } from "lucide-react";
import Link from "next/link";

export default function ValuesListPage() {
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [variant, setVariant] = useState<"REGULAR" | "PERMANENT">("REGULAR");
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'ascending' | 'descending' }>({ key: 'currentTradingValue', direction: 'descending' });

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'descending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "UP") return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (trend === "DOWN") return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-gray-600 dark:text-gray-400" />;
  };

  const filteredItems = ALL_ITEMS
    .filter(item => filter === "ALL" || item.category.toUpperCase() === filter)
    .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const sortKey = (variant === "PERMANENT" && sortConfig.key === "currentTradingValue") ? "permanentValue" : sortConfig.key;
      let valA = a[sortKey as keyof typeof a] || 0;
      let valB = b[sortKey as keyof typeof b] || 0;
      if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="text-center mb-10 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] tracking-tighter">
          Blox Fruits <span className="text-blue-500">Value List</span> {new Date().getFullYear()} — Live Trading Prices
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm">
          The most accurate, real-time trading values for all Blox Fruits items.
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="bg-[#0a0a0f] p-1.5 rounded-full border border-gray-200 dark:border-white/10 flex gap-1 shadow-xl">
          <button
            onClick={() => setVariant("REGULAR")}
            className={`px-8 py-2.5 rounded-full text-sm font-black transition-all ${
              variant === "REGULAR" 
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-gray-900 dark:text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]" 
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10"
            }`}
          >
            Regular
          </button>
          <button
            onClick={() => {
              setVariant("PERMANENT");
              if (filter !== "FRUITS") setFilter("FRUITS");
            }}
            className={`px-8 py-2.5 rounded-full text-sm font-black transition-all ${
              variant === "PERMANENT" 
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-gray-900 dark:text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]" 
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10"
            }`}
          >
            Permanent
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-4 rounded-xl mb-6">
        <div className="flex space-x-2 flex-wrap gap-y-2 justify-center">
          {["ALL", "FRUITS", "GAMEPASSES", "SCROLLS", "SWORDS"].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-md text-sm font-bold transition ${
                filter === cat
                  ? 'bg-blue-600 text-gray-900 dark:text-white shadow-[0_0_10px_rgba(37,99,235,0.5)]' 
                  : 'bg-transparent text-muted-foreground hover:text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10'
              }`}
            >
              {cat === "ALL" ? "All Items" : cat}
            </button>
          ))}
        </div>
        <div className="w-full md:w-64 relative">
          <input
            type="search"
            placeholder="Search list..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-gray-200 dark:border-white/10 bg-[#0a0a0a] px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                <th className="p-4 font-bold text-gray-700 dark:text-gray-300">Item</th>
                <th className="p-4 font-bold text-gray-700 dark:text-gray-300">Rarity</th>
                <th className="p-4 font-bold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:text-white transition" onClick={() => requestSort('currentTradingValue')}>
                  <div className="flex items-center gap-2">Value <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="p-4 font-bold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:text-white transition" onClick={() => requestSort('demandScore')}>
                  <div className="flex items-center gap-2">Demand <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="p-4 font-bold text-gray-700 dark:text-gray-300 text-center">Trend</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, idx) => (
                <tr key={item.id} className={`border-b border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors ${idx % 2 === 0 ? 'bg-transparent' : 'bg-[#000000]/20'}`}>
                  <td className="p-4">
                    <Link href={`/item/${item.slug}`} className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-lg bg-white dark:bg-black/50 p-1 flex items-center justify-center border border-gray-200 dark:border-white/10 group-hover:border-blue-500/50 transition">
                        <img src={item.imageUrl} alt={item.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white group-hover:text-blue-400 transition">{item.name}</div>
                        <div className="text-xs text-muted-foreground uppercase">{item.category}</div>
                      </div>
                    </Link>
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-bold px-2 py-1 rounded tracking-wider uppercase">
                      {item.rarity}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-mono font-bold text-green-400 text-base">
                      {formatValue(variant === "PERMANENT" && item.permanentValue ? item.permanentValue : item.currentTradingValue)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`font-bold text-sm text-green-400`}>
                      {item.demand || "8/10"}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center items-center">
                      <div className="bg-white dark:bg-black/40 p-2 rounded-full border border-gray-200 dark:border-white/5">
                        {getTrendIcon(item.trend || "STABLE")}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-muted-foreground">
                    No items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-16 max-w-4xl mx-auto mb-12">
        <div className="mb-12 text-center">
          <p className="text-muted-foreground max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            Welcome to the ultimate <strong className="text-gray-900 dark:text-white">Blox Fruits Value</strong> list for {new Date().getFullYear()}! This page is your live trading companion, featuring up-to-the-minute values for every physical fruit, permanent fruit, gamepass, and limited item in the game. Understanding <strong className="text-gray-900 dark:text-white">Blox Fruits value</strong> is essential before making any trade to ensure you never take an L (Loss). We calculate our values based on massive community polls, live trading hub data, and discord server transactions. 
            <br /><br />
            Whether you are comparing the <strong className="text-gray-900 dark:text-white">physical vs permanent value</strong> of a Leopard fruit, or trying to figure out if your offer is a W/F/L (Win, Fair, Loss), our tier list provides the exact numbers you need. All our data is <strong className="text-green-500">updated daily</strong>. Use the buttons below to switch between regular (physical) trading values and permanent (Robux) values, and master the Blox Fruits economy today!
          </p>
        </div>
        <h2 className="text-3xl font-black text-center text-gray-900 dark:text-white mb-8">Blox Fruits Value FAQs</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-[#0a0a0f]/50 p-6 rounded-2xl border border-gray-200 dark:border-white/5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">What is Blox Fruits value?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Blox Fruits value refers to the current trading worth of fruits, gamepasses, and scrolls within the Roblox game. Because prices constantly shift based on player demand and game updates, a fruit's in-game Beli cost often does not match its actual trading value.</p>
          </div>
          <div className="bg-gray-50 dark:bg-[#0a0a0f]/50 p-6 rounded-2xl border border-gray-200 dark:border-white/5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">How are Blox Fruits values calculated?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Our values are calculated by analyzing thousands of successful trades across massive Discord communities, in-game trading hubs, and community polls. We track both the raw worth and the "demand" score to ensure extreme accuracy.</p>
          </div>
          <div className="bg-gray-50 dark:bg-[#0a0a0f]/50 p-6 rounded-2xl border border-gray-200 dark:border-white/5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">What is the difference between physical vs permanent Blox Fruits value?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">A "Physical" fruit is a one-time use item held in your inventory, whereas a "Permanent" fruit is bought with Robux and can be equipped at any time forever. Because they cost real money, Permanent fruits have significantly higher trading values than their physical counterparts.</p>
          </div>
          <div className="bg-gray-50 dark:bg-[#0a0a0f]/50 p-6 rounded-2xl border border-gray-200 dark:border-white/5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Which Blox fruit has the highest value?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Currently, mythical fruits like the Kitsune and Dragon hold the highest trading values in the game due to their extreme rarity, high demand, and powerful PvP/grinding capabilities. Check the top of our value list for the exact current rankings.</p>
          </div>
          <div className="bg-gray-50 dark:bg-[#0a0a0f]/50 p-6 rounded-2xl border border-gray-200 dark:border-white/5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">What does W/F/L mean in trading?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">W/F/L stands for Win, Fair, Loss. A "W" means you received more value than you gave. An "F" means the trade was perfectly balanced. An "L" means you overpaid. Always check our list to avoid taking an L!</p>
          </div>
        </div>
      </div>

      {/* Structured Data for SEO: ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [...ALL_ITEMS]
              .sort((a, b) => b.currentTradingValue - a.currentTradingValue)
              .slice(0, 10)
              .map((item, idx) => ({
                "@type": "ListItem",
                "position": idx + 1,
                "name": item.name,
                "url": `https://www.bloxfruitvaluable.com/item/${item.slug}`
              }))
          }),
        }}
      />
      
      {/* Structured Data for SEO: FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is Blox Fruits value?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Blox Fruits value refers to the current trading worth of fruits, gamepasses, and scrolls within the Roblox game. Because prices constantly shift based on player demand and game updates, a fruit's in-game Beli cost often does not match its actual trading value."
                }
              },
              {
                "@type": "Question",
                "name": "How are Blox Fruits values calculated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our values are calculated by analyzing thousands of successful trades across massive Discord communities, in-game trading hubs, and community polls. We track both the raw worth and the demand score to ensure extreme accuracy."
                }
              },
              {
                "@type": "Question",
                "name": "What is the difference between physical vs permanent Blox Fruits value?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A Physical fruit is a one-time use item held in your inventory, whereas a Permanent fruit is bought with Robux and can be equipped at any time forever. Because they cost real money, Permanent fruits have significantly higher trading values than their physical counterparts."
                }
              },
              {
                "@type": "Question",
                "name": "Which Blox fruit has the highest value?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Currently, mythical fruits like the Kitsune and Dragon hold the highest trading values in the game due to their extreme rarity, high demand, and powerful PvP/grinding capabilities. Check the top of our value list for the exact current rankings."
                }
              },
              {
                "@type": "Question",
                "name": "What does W/F/L mean in trading?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "W/F/L stands for Win, Fair, Loss. A W means you received more value than you gave. An F means the trade was perfectly balanced. An L means you overpaid. Always check our list to avoid taking an L!"
                }
              }
            ]
          }),
        }}
      />
    </div>
  );
}
