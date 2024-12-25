import { NextApiRequest, NextApiResponse } from 'next';
import { store } from '@/lib/store';
import jwt from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid post ID' });
  }

  const post = store.getPost(id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  if (req.method === 'GET') {
    res.status(200).json(post);
  } else if (req.method === 'PUT') {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
      if (decoded.userId !== post.authorId) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      const { title, content } = req.body;
      const updatedPost = store.updatePost(id, title, content);
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  } else if (req.method === 'DELETE') {
    // Implement delete functionality
    res.status(405).json({ message: 'Method not implemented' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

