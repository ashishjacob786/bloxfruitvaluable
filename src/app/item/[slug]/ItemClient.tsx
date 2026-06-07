"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Activity, History, Zap, Box, Star, ShieldAlert } from "lucide-react";
import { formatValue } from "@/lib/calculator";

export default function ItemClient({ item }: { item: any }) {
  const [variant, setVariant] = useState<"REGULAR" | "PERMANENT">("REGULAR");
  const [activeTab, setActiveTab] = useState<"ANALYSIS" | "LIVE_TRADES">("ANALYSIS");

  const currentValue = variant === "PERMANENT" && item.permanentValue ? item.permanentValue : item.currentTradingValue;
  const isFruit = item.category === "FRUITS";

  return (
    <div className="min-h-screen pb-20">
      {/* 1. Immersive Hero Banner */}
      <div className="relative min-h-[35vh] md:min-h-[40vh] w-full overflow-hidden flex items-end justify-center pt-24 pb-10 bg-gradient-to-b from-[#0a0a0f] to-[#12121c]">
        <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0a0f] to-transparent"></div>
        
        <div className="container relative z-10 px-4 max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-10">
          <div className="relative group">
            <div className="absolute -inset-4 rounded-full bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl bg-white dark:bg-black/60 border border-gray-200 dark:border-white/10 backdrop-blur-xl p-3 shadow-2xl overflow-hidden flex items-center justify-center transform transition duration-500 hover:scale-105 hover:rotate-2">
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
            </div>
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-blue-600 border border-blue-400 text-gray-900 dark:text-white text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full shadow-lg">
              {item.rarity}
            </span>
          </div>

          <div className="text-center md:text-left flex-1 pb-2">
            <Link href="/values-list" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition text-sm font-bold mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Market
            </Link>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight drop-shadow-md mb-2">{item.name}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 items-center">
              <span className="bg-gray-200 dark:bg-white/10 border border-gray-200 dark:border-white/20 text-gray-700 dark:text-gray-300 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md flex items-center gap-2">
                <Box className="w-3 h-3" /> {item.category}
              </span>
              <span className="bg-gray-200 dark:bg-white/10 border border-gray-200 dark:border-white/20 text-gray-700 dark:text-gray-300 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md flex items-center gap-2">
                <Star className="w-3 h-3 text-yellow-500" /> DEMAND: {item.demand || "8/10"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 max-w-5xl mx-auto -mt-4 relative z-20">
        
        {/* 2. Advanced Variant Switcher (Glassmorphism) */}
        {isFruit && (
          <div className="flex justify-center mb-10">
            <div className="bg-white dark:bg-black/40 backdrop-blur-xl p-1.5 rounded-full border border-gray-200 dark:border-white/10 flex gap-1 shadow-2xl">
              <button
                onClick={() => setVariant("REGULAR")}
                className={`px-8 py-3 rounded-full text-sm font-black transition-all duration-300 ${
                  variant === "REGULAR" 
                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white hover:bg-gray-100 dark:bg-white/5"
                }`}
              >
                Physical Value
              </button>
              <button
                onClick={() => setVariant("PERMANENT")}
                className={`px-8 py-3 rounded-full text-sm font-black transition-all duration-300 ${
                  variant === "PERMANENT" 
                    ? "bg-gradient-to-r from-orange-500 to-red-600 text-gray-900 dark:text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]" 
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white hover:bg-gray-100 dark:bg-white/5"
                }`}
              >
                Permanent Value
              </button>
            </div>
          </div>
        )}

        {/* 3. The HUD (Heads Up Display) Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Main Value Card */}
          <div className="md:col-span-2 bg-gradient-to-br from-blue-900/20 to-purple-900/10 border border-gray-200 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Activity className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <h3 className="text-gray-600 dark:text-gray-400 font-bold uppercase tracking-widest text-xs mb-2">Live Market Value</h3>
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 drop-shadow-sm font-mono tracking-tighter">
                  {formatValue(currentValue)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${
                  item.trend === 'Rising' || item.trend === 'UP' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                  item.trend === 'Falling' || item.trend === 'DOWN' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                  item.trend === 'Overpaid' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                  'bg-gray-500/20 text-gray-600 dark:text-gray-400 border border-gray-500/30'
                }`}>
                  {item.trend === 'Rising' || item.trend === 'UP' ? <TrendingUp className="w-4 h-4" /> :
                   item.trend === 'Falling' || item.trend === 'DOWN' ? <TrendingDown className="w-4 h-4" /> :
                   <Minus className="w-4 h-4" />}
                  {item.trend === 'UP' ? 'RISING' : item.trend === 'DOWN' ? 'FALLING' : (item.trend || 'STABLE').toUpperCase()} TREND
                </span>
                <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Live Updates
                </span>
              </div>
            </div>
          </div>

          {/* In-Game Prices */}
          <div className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 flex flex-col justify-center gap-6 backdrop-blur-sm relative">
            <div>
              <h3 className="text-gray-600 dark:text-gray-400 font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2"><Zap className="w-4 h-4" /> In-Game Cost</h3>
              <p className="text-3xl font-black text-green-500 font-mono tracking-tight">
                {item.beliPrice && item.beliPrice > 0 ? `$${item.beliPrice.toLocaleString()}` : "N/A"}
              </p>
            </div>
            <div className="h-px w-full bg-gray-200 dark:bg-white/10"></div>
            <div>
              <h3 className="text-gray-600 dark:text-gray-400 font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-yellow-500" /> Robux Cost</h3>
              <p className="text-3xl font-black text-yellow-500 font-mono tracking-tight">
                {item.robuxPrice && item.robuxPrice > 0 ? (
                  <>
                    <span className="text-xl mr-1">Robux</span>
                    {item.robuxPrice.toLocaleString()} 
                    <span className="text-lg text-gray-600 dark:text-gray-400 ml-2">(USD ${(item.robuxPrice * 0.0125).toFixed(2)})</span>
                  </>
                ) : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* 4. Tab Navigation */}
        <div className="flex gap-8 border-b border-gray-200 dark:border-white/10 mb-8 px-2">
          <button 
            onClick={() => setActiveTab("ANALYSIS")}
            className={`pb-4 text-sm font-black tracking-widest uppercase transition-colors flex items-center gap-2 relative ${activeTab === "ANALYSIS" ? "text-blue-400" : "text-gray-500 hover:text-gray-700 dark:text-gray-300"}`}
          >
            <Activity className="w-4 h-4" /> Market Analysis
            {activeTab === "ANALYSIS" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>}
          </button>
          <button 
            onClick={() => setActiveTab("LIVE_TRADES")}
            className={`pb-4 text-sm font-black tracking-widest uppercase transition-colors flex items-center gap-2 relative ${activeTab === "LIVE_TRADES" ? "text-blue-400" : "text-gray-500 hover:text-gray-700 dark:text-gray-300"}`}
          >
            <History className="w-4 h-4" /> Recent Trades
            {activeTab === "LIVE_TRADES" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>}
          </button>
        </div>

        {/* 5. Tab Content */}
        {activeTab === "ANALYSIS" && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-[#0a0a0f]/50 border border-gray-200 dark:border-white/5 rounded-3xl p-8">
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6">Expert Assessment</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {item.seoDescription || `The ${item.name} is a ${item.rarity} tier item in Blox Fruits.`}
                <br /><br />
                {item.demandScore >= 8 ? (
                  <span> With an outstanding community demand score of <strong className="text-green-400">{item.demand || "8/10"}</strong>, players are constantly searching for it in the Trading Hub.</span>
                ) : item.demandScore >= 5 ? (
                  <span> It maintains a solid community demand score of <strong className="text-yellow-400">{item.demand || "5/10"}</strong>, making it a decent add-on for larger trades.</span>
                ) : (
                  <span> Its current community demand score sits at <strong className="text-red-400">{item.demand || "3/10"}</strong>, so it might take some time to find the right buyer.</span>
                )}
                {" "}
                {item.trend === 'Rising' || item.trend === 'UP' ? (
                  <span>The market trend is currently <strong className="text-green-500">Rising</strong>, indicating that its value is actively inflating.</span>
                ) : item.trend === 'Falling' || item.trend === 'DOWN' ? (
                  <span>The market trend is currently <strong className="text-red-500">Falling</strong>, suggesting players are losing interest or a nerf occurred.</span>
                ) : item.trend === 'Overpaid' ? (
                  <span>The market trend shows it is actively <strong className="text-purple-500">Overpaid</strong>, meaning you can easily squeeze extra value out of desperate traders.</span>
                ) : (
                  <span>The market trend is showing signs of being <strong className="text-gray-900 dark:text-white">Stable</strong>, meaning its value is unlikely to change drastically in the next few updates.</span>
                )}
              </p>
              
              <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-5">
                <h4 className="text-blue-400 font-bold mb-2 text-sm uppercase tracking-wider">Trading Advice</h4>
                <p className="text-sm text-blue-200">
                  {item.trend === "Overpaid" || item.trend === "Rising" || item.trend === "UP"
                    ? `Hold onto this item! Users are actively overpaying for ${item.name}. Wait for massive offers (W's) before accepting any trades.` 
                    : item.trend === "Falling" || item.trend === "DOWN"
                    ? `Consider trading ${item.name} soon before its value drops further. Try to bundle it with high-demand fruits to get a better deal.`
                    : `Be careful when trading ${item.name}. Ensure you use the calculator to verify you are getting equal value back, as demand is standard.`}
                </p>
              </div>

              {/* Structured Data for Item and Breadcrumbs */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify([
                    {
                      "@context": "https://schema.org",
                      "@type": "ItemPage",
                      "mainEntity": {
                        "@type": "Product",
                        "name": `${item.name} - Blox Fruits`,
                        "image": item.imageUrl,
                        "description": `Real-time trading value, demand, and expert assessment for ${item.name} in Blox Fruits.`,
                        "brand": {
                          "@type": "Brand",
                          "name": "Roblox Blox Fruits"
                        },
                        "offers": {
                          "@type": "Offer",
                          "price": item.currentTradingValue,
                          "priceCurrency": "USD", 
                          "availability": "https://schema.org/InStock"
                        }
                      }
                    },
                    {
                      "@context": "https://schema.org",
                      "@type": "BreadcrumbList",
                      "itemListElement": [
                        {
                          "@type": "ListItem",
                          "position": 1,
                          "name": "Home",
                          "item": "https://www.bloxfruitvaluable.com/"
                        },
                        {
                          "@type": "ListItem",
                          "position": 2,
                          "name": "Values List",
                          "item": "https://www.bloxfruitvaluable.com/values-list"
                        },
                        {
                          "@type": "ListItem",
                          "position": 3,
                          "name": item.name,
                          "item": `https://www.bloxfruitvaluable.com/item/${item.slug}`
                        }
                      ]
                    }
                  ]),
                }}
              />
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-[#0a0a0f]/50 border border-gray-200 dark:border-white/5 rounded-2xl p-6 flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400 font-bold uppercase text-xs tracking-wider">Best Used For</span>
                <span className="text-gray-900 dark:text-white font-bold px-3 py-1 bg-gray-200 dark:bg-white/10 rounded-full text-sm">{item.bestUsedFor || "Grinding & PvP"}</span>
              </div>
              <div className="bg-gray-50 dark:bg-[#0a0a0f]/50 border border-gray-200 dark:border-white/5 rounded-2xl p-6 flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400 font-bold uppercase text-xs tracking-wider">Item Category</span>
                <span className="text-gray-900 dark:text-white font-bold px-3 py-1 bg-gray-200 dark:bg-white/10 rounded-full text-sm">{item.category}</span>
              </div>
              <div className="bg-gray-50 dark:bg-[#0a0a0f]/50 border border-gray-200 dark:border-white/5 rounded-2xl p-6 flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400 font-bold uppercase text-xs tracking-wider">Community Rating</span>
                <span className="text-gray-900 dark:text-white font-bold px-3 py-1 bg-gray-200 dark:bg-white/10 rounded-full text-sm">{item.demandScore || 8} / 10</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "LIVE_TRADES" && (
          <div className="bg-gray-50 dark:bg-[#0a0a0f]/50 border border-gray-200 dark:border-white/5 rounded-3xl p-8 text-center">
            <History className="w-12 h-12 text-gray-500 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Live Trade Integration Coming Soon</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">We are currently linking this page directly to the Trading Hub. Soon, you will see real-time player offers for {item.name} right here.</p>
            <Link href="/trading" className="inline-block bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:bg-white/20 text-gray-900 dark:text-white font-bold px-6 py-3 rounded-full transition border border-gray-200 dark:border-white/10">
              Go to Trading Hub
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
