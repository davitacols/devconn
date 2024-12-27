// pages/api/auth/register.ts
import { auth } from '@lib/firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return res.status(200).json({ 
      message: 'User created successfully',
      uid: user.uid 
    });
  } catch (error: any) {
    console.error('Error creating user:', error);
    return res.status(400).json({ 
      error: error.message || 'Error creating user' 
    });
  }
}