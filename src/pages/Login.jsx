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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
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

    // Simulate API call
    setTimeout(() => {
      if (isLogin) {
        // Login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', formData.email.split('@')[0]);
        setMessage('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 1500);
      } else {
        // Sign up
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

  const inputStyle = {
    width: '100%',
    padding: '14px',
    backgroundColor: '#0a0a0a',
    border: '2px solid #333',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '15px',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    color: '#d4af37',
    fontSize: '14px',
    fontWeight: '600',
    letterSpacing: '0.5px'
  };

  const errorStyle = {
    color: '#ff6b6b',
    fontSize: '12px',
    marginTop: '4px',
    fontWeight: '500'
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    backgroundColor: '#d4af37',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    letterSpacing: '0.5px'
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: 'clamp(20px, 5vw, 40px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '900px', width: '100%', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '0' : '40px',
          backgroundColor: '#1a1a1a',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid #333',
          boxShadow: '0 8px 32px rgba(212, 175, 55, 0.1)'
        }}>
          {/* Left Side - Branding */}
          {!isMobile && (
            <div style={{
              background: 'linear-gradient(135deg, #d4af37 0%, #e6c200 100%)',
              padding: '60px 40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              color: '#000'
            }}>
              <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 20px 0', letterSpacing: '1px' }}>
                MADEMBRO
              </h1>
              <p style={{ fontSize: '16px', margin: '0 0 30px 0', lineHeight: '1.6', fontWeight: '500' }}>
                Welcome to our custom embroidery studio. Create unique, personalized apparel with our premium embroidery services.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '24px' }}>✓</span>
                  <div>
                    <p style={{ margin: '0 0 4px 0', fontWeight: '600' }}>Premium Quality</p>
                    <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>High-quality embroidery on all products</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '24px' }}>✓</span>
                  <div>
                    <p style={{ margin: '0 0 4px 0', fontWeight: '600' }}>Custom Designs</p>
                    <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>Personalize your apparel with custom designs</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '24px' }}>✓</span>
                  <div>
                    <p style={{ margin: '0 0 4px 0', fontWeight: '600' }}>Fast Shipping</p>
                    <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>Quick delivery to your doorstep</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Side - Form */}
          <div style={{ padding: isMobile ? '40px 24px' : '60px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: 'clamp(24px, 5vw, 28px)', fontWeight: '700', color: '#d4af37', marginBottom: '10px', margin: 0, marginBottom: '10px', letterSpacing: '0.5px' }}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p style={{ fontSize: '14px', color: '#aaa', marginBottom: '30px', margin: 0, marginBottom: '30px' }}>
              {isLogin ? 'Sign in to your account' : 'Join our community'}
            </p>

            {message && (
              <div style={{
                padding: '12px 16px',
                backgroundColor: message.includes('successful') ? '#0a3d0a' : '#3d0a0a',
                border: `1px solid ${message.includes('successful') ? '#22c55e' : '#ff6b6b'}`,
                borderRadius: '8px',
                color: message.includes('successful') ? '#22c55e' : '#ff6b6b',
                marginBottom: '20px',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                  <div>
                    <label style={labelStyle}>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      style={inputStyle}
                      placeholder="John"
                      onFocus={(e) => {
                        e.target.style.borderColor = '#d4af37';
                        e.target.style.backgroundColor = '#1a1a1a';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#333';
                        e.target.style.backgroundColor = '#0a0a0a';
                      }}
                    />
                    {errors.firstName && <div style={errorStyle}>{errors.firstName}</div>}
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      style={inputStyle}
                      placeholder="Doe"
                      onFocus={(e) => {
                        e.target.style.borderColor = '#d4af37';
                        e.target.style.backgroundColor = '#1a1a1a';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#333';
                        e.target.style.backgroundColor = '#0a0a0a';
                      }}
                    />
                    {errors.lastName && <div style={errorStyle}>{errors.lastName}</div>}
                  </div>
                </div>
              )}

              <div style={{ marginBottom: '15px' }}>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="you@example.com"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#d4af37';
                    e.target.style.backgroundColor = '#1a1a1a';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#333';
                    e.target.style.backgroundColor = '#0a0a0a';
                  }}
                />
                {errors.email && <div style={errorStyle}>{errors.email}</div>}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={labelStyle}>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="••••••••"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#d4af37';
                    e.target.style.backgroundColor = '#1a1a1a';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#333';
                    e.target.style.backgroundColor = '#0a0a0a';
                  }}
                />
                {errors.password && <div style={errorStyle}>{errors.password}</div>}
              </div>

              {!isLogin && (
                <div style={{ marginBottom: '15px' }}>
                  <label style={labelStyle}>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="••••••••"
                    onFocus={(e) => {
                      e.target.style.borderColor = '#d4af37';
                      e.target.style.backgroundColor = '#1a1a1a';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#333';
                      e.target.style.backgroundColor = '#0a0a0a';
                    }}
                  />
                  {errors.confirmPassword && <div style={errorStyle}>{errors.confirmPassword}</div>}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...buttonStyle,
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = '#e6c200';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 20px rgba(212, 175, 55, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = '#d4af37';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
            </form>

            <div style={{ marginTop: '25px', textAlign: 'center', borderTop: '1px solid #333', paddingTop: '25px' }}>
              <p style={{ fontSize: '14px', color: '#aaa', margin: 0, marginBottom: '12px' }}>
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
              </p>
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' });
                  setErrors({});
                  setMessage('');
                }}
                style={{
                  background: 'transparent',
                  border: '2px solid #d4af37',
                  color: '#d4af37',
                  padding: '10px 24px',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#d4af37';
                  e.target.style.color = '#000';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#d4af37';
                }}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </div>

            <button
              onClick={() => navigate('/')}
              style={{
                marginTop: '20px',
                background: 'transparent',
                border: 'none',
                color: '#aaa',
                cursor: 'pointer',
                fontSize: '14px',
                textDecoration: 'underline',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#d4af37'}
              onMouseLeave={(e) => e.target.style.color = '#aaa'}
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
