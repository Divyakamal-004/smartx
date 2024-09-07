import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const conversations = await prisma.conversation.findMany({
      select: {
        prompt: true,
      },
    });

    console.log(conversations);
    const prompts = conversations.map((conversation) => conversation.prompt);
    return NextResponse.json({ prompts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompts" },
      { status: 500 }
    );
  }
}
