import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to Our Restaurant
        </h1>
        <p className="text-gray-400 text-lg">
          Order your favorite meals online
        </p>
      </div>
      
      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <button
          onClick={() => navigate('/user/login')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          User Login
        </button>
        
        <button
          onClick={() => navigate('/user/register')}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Register
        </button>
        
        <button
          onClick={() => navigate('/admin/login')}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
        >
          Admin Login
        </button>
      </div>
    </div>
  );
}

export default LandingPage;