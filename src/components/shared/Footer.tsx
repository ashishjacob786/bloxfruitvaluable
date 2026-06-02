import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-white/10 py-6 md:py-0 bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4 md:px-6">
        <p className="text-center text-sm leading-loose text-foreground/60 md:text-left">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-medium text-foreground">
            BloxFruitValuable.com
          </span>
          . All Rights Reserved. The ultimate hub for Blox Fruits trading.
        </p>
        <div className="flex items-center space-x-4 text-sm text-foreground/60">
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
