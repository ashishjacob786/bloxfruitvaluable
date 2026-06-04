"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, MessageSquare, Copy, ArrowRightLeft, Search } from "lucide-react";
import { calculateTrade, formatValue, TradeResult } from "@/lib/calculator";
import { cn } from "@/lib/utils";

const resultBadgeConfig: Record<TradeResult, { text: string; bg: string; textCol: string }> = {
  MASSIVE_W: { text: "MASSIVE W", bg: "bg-green-500/20", textCol: "text-green-400" },
  W: { text: "WIN", bg: "bg-emerald-500/20", textCol: "text-emerald-400" },
  F: { text: "FAIR", bg: "bg-blue-500/20", textCol: "text-blue-400" },
  L: { text: "LOSS", bg: "bg-orange-500/20", textCol: "text-orange-400" },
  MASSIVE_L: { text: "MASSIVE L", bg: "bg-red-500/20", textCol: "text-red-400" },
};

function timeAgoText(dateString: string) {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function TradeCard({ trade }: { trade: any }) {
  const analysis = calculateTrade(trade.lookingFor, trade.offering);
  const badge = resultBadgeConfig[analysis.result];

  const handleCopy = () => {
    navigator.clipboard.writeText(trade.user.name);
    alert("Roblox Username Copied!");
  };

  return (
    <div className="bg-[#0a0a0f] border border-gray-200 dark:border-white/10 rounded-2xl p-6 flex flex-col gap-6 shadow-xl hover:border-gray-200 dark:border-white/20 transition-colors">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={trade.user.avatar || "/default-avatar.png"} alt={trade.user.name} className="w-10 h-10 rounded-full" />
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white leading-tight">{trade.user.name}</h3>
            <p className="text-xs text-muted-foreground">{timeAgoText(trade.createdAt)}</p>
          </div>
        </div>
        <div className={cn("px-3 py-1 rounded-full text-xs font-bold border border-gray-200 dark:border-white/5", badge.bg, badge.textCol)}>
          For You: {badge.text}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
        {/* Offering */}
        <div className="bg-gray-100 dark:bg-white/5 rounded-xl p-4 border border-gray-200 dark:border-white/5">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-muted-foreground">They Offer</span>
            <span className="text-sm font-mono font-bold text-blue-400">{formatValue(analysis.sideBTotal)}</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {trade.offering.map((item: any, i: number) => (
              <div key={i} className="bg-white dark:bg-black/40 rounded-lg p-2 flex flex-col items-center gap-1 w-[70px]">
                <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-contain drop-shadow" />
                <span className="text-[9px] font-bold text-center leading-tight">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-gray-200 dark:bg-white/10 p-2 rounded-full">
            <ArrowRightLeft className="w-5 h-5 text-gray-900 dark:text-white/50" />
          </div>
        </div>

        {/* Looking For */}
        <div className="bg-gray-100 dark:bg-white/5 rounded-xl p-4 border border-gray-200 dark:border-white/5">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-muted-foreground">They Want</span>
            <span className="text-sm font-mono font-bold text-blue-400">{formatValue(analysis.sideATotal)}</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {trade.lookingFor.map((item: any, i: number) => (
              <div key={i} className="bg-white dark:bg-black/40 rounded-lg p-2 flex flex-col items-center gap-1 w-[70px]">
                <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-contain drop-shadow" />
                <span className="text-[9px] font-bold text-center leading-tight">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-2">
        {trade.user.discord ? (
          <button onClick={() => { navigator.clipboard.writeText(trade.user.discord); alert(`Discord Tag ${trade.user.discord} copied!`); }} className="flex-1 bg-blue-600 hover:bg-blue-500 text-gray-900 dark:text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
            <MessageSquare className="w-4 h-4" /> Copy Discord Tag
          </button>
        ) : (
          <button disabled className="flex-1 bg-gray-600/50 text-gray-600 dark:text-gray-400 cursor-not-allowed font-bold py-2.5 rounded-xl flex items-center justify-center gap-2">
            <MessageSquare className="w-4 h-4" /> No Discord Provided
          </button>
        )}
        <button onClick={handleCopy} className="flex-1 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:bg-white/20 text-gray-900 dark:text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors border border-gray-200 dark:border-white/5">
          <Copy className="w-4 h-4" /> Copy Roblox ID
        </button>
      </div>
    </div>
  );
}

export default function TradingHubClient({ initialTrades }: { initialTrades: any[] }) {
  const [trades, setTrades] = useState<any[]>(initialTrades);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTrades = () => {
    fetch("/api/trades")
      .then(res => res.json())
      .then(data => {
        setTrades(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchTrades();
    const interval = setInterval(fetchTrades, 10000); // refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const filteredTrades = trades.filter((trade) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    
    const hasOffering = trade.offering.some((i: any) => i.name.toLowerCase().includes(query));
    const hasWanted = trade.lookingFor.some((i: any) => i.name.toLowerCase().includes(query));
    
    return hasOffering || hasWanted;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">Active Trade Ads <span className="text-xl md:text-3xl text-gray-600 dark:text-gray-400 font-bold ml-2 hidden sm:inline-block">| BloxFruitValuable.com</span></h1>
          <p className="text-muted-foreground mb-4">Find the best trades from the community in real-time.</p>
          
          {/* SEO Text Expansion for Thin Content Issue */}
          <div className="max-w-3xl mb-4">
            <h2 className="text-[11px] md:text-sm font-bold text-gray-900 dark:text-white mb-1">Welcome to the Blox Fruits Trading Hub</h2>
            <p className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Looking for a specific fruit like Kitsune, Leopard, or Dragon? The BloxFruitValuable Trading Hub connects you directly with thousands of active Roblox players. Browse live trade advertisements, find massive W (Win) trades, and securely copy Discord tags or Roblox Usernames to complete your deals in-game. Post your own trade ad by clicking "Create Trade Ad" and watch the offers roll in!
            </p>
          </div>
        </div>
        <Link 
          href="/trading/new" 
          className="bg-blue-600 hover:bg-blue-500 text-gray-900 dark:text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all hover:scale-105"
        >
          <Plus className="w-5 h-5" /> Create Trade Ad
        </Link>
      </div>

      <div className="mb-8 relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-500" />
        </div>
        <input 
          type="text" 
          placeholder="Search trades for specific fruits (e.g., 'Kitsune', 'Dough')..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#0a0a0f] border border-gray-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg shadow-inner"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : filteredTrades.length === 0 ? (
        <div className="text-center py-20 bg-gray-100 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No trades found</h3>
          <p className="text-gray-600 dark:text-gray-400">Be the first to create a trade ad or try a different search!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {filteredTrades.map(trade => (
            <TradeCard key={trade.id} trade={trade} />
          ))}
        </div>
      )}
    </div>
  );
}
