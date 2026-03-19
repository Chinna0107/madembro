import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';

const Dashboard = () => {
  const [stats, setStats] = useState({ users: 0, products: 0, banners: 0, orders: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    fetch(`${config.apiUrl}/admin/dashboard`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { title: 'Total Products', value: stats.products,              icon: '📦', link: '/admin/products' },
    { title: 'Total Users',    value: stats.users,                 icon: '👥', link: '/admin/users' },
    { title: 'Total Banners',  value: stats.banners,               icon: '🖼️', link: '/admin/banners' },
    { title: 'Total Orders',   value: stats.orders,                icon: '📋', link: '/admin/orders' },
    { title: 'Revenue',        value: `₹${stats.revenue || 0}`,   icon: '💰', link: '/admin/orders' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {cards.map(c => (
              <Link key={c.title} to={c.link} className="no-underline">
                <div className="bg-white rounded-xl p-6 shadow hover:-translate-y-1 transition-transform cursor-pointer">
                  <div className="text-4xl mb-3">{c.icon}</div>
                  <p className="text-gray-500 text-sm mb-1">{c.title}</p>
                  <p className="text-3xl font-bold text-gray-800">{c.value}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link to="/admin/banners/add">
              <button className="px-5 py-2 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transition-colors">➕ Add Banner</button>
            </Link>
            <Link to="/admin/products/add">
              <button className="px-5 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors">➕ Add Product</button>
            </Link>
            <Link to="/admin/users">
              <button className="px-5 py-2 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors">👥 Manage Users</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
