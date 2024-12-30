import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import MenuManagement from './pages/admin/MenuManagement';
import OrderManagement from './pages/admin/OrderManagement';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import MenuPage from './pages/user/MenuPage';
import CartPage from './pages/user/CartPage';
import OrdersPage from './pages/user/OrdersPage';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Admin Routes - Wrapped in AdminProvider */}
        <Route
          path="/admin/*"
          element={
            <AdminProvider>
              <Routes>
                <Route path="login" element={<AdminLogin />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="menu" element={<MenuManagement />} />
                <Route path="orders" element={<OrderManagement />} />
              </Routes>
            </AdminProvider>
          }
        />

        {/* User Routes */}
        <Route
          path="/user/*"
          element={
            <UserProvider>
              <CartProvider>
                <Routes>
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="menu" element={<MenuPage />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="orders" element={<OrdersPage />} />
                </Routes>
              </CartProvider>
            </UserProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;