import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setMessage('');

    setTimeout(() => {
      if (isLogin) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', formData.email.split('@')[0]);
        setMessage('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 1500);
      } else {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', formData.firstName);
        setMessage('Account created successfully! Redirecting...');
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 1500);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-black min-h-screen p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-0 bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-2xl`}>
          
          {/* Left Side - Branding */}
          {!isMobile && (
            <div className="bg-white text-black p-12 flex flex-col justify-center">
              <h1 className="text-4xl font-bold mb-6 tracking-wider">
                MADEMBRO
              </h1>
              <p className="text-base mb-8 leading-relaxed font-medium">
                Welcome to our custom embroidery studio. Create unique, personalized apparel with our premium embroidery services.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3 items-start">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-bold mb-1">Premium Quality</p>
                    <p className="text-sm opacity-80">High-quality embroidery on all products</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-bold mb-1">Custom Designs</p>
                    <p className="text-sm opacity-80">Personalize your apparel with custom designs</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-bold mb-1">Fast Shipping</p>
                    <p className="text-sm opacity-80">Quick delivery to your doorstep</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Side - Form */}
          <div className={`p-8 md:p-12 flex flex-col justify-center ${isMobile ? 'col-span-1' : ''}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-wide">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-400 mb-8 text-sm md:text-base">
              {isLogin ? 'Sign in to your account' : 'Join our community'}
            </p>

            {message && (
              <div className={`p-3 md:p-4 rounded-lg mb-6 text-sm font-medium ${
                message.includes('successful') 
                  ? 'bg-green-900 border border-green-600 text-green-400' 
                  : 'bg-red-900 border border-red-600 text-red-400'
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2 text-white font-bold text-sm">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-sm"
                      placeholder="John"
                    />
                    {errors.firstName && <div className="text-red-500 text-xs mt-1">{errors.firstName}</div>}
                  </div>
                  <div>
                    <label className="block mb-2 text-white font-bold text-sm">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-sm"
                      placeholder="Doe"
                    />
                    {errors.lastName && <div className="text-red-500 text-xs mt-1">{errors.lastName}</div>}
                  </div>
                </div>
              )}

              <div className="mb-4">
                <label className="block mb-2 text-white font-bold text-sm">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-sm"
                  placeholder="you@example.com"
                />
                {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-white font-bold text-sm">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-sm"
                  placeholder="••••••••"
                />
                {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
              </div>

              {!isLogin && (
                <div className="mb-6">
                  <label className="block mb-2 text-white font-bold text-sm">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-sm"
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && <div className="text-red-500 text-xs mt-1">{errors.confirmPassword}</div>}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 md:py-4 rounded-lg font-bold text-base transition-all duration-300 ${
                  loading 
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-black hover:bg-gray-100 hover:-translate-y-1'
                }`}
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
            </form>

            <div className="mt-8 text-center border-t border-gray-700 pt-8">
              <p className="text-gray-400 mb-4 text-sm">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
              </p>
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' });
                  setErrors({});
                  setMessage('');
                }}
                className="border-2 border-white text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-white hover:text-black transition-all duration-300"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </div>

            <button
              onClick={() => navigate('/')}
              className="mt-6 text-gray-400 hover:text-white text-sm underline transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
