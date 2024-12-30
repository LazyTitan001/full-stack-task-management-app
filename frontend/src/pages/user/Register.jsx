import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authApi';
import { toast } from 'react-hot-toast';

function Register() {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await registerUser({
        username: userData.username,
        password: userData.password
      });
      toast.success('Registration successful');
      navigate('/user/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Register</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white block mb-2">Username</label>
            <input
              type="text"
              value={userData.username}
              onChange={(e) => setUserData({...userData, username: e.target.value})}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          
          <div>
            <label className="text-white block mb-2">Password</label>
            <input
              type="password"
              value={userData.password}
              onChange={(e) => setUserData({...userData, password: e.target.value})}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          
          <div>
            <label className="text-white block mb-2">Confirm Password</label>
            <input
              type="password"
              value={userData.confirmPassword}
              onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Register
          </button>
        </form>
        
        <p className="text-center text-gray-400 mt-4">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/user/login')}
            className="text-blue-500 hover:text-blue-400"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;