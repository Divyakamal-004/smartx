import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PrismaClient } from "@prisma/client";


export async function POST(req: NextRequest) {
  const prisma = new PrismaClient(); 
  
  try {
    const { message } = await req.json();
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(message);
    const reply = result.response.text() || "No response from Gemini";
    // Save the conversation to the database
    try {
      const savedConversation = await prisma.conversation.create({
        data: {
          prompt: message,
        },
      });
      console.log("Conversation saved:", savedConversation);
    } catch (error) {
      console.error("Prisma error:", error);
    }

    return NextResponse.json({ reply }, { status: 200 });
  } catch (error) {
    console.error("Error calling chatbot:", error);
    return NextResponse.json(
      { error: "Failed to communicate with chatbot" },
      { status: 500 }
    );
  }
}
