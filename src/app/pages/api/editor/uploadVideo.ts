/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next';

import { Request } from 'express';

interface MulterRequest extends Request {
    file: Express.Multer.File;
}
import multer from 'multer';
import { supabase } from '@/lib/supabase';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 1024 * 1024 * 1024 } }).single('video');

export const config = {
    api: { bodyParser: false },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    upload(req as unknown as MulterRequest, res as any, async (err: any) => {
        if (err) {
            res.status(500).json({ error: 'File upload failed' });
            return;
        }

        const { title, description, editorId, workspaceId } = req.body;
        const file = (req as unknown as MulterRequest).file;

        if (!file) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }

        try {
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('videos')
                .upload(`videos/${file.originalname}`, file.buffer, {
                    contentType: 'video/mp4',
                });
            if (uploadError) throw uploadError;

            const { data: content, error: insertError } = await supabase
                .from('contents')
                .insert({
                    title,
                    description,
                    videoFile: uploadData.path,
                    status: 'PENDING',
                    editorId: parseInt(editorId),
                    workspaceId: parseInt(workspaceId),
                })
                .single();
            if (insertError) throw insertError;

            res.status(201).json({ message: 'Video uploaded successfully', content });
        } catch (error) {
            console.error('Error saving video:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
