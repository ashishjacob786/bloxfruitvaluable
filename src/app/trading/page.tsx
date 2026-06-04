import prisma from "@/lib/prisma";
import { ALL_ITEMS } from "@/lib/mockData";
import TradingHubClient from "./TradingHubClient";

// Ensure the page updates frequently but maintains good performance (ISR)
export const revalidate = 10;

async function getTrades() {
  try {
    const trades = await prisma.tradeAd.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: {
        user: true,
        hasItems: true,
        wantsItems: true
      }
    });

    return trades.map(trade => ({
      id: trade.id,
      user: {
        name: trade.user.name || "Anonymous",
        avatar: trade.user.image || "/default-avatar.png",
        id: trade.user.id,
        discord: "", // Currently not in User schema, defaults to empty
      },
      offering: trade.hasItems.map(hi => {
        const itemDetails = ALL_ITEMS.find(i => i.slug === hi.itemId || i.id === hi.itemId);
        return itemDetails ? {
          id: itemDetails.slug,
          name: itemDetails.name,
          imageUrl: itemDetails.imageUrl,
          currentTradingValue: itemDetails.currentTradingValue
        } : { id: hi.itemId, name: "Unknown", imageUrl: "", currentTradingValue: 0 };
      }),
      lookingFor: trade.wantsItems.map(wi => {
        const itemDetails = ALL_ITEMS.find(i => i.slug === wi.itemId || i.id === wi.itemId);
        return itemDetails ? {
          id: itemDetails.slug,
          name: itemDetails.name,
          imageUrl: itemDetails.imageUrl,
          currentTradingValue: itemDetails.currentTradingValue
        } : { id: wi.itemId, name: "Unknown", imageUrl: "", currentTradingValue: 0 };
      }),
      createdAt: trade.createdAt.toISOString()
    }));
  } catch (error) {
    console.error("Error fetching trades for SSR:", error);
    return [];
  }
}

export default async function TradingHubPage() {
  const initialTrades = await getTrades();

  return (
    <>
      {/* Structured Data for SEO: CollectionPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Blox Fruits Trading Hub",
            "url": "https://www.bloxfruitvaluable.com/trading",
            "description": "Post your trades and find the perfect offer for your Blox Fruits. Match with active players in real-time.",
            "publisher": {
              "@type": "Organization",
              "name": "BloxFruitValuable"
            }
          })
        }}
      />
      
      {/* Client Component for Interactivity & Live Updates */}
      <TradingHubClient initialTrades={initialTrades} />
    </>
  );
}
