import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import config from '../../config';

const API_BASE_URL = config.apiUrl;

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!!id);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '', description: '', price: '', original_price: '',
    category: 'tshirts', stock: '', active: true,
    sizes: [], colors: [], features: []
  });
  const [newColor, setNewColor] = useState('');
  const [colorImages, setColorImages] = useState({});
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    if (!id) return;
    const token = localStorage.getItem('authToken');
    fetch(`${API_BASE_URL}/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(r => r.json()).then(data => {
      setFormData({
        name: data.name,
        description: data.description || '',
        price: data.price,
        original_price: data.original_price || '',
        category: data.category || 'tshirts',
        stock: data.stock,
        active: data.active,
        sizes: data.sizes || [],
        colors: data.colors || [],
        features: data.features || []
      });
      setColorImages(data.color_images || {});
    }).finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const toggleSize = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const addColor = () => {
    const trimmed = newColor.trim();
    if (trimmed && !formData.colors.includes(trimmed)) {
      setFormData(prev => ({ ...prev, colors: [...prev.colors, trimmed] }));
      setNewColor('');
    }
  };

  const removeColor = (color) => {
    setFormData(prev => ({ ...prev, colors: prev.colors.filter(c => c !== color) }));
    setColorImages(prev => { const u = { ...prev }; delete u[color]; return u; });
  };

  const handleColorImageChange = (color, num, url) => {
    setColorImages(prev => ({
      ...prev,
      [color]: { ...prev[color], [`image${num}`]: url }
    }));
  };

  const addFeature = () => {
    const trimmed = newFeature.trim();
    if (trimmed) {
      setFormData(prev => ({ ...prev, features: [...prev.features, trimmed] }));
      setNewFeature('');
    }
  };

  const removeFeature = (i) => {
    setFormData(prev => ({ ...prev, features: prev.features.filter((_, idx) => idx !== i) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    const token = localStorage.getItem('authToken');
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_BASE_URL}/admin/products/${id}` : `${API_BASE_URL}/admin/products`;
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...formData, color_images: colorImages })
      });
      if (res.ok) {
        setMessage(id ? 'Product updated!' : 'Product created!');
        setTimeout(() => navigate('/admin/products'), 1200);
      } else {
        const err = await res.json();
        setMessage(err.message || 'Error saving product');
      }
    } catch {
      setMessage('Error saving product');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center py-10 text-gray-500">Loading...</p>;

  const inputCls = "w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-400";
  const labelCls = "block text-sm font-semibold text-gray-700 mb-1";

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{id ? 'Edit Product' : 'Add Product'}</h1>

        {message && (
          <div className={`px-4 py-3 rounded mb-4 border ${message.includes('Error') ? 'bg-red-100 border-red-400 text-red-700' : 'bg-green-100 border-green-400 text-green-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow space-y-5">

          {/* Name */}
          <div>
            <label className={labelCls}>Product Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required
              className={inputCls} placeholder="e.g. Classic Oversized Tee" />
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3"
              className={`${inputCls} resize-none`} placeholder="Product description..." />
          </div>

          {/* Price & Original Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Price (₹) *</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange}
                required step="0.01" min="0" className={inputCls} placeholder="0.00" />
            </div>
            <div>
              <label className={labelCls}>Original Price (₹) <span className="text-gray-400 font-normal">for strikethrough</span></label>
              <input type="number" name="original_price" value={formData.original_price} onChange={handleChange}
                step="0.01" min="0" className={inputCls} placeholder="0.00" />
            </div>
          </div>

          {/* Category & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className={inputCls}>
                <option value="tshirts">T-Shirts</option>
                <option value="sweatshirts">Sweatshirts</option>
                <option value="hoodies">Hoodies</option>
                <option value="custom">Custom Embroidery</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Stock</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange}
                min="0" className={inputCls} placeholder="0" />
            </div>
          </div>

          {/* Sizes */}
          <div className="border-t pt-5">
            <label className={labelCls}>Available Sizes</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {SIZES.map(size => (
                <button key={size} type="button" onClick={() => toggleSize(size)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                    formData.sizes.includes(size)
                      ? 'bg-indigo-500 text-white border-indigo-500'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400'
                  }`}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="border-t pt-5">
            <label className={labelCls}>Features / Highlights</label>
            <div className="flex gap-2 mb-3">
              <input type="text" value={newFeature} onChange={e => setNewFeature(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                placeholder="e.g. 100% Cotton, Oversized Fit"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-400" />
              <button type="button" onClick={addFeature}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-semibold hover:bg-indigo-600 transition-colors">
                Add
              </button>
            </div>
            {formData.features.length > 0 && (
              <ul className="space-y-1">
                {formData.features.map((f, i) => (
                  <li key={i} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    <span className="text-gray-700">• {f}</span>
                    <button type="button" onClick={() => removeFeature(i)}
                      className="text-red-400 hover:text-red-600 text-xs font-semibold ml-2">✕</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Colors & Images */}
          <div className="border-t pt-5">
            <label className={labelCls}>
              Colors & Images <span className="text-gray-400 font-normal">(3 images per color)</span>
            </label>
            <div className="flex gap-2 mb-4 mt-2">
              <input type="text" value={newColor} onChange={e => setNewColor(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addColor())}
                placeholder="e.g. Black, White, Navy Blue"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-400" />
              <button type="button" onClick={addColor}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-semibold hover:bg-indigo-600 transition-colors">
                Add
              </button>
            </div>

            {formData.colors.length === 0 ? (
              <p className="text-gray-400 text-sm italic">No colors added yet.</p>
            ) : (
              <div className="space-y-4">
                {formData.colors.map(color => (
                  <div key={color} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-gray-700">{color}</span>
                      <button type="button" onClick={() => removeColor(color)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors">
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[1, 2, 3].map(num => (
                        <div key={num}>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">Image {num}</label>
                          <input type="url"
                            value={colorImages[color]?.[`image${num}`] || ''}
                            onChange={e => handleColorImageChange(color, num, e.target.value)}
                            placeholder="https://..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-indigo-400" />
                          {colorImages[color]?.[`image${num}`] && (
                            <img src={colorImages[color][`image${num}`]} alt={`${color} ${num}`}
                              className="mt-2 w-full h-20 object-cover rounded-lg"
                              onError={e => e.target.style.display = 'none'} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active */}
          <div className="flex items-center gap-2 border-t pt-4">
            <input type="checkbox" name="active" id="active" checked={formData.active}
              onChange={handleChange} className="w-4 h-4 accent-indigo-500" />
            <label htmlFor="active" className="text-sm font-semibold text-gray-700">Active (visible to users)</label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={submitting}
              className="flex-1 py-2 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transition-colors disabled:opacity-50">
              {submitting ? 'Saving...' : id ? 'Update Product' : 'Create Product'}
            </button>
            <button type="button" onClick={() => navigate('/admin/products')}
              className="flex-1 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
