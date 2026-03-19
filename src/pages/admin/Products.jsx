import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';

const API_BASE_URL = config.apiUrl;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`${API_BASE_URL}/admin/products`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setProducts(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    const token = localStorage.getItem('authToken');
    const res = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      setMessage('Product deleted');
      fetchProducts();
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Manage Products</h1>
          <Link to="/admin/products/add">
            <button className="px-5 py-2 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transition-colors">➕ Add Product</button>
          </Link>
        </div>

        {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{message}</div>}

        <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm mb-5 focus:outline-none focus:border-indigo-400" />

        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading...</p>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center text-gray-500 shadow">
            No products found. <Link to="/admin/products/add" className="text-indigo-500">Add one</Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Stock</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={p.id} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-4 py-3 text-gray-800 font-medium">{p.name}</td>
                    <td className="px-4 py-3 text-gray-600">₹{p.price}</td>
                    <td className="px-4 py-3 text-gray-600 capitalize">{p.category || '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{p.stock}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${p.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {p.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center space-x-2">
                      <Link to={`/admin/products/edit/${p.id}`}>
                        <button className="px-3 py-1 bg-indigo-500 text-white rounded text-xs hover:bg-indigo-600 transition-colors">✏️ Edit</button>
                      </Link>
                      <button onClick={() => deleteProduct(p.id)} className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors">🗑️ Delete</button>
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
