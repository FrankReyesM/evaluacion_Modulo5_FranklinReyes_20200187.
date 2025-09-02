import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyB_dCPdEGLDBESFKPDH88-IPOfpDp0AV0c",
  authDomain: "heteroevaluacion-ace9e.firebaseapp.com",
  projectId: "heteroevaluacion-ace9e",
  storageBucket: "heteroevaluacion-ace9e.firebasestorage.app",
  messagingSenderId: "659167588651",
  appId: "1:659167588651:web:f7595e5f6c72205450956e",
  measurementId: "G-1E84KE6L9K"
};

const app = initializeApp(firebaseConfig);

// Configuración correcta de Auth para React Native con persistencia
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);