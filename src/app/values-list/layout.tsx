import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blox Fruits Value List | Real-Time Live Tier List",
  description: "Check the exact, up-to-date trading values for every Fruit, Gamepass, and Scroll in Blox Fruits. Filter by physical or permanent value.",
  openGraph: {
    title: "Blox Fruits Value List | Real-Time Live Tier List",
    description: "Check the exact, up-to-date trading values for every Fruit, Gamepass, and Scroll in Blox Fruits.",
    url: "https://bloxfruitvaluable.com/values-list",
  },
};

export default function ValuesListLayout({ children }: { children: React.ReactNode }) {
  return children;
}
