import { Metadata } from "next";
import Link from "next/link";
import { ALL_ITEMS } from "@/lib/mockData";
import ItemClient from "./ItemClient";
import { formatValue } from "@/lib/calculator";

// Generate metadata dynamically for each item
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = ALL_ITEMS.find((i) => i.slug.toLowerCase() === slug.toLowerCase());

  if (!item) {
    return {
      title: "Item Not Found | BloxFruitValuable.com",
    };
  }

  const title = `${item.name} Value - Real Time Trades & Info | BloxFruitValuable.com`;
  const description = `Live ${item.name} value is ${formatValue(item.currentTradingValue)}. Check out the latest trading trends, demand, and details for ${item.name} in Blox Fruits.`;

  return {
    title: `${item.name} Value - ${formatValue(item.currentTradingValue)}`,
    description,
    keywords: [`${item.name} value`, `blox fruits ${item.name}`, `${item.name} trading`, `blox fruits values`, item.category.toLowerCase()],
    alternates: {
      canonical: `https://www.bloxfruitvaluable.com/item/${item.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://bloxfruitvaluable.com/item/${item.slug}`,
      siteName: "BloxFruitValuable",
      images: [
        {
          url: item.imageUrl,
          width: 800,
          height: 800,
          alt: `${item.name} in Blox Fruits`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [item.imageUrl],
    },
  };
}

export default async function ItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = ALL_ITEMS.find((i) => i.slug.toLowerCase() === slug.toLowerCase());

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Item Not Found</h1>
        <p className="text-muted-foreground mb-8">The item you are looking for does not exist or has been removed.</p>
        <Link href="/values-list" className="bg-blue-600 hover:bg-blue-700 text-gray-900 dark:text-white px-6 py-3 rounded-full font-bold transition">
          Return to Value List
        </Link>
      </div>
    );
  }

  return (
    <>
      <ItemClient item={item} />
    </>
  );
}
