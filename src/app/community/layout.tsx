import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Chat | BloxFruitValuable",
  description: "Join the active Blox Fruits community chat. Discuss W/F/L, organize giveaways, and get admin support.",
  openGraph: {
    title: "Community Chat | BloxFruitValuable",
    description: "Join the active Blox Fruits community chat.",
    url: "https://bloxfruitvaluable.com/community",
  },
};

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
