import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const { data, error } = await supabase.from('editors').select('*');
        if (error) throw error;

        res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching editors:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
