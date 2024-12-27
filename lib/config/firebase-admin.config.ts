// lib/config/firebase-admin.config.ts
import { getApps, initializeApp, cert, ServiceAccount, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';

let adminAuth: Auth;

try {
  if (!getApps().length) {
    // Validate environment variables
    if (!process.env.FIREBASE_PROJECT_ID) {
      throw new Error('FIREBASE_PROJECT_ID is not defined');
    }
    if (!process.env.FIREBASE_CLIENT_EMAIL) {
      throw new Error('FIREBASE_CLIENT_EMAIL is not defined');
    }
    if (!process.env.FIREBASE_PRIVATE_KEY) {
      throw new Error('FIREBASE_PRIVATE_KEY is not defined');
    }

    // Parse the private key from JSON string
    const privateKeyObject = JSON.parse(process.env.FIREBASE_PRIVATE_KEY);
    
    // Debug log to check parsed private key
    console.log('Private key parsed successfully:', {
      keyExists: !!privateKeyObject.privateKey,
      keyStart: privateKeyObject.privateKey.substring(0, 27)
    });

    const serviceAccount: ServiceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKeyObject.privateKey
    };

    const app = initializeApp({
      credential: cert(serviceAccount),
    });

    console.log('Firebase Admin initialized successfully with project:', process.env.FIREBASE_PROJECT_ID);
    
    adminAuth = getAuth(app);
  } else {
    adminAuth = getAuth();
  }
} catch (error) {
  console.error('Firebase Admin initialization error:', error);
  throw error;
}

// Add this temporary debug code to verify the configuration
console.log('Environment Variables Check:', {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL?.split('@')[0] + '...',
  appsInitialized: getApps().length
});

export { adminAuth };