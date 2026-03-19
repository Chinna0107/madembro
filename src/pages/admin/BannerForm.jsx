import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const BannerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!!id);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({ title: '', image_url: '', link: '', active: true });

  useEffect(() => {
    if (id) {
      const token = localStorage.getItem('authToken');
      fetch(`${API_BASE_URL}/admin/banners/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(r => r.json()).then(data => {
        setFormData({ title: data.title, image_url: data.image_url, link: data.link || '', active: data.active });
      }).finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    const token = localStorage.getItem('authToken');
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_BASE_URL}/admin/banners/${id}` : `${API_BASE_URL}/admin/banners`;
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setMessage(id ? 'Banner updated!' : 'Banner created!');
        setTimeout(() => navigate('/admin/banners'), 1200);
      } else {
        const err = await res.json();
        setMessage(err.message || 'Error saving banner');
      }
    } catch {
      setMessage('Error saving banner');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{id ? 'Edit Banner' : 'Add Banner'}</h1>

        {message && (
          <div className={`px-4 py-3 rounded mb-4 border ${message.includes('Error') ? 'bg-red-100 border-red-400 text-red-700' : 'bg-green-100 border-green-400 text-green-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-400" placeholder="Banner title" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
            <input type="url" name="image_url" value={formData.image_url} onChange={handleChange} required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-400" placeholder="https://..." />
            {formData.image_url && <img src={formData.image_url} alt="Preview" className="mt-3 w-full max-h-48 object-cover rounded-lg" />}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Link (optional)</label>
            <input type="text" name="link" value={formData.link} onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-400" placeholder="/products" />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" name="active" id="active" checked={formData.active} onChange={handleChange} className="w-4 h-4" />
            <label htmlFor="active" className="text-sm font-semibold text-gray-700">Active</label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={submitting}
              className="flex-1 py-2 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transition-colors disabled:opacity-50">
              {submitting ? 'Saving...' : 'Save Banner'}
            </button>
            <button type="button" onClick={() => navigate('/admin/banners')}
              className="flex-1 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerForm;
