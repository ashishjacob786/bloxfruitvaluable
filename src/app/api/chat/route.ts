import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic") || "General";
  
  try {
    const messages = await prisma.chatMessage.findMany({
      where: { topic },
      include: {
        user: true,
        replyTo: {
          include: { user: true }
        },
        viewedBy: true,
      },
      orderBy: { timestamp: 'asc' },
      take: 200,
    });

    const formattedMessages = messages.map(m => ({
      id: m.id,
      topic: m.topic,
      user: {
        id: m.user.id,
        name: m.user.name || "Anonymous",
        avatar: m.user.image || "/default-avatar.png",
      },
      text: m.text,
      timestamp: m.timestamp.toISOString(),
      replyTo: m.replyTo ? {
        id: m.replyTo.id,
        name: m.replyTo.user.name || "Anonymous",
        text: m.replyTo.text,
      } : undefined,
      viewedBy: m.viewedBy.map(v => v.userId),
    }));

    return NextResponse.json(formattedMessages);
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    return NextResponse.json([], { status: 500 });
  }
}

// Simple in-memory rate limiter
const RATE_LIMIT_MAP = new Map<string, number>();
const ALLOWED_TOPICS = ["General", "Trading", "W-F-L", "Giveaways", "Admin Support"];

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    let { text, topic, replyTo } = body;

    if (!text || !topic) {
      return NextResponse.json({ error: "Missing text or topic" }, { status: 400 });
    }

    if (!ALLOWED_TOPICS.includes(topic)) {
      return NextResponse.json({ error: "Invalid topic" }, { status: 400 });
    }

    if (text.length > 250) {
      return NextResponse.json({ error: "Message too long (max 250 characters)." }, { status: 400 });
    }

    text = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // @ts-ignore
    const userId = session.user.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = Date.now();
    const lastMessageTime = RATE_LIMIT_MAP.get(userId);
    
    if (lastMessageTime && now - lastMessageTime < 2000) {
      return NextResponse.json({ error: "Too many requests. Please wait 2 seconds." }, { status: 429 });
    }
    RATE_LIMIT_MAP.set(userId, now);

    const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?)/gi;
    if (urlRegex.test(text)) {
      return NextResponse.json(
        { error: "Links are not allowed in the community chat." },
        { status: 403 }
      );
    }

    const newMessage = await prisma.chatMessage.create({
      data: {
        text,
        topic,
        userId: userId,
        replyToId: replyTo?.id || null,
        viewedBy: {
          create: {
            userId: userId
          }
        }
      },
      include: {
        user: true,
        replyTo: { include: { user: true } },
        viewedBy: true,
      }
    });
    
    const formattedMessage = {
      id: newMessage.id,
      topic: newMessage.topic,
      user: {
        id: newMessage.user.id,
        name: newMessage.user.name || "Anonymous",
        avatar: newMessage.user.image || "/default-avatar.png",
      },
      text: newMessage.text,
      timestamp: newMessage.timestamp.toISOString(),
      replyTo: newMessage.replyTo ? {
        id: newMessage.replyTo.id,
        name: newMessage.replyTo.user.name || "Anonymous",
        text: newMessage.replyTo.text,
      } : undefined,
      viewedBy: newMessage.viewedBy.map(v => v.userId),
    };

    return NextResponse.json(formattedMessage, { status: 201 });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { messageIds } = body;

    if (!messageIds || !Array.isArray(messageIds) || messageIds.length === 0) {
      return NextResponse.json({ error: "Missing messageIds" }, { status: 400 });
    }

    // @ts-ignore
    const userId = session.user.id;
    if (!userId) {
       return NextResponse.json({ error: "No user ID" }, { status: 401 });
    }

    const viewRecords = messageIds.map(msgId => ({
      messageId: msgId,
      userId: userId,
    }));

    await prisma.messageView.createMany({
      data: viewRecords,
      skipDuplicates: true,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("View API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
