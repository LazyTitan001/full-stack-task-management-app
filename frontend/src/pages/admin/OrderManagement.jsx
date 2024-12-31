import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import AdminOrderCard from '../../components/AdminOrderCard';
import { useAdmin } from '../../context/AdminContext';
import { getAllOrders, updateOrderStatus } from '../../services/adminApi';
import toast from 'react-hot-toast';

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const { admin } = useAdmin();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

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

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    if (filter === 'completed') return order.status === 'Completed';
    if (filter === 'pending') return order.status !== 'Completed';
    return true;
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <AdminNavbar />
      <div className="flex-1 flex flex-col px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Order Management</h1>
        
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded ${
              filter === 'completed'
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded ${
              filter === 'pending'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            Pending
          </button>
        </div>
        
        <div className="flex-1 overflow-auto">
          <div className="space-y-4">
            {currentOrders.map(order => (
              <AdminOrderCard
                key={order._id}
                order={order}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
            {filteredOrders.length === 0 && (
              <p className="text-gray-400 text-center">No orders found</p>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-800">
          {filteredOrders.length > 0 && (
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded bg-gray-700 text-white disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-white">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded bg-gray-700 text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderManagement;