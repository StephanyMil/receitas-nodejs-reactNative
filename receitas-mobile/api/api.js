import axios from 'axios';
import { auth } from '../firebase/config';

const api = axios.create({
  baseURL: 'http://192.168.136.111:3000/api', 
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