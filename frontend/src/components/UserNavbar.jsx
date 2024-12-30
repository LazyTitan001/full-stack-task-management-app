import { useUser } from '../context/UserContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function UserNavbar() {
  const { logout } = useUser();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/user/login');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <button 
            onClick={() => navigate('/user/menu')}
            className="text-white hover:text-gray-300"
          >
            Menu
          </button>
          <button 
            onClick={() => navigate('/user/orders')}
            className="text-white hover:text-gray-300"
          >
            My Orders
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/user/cart')}
            className="flex items-center text-white hover:text-gray-300"
          >
            Cart ({cart.length})
          </button>
          <button 
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;