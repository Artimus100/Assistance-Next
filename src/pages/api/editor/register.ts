import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { username, firstname, lastname, password } = req.body;
        
        // Debugging: Check if request body is coming correctly
        if (!username || !firstname || !lastname || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if username exists
        const { data: existingEditor, error: checkError } = await supabase
            .from('editors')
            .select('*')
            .eq('username', username)
            .single();

        if (checkError && checkError.code !== 'PGRST116') {
            console.error('Supabase Check Error:', checkError);
            throw checkError;
        }

        if (existingEditor) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new editor
        const { data: newEditor, error: insertError } = await supabase
            .from('editors')
            .insert({ username, firstname, lastname, password: hashedPassword })
            .select()
            .single(); // Make sure to use `.select()` to return the inserted row
        
        if (insertError) {
            console.error('Supabase Insert Error:', insertError);
            throw insertError;
        }

        // Generate JWT token
        const token = jwt.sign(
            { username, role: 'editor' },
            process.env.JWT_SECRET || 'your-secret-key', // Use environment variable
            { expiresIn: '1h' }
        );

        return res.status(201).json({ editor: newEditor, token });
    } catch (error) {
        console.error('Error registering editor:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
