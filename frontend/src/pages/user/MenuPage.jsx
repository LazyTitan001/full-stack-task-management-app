import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../../components/UserNavbar';
import UserMenuCard from '../../components/UserMenuCard';
import { useUser } from '../../context/UserContext';
import { getMenu } from '../../services/userApi';
import toast from 'react-hot-toast';

function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/user/login');
      return;
    }
    fetchMenu();
  }, [user, navigate]);

  const fetchMenu = async () => {
    try {
      const data = await getMenu(user.token);
      setMenuItems(data);
    } catch (error) {
      toast.error('Failed to fetch menu items');
    }
  };

  const categories = ['All', 'Appetizers', 'Main Course', 'Desserts', 'Beverages'];
  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-900">
      <UserNavbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Menu</h1>
        
        <div className="flex overflow-x-auto mb-6 pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full mr-2 ${
                selectedCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <UserMenuCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuPage;