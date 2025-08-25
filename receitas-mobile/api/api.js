import axios from 'axios';
import { auth } from '../firebase/config';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, 
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;