import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Use initializeFirestore with settings for better reliability in restricted environments
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true, // Helps bypass some proxy/websocket issues
}, firebaseConfig.firestoreDatabaseId);

export const auth = getAuth(app);
