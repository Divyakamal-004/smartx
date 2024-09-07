import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const {name, studentId } = await req.json();
  const newStudentId = Number(studentId)
  try {
    const student = await prisma.user.create({
      data: {
        name,
        id: newStudentId,
      },
    });
    return NextResponse.json({ student }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create student user." }, { status: 500 });
  }
}
