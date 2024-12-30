import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../../components/UserNavbar';
import { useUser } from '../../context/UserContext';
import { getUserOrders } from '../../services/userApi';
import toast from 'react-hot-toast';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-gray-900">
      <UserNavbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Your Orders</h1>
        
        <div className="space-y-6">
          {orders.map(order => (
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
          
          {orders.length === 0 && (
            <p className="text-gray-400 text-center">No orders found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;