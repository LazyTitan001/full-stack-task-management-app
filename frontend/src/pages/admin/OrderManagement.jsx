import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import AdminOrderCard from '../../components/AdminOrderCard';
import { useAdmin } from '../../context/AdminContext';
import { getAllOrders, updateOrderStatus } from '../../services/adminApi';
import toast from 'react-hot-toast';

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const { admin } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }
    fetchOrders();
  }, [admin, navigate]);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders(admin.token);
      setOrders(data);
    } catch (error) {
      toast.error('Failed to fetch orders');
    }
  };

  const handleStatusUpdate = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status, admin.token);
      toast.success('Order status updated successfully');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Order Management</h1>
        
        <div className="space-y-4">
          {orders.map(order => (
            <AdminOrderCard
              key={order._id}
              order={order}
              onStatusUpdate={handleStatusUpdate}
            />
          ))}
          {orders.length === 0 && (
            <p className="text-gray-400 text-center">No orders found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderManagement;