import { Metadata } from "next";
import TradeCalculator from "@/components/calculator/TradeCalculator";

export const metadata: Metadata = {
  title: "Trade Calculator",
  description: "Calculate win, fair, or loss for your Blox Fruits trades in real-time.",
};

export default function CalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          Trade <span className="text-blue-500">Calculator</span> <span className="text-xl md:text-3xl text-gray-600 dark:text-gray-400 font-bold ml-2 hidden sm:inline-block">| BloxFruitValuable.com</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Add fruits or gamepasses to either side to calculate if the trade is a W, F, or L based on real-time market demands and values.
        </p>
      </div>
      
      <TradeCalculator />
    </div>
  );
}
