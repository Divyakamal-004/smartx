import { PrismaClient } from '@prisma/client';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const prisma = new PrismaClient(); 
  
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    const blob = await put(filename, request.body || new Uint8Array(), {
      access: 'public',
    });

    const link = blob.url;

    const savedNote = await prisma.notes.create({
      data: {
        noteslink: link,
      },
    });
    
    console.log('Notes saved:', savedNote);
    return NextResponse.json({ link }, { status: 200 });

  } catch (error) {
    console.error('Error occurred:', error);
    return NextResponse.json({ error: 'An error occurred while processing the request' }, { status: 500 });

  }
}
