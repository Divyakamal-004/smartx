import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// The POST handler
export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body for the prompt message
    const { message } = await req.json();

    // Initialize the Google Generative AI with your API key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    
    // Fetch the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Generate content based on the user's message
    const result = await model.generateContent(message);
    
    // Extract the AI's response text
    const reply = result.response.text();

    // Return the reply to the frontend
    return NextResponse.json({ reply }, { status: 200 });

  } catch (error) {
    console.error("Error calling chatbot:", error);
    return NextResponse.json({ error: "Failed to communicate with chatbot" }, { status: 500 });
  }
}
