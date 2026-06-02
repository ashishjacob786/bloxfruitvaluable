import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ALL_ITEMS } from "@/lib/mockData";

export async function GET() {
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

    const formattedTrades = trades.map(trade => ({
      id: trade.id,
      user: {
        name: trade.user.name || "Anonymous",
        avatar: trade.user.image || "/default-avatar.png",
        id: trade.user.id,
        discord: "", // Currently not in Prisma User schema, default to empty
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

    return NextResponse.json(formattedTrades);
  } catch (error) {
    console.error("Error fetching trades:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized. You must be logged in to post a trade." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { offering, lookingFor } = body;

    if (!offering || !Array.isArray(offering) || offering.length === 0) {
      return NextResponse.json({ error: "You must offer at least one item." }, { status: 400 });
    }

    if (!lookingFor || !Array.isArray(lookingFor) || lookingFor.length === 0) {
      return NextResponse.json({ error: "You must be looking for at least one item." }, { status: 400 });
    }

    // @ts-ignore
    const userId = session.user.id;

    const newTrade = await prisma.tradeAd.create({
      data: {
        type: 'TRADING',
        userId: userId,
        hasItems: {
          create: offering.map(item => ({ itemId: item.id }))
        },
        wantsItems: {
          create: lookingFor.map(item => ({ itemId: item.id }))
        }
      },
      include: {
        user: true,
        hasItems: true,
        wantsItems: true
      }
    });
    
    // Format response to match expected frontend interface
    const formattedNewTrade = {
      id: newTrade.id,
      user: {
        name: newTrade.user.name || "Anonymous",
        avatar: newTrade.user.image || "/default-avatar.png",
        id: newTrade.user.id,
        discord: "",
      },
      offering: offering, // Use the provided arrays to return immediate visual feedback
      lookingFor: lookingFor,
      createdAt: newTrade.createdAt.toISOString()
    };

    return NextResponse.json(formattedNewTrade, { status: 201 });
  } catch (error) {
    console.error("Trade API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
