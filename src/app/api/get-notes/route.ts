import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const prisma = new PrismaClient();

  try {
    const notes = await prisma.notes.findMany();
    console.log("Notes fetch successfully ");
    return NextResponse.json(notes , { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to get notes" }, { status: 500 });
  }
}
