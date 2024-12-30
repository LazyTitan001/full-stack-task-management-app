import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import { useAdmin } from '../../context/AdminContext';
import { getAllOrders } from '../../services/adminApi';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0
  });
  const { admin } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }

    const fetchStats = async () => {
      try {
        const orders = await getAllOrders(admin.token);
        setStats({
          totalOrders: orders.length,
          pendingOrders: orders.filter(o => o.status === 'Pending').length,
          completedOrders: orders.filter(o => o.status === 'Completed').length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, [admin, navigate]);

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl text-white mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-blue-500">{stats.totalOrders}</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl text-white mb-2">Pending Orders</h3>
            <p className="text-3xl font-bold text-yellow-500">{stats.pendingOrders}</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl text-white mb-2">Completed Orders</h3>
            <p className="text-3xl font-bold text-green-500">{stats.completedOrders}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;