"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ALL_ITEMS } from "@/lib/mockData";

export default function LiveSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Filter items based on search term
  const filteredItems = searchTerm.trim() === "" 
    ? [] 
    : ALL_ITEMS.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 6); // Limit to 6 results for the dropdown

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filteredItems.length > 0) {
      router.push(`/item/${filteredItems[0].slug}`);
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  return (
    <div ref={wrapperRef} className="w-full max-w-sm hidden lg:flex items-center relative z-50">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search fruits, scrolls..."
        className="h-9 w-full rounded-full border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 px-8 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 text-gray-900 dark:text-white shadow-inner transition-all focus:bg-gray-200 dark:bg-white/10"
      />

      {/* Dropdown Menu */}
      {isOpen && searchTerm.trim().length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-[#12121c]/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col z-[100] max-h-[70vh] overflow-y-auto">
          {filteredItems.length > 0 ? (
            <div className="p-2 flex flex-col gap-1">
              <div className="px-3 py-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Search Results</div>
              {filteredItems.map((item) => (
                <Link
                  href={`/item/${item.slug}`}
                  key={item.id}
                  onClick={() => {
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:bg-white/10 transition group"
                >
                  <div className="w-10 h-10 rounded-md bg-white dark:bg-black/40 border border-gray-200 dark:border-white/5 p-1 flex items-center justify-center shrink-0">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-blue-400 transition">{item.name}</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{item.category} • {item.rarity}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-600 dark:text-gray-400 text-sm">
              No items found for "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
