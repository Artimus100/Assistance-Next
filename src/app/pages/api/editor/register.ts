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
        const { username, firstname, lastname, password } = req.body;

        // Check if username exists
        const { data: existingEditor, error: checkError } = await supabase
            .from('editors')
            .select('*')
            .eq('username', username)
            .single();
        if (checkError && checkError.code !== 'PGRST116') throw checkError;
        if (existingEditor) {
            res.status(400).json({ error: 'Username already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert editor
        const { data: newEditor, error: insertError } = await supabase
            .from('editors')
            .insert({ username, firstname, lastname, password: hashedPassword })
            .single();
        if (insertError) throw insertError;

        const token = jwt.sign({ username, role: 'editor' }, 'your-secret-key', { expiresIn: '1h' });
        res.status(201).json({ editor: newEditor, token });
    } catch (error) {
        console.error('Error registering editor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
