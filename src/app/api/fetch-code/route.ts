import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function saveAttendance(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { code, expiryTime } = req.body;
    
    try {
      const attendance = await prisma.dayAttendance.create({
        data: {
          date: new Date(),
          code,
          expiryTime,
        },
      });
      
      res.status(200).json({ attendance });
    } catch (error) {
      res.status(500).json({ error: "Failed to save attendance" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
