// /src/app/api/verify-attendance/route.ts
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req : NextRequest) {
  try {
    const { studentId, code } = await req.json();

    // Find the attendance code and check its validity
    const attendance = await prisma.dayAttendance.findFirst({
      where: { code: parseInt(code) },
    });

    if (!attendance) {
      return NextResponse.json({ error: "Invalid attendance code" }, { status: 400 });
    }

    // Check if the attendance has expired
    const currentTime = Date.now();
    const elapsedTime = (currentTime - new Date(attendance.date).getTime()) / 1000;
    if (elapsedTime > attendance.expiryTime) {
      return NextResponse.json({ error: "Attendance code expired" }, { status: 400 });
    }

    // Check if student is already marked as present
    const alreadyPresent = await prisma.studentAttendance.findFirst({
      where: { studentId, attendanceId: attendance.id },
    });

    if (alreadyPresent) {
      return NextResponse.json({ error: "Student already marked as present" }, { status: 400 });
    }

    // Mark the student as present
    const studentAttendance = await prisma.studentAttendance.create({
      data: {
        studentId,
        attendanceId: attendance.id,
      },
    });

    return NextResponse.json({ success: "Attendance marked", studentAttendance }, { status: 200 });
  } catch (error) {
    console.error("Error in verifying attendance:", error);
    return NextResponse.json({ error: "Failed to verify attendance" }, { status: 500 });
  }
}
