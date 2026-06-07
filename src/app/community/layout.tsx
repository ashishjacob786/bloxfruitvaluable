import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Chat",
  description: "Join the active Blox Fruits community chat. Discuss W/F/L, organize giveaways, and get admin support.",
  alternates: {
    canonical: "https://www.bloxfruitvaluable.com/community",
  },
  openGraph: {
    title: "Community Chat",
    description: "Join the active Blox Fruits community chat.",
    url: "https://www.bloxfruitvaluable.com/community",
  },
};

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
