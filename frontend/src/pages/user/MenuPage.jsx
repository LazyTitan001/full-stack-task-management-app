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
  const [sortBy, setSortBy] = useState('name-asc');
  const { user } = useUser();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

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

  const getSortedItems = (items) => {
    switch (sortBy) {
      case 'name-asc':
        return [...items].sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return [...items].sort((a, b) => b.name.localeCompare(a.name));
      case 'price-asc':
        return [...items].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...items].sort((a, b) => b.price - a.price);
      default:
        return items;
    }
  };

  const categories = ['All', 'Appetizers', 'Main Course', 'Desserts', 'Beverages'];
  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);
  
  const sortedItems = getSortedItems(filteredItems);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <UserNavbar />
      <div className="flex-1 flex flex-col px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Menu</h1>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex overflow-x-auto pb-2">
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
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-md"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>
        
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map(item => (
              <UserMenuCard key={item._id} item={item} />
            ))}
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="pt-4 border-t border-gray-800">
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
        </div>
      </div>
    </div>
  );
}

export default MenuPage;