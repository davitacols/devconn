import { NextApiRequest, NextApiResponse } from 'next';
import { store } from '@/lib/store';
import jwt from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
      const { title, content } = req.body;
      const post = store.addPost(title, content, decoded.userId);
      res.status(201).json(post);
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  } else if (req.method === 'GET') {
    const posts = store.getPosts();
    res.status(200).json(posts);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

