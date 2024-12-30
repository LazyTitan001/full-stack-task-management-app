import { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  const login = (adminData) => {
    setAdmin(adminData);
    localStorage.setItem('adminToken', adminData.token);
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('adminToken');
  };

  const value = {
    admin,
    login,
    logout
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};