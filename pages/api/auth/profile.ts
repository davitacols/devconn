import type { NextApiRequest, NextApiResponse } from 'next';
import { adminAuth } from '@/lib/config/firebase-admin.config';

// Types for request and response
interface UpdateProfileRequest {
  name: string;
  userId: string;
}

interface UpdateProfileResponse {
  message: string;
  user: {
    id: string;
    name: string | null;
    email: string | null;
  };
}

interface ErrorResponse {
  message: string;
  errors?: string[];
}

// Custom error class for better error handling
class APIError extends Error {
  statusCode: number;
  errors?: string[];

  constructor(statusCode: number, message: string, errors?: string[]) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UpdateProfileResponse | ErrorResponse>
) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { name, userId } = validateRequestBody(req.body);

    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new APIError(401, 'Unauthorized: Missing or invalid token');
    }

    const token = authHeader.split('Bearer ')[1];
    
    const decodedToken = await adminAuth.verifyIdToken(token);
    if (decodedToken.uid !== userId) {
      throw new APIError(403, 'Forbidden: Cannot update other user profiles');
    }

    await adminAuth.updateUser(userId, {
      displayName: name.trim()
    });

    const updatedUser = await adminAuth.getUser(userId);

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.uid,
        name: updatedUser.displayName,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    handleError(error, res);
  }
}

function validateRequestBody(body: any): UpdateProfileRequest {
  const errors: string[] = [];
  
  if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!body.userId || typeof body.userId !== 'string') {
    errors.push('Valid userId is required');
  }

  if (errors.length > 0) {
    throw new APIError(400, 'Invalid request data', errors);
  }

  return {
    name: body.name,
    userId: body.userId,
  };
}

function handleError(error: unknown, res: NextApiResponse<ErrorResponse>) {
  console.error('API Error:', error);

  if (error instanceof APIError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errors: error.errors,
    });
  }

  if (error instanceof Error && error.name === 'FirebaseAuthError') {
    return res.status(400).json({
      message: 'Firebase authentication error',
      errors: [error.message],
    });
  }

  return res.status(500).json({
    message: 'Internal server error',
  });
}