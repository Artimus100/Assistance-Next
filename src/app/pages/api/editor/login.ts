import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const { username, password, role } = req.body;

        const { data: editor, error } = await supabase
            .from(role === 'editor' ? 'editors' : 'youtubers')
            .select('*')
            .eq('username', username)
            .single();

        if (error || !editor) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, editor.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const token = jwt.sign(
            { username: editor.username, role },
            'your-secret-key',
            { expiresIn: '1h' }
        );
        res.status(200).json({ message: 'Login successful', editor, token });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
