// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Sign in user using Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;

    // Create a JWT token
    const token = jwt.sign({ userId: user.uid }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    // Return the token to the client
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid credentials' });
  }
}
