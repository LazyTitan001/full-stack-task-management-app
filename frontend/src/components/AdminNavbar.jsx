import { useAdmin } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

function AdminNavbar() {
  const { logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <button 
            onClick={() => navigate('/admin/dashboard')}
            className="text-white hover:text-gray-300"
          >
            Dashboard
          </button>
          <button 
            onClick={() => navigate('/admin/menu')}
            className="text-white hover:text-gray-300"
          >
            Menu
          </button>
          <button 
            onClick={() => navigate('/admin/orders')}
            className="text-white hover:text-gray-300"
          >
            Orders
          </button>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default AdminNavbar;