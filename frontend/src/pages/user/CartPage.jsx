import { useNavigate } from 'react-router-dom';
import UserNavbar from '../../components/UserNavbar';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import { createOrder } from '../../services/userApi';
import toast from 'react-hot-toast';

function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    if (!user || !user.token) {
      toast.error('User not authenticated');
      return;
    }

    try {
      const orderData = {
        items: cart.map(item => ({
          menuItem: item._id,
          quantity: item.quantity
        }))
      };

      await createOrder(orderData, user.token);
      clearCart();
      toast.success('Order placed successfully');
      setTimeout(() => {
        navigate('/user/orders');
      }, 2000); // Show the toast for 2 seconds before redirecting
    } catch (error) {
      toast.error('Failed to place order');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <UserNavbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Your Cart</h1>
        
        {cart.length === 0 ? (
          <p className="text-gray-400 text-center">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item._id} className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <h3 className="text-white text-lg">{item.name}</h3>
                    <p className="text-gray-400">₹{item.price.toFixed(2)} each</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="bg-gray-700 text-white w-8 h-8 rounded"
                      >
                        -
                      </button>
                      <span className="text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="bg-gray-700 text-white w-8 h-8 rounded"
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gray-800 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white text-xl">Total:</span>
                <span className="text-white text-2xl font-bold">
                  ₹{total.toFixed(2)}
                </span>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;