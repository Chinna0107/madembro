import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const API = config.apiUrl;

const InputField = ({ label, type, name, value, onChange, placeholder, error, children }) => (
  <div className="mb-5">
    <label className="block mb-2 text-xs font-semibold tracking-widest text-gray-400 uppercase">{label}</label>
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3.5 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white transition-all duration-300 text-sm hover:border-gray-500 pr-12"
      />
      {children}
    </div>
    {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
  </div>
);

// Signup steps: 'form' → 'otp' → 'password'
const STEPS = { FORM: 'form', OTP: 'otp', PASSWORD: 'password' };

const Login = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', success: false });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  // Login form
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  // Signup multi-step
  const [step, setStep] = useState(STEPS.FORM);
  const [signupData, setSignupData] = useState({ firstName: '', lastName: '', email: '' });
  const [otp, setOtp] = useState('');
  const [passwords, setPasswords] = useState({ password: '', confirm: '' });
  const [otpTimer, setOtpTimer] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (otpTimer > 0) {
      const t = setTimeout(() => setOtpTimer(prev => prev - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [otpTimer]);

  const setError = (field, msg) => setErrors(prev => ({ ...prev, [field]: msg }));
  const clearError = (field) => setErrors(prev => ({ ...prev, [field]: '' }));

  // ── LOGIN ──
  const handleLogin = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!loginData.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(loginData.email)) errs.email = 'Enter a valid email';
    if (!loginData.password.trim()) errs.password = 'Password is required';
    if (Object.keys(errs).length) return setErrors(errs);

    setLoading(true);
    setMessage({ text: '', success: false });
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginData.email.trim(), password: loginData.password }),
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Invalid email or password');
      const data = await res.json();

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', loginData.email.trim());
      localStorage.setItem('userName', data.user?.firstName || loginData.email.split('@')[0]);
      localStorage.setItem('userRole', data.user?.role || 'user');
      if (data.token) localStorage.setItem('authToken', data.token);

      setMessage({ text: 'Welcome back! Redirecting...', success: true });
      setTimeout(() => {
        navigate(data.user?.role === 'admin' ? '/admin' : '/user/dashboard');
        window.location.reload();
      }, 1500);
    } catch (err) {
      setMessage({ text: err.message, success: false });
    } finally {
      setLoading(false);
    }
  };

  // ── SIGNUP STEP 1: Send OTP ──
  const handleSendOtp = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!signupData.firstName.trim()) errs.firstName = 'Required';
    if (!signupData.lastName.trim()) errs.lastName = 'Required';
    if (!signupData.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(signupData.email)) errs.email = 'Enter a valid email';
    if (Object.keys(errs).length) return setErrors(errs);

    setLoading(true);
    setMessage({ text: '', success: false });
    try {
      const res = await fetch(`${API}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signupData.email.trim() }),
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Failed to send OTP');
      setStep(STEPS.OTP);
      setOtpTimer(60);
      setMessage({ text: `OTP sent to ${signupData.email}`, success: true });
    } catch (err) {
      setMessage({ text: err.message, success: false });
    } finally {
      setLoading(false);
    }
  };

  // ── SIGNUP STEP 2: Verify OTP ──
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim() || otp.length !== 6) return setError('otp', 'Enter the 6-digit OTP');

    setLoading(true);
    setMessage({ text: '', success: false });
    try {
      const res = await fetch(`${API}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signupData.email.trim(), otp: otp.trim() }),
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Invalid OTP');
      setStep(STEPS.PASSWORD);
      setMessage({ text: 'OTP verified! Set your password.', success: true });
    } catch (err) {
      setMessage({ text: err.message, success: false });
    } finally {
      setLoading(false);
    }
  };

  // ── SIGNUP STEP 3: Set Password & Register ──
  const handleRegister = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!passwords.password) errs.password = 'Password is required';
    else if (passwords.password.length < 6) errs.password = 'Minimum 6 characters';
    if (!passwords.confirm) errs.confirm = 'Please confirm your password';
    else if (passwords.password !== passwords.confirm) errs.confirm = 'Passwords do not match';
    if (Object.keys(errs).length) return setErrors(errs);

    setLoading(true);
    setMessage({ text: '', success: false });
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: signupData.firstName.trim(),
          lastName: signupData.lastName.trim(),
          email: signupData.email.trim(),
          password: passwords.password,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Registration failed');
      const data = await res.json();

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', signupData.email.trim());
      localStorage.setItem('userName', signupData.firstName.trim());
      localStorage.setItem('userRole', data.user?.role || 'user');
      if (data.token) localStorage.setItem('authToken', data.token);

      setMessage({ text: 'Account created! Redirecting...', success: true });
      setTimeout(() => {
        navigate('/user/dashboard');
        window.location.reload();
      }, 1500);
    } catch (err) {
      setMessage({ text: err.message, success: false });
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setStep(STEPS.FORM);
    setErrors({});
    setMessage({ text: '', success: false });
    setOtp('');
    setPasswords({ password: '', confirm: '' });
  };

  const leftPanel = (
    <div className="relative bg-white flex flex-col justify-between p-12 overflow-hidden">
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-gray-100 opacity-60" />
      <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-gray-200 opacity-40" />
      <div className="relative z-10">
        <a href="/" className="inline-block mb-12">
          <img src="https://res.cloudinary.com/dgyykbmt6/image/upload/v1773144048/md01_ailgiu.jpg" alt="Meda" className="w-20 h-14 object-cover rounded-lg shadow-md" />
        </a>
        <h1 className="text-4xl font-black text-black tracking-tight leading-tight mb-4">Crafted with<br />precision.</h1>
        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">Premium embroidery apparel made for those who appreciate quality and individuality.</p>
      </div>
      <div className="relative z-10 space-y-5">
        {[
          { icon: '✦', title: 'Premium Quality', desc: 'Handcrafted embroidery on every piece' },
          { icon: '✦', title: 'Custom Designs', desc: 'Personalize with your own artwork' },
          { icon: '✦', title: 'Fast Delivery', desc: 'Shipped to your door in days' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="flex items-start gap-3">
            <span className="text-black text-xs mt-1">{icon}</span>
            <div>
              <p className="font-bold text-black text-sm">{title}</p>
              <p className="text-gray-500 text-xs">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const stepLabel = step === STEPS.FORM ? 'Create account' : step === STEPS.OTP ? 'Verify OTP' : 'Set Password';
  const stepDesc = step === STEPS.FORM ? 'Join the Madembro community.' : step === STEPS.OTP ? `Enter the OTP sent to ${signupData.email}` : 'Choose a strong password.';

  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-4">
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 1000px #000 inset !important; -webkit-text-fill-color: #fff !important; }
      `}</style>

      <div className={`w-full max-w-4xl fade-up ${isMobile ? '' : 'grid grid-cols-2'} rounded-2xl overflow-hidden border border-gray-800 shadow-2xl`}>
        {!isMobile && leftPanel}

        <div className="bg-[#0a0a0a] p-8 md:p-12 flex flex-col justify-center">
          {isMobile && (
            <div className="flex justify-center mb-8">
              <img src="https://res.cloudinary.com/dgyykbmt6/image/upload/v1773144048/md01_ailgiu.jpg" alt="Meda" className="w-16 h-12 object-cover rounded-lg" />
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-1">
              {isLogin ? 'Sign in' : stepLabel}
            </h2>
            <p className="text-gray-500 text-sm">
              {isLogin ? 'Welcome back — good to see you.' : stepDesc}
            </p>
          </div>

          {message.text && (
            <div className={`px-4 py-3 rounded-lg mb-6 text-sm font-medium border ${message.success ? 'bg-green-950 border-green-800 text-green-400' : 'bg-red-950 border-red-800 text-red-400'}`}>
              {message.text}
            </div>
          )}

          {/* ── LOGIN FORM ── */}
          {isLogin && (
            <form onSubmit={handleLogin}>
              <InputField label="Email" type="email" name="email" value={loginData.email}
                onChange={e => { setLoginData(p => ({ ...p, email: e.target.value })); clearError('email'); }}
                placeholder="you@example.com" error={errors.email} />

              <InputField label="Password" type={showPassword ? 'text' : 'password'} name="password" value={loginData.password}
                onChange={e => { setLoginData(p => ({ ...p, password: e.target.value })); clearError('password'); }}
                placeholder="••••••••" error={errors.password}>
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors text-sm">
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </InputField>

              <button type="submit" disabled={loading}
                className={`w-full py-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-all duration-300 mt-2 ${loading ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-100 hover:-translate-y-0.5 shadow-lg'}`}>
                {loading ? 'Please wait...' : 'Sign In'}
              </button>
            </form>
          )}

          {/* ── SIGNUP STEP 1: Details ── */}
          {!isLogin && step === STEPS.FORM && (
            <form onSubmit={handleSendOtp}>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="First Name" type="text" name="firstName" value={signupData.firstName}
                  onChange={e => { setSignupData(p => ({ ...p, firstName: e.target.value })); clearError('firstName'); }}
                  placeholder="John" error={errors.firstName} />
                <InputField label="Last Name" type="text" name="lastName" value={signupData.lastName}
                  onChange={e => { setSignupData(p => ({ ...p, lastName: e.target.value })); clearError('lastName'); }}
                  placeholder="Doe" error={errors.lastName} />
              </div>
              <InputField label="Email" type="email" name="email" value={signupData.email}
                onChange={e => { setSignupData(p => ({ ...p, email: e.target.value })); clearError('email'); }}
                placeholder="you@example.com" error={errors.email} />

              <button type="submit" disabled={loading}
                className={`w-full py-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-all duration-300 mt-2 ${loading ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-100 hover:-translate-y-0.5 shadow-lg'}`}>
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          )}

          {/* ── SIGNUP STEP 2: OTP ── */}
          {!isLogin && step === STEPS.OTP && (
            <form onSubmit={handleVerifyOtp}>
              <div className="mb-5">
                <label className="block mb-2 text-xs font-semibold tracking-widest text-gray-400 uppercase">Enter OTP</label>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={e => { setOtp(e.target.value.replace(/\D/g, '')); clearError('otp'); }}
                  placeholder="6-digit OTP"
                  className="w-full px-4 py-3.5 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white transition-all duration-300 text-sm text-center tracking-[0.5em]"
                />
                {errors.otp && <p className="text-red-400 text-xs mt-1.5">{errors.otp}</p>}
              </div>

              <div className="flex items-center justify-between mb-5 text-xs">
                <span className="text-gray-500">
                  {otpTimer > 0 ? `Resend in ${otpTimer}s` : ''}
                </span>
                {otpTimer === 0 && (
                  <button type="button" onClick={handleSendOtp} className="text-white underline hover:text-gray-300 transition-colors">
                    Resend OTP
                  </button>
                )}
              </div>

              <button type="submit" disabled={loading}
                className={`w-full py-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-all duration-300 ${loading ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-100 hover:-translate-y-0.5 shadow-lg'}`}>
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
          )}

          {/* ── SIGNUP STEP 3: Set Password ── */}
          {!isLogin && step === STEPS.PASSWORD && (
            <form onSubmit={handleRegister}>
              <InputField label="Password" type={showPassword ? 'text' : 'password'} name="password" value={passwords.password}
                onChange={e => { setPasswords(p => ({ ...p, password: e.target.value })); clearError('password'); }}
                placeholder="Min. 6 characters" error={errors.password}>
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors text-sm">
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </InputField>

              <InputField label="Confirm Password" type={showConfirm ? 'text' : 'password'} name="confirm" value={passwords.confirm}
                onChange={e => { setPasswords(p => ({ ...p, confirm: e.target.value })); clearError('confirm'); }}
                placeholder="Re-enter password" error={errors.confirm}>
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors text-sm">
                  {showConfirm ? '🙈' : '👁️'}
                </button>
              </InputField>

              <button type="submit" disabled={loading}
                className={`w-full py-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-all duration-300 mt-2 ${loading ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-100 hover:-translate-y-0.5 shadow-lg'}`}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-gray-800 flex items-center justify-between">
            <p className="text-gray-500 text-xs">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </p>
            <button onClick={switchMode}
              className="text-white text-xs font-bold tracking-wider uppercase border border-gray-700 px-4 py-2 rounded-full hover:border-white transition-all duration-300">
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>

          <button onClick={() => navigate('/')} className="mt-6 text-gray-600 hover:text-gray-400 text-xs transition-colors text-left">
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
