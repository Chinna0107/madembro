import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
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
        color: isActive(to) ? '#fff' : '#666',
        textDecoration: 'none',
        borderLeft: isActive(to) ? '3px solid #fff' : '3px solid transparent',
        background: isActive(to) ? '#1a1a1a' : 'transparent',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: isActive(to) ? '600' : '400',
      }}
      onMouseEnter={(e) => {
        if (!isActive(to)) {
          e.currentTarget.style.background = '#111';
          e.currentTarget.style.color = '#fff';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive(to)) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = '#666';
        }
      }}>
      <span style={{ fontSize: '18px' }}>{icon}</span>
      {sidebarOpen && <span>{label}</span>}
    </Link>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#000' }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? '240px' : '72px',
        background: '#0a0a0a',
        borderRight: '1px solid #1a1a1a',
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 16px',
          borderBottom: '1px solid #1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {sidebarOpen && (
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#fff', letterSpacing: '1px' }}>
              ADMIN
            </h2>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: '1px solid #333',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
              color: '#666',
              padding: '4px 8px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = '#666'; }}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          <NavLink to="/admin"          icon="📊" label="Dashboard" />
          <NavLink to="/admin/banners"  icon="🖼️" label="Banners" />
          <NavLink to="/admin/products" icon="📦" label="Products" />
          <NavLink to="/admin/users"    icon="👥" label="Users" />
          <NavLink to="/admin/orders"   icon="📋" label="Orders" />
        </nav>

        {/* Logout */}
        <div style={{ borderTop: '1px solid #1a1a1a', padding: '12px' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '10px 16px',
              background: 'transparent',
              color: '#ef4444',
              border: '1px solid #7f1d1d',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: sidebarOpen ? 'flex-start' : 'center',
              gap: '10px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#7f1d1d'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ef4444'; }}
          >
            <span>🚪</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: 'auto', background: '#000' }}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
