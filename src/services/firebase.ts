import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  initializeFirestore, 
  getFirestore, 
  Firestore 
} from 'firebase/firestore';
import config from '../../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
};

// Initialize Firebase App instance safely (singleton pattern)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore Database instance with long-polling enabled to prevent iframe/proxy streaming timeouts
let firestoreInstance: Firestore;
try {
  firestoreInstance = initializeFirestore(
    app,
    {
      experimentalForceLongPolling: true,
    },
    config.firestoreDatabaseId || undefined
  );
} catch {
  firestoreInstance = getFirestore(app, config.firestoreDatabaseId || undefined);
}

export const db: Firestore = firestoreInstance;

export default app;

