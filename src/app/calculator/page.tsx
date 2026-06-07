import { Metadata } from "next";
import TradeCalculator from "@/components/calculator/TradeCalculator";

export const metadata: Metadata = {
  title: "Blox Fruits Trade Calculator — W/F/L Checker",
  description: "Calculate win, fair, or loss for your Blox Fruits trades in real-time.",
  alternates: {
    canonical: "https://www.bloxfruitvaluable.com/calculator",
  },
  openGraph: {
    title: "Blox Fruits Trade Calculator — W/F/L Checker",
    description: "Calculate win, fair, or loss for your Blox Fruits trades in real-time.",
    url: "https://www.bloxfruitvaluable.com/calculator",
  },
};

export default function CalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          Trade <span className="text-blue-500">Calculator</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
          Add fruits or gamepasses to either side to calculate if the trade is a W, F, or L based on real-time market demands and values.
        </p>
      </div>
      
      <TradeCalculator />

      {/* SEO Text Expansion for Thin Content Issue - Moved below calculator for mobile UX */}
      <div className="text-left max-w-4xl mx-auto mt-12 p-6 bg-gray-50 dark:bg-[#0a0a0f]/50 border border-gray-200 dark:border-white/5 rounded-2xl">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">How the Blox Fruits Trade Calculator Works</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Our <strong>Blox Fruits Trade Calculator</strong> uses real-time market data gathered from top trading communities, discord servers, and in-game polls to determine the exact value of every fruit, gamepass, and physical item. When you add items to the "You" side and the "Them" side, our algorithm instantly compares the total physical and permanent values.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          A trade is considered a <strong>Win (W)</strong> if the value you receive is higher than what you give. A <strong>Fair (F)</strong> trade means both sides are within a 5% margin of each other, ensuring neither player is getting scammed. A <strong>Loss (L)</strong> indicates you are overpaying. Use this tool before every major trade to secure the best deals!
        </p>
      </div>
      {/* Structured Data for SEO: SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Blox Fruits Trade Calculator",
            "operatingSystem": "Web Browser",
            "applicationCategory": "GameApplication",
            "url": "https://www.bloxfruitvaluable.com/calculator",
            "description": "Calculate win, fair, or loss for your Blox Fruits trades in real-time based on market demands.",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          }),
        }}
      />
    </div>
  );
}
