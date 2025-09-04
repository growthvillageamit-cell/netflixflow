import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { login, signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      await login(formData.email, formData.password);
    } else {
      await signup(formData.name, formData.email, formData.password);
    }
    
    navigate('/');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.pexels.com/photos/3137904/pexels-photo-3137904.jpeg?auto=compress&cs=tinysrgb&w=1920)',
      }}
    >
      {/* Header */}
      <div className="relative z-10 px-6 py-4">
        <Link to="/" className="text-red-600 text-3xl font-bold">
          NETFLIX
        </Link>
      </div>

      {/* Login Form */}
      <div className="flex items-center justify-center min-h-screen pt-0">
        <div className="bg-black/80 backdrop-blur-sm p-8 rounded-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-8">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="w-full bg-gray-800 text-white px-4 py-4 rounded-md border border-gray-600 focus:border-red-600 focus:outline-none transition-colors"
                />
              </div>
            )}
            
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email or phone number"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-800 text-white px-4 py-4 rounded-md border border-gray-600 focus:border-red-600 focus:outline-none transition-colors"
              />
            </div>
            
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-800 text-white px-4 py-4 rounded-md border border-gray-600 focus:border-red-600 focus:outline-none transition-colors"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition-colors disabled:bg-red-800 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
            </button>
          </form>
          
          <div className="mt-8 text-gray-400">
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Remember me</span>
              </label>
              <a href="#" className="text-sm hover:underline">Need help?</a>
            </div>
            
            <p className="text-center">
              {isLogin ? "New to Netflix? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-white hover:underline font-medium"
              >
                {isLogin ? 'Sign up now' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;