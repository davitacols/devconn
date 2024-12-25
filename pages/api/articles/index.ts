// pages/api/articles/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { store } from '@/lib/store'; // Adjust the path according to your project structure
import jwt from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

      // Extract title and content from request body
      const { title, content } = req.body;

      // Add the article to the store
      const article = store.addPost(title, content, decoded.userId);

      // Respond with the created article
      return res.status(201).json(article);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } else if (req.method === 'GET') {
    // Return all articles
    const articles = store.getPosts();
    return res.status(200).json(articles);
  } else {
    // Handle other methods (not allowed)
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
