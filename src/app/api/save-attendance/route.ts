import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { code, expiryTime } = await req.json();
  const newCode = Number(code)
  try {
    const attendance = await prisma.dayAttendance.create({
      data: {
        date: new Date(),
        code: newCode,
        expiryTime: expiryTime,
      },
    });
    return NextResponse.json({ attendance }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save attendance" }, { status: 500 });
  }
}
