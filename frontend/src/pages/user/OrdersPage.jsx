import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../../components/UserNavbar';
import { useUser } from '../../context/UserContext';
import { getUserOrders } from '../../services/userApi';
import toast from 'react-hot-toast';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all'); 
  const { user } = useUser();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    if (!user) {
      navigate('/user/login');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const data = await getUserOrders(user.token);
      setOrders(data);
    } catch (error) {
      toast.error('Failed to fetch orders');
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
      <UserNavbar />
      <div className="flex-1 flex flex-col px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Your Orders</h1>
        
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
          <div className="space-y-6">
            {currentOrders.map(order => (
              <div key={order._id} className="bg-gray-800 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-white text-lg">
                      Order #{order._id.slice(-6)}
                    </h3>
                    <p className="text-gray-400">
                      Status: <span className={
                        order.status === 'Completed' 
                          ? 'text-green-500' 
                          : 'text-yellow-500'
                      }>
                        {order.status}
                      </span>
                    </p>
                  </div>
                  <p className="text-white font-bold">
                    Total: ₹{order.totalAmount.toFixed(2)}
                  </p>
                </div>
                
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="text-gray-300">
                      {item.quantity}x {item.menuItem.name} - ₹
                      {(item.menuItem.price * item.quantity).toFixed(2)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {filteredOrders.length === 0 && (
              <p className="text-gray-400 text-center">No orders found</p>
            )}
          </div>
        </div>

        {/* Pagination Controls */}
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

export default OrdersPage;