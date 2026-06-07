import Link from "next/link";
import { Calculator, List, Users, Search, ArrowRightLeft, Menu } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AuthButton from "./AuthButton";
import MobileMenu from "./MobileMenu";
import LiveSearch from "./LiveSearch";

export default async function Navbar() {
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error("NextAuth session error:", error);
  }
  const user = session?.user || null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/50 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <img 
            src="/Official_logo.png" 
            alt="Blox Fruit Valuable Logo" 
            className="h-10 w-10 object-contain drop-shadow-[0_0_10px_rgba(37,99,235,0.5)]" 
          />
          <span className="hidden sm:inline-flex flex-col ml-1">
            <span className="font-bold text-xl tracking-tight leading-none">
              Blox Fruit <span className="text-blue-500">Valuable</span>
            </span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase leading-none mt-0.5">
              Blox Fruits Value
            </span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/values-list" className="transition-colors hover:text-blue-400 text-foreground/80 flex items-center gap-2">
            <List className="w-4 h-4" /> Value List
          </Link>
          <Link href="/calculator" className="transition-colors hover:text-blue-400 text-foreground/80 flex items-center gap-2">
            <Calculator className="w-4 h-4" /> Calculator
          </Link>
          <Link href="/trading" className="transition-colors hover:text-blue-400 text-foreground/80 flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4" /> Trading Hub
          </Link>
          <Link href="/community" className="transition-colors hover:text-blue-400 text-foreground/80 flex items-center gap-2">
            <Users className="w-4 h-4" /> Community
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <LiveSearch />
          <nav className="flex items-center space-x-2">
            <AuthButton user={user} />
            <MobileMenu />
          </nav>
        </div>
      </div>
    </header>
  );
}
