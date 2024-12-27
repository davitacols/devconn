// utils/auth.ts
import { getAuth } from 'firebase/auth';
import { app } from '@/lib/firebase.config';

const auth = getAuth(app);

export const getAuthToken = async () => {
  const currentUser = auth.currentUser;
  
  if (!currentUser) {
    throw new Error('No user is currently signed in');
  }

  // Force token refresh to ensure we get the latest token
  const token = await currentUser.getIdToken(true);
  return token;
};

// Example API call function
export const createArticle = async (articleData: any) => {
  try {
    const token = await getAuthToken();
    
    const response = await fetch('/api/articles', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
};