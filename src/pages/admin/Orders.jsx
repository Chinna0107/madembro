import React, { useState, useEffect } from 'react';
import config from '../../config';

const STATUS_COLORS = {
  pending:    'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped:    'bg-indigo-100 text-indigo-700',
  delivered:  'bg-green-100 text-green-700',
  cancelled:  'bg-red-100 text-red-700',
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expanded, setExpanded] = useState(null);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`${config.apiUrl}/orders/admin`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setOrders(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`${config.apiUrl}/orders/admin/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
        setMessage('Status updated');
        setTimeout(() => setMessage(''), 2500);
      }
    } catch (err) { console.error(err); }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm('Delete this order?')) return;
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`${config.apiUrl}/orders/admin/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setOrders(prev => prev.filter(o => o.id !== id));
        setMessage('Order deleted');
        setTimeout(() => setMessage(''), 2500);
      }
    } catch (err) { console.error(err); }
  };

  const filtered = filterStatus === 'all' ? orders : orders.filter(o => o.status === filterStatus);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Orders</h1>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{message}</div>
        )}

        <div className="flex gap-2 flex-wrap mb-5">
          {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors capitalize ${
                filterStatus === s ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400'
              }`}>
              {s === 'all' ? 'All Orders' : s}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading...</p>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center text-gray-500 shadow">No orders found</div>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Order ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Payment</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order, i) => (
                  <React.Fragment key={order.id}>
                    <tr className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="px-4 py-3 font-bold text-gray-800">
                        <button onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                          className="text-indigo-500 hover:underline">
                          #{order.id}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-gray-800 font-medium text-sm">{order.customer_name}</p>
                        <p className="text-gray-400 text-xs">{order.customer_email}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-sm">{order.customer_phone || '—'}</td>
                      <td className="px-4 py-3 text-gray-800 font-bold">₹{order.total}</td>
                      <td className="px-4 py-3 text-gray-600 text-sm capitalize">{order.payment_method}</td>
                      <td className="px-4 py-3 text-gray-500 text-sm">
                        {new Date(order.created_at).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <select value={order.status} onChange={e => updateStatus(order.id, e.target.value)}
                            className="px-2 py-1 border border-gray-300 rounded text-xs cursor-pointer focus:outline-none focus:border-indigo-400">
                            {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
                              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                            ))}
                          </select>
                          <button onClick={() => deleteOrder(order.id)}
                            className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors">
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>

                    {expanded === order.id && (
                      <tr className="bg-indigo-50 border-b border-indigo-100">
                        <td colSpan="8" className="px-6 py-4">
                          <p className="text-xs font-semibold text-gray-500 mb-2">📦 Order Items</p>
                          <div className="flex flex-wrap gap-3">
                            {(Array.isArray(order.items) ? order.items : JSON.parse(order.items || '[]')).map((item, idx) => (
                              <div key={idx} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700">
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-gray-400">Size: {item.size} · Color: {item.color} · Qty: {item.quantity}</p>
                                <p className="text-gray-600 font-bold">₹{item.price} each</p>
                              </div>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500 mt-3">📍 {order.shipping_address}</p>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
