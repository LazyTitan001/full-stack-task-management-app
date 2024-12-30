import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const loginAdmin = async (credentials) => {
  const response = await axios.post(`${API_URL}/admin/login`, credentials);
  return response.data;
};