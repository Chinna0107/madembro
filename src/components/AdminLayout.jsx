import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, icon, label }) => (
    <Link 
      to={to} 
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        color: isActive(to) ? '#667eea' : '#666',
        textDecoration: 'none',
        borderLeft: isActive(to) ? '4px solid #667eea' : '4px solid transparent',
        background: isActive(to) ? '#f0f0f0' : 'transparent',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        if (!isActive(to)) {
          e.currentTarget.style.background = '#f9f9f9';
          e.currentTarget.style.color = '#667eea';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive(to)) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = '#666';
        }
      }}>
      <span style={{ fontSize: '20px' }}>{icon}</span>
      {sidebarOpen && <span>{label}</span>}
    </Link>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? '250px' : '80px',
        background: '#fff',
        borderRight: '1px solid #e0e0e0',
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Logo */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {sidebarOpen && (
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
              Admin
            </h2>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: '#666'
            }}>
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
          <NavLink to="/admin" icon="📊" label="Dashboard" />
          <NavLink to="/admin/banners" icon="🖼️" label="Banners" />
          <NavLink to="/admin/products" icon="📦" label="Products" />
          <NavLink to="/admin/users" icon="👥" label="Users" />
          <NavLink to="/admin/orders" icon="📋" label="Orders" />
        </nav>

        {/* Logout */}
        <div style={{ borderTop: '1px solid #e0e0e0', padding: '12px' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: '#dc3545',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: sidebarOpen ? 'flex-start' : 'center',
              gap: '12px'
            }}>
            <span>🚪</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
