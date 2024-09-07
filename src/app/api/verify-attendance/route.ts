import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { studentId, code } = await req.json();
    console.log('Received payload:', { studentId, code });

    // Ensure student exists
    const studentExists = await prisma.user.findUnique({
      where: { id: parseInt(studentId) },
    });

    if (!studentExists) {
      console.log('Student does not exist:', studentId);
      return NextResponse.json({ error: "Student does not exist" }, { status: 400 });
    }

    const attendance = await prisma.dayAttendance.findFirst({
      where: { code: parseInt(code) },
    });
    console.log("fetched code " + attendance?.code);

    if (!attendance) {
      console.log('Invalid attendance code:', code);
      return NextResponse.json({ error: "Invalid attendance code" }, { status: 400 });
    }

    // Check if the attendance has expired
    const currentTime = Date.now();
    const elapsedTime = (currentTime - new Date(attendance.date).getTime()) / 1000;
    console.log('Elapsed time:', elapsedTime);

    if (elapsedTime > 120) {
      console.log('Attendance code expired:', code);
      return NextResponse.json({ error: "Attendance code expired" }, { status: 400 });
    }

    const studentAttendance = await prisma.studentAttendance.create({
      data: {
        studentId: parseInt(studentId),
        attendanceId: attendance.id,
        isPresent: true,
      },
    });

    // If all checks pass, return success response
    // return NextResponse.json({studentAttendance}, { status: 200 });
    return NextResponse.json({ success: "Attendance marked successfully", studentAttendance }, { status: 200 });

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
