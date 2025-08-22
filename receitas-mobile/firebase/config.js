import { initializeApp } from 'firebase/app';
import { 
  initializeAuth, 
  getReactNativePersistence, // Específico para Mobile
  indexedDBLocalPersistence  // Específico para Web
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage';
import { Platform } from 'react-native'; // 👈 Importe o Platform

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID
};

const app = initializeApp(firebaseConfig);

// 👇 Lógica para escolher a persistência correta para cada plataforma
const persistence = Platform.OS === 'web' 
  ? indexedDBLocalPersistence // Usa IndexedDB para a web
  : getReactNativePersistence(AsyncStorage); // Usa AsyncStorage para mobile

export const auth = initializeAuth(app, { persistence });
export const storage = getStorage(app);