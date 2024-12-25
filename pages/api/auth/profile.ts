// pages/api/auth/profile.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/lib/firebase';
import { updateProfile } from 'firebase/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const user = auth.currentUser;

    if (user) {
      await updateProfile(user, { displayName: name });

      res.status(200).json({
        message: 'Profile updated successfully',
        user: {
          id: user.uid,
          name: user.displayName,
          email: user.email,
        },
      });
    } else {
      res.status(400).json({ message: 'User not authenticated' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
