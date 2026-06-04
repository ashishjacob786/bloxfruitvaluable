import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trading Hub | Find Trades Instantly",
  description: "Post your trades and find the perfect offer for your Blox Fruits. Match with active players in real-time.",
  alternates: {
    canonical: "https://www.bloxfruitvaluable.com/trading",
  },
  openGraph: {
    title: "Trading Hub | Find Trades Instantly",
    description: "Post your trades and find the perfect offer for your Blox Fruits.",
    url: "https://www.bloxfruitvaluable.com/trading",
  },
};

export default function TradingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
