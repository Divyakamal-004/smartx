import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const students = await prisma.user.findMany();
    console.log("Students fetched successfully.");  
    return NextResponse.json( students , { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create student user." }, { status: 500 });
  }
}
