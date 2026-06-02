"use client";

import { useState } from "react";
import Link from "next/link";
import { formatValue } from "@/lib/calculator";
import { ALL_ITEMS } from "@/lib/mockData";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function ValueGrid() {
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [variant, setVariant] = useState<"REGULAR" | "PERMANENT">("REGULAR");

  const filteredItems = ALL_ITEMS
    .filter(item => filter === "ALL" || item.category.toUpperCase() === filter)
    .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b.currentTradingValue - a.currentTradingValue);

  const getTrendIcon = (trend: string) => {
    if (trend === "Rising" || trend === "Overpaid") return <TrendingUp className="w-3 h-3 text-green-400" />;
    if (trend === "Falling" || trend === "Underpaid") return <TrendingDown className="w-3 h-3 text-red-400" />;
    return <Minus className="w-3 h-3 text-gray-600 dark:text-gray-400" />;
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Variant Toggle (Regular / Permanent) */}
      <div className="flex justify-center mb-2">
        <div className="bg-[#0a0a0f] p-1.5 rounded-full border border-gray-200 dark:border-white/10 flex gap-1 shadow-xl">
          <button
            onClick={() => setVariant("REGULAR")}
            className={`px-8 py-2.5 rounded-full text-sm font-black transition-all ${
              variant === "REGULAR" 
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-gray-900 dark:text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]" 
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white hover:bg-gray-100 dark:bg-white/5"
            }`}
          >
            Regular
          </button>
          <button
            onClick={() => setVariant("PERMANENT")}
            className={`px-8 py-2.5 rounded-full text-sm font-black transition-all ${
              variant === "PERMANENT" 
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-gray-900 dark:text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]" 
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white hover:bg-gray-100 dark:bg-white/5"
            }`}
          >
            Permanent
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-4 rounded-xl">
        <div className="flex space-x-2 flex-wrap gap-y-2 justify-center">
          {["ALL", "FRUITS", "GAMEPASSES", "SCROLLS", "SWORDS"].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-md text-sm font-bold transition ${
                filter === cat
                  ? 'bg-blue-600 text-gray-900 dark:text-white shadow-[0_0_10px_rgba(37,99,235,0.5)]' 
                  : 'bg-transparent text-muted-foreground hover:text-gray-900 dark:text-white hover:bg-gray-100 dark:bg-white/5'
              }`}
            >
              {cat === "ALL" ? "All Items" : cat}
            </button>
          ))}
        </div>
        <div className="w-full md:w-64">
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredItems.map(item => {
          const displayValue = variant === "PERMANENT" && item.permanentValue 
            ? item.permanentValue 
            : item.currentTradingValue;

          return (
            <Link href={`/item/${item.slug}`} key={item.id} className="group flex flex-col rounded-xl border border-gray-200 dark:border-white/10 bg-[#0a0a0f] overflow-hidden hover:bg-gray-100 dark:bg-white/5 hover:border-blue-500/50 transition-all duration-300 shadow-lg">
              <div className="relative aspect-square bg-[#12121a] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-black/80 to-transparent z-10"></div>
                <img src={item.imageUrl} alt={item.name} className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500 relative z-0 drop-shadow-2xl" />
                <div className="absolute top-2 right-2 bg-blue-600/90 backdrop-blur-sm text-gray-900 dark:text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg z-20 border border-blue-400/30 uppercase tracking-wider">
                  {item.rarity}
                </div>
                <div className="absolute bottom-2 left-3 z-20 flex items-center gap-1 bg-white dark:bg-black/80 px-2 py-1 rounded-full border border-gray-200 dark:border-white/10 backdrop-blur-md">
                  {getTrendIcon(item.trend || "Stable")}
                  <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">{item.trend || "Stable"}</span>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-2 bg-gradient-to-b from-white/5 to-transparent flex-1">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-400 transition-colors leading-tight">{item.name}</h3>
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{item.category}</p>
                
                <div className="mt-auto pt-3 border-t border-gray-200 dark:border-white/10 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{variant === "PERMANENT" && item.permanentValue ? "Perm Value" : "Value"}</span>
                    <span className="font-mono font-bold text-blue-400 text-sm">{formatValue(displayValue)}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Demand</span>
                    <span className={`text-xs font-bold text-green-400`}>
                      {item.demand || "8/10"}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {filteredItems.length === 0 && (
        <div className="text-center text-muted-foreground py-12">
          No items found matching your search.
        </div>
      )}
    </div>
  );
}
