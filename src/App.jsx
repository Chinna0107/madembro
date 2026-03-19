import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import AdminLayout from './components/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import { CartProvider } from './context/CartContext'
import UserDashboard from './pages/user/Dashboard'
import './App.css'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import TermsAndConditions from './pages/TermsAndConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import RefundPolicy from './pages/RefundPolicy'
import ShippingPolicy from './pages/ShippingPolicy'
import TShirts from './pages/TShirts'
import Sweatshirts from './pages/Sweatshirts'
import Hoodies from './pages/Hoodies'
import CustomEmbroidery from './pages/CustomEmbroidery'
import OurStory from './pages/OurStory'
import Contact from './pages/Contact'
import About from './pages/About'
import Footer from './components/Footer'
import AdminDashboard from './pages/admin/Dashboard'
import AdminBanners from './pages/admin/Banners'
import AdminBannerForm from './pages/admin/BannerForm'
import AdminProducts from './pages/admin/Products'
import AdminProductForm from './pages/admin/ProductForm'
import AdminUsers from './pages/admin/Users'
import AdminOrders from './pages/admin/Orders'

function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);

    const handleStorageChange = () => {
      const updatedRole = localStorage.getItem('userRole');
      setUserRole(updatedRole);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const isAdminRoute = window.location.pathname.startsWith('/admin');
  const isUserRoute = window.location.pathname.startsWith('/user');

  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        {!isAdminRoute && !isUserRoute && <Header />}
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:name' element={<Products />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/refund-policy' element={<RefundPolicy />} />
        <Route path='/shipping-policy' element={<ShippingPolicy />} />
        <Route path='/tshirts' element={<TShirts />} />
        <Route path='/sweatshirts' element={<Sweatshirts />} />
        <Route path='/hoodies' element={<Hoodies />} />
        <Route path='/custom-embroidery' element={<CustomEmbroidery />} />
        <Route path='/our-story' element={<OurStory />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      <Route path='/admin' element={<ProtectedRoute requiredRole='admin'><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
      <Route path='/admin/banners' element={<ProtectedRoute requiredRole='admin'><AdminLayout><AdminBanners /></AdminLayout></ProtectedRoute>} />
      <Route path='/admin/banners/add' element={<ProtectedRoute requiredRole='admin'><AdminLayout><AdminBannerForm /></AdminLayout></ProtectedRoute>} />
      <Route path='/admin/banners/edit/:id' element={<ProtectedRoute requiredRole='admin'><AdminLayout><AdminBannerForm /></AdminLayout></ProtectedRoute>} />
      <Route path='/admin/products' element={<ProtectedRoute requiredRole='admin'><AdminLayout><AdminProducts /></AdminLayout></ProtectedRoute>} />
      <Route path='/admin/products/add' element={<ProtectedRoute requiredRole='admin'><AdminLayout><AdminProductForm /></AdminLayout></ProtectedRoute>} />
      <Route path='/admin/products/edit/:id' element={<ProtectedRoute requiredRole='admin'><AdminLayout><AdminProductForm /></AdminLayout></ProtectedRoute>} />
      <Route path='/admin/users' element={<ProtectedRoute requiredRole='admin'><AdminLayout><AdminUsers /></AdminLayout></ProtectedRoute>} />
      <Route path='/admin/orders' element={<ProtectedRoute requiredRole='admin'><AdminLayout><AdminOrders /></AdminLayout></ProtectedRoute>} />
      <Route path='/user/dashboard' element={<ProtectedRoute requiredRole='user'><UserDashboard /></ProtectedRoute>} />
        </Routes>
        {!isAdminRoute && !isUserRoute && <Footer />}
      </Router>
    </CartProvider>
  )
}
export default App
