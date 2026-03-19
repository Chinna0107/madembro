import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => { fetchBanners(); }, []);

  const fetchBanners = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`${API_BASE_URL}/admin/banners`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setBanners(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteBanner = async (id) => {
    if (!window.confirm('Delete this banner?')) return;
    const token = localStorage.getItem('authToken');
    const res = await fetch(`${API_BASE_URL}/admin/banners/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      setMessage('Banner deleted');
      fetchBanners();
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Manage Banners</h1>
          <Link to="/admin/banners/add">
            <button className="px-5 py-2 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transition-colors">➕ Add Banner</button>
          </Link>
        </div>

        {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{message}</div>}

        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading...</p>
        ) : banners.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center text-gray-500 shadow">
            No banners yet. <Link to="/admin/banners/add" className="text-indigo-500">Add one</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners.map(banner => (
              <div key={banner.id} className="bg-white rounded-xl overflow-hidden shadow hover:-translate-y-1 transition-transform">
                <img src={banner.image_url} alt={banner.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-1">{banner.title}</h3>
                  {banner.link && <p className="text-xs text-gray-400 mb-3 truncate">{banner.link}</p>}
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${banner.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {banner.active ? 'Active' : 'Inactive'}
                  </span>
                  <div className="flex gap-2 mt-3">
                    <Link to={`/admin/banners/edit/${banner.id}`} className="flex-1">
                      <button className="w-full py-2 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600 transition-colors">✏️ Edit</button>
                    </Link>
                    <button onClick={() => deleteBanner(banner.id)} className="flex-1 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors">🗑️ Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Banners;
