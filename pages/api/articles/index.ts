import type { NextApiRequest, NextApiResponse } from 'next';
import { adminAuth } from '@/lib/config/firebase-admin.config';

interface ArticleResponse {
  articles?: any[];
  message?: string;
}

interface ErrorResponse {
  error: string;
  details?: string;
}

const verifyToken = async (token: string) => {
  try {
    return await adminAuth.verifyIdToken(token);
  } catch (error) {
    console.error('Token verification failed:', error);
    throw new Error('Invalid token');
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ArticleResponse | ErrorResponse>
) {
  if (!['GET', 'POST'].includes(req.method || '')) {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Invalid token format' });
    }

    const decodedToken = await verifyToken(token);
    const { uid, email } = decodedToken;

    switch (req.method) {
      case 'GET':
        // Your GET logic here
        return res.status(200).json({ articles: [] });
      
      case 'POST':
        // Your POST logic here with verified user
        // For demonstration, we're just returning a success message
        return res.status(201).json({ message: `Article created by user ${uid} with email ${email}` });
      
      default:
        // This should never be reached due to the initial method check
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ 
        error: 'Authentication failed',
        details: error.message 
      });
    }
    console.error('Unexpected error:', error);
    return res.status(500).json({ 
      error: 'Internal server error'
    });
  }
}