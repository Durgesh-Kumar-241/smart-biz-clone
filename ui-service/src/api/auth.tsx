import axios from 'axios';
import type { User } from '../context/AuthContext';

const API_BASE = 'http://localhost/auth-service/api/auth'; // your backend auth endpoint

export const loginUser = async (email: string, password: string): Promise<User> => {
  const res = await axios.post<User>(`${API_BASE}/login`, { email, password });
  return res.data;
};

export const signupUser = async (email: string, password: string, role: string): Promise<User> => {
  const res = await axios.post<User>(`${API_BASE}/signup`, { email, password, role });
  return res.data;
};
