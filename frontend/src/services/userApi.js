import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getMenu = async (token) => {
  const response = await axios.get(`${API_URL}/menu`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createOrder = async (orderData, token) => {
  const response = await axios.post(`${API_URL}/orders`, orderData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getUserOrders = async (token) => {
  const response = await axios.get(`${API_URL}/orders/user`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};