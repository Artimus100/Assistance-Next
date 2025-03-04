import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const { workspaceId } = req.query;

        const { data: workspace, error } = await supabase
            .from('workspaces')
            .select('*')
            .eq('id', workspaceId)
            .single();
        if (error) throw error;
        if (!workspace) {
            res.status(404).json({ error: 'Workspace not found' });
            return;
        }

        res.status(200).json({ message: 'Workspace found', workspace });
    } catch (error) {
        console.error('Error checking workspace:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
