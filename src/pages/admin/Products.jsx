import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch, invalidateCache } from '../../hooks/useFetch';
import config from '../../config';

const API_BASE_URL = config.apiUrl;

const Products = () => {
  const { data: products = [], loading, refetch } = useFetch('/admin/products', { auth: true });
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    const token = localStorage.getItem('authToken');
    const res = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      setMessage('Product deleted');
      refetch();
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-black min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Manage Products</h1>
          <Link to="/admin/products/add">
            <button className="px-5 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors">➕ Add Product</button>
          </Link>
        </div>

        {message && <div className="bg-green-900 border border-green-700 text-green-300 px-4 py-3 rounded mb-4">{message}</div>}

        <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-white rounded-lg text-sm mb-5 focus:outline-none focus:border-white placeholder-gray-500" />

        {loading ? (
          <p className="text-center text-gray-400 py-10">Loading...</p>
        ) : filtered.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-10 text-center text-gray-400">
            No products found. <Link to="/admin/products/add" className="text-white underline">Add one</Link>
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Stock</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Status</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={p.id} className={`border-b border-gray-800 ${i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800/50'}`}>
                    <td className="px-4 py-3 text-white font-medium">{p.name}</td>
                    <td className="px-4 py-3 text-gray-300">₹{p.price}</td>
                    <td className="px-4 py-3 text-gray-300 capitalize">{p.category || '—'}</td>
                    <td className="px-4 py-3 text-gray-300">{p.stock}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${p.active ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                        {p.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center space-x-2">
                      <Link to={`/admin/products/edit/${p.id}`}>
                        <button className="px-3 py-1 bg-white text-black rounded text-xs hover:bg-gray-200 transition-colors">✏️ Edit</button>
                      </Link>
                      <button onClick={() => deleteProduct(p.id)} className="px-3 py-1 bg-red-700 text-white rounded text-xs hover:bg-red-600 transition-colors">🗑️ Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
