import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-white/10 py-6 md:py-0 bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
        <div className="flex flex-col items-center md:items-start text-sm leading-relaxed text-foreground/60 max-w-2xl">
          <p className="mb-2 text-center md:text-left">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-medium text-foreground">
              BloxFruitValuable.com
            </span>
            . All Rights Reserved. The ultimate hub for Blox Fruits trading.
          </p>
          <p className="text-[10px] md:text-xs text-center md:text-left opacity-70">
            <strong>Disclaimer:</strong> BloxFruitValue is a community-created tool and is not affiliated with, endorsed, sponsored, or specifically approved by Roblox Corporation or the creators of Blox Fruits. "Roblox" and "Blox Fruits" are trademarks of their respective owners.
          </p>
        </div>
        <div className="flex items-center space-x-4 text-sm text-foreground/60 mt-4 md:mt-0">
          <Link href="/contact" className="hover:text-blue-400 transition-colors">
            Contact Us
          </Link>
          <Link href="/about" className="hover:text-blue-400 transition-colors">
            About Us
          </Link>
          <Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-blue-400 transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
