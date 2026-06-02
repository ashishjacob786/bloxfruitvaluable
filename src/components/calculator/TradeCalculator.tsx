"use client";

import { useState } from "react";
import { Plus, X, ArrowRightLeft } from "lucide-react";
import { calculateTrade, formatValue, TradeResult } from "@/lib/calculator";
import { cn } from "@/lib/utils";
import { MockTradeItem } from "@/lib/mockData";
import ItemSelectionModal from "@/components/shared/ItemSelectionModal";

const resultConfig: Record<TradeResult, { text: string; color: string; bg: string }> = {
  MASSIVE_W: { text: "MASSIVE W", color: "text-green-400", bg: "bg-green-400/10 border-green-400/30" },
  W: { text: "WIN", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/30" },
  F: { text: "FAIR", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/30" },
  L: { text: "LOSS", color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/30" },
  MASSIVE_L: { text: "MASSIVE L", color: "text-red-400", bg: "bg-red-400/10 border-red-400/30" },
};

export default function TradeCalculator() {
  const [sideA, setSideA] = useState<MockTradeItem[]>([]);
  const [sideB, setSideB] = useState<MockTradeItem[]>([]);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSide, setActiveSide] = useState<"A" | "B" | null>(null);

  const openModal = (side: "A" | "B") => {
    setActiveSide(side);
    setIsModalOpen(true);
  };

  const handleAddItem = (item: MockTradeItem) => {
    if (activeSide === "A" && sideA.length < 9) setSideA([...sideA, item]);
    if (activeSide === "B" && sideB.length < 9) setSideB([...sideB, item]);
    setIsModalOpen(false);
  };

  const handleRemoveItem = (side: "A" | "B", index: number) => {
    if (side === "A") setSideA(sideA.filter((_, i) => i !== index));
    if (side === "B") setSideB(sideB.filter((_, i) => i !== index));
  };

  const analysis = calculateTrade(
    sideA.map(i => ({ ...i, imageUrl: i.imageUrl || "" })), 
    sideB.map(i => ({ ...i, imageUrl: i.imageUrl || "" }))
  );
  const resultData = resultConfig[analysis.result];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-8 relative">
      {/* Result Banner */}
      <div className={cn("w-full rounded-2xl border p-6 flex flex-col items-center justify-center transition-colors duration-500", resultData.bg)}>
        <h2 className={cn("text-4xl md:text-6xl font-black tracking-tight", resultData.color)}>
          {resultData.text}
        </h2>
        <p className="mt-2 text-foreground/80 font-medium">
          Difference: <span className={analysis.differenceValue >= 0 ? "text-green-400" : "text-red-400"}>
            {analysis.differenceValue > 0 ? "+" : ""}{formatValue(analysis.differenceValue)} ({analysis.differencePercentage.toFixed(1)}%)
          </span>
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-start">
        {/* SIDE A */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 p-4 flex justify-between items-center shadow-lg">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Your Offer</h3>
            <span className="font-mono text-xl text-blue-400 font-bold">{formatValue(analysis.sideATotal)}</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {sideA.map((item, i) => (
              <div key={i} className="relative group rounded-lg border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 p-3 flex flex-col items-center gap-2 hover:bg-gray-200 dark:bg-white/10 transition">
                <button 
                  onClick={() => handleRemoveItem("A", i)}
                  className="absolute -top-2 -right-2 bg-red-500 text-gray-900 dark:text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <X className="w-4 h-4" />
                </button>
                <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-md object-cover bg-white dark:bg-black/50" />
                <span className="text-[10px] font-semibold text-center leading-tight h-6 flex items-center justify-center">{item.name}</span>
                <span className="text-[10px] font-mono text-blue-400 font-bold">{formatValue(item.currentTradingValue)}</span>
              </div>
            ))}
            {Array.from({ length: 9 - sideA.length }).map((_, i) => (
              <button 
                key={`empty-a-${i}`} 
                onClick={() => openModal("A")}
                className="rounded-lg border border-dashed border-gray-200 dark:border-white/20 bg-transparent p-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-100 dark:bg-white/5 hover:border-blue-500/50 transition text-muted-foreground hover:text-blue-400 h-28"
              >
                <Plus className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-medium">Add Item</span>
              </button>
            ))}
          </div>
        </div>

        {/* VS / SWAP */}
        <div className="hidden md:flex h-full flex-col justify-center pt-16">
          <button 
            onClick={() => {
              const temp = sideA;
              setSideA(sideB);
              setSideB(temp);
            }}
            className="rounded-full bg-blue-600 p-4 text-gray-900 dark:text-white hover:bg-blue-500 transition shadow-[0_0_20px_rgba(37,99,235,0.4)]"
          >
            <ArrowRightLeft className="w-6 h-6" />
          </button>
        </div>

        {/* SIDE B */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 p-4 flex justify-between items-center shadow-lg">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Their Offer</h3>
            <span className="font-mono text-xl text-blue-400 font-bold">{formatValue(analysis.sideBTotal)}</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {sideB.map((item, i) => (
              <div key={i} className="relative group rounded-lg border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 p-3 flex flex-col items-center gap-2 hover:bg-gray-200 dark:bg-white/10 transition">
                <button 
                  onClick={() => handleRemoveItem("B", i)}
                  className="absolute -top-2 -right-2 bg-red-500 text-gray-900 dark:text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <X className="w-4 h-4" />
                </button>
                <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-md object-cover bg-white dark:bg-black/50" />
                <span className="text-[10px] font-semibold text-center leading-tight h-6 flex items-center justify-center">{item.name}</span>
                <span className="text-[10px] font-mono text-blue-400 font-bold">{formatValue(item.currentTradingValue)}</span>
              </div>
            ))}
            {Array.from({ length: 9 - sideB.length }).map((_, i) => (
              <button 
                key={`empty-b-${i}`} 
                onClick={() => openModal("B")}
                className="rounded-lg border border-dashed border-gray-200 dark:border-white/20 bg-transparent p-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-100 dark:bg-white/5 hover:border-blue-500/50 transition text-muted-foreground hover:text-blue-400 h-28"
              >
                <Plus className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-medium">Add Item</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <ItemSelectionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleAddItem}
      />
    </div>
  );
}
