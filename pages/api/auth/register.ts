// pages/api/auth/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Firebase provides user details here
    const user = userCredential.user;

    // Send the user details (e.g., user UID, email) in the response
    res.status(201).json({
      user: {
        id: user.uid,
        email: user.email,
        username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
