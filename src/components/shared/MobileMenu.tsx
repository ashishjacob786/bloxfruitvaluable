"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, List, Calculator, ArrowRightLeft, Users } from "lucide-react";
import { usePathname } from "next/navigation";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-foreground/80 hover:text-gray-900 dark:text-white transition-colors z-50 relative"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-black/95 border-b border-gray-200 dark:border-white/10 backdrop-blur-xl shadow-2xl z-40 md:hidden animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col p-4 gap-2">
            <Link 
              href="/values-list" 
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${pathname === '/values-list' ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300'}`}
            >
              <List className="w-5 h-5" />
              <span className="font-semibold">Value List</span>
            </Link>
            <Link 
              href="/calculator" 
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${pathname === '/calculator' ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300'}`}
            >
              <Calculator className="w-5 h-5" />
              <span className="font-semibold">Calculator</span>
            </Link>
            <Link 
              href="/trading" 
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${pathname === '/trading' ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300'}`}
            >
              <ArrowRightLeft className="w-5 h-5" />
              <span className="font-semibold">Trading Hub</span>
            </Link>
            <Link 
              href="/community" 
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${pathname === '/community' ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300'}`}
            >
              <Users className="w-5 h-5" />
              <span className="font-semibold">Community</span>
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
