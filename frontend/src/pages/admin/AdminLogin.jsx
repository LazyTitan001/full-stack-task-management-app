import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../services/authApi'; // Ensure this import is correct
import { useAdmin } from '../../context/AdminContext';
import toast from 'react-hot-toast';

function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: '',    // changed from email to username
    password: ''
  });
  const navigate = useNavigate();
  const { login } = useAdmin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginAdmin(credentials);
      login(data);
      toast.success('Login successful');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Admin Login
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white block mb-2">Username</label>
            <input
              type="text"  // changed from email to text
              value={credentials.username}  // changed from email to username
              onChange={(e) => setCredentials({
                ...credentials,
                username: e.target.value  // changed from email to username
              })}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          
          <div>
            <label className="text-white block mb-2">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({
                ...credentials,
                password: e.target.value
              })}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;