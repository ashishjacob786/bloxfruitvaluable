"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, ArrowLeft, Send, LogIn } from "lucide-react";
import Link from "next/link";
import { MockTradeItem } from "@/lib/mockData";
import ItemSelectionModal from "@/components/shared/ItemSelectionModal";
import { formatValue } from "@/lib/calculator";

export default function CreateTradeAdPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [offering, setOffering] = useState<MockTradeItem[]>([]);
  const [lookingFor, setLookingFor] = useState<MockTradeItem[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSide, setActiveSide] = useState<"OFFERING" | "LOOKING_FOR" | null>(null);

  const [discordTag, setDiscordTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Check auth
  useEffect(() => {
    fetch("/api/auth/session")
      .then(res => res.json())
      .then(data => {
        if (data && data.user) {
          setUser(data.user);
        }
        setLoadingAuth(false);
      })
      .catch(() => setLoadingAuth(false));
  }, []);

  const openModal = (side: "OFFERING" | "LOOKING_FOR") => {
    setActiveSide(side);
    setIsModalOpen(true);
  };

  const handleAddItem = (item: MockTradeItem) => {
    if (activeSide === "OFFERING" && offering.length < 9) setOffering([...offering, item]);
    if (activeSide === "LOOKING_FOR" && lookingFor.length < 9) setLookingFor([...lookingFor, item]);
    setIsModalOpen(false);
  };

  const handleRemoveItem = (side: "OFFERING" | "LOOKING_FOR", index: number) => {
    if (side === "OFFERING") setOffering(offering.filter((_, i) => i !== index));
    if (side === "LOOKING_FOR") setLookingFor(lookingFor.filter((_, i) => i !== index));
  };

  const handlePostTrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setErrorMsg("You must be logged in to post a trade.");
      return;
    }
    if (offering.length === 0 || lookingFor.length === 0) {
      setErrorMsg("You must select at least one item to offer and one item to look for.");
      return;
    }
    
    setErrorMsg("");
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/trades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offering, lookingFor, discordTag })
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to post trade.");
      }
      
      // Success!
      router.push("/trading");
    } catch (err: any) {
      setErrorMsg(err.message);
      setIsSubmitting(false);
    }
  };

  const offeringTotal = offering.reduce((sum, i) => sum + i.currentTradingValue, 0);
  const lookingForTotal = lookingFor.reduce((sum, i) => sum + i.currentTradingValue, 0);

  if (loadingAuth) return <div className="min-h-[80vh] flex items-center justify-center"><div className="animate-pulse w-10 h-10 bg-blue-600 rounded-full" /></div>;

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Login Required</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">You must be logged in to create a trade advertisement.</p>
        <Link href="/login?callbackUrl=/trading/new" className="bg-blue-600 hover:bg-blue-500 text-gray-900 dark:text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all hover:scale-105">
          <LogIn className="w-5 h-5" /> Login to Continue
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/trading" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gray-900 dark:text-white transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Feed
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Create Trade Ad</h1>
        <p className="text-muted-foreground">Post your trade offer to the community.</p>
      </div>

      <form onSubmit={handlePostTrade} className="flex flex-col gap-8">
        
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-medium">
            {errorMsg}
          </div>
        )}
        
        {/* Item Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Offering */}
          <div className="bg-[#0a0a0f] border border-gray-200 dark:border-white/10 rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 dark:border-white/10">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Items You're Offering</h3>
              <span className="font-mono text-sm text-blue-400 font-bold">{formatValue(offeringTotal)}</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {offering.map((item, i) => (
                <div key={i} className="relative group rounded-lg border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 p-2 flex flex-col items-center gap-2 hover:bg-gray-200 dark:bg-white/10 transition">
                  <button 
                    type="button"
                    onClick={() => handleRemoveItem("OFFERING", i)}
                    className="absolute -top-2 -right-2 bg-red-500 text-gray-900 dark:text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-contain drop-shadow" />
                  <span className="text-[9px] font-bold text-center leading-tight">{item.name}</span>
                </div>
              ))}
              {Array.from({ length: 9 - offering.length }).map((_, i) => (
                <button 
                  type="button"
                  key={`empty-offering-${i}`} 
                  onClick={() => openModal("OFFERING")}
                  className="rounded-lg border border-dashed border-gray-200 dark:border-white/20 bg-transparent p-2 flex flex-col items-center justify-center gap-1 hover:bg-gray-100 dark:bg-white/5 hover:border-blue-500/50 transition h-24"
                >
                  <Plus className="w-5 h-5 text-muted-foreground mb-1" />
                </button>
              ))}
            </div>
          </div>

          {/* Looking For */}
          <div className="bg-[#0a0a0f] border border-gray-200 dark:border-white/10 rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 dark:border-white/10">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Items You Want</h3>
              <span className="font-mono text-sm text-blue-400 font-bold">{formatValue(lookingForTotal)}</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {lookingFor.map((item, i) => (
                <div key={i} className="relative group rounded-lg border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 p-2 flex flex-col items-center gap-2 hover:bg-gray-200 dark:bg-white/10 transition">
                  <button 
                    type="button"
                    onClick={() => handleRemoveItem("LOOKING_FOR", i)}
                    className="absolute -top-2 -right-2 bg-red-500 text-gray-900 dark:text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-contain drop-shadow" />
                  <span className="text-[9px] font-bold text-center leading-tight">{item.name}</span>
                </div>
              ))}
              {Array.from({ length: 9 - lookingFor.length }).map((_, i) => (
                <button 
                  type="button"
                  key={`empty-looking-${i}`} 
                  onClick={() => openModal("LOOKING_FOR")}
                  className="rounded-lg border border-dashed border-gray-200 dark:border-white/20 bg-transparent p-2 flex flex-col items-center justify-center gap-1 hover:bg-gray-100 dark:bg-white/5 hover:border-blue-500/50 transition h-24"
                >
                  <Plus className="w-5 h-5 text-muted-foreground mb-1" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-[#0a0a0f] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-lg flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-4 border-r border-gray-200 dark:border-white/10 pr-6 w-full md:w-auto">
            <img src={user.avatarUrl || user.image || "/default-avatar.png"} alt="avatar" className="w-12 h-12 rounded-full border-2 border-blue-500" />
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Posting as</p>
              <p className="font-bold text-gray-900 dark:text-white">{user.username || user.name}</p>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <label className="text-sm text-muted-foreground font-medium mb-2 block">Discord Tag (Optional)</label>
            <input 
              type="text" 
              value={discordTag}
              onChange={(e) => setDiscordTag(e.target.value)}
              placeholder="e.g. username#1234 (For faster communication)"
              className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 px-4 py-3 text-gray-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-shadow"
            />
          </div>
        </div>

        {/* Submit */}
        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-500 text-gray-900 dark:text-white font-black text-lg py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2"><span className="w-5 h-5 border-2 border-gray-200 dark:border-white/30 border-t-white rounded-full animate-spin"></span> Publishing Securely...</span>
          ) : (
            <><Send className="w-5 h-5" /> Publish Real Trade Ad</>
          )}
        </button>
      </form>

      <ItemSelectionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleAddItem}
      />
    </div>
  );
}
