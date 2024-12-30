import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import AdminMenuCard from '../../components/AdminMenuCard';
import { useAdmin } from '../../context/AdminContext';
import { getMenu } from '../../services/userApi';
import { createMenuItem, updateMenuItem, deleteMenuItem } from '../../services/adminApi';
import toast from 'react-hot-toast';

function MenuManagement() {
  const [menuItems, setMenuItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    name: '',
    category: 'Main Course',
    price: '',
    availability: true
  });
  
  const { admin } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }
    fetchMenu();
  }, [admin, navigate]);

  const fetchMenu = async () => {
    try {
      const data = await getMenu(admin.token);
      setMenuItems(data);
    } catch (error) {
      toast.error('Failed to fetch menu items');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateMenuItem(currentItem._id, currentItem, admin.token);
        toast.success('Menu item updated successfully');
      } else {
        await createMenuItem(currentItem, admin.token);
        toast.success('Menu item created successfully');
      }
      setIsEditing(false);
      setCurrentItem({
        name: '',
        category: 'Main Course',
        price: '',
        availability: true
      });
      fetchMenu();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMenuItem(id, admin.token);
      toast.success('Menu item deleted successfully');
      fetchMenu();
    } catch (error) {
      toast.error('Failed to delete menu item');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Menu Management</h1>
        
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white block mb-2">Name</label>
              <input
                type="text"
                value={currentItem.name}
                onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
            </div>
            
            <div>
              <label className="text-white block mb-2">Category</label>
              <select
                value={currentItem.category}
                onChange={(e) => setCurrentItem({...currentItem, category: e.target.value})}
                className="w-full p-2 rounded bg-gray-700 text-white"
              >
                <option value="Appetizers">Appetizers</option>
                <option value="Main Course">Main Course</option>
                <option value="Desserts">Desserts</option>
                <option value="Beverages">Beverages</option>
              </select>
            </div>
            
            <div>
              <label className="text-white block mb-2">Price</label>
              <input
                type="number"
                value={currentItem.price}
                onChange={(e) => setCurrentItem({...currentItem, price: e.target.value})}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
                min="0"
                step="0.01"
              />
            </div>
            
            <div className="flex items-center">
              <label className="text-white flex items-center">
                <input
                  type="checkbox"
                  checked={currentItem.availability}
                  onChange={(e) => setCurrentItem({...currentItem, availability: e.target.checked})}
                  className="mr-2"
                />
                Available
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isEditing ? 'Update Item' : 'Add Item'}
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map(item => (
            <AdminMenuCard
              key={item._id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuManagement;