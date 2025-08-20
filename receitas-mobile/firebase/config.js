import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBNeIexKg_8w9cUsqJoKF3L4RlQ0UWC1WI",
  authDomain: "receitas-80e2f.firebaseapp.com",
  projectId: "receitas-80e2f",
  storageBucket: "receitas-80e2f.firebasestorage.app",
  messagingSenderId: "653430397221",
  appId: "1:653430397221:web:4f3b661acc6f397dfaa2cc"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});