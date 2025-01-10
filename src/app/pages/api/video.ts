/* eslint-disable @typescript-eslint/no-unused-vars */
// pages/api/videos.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { video } = req.body;
    // Handle video upload logic here (e.g., save to database, integrate YouTube API, etc.)
    res.status(200).json({ message: 'Video uploaded successfully' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
