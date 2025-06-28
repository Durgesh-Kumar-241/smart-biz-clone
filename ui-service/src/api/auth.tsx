import axios from 'axios';

const API_BASE = 'http://localhost/auth-service/api/auth'; // your backend auth endpoint

export const loginUser = async (email: string, password: string): Promise<string> => {
  const res = await axios.post(`${API_BASE}/login`, { email, password });
  return res.data.token;
};

export const signupUser = async (email: string, password: string, role: string): Promise<string> => {
  const res = await axios.post(`${API_BASE}/signup`, { email, password, role });
  return res.data.token;
};
