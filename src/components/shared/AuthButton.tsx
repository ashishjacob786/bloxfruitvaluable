"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AuthButton({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if (!user) {
    return (
      <Link href={`/login?callbackUrl=${pathname}`} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 bg-blue-600 text-gray-900 dark:text-white hover:bg-blue-600/90 h-9 px-4 py-2 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
        Login
      </Link>
    );
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 border border-gray-200 dark:border-white/10 rounded-full p-1 pr-3 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:bg-white/10 transition-colors"
      >
        <img src={user.avatarUrl} alt={user.username} className="w-7 h-7 rounded-full bg-white dark:bg-black" />
        <span className="text-sm font-semibold text-gray-900 dark:text-white max-w-[100px] truncate">{user.username}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-[#1a1a1a] border border-gray-200 dark:border-white/10 ring-1 ring-black ring-opacity-5 z-50">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-white/10">
            <p className="text-sm text-gray-900 dark:text-white font-medium truncate">{user.displayName}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">@{user.username}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center px-4 py-2 text-sm text-red-400 hover:bg-gray-100 dark:bg-white/5 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
