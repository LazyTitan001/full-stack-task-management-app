import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getAllOrders = async (token) => {
  const response = await axios.get(`${API_URL}/admin/orders`, {
    headers: { 
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const updateOrderStatus = async (orderId, status, token) => {
  const response = await axios.put(`${API_URL}/admin/orders/${orderId}`, 
    { status },
    {
      headers: { 
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const createMenuItem = async (menuData, token) => {
  const response = await axios.post(`${API_URL}/admin/menu`, 
    menuData,
    {
      headers: { 
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const updateMenuItem = async (menuId, menuData, token) => {
  const response = await axios.put(`${API_URL}/admin/menu/${menuId}`, 
    menuData,
    {
      headers: { 
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const deleteMenuItem = async (menuId, token) => {
  const response = await axios.delete(`${API_URL}/admin/menu/${menuId}`, {
    headers: { 
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};