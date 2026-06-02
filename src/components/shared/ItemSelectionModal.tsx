import { useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ALL_ITEMS, MockTradeItem, Category } from "@/lib/mockData";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: MockTradeItem) => void;
};

export default function ItemSelectionModal({ isOpen, onClose, onSelect }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"All" | Category>("All");

  if (!isOpen) return null;

  const filteredItems = ALL_ITEMS.filter(item => {
    const matchesFilter = activeFilter === "All" || item.category === activeFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getCount = (category: Category) => ALL_ITEMS.filter(i => i.category === category).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0a0a0f] border border-gray-200 dark:border-white/10 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/10">
          <div className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Search className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-xl font-bold">Search Items</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:bg-white/10 rounded-full transition text-muted-foreground hover:text-gray-900 dark:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 flex flex-col gap-4 flex-1 overflow-hidden">
          <p className="text-sm text-muted-foreground -mt-2">
            Search and select an item to add to your trade
          </p>
          
          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2 justify-center py-2">
            <button 
              onClick={() => setActiveFilter("All")}
              className={cn("px-4 py-1.5 rounded-full text-sm font-medium transition", activeFilter === "All" ? "bg-gray-300 dark:bg-white/20 text-gray-900 dark:text-white" : "bg-transparent text-muted-foreground hover:bg-gray-100 dark:bg-white/5 hover:text-gray-900 dark:text-white")}
            >
              All
            </button>
            <button 
              onClick={() => setActiveFilter("FRUITS")}
              className={cn("px-4 py-1.5 rounded-full text-sm font-medium transition flex items-center gap-2", activeFilter === "FRUITS" ? "bg-blue-600 text-gray-900 dark:text-white" : "bg-gray-100 dark:bg-white/5 text-muted-foreground hover:bg-gray-200 dark:bg-white/10 hover:text-gray-900 dark:text-white")}
            >
              Fruits <span className="bg-white dark:bg-black/30 px-1.5 py-0.5 rounded-md text-[10px]">{getCount("FRUITS")}</span>
            </button>
            <button 
              onClick={() => setActiveFilter("GAMEPASSES")}
              className={cn("px-4 py-1.5 rounded-full text-sm font-medium transition flex items-center gap-2", activeFilter === "GAMEPASSES" ? "bg-blue-600 text-gray-900 dark:text-white" : "bg-gray-100 dark:bg-white/5 text-muted-foreground hover:bg-gray-200 dark:bg-white/10 hover:text-gray-900 dark:text-white")}
            >
              Gamepasses <span className="bg-white dark:bg-black/30 px-1.5 py-0.5 rounded-md text-[10px]">{getCount("GAMEPASSES")}</span>
            </button>
            <button 
              onClick={() => setActiveFilter("LIMITEDS")}
              className={cn("px-4 py-1.5 rounded-full text-sm font-medium transition flex items-center gap-2", activeFilter === "LIMITEDS" ? "bg-blue-600 text-gray-900 dark:text-white" : "bg-gray-100 dark:bg-white/5 text-muted-foreground hover:bg-gray-200 dark:bg-white/10 hover:text-gray-900 dark:text-white")}
            >
              Limiteds <span className="bg-white dark:bg-black/30 px-1.5 py-0.5 rounded-md text-[10px]">{getCount("LIMITEDS")}</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-black/40 pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
            />
          </div>

          {/* Item Grid */}
          <div className="bg-white dark:bg-black/20 border border-gray-200 dark:border-white/5 rounded-xl flex-1 overflow-y-auto p-4 custom-scrollbar">
            <div className="text-sm font-medium text-muted-foreground mb-4">
              Available Items <span className="bg-gray-200 dark:bg-white/10 px-2 py-0.5 rounded text-gray-900 dark:text-white ml-2">{filteredItems.length}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelect(item);
                    setSearchQuery(""); // Reset search after selection
                  }}
                  className="group flex flex-col items-center justify-center p-3 rounded-xl border border-gray-200 dark:border-white/5 bg-gray-100 dark:bg-white/5 hover:bg-blue-600/20 hover:border-blue-500/50 transition-all text-left"
                >
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
                  <span className="mt-3 text-sm font-bold text-gray-900 dark:text-white text-center leading-tight line-clamp-2">{item.name}</span>
                  <span className="mt-1 text-[10px] font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">{item.category}</span>
                </button>
              ))}
            </div>
            {filteredItems.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No items found matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
