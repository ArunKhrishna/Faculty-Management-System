import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div className="flex flex-col items-center">
        <div className="bg-white p-3 rounded-xl shadow-md">
          <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {subtitle}
        </p>
      </div>
      <div className="bg-white p-8 shadow-xl rounded-xl">
        {children}
      </div>
    </div>
  </div>
);

const Login = () => {
  const [credentials, setCredentials] = useState({ 
    username: '', 
    password: '',
    role: 'FACULTY'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const roles = [
    { id: 'FACULTY', label: 'Faculty' },
    { id: 'HOD', label: 'HOD' },
    { id: 'HR', label: 'HR' }
  ];

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const url = `http://localhost:8080/auth/login?username=${encodeURIComponent(credentials.username)}&password=${encodeURIComponent(credentials.password)}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
      });
      
      if (response.ok) {
        localStorage.setItem('token', await response.text());
        localStorage.setItem('userRole', credentials.role);
        if(credentials.role === 'FACULTY'){
          navigate('/facultyDashboard');
        }else if(credentials.role === 'HOD'){
          navigate('/hodDashboard');
        }else {
          navigate('/hrDashboard');
        }
      } else {
        setError('Invalid credentials or role');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back"
      subtitle="Please sign in to your account"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-center bg-gray-100 p-1 rounded-lg">
          {roles.map((role) => (
            <button
              key={role.id}
              type="button"
              onClick={() => setCredentials(prev => ({ ...prev, role: role.id }))}
              className={`
                flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
                ${credentials.role === role.id 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-900'
                }
              `}
            >
              {role.label}
            </button>
          ))}
        </div>
        
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <div className="mt-1">
            <input
              id="username"
              name="username"
              type="text"
              required
              value={credentials.username}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              placeholder="Enter your username"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1 relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={credentials.password}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              Forgot your password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Signing in...
            </span>
          ) : (
            'Sign in'
          )}
        </button>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Don't have an account?
              </span>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="w-full flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create new account
            </button>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;