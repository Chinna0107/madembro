import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

const Dashboard = () => {
  const { data, loading } = useFetch('/admin/dashboard', { auth: true });
  const stats = data || { users: 0, products: 0, banners: 0, orders: 0, revenue: 0 };

  const cards = [
    { title: 'Total Products', value: stats.products,              icon: '📦', link: '/admin/products' },
    { title: 'Total Users',    value: stats.users,                 icon: '👥', link: '/admin/users' },
    { title: 'Total Banners',  value: stats.banners,               icon: '🖼️', link: '/admin/banners' },
    { title: 'Total Orders',   value: stats.orders,                icon: '📋', link: '/admin/orders' },
    { title: 'Revenue',        value: `₹${stats.revenue || 0}`,   icon: '💰', link: '/admin/orders' },
  ];

  return (
    <div className="bg-black min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

        {loading ? (
          <p className="text-center text-gray-400 py-10">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {cards.map(c => (
              <Link key={c.title} to={c.link} className="no-underline">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:-translate-y-1 transition-transform cursor-pointer">
                  <div className="text-4xl mb-3">{c.icon}</div>
                  <p className="text-gray-400 text-sm mb-1">{c.title}</p>
                  <p className="text-3xl font-bold text-white">{c.value}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link to="/admin/banners/add">
              <button className="px-5 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors">➕ Add Banner</button>
            </Link>
            <Link to="/admin/products/add">
              <button className="px-5 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors">➕ Add Product</button>
            </Link>
            <Link to="/admin/users">
              <button className="px-5 py-2 border border-gray-700 text-white rounded-lg font-semibold hover:border-white transition-colors">👥 Manage Users</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
