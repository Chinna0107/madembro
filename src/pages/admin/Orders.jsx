import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import config from '../../config';

const STATUS_COLORS = {
  pending:    'bg-yellow-900 text-yellow-300',
  processing: 'bg-blue-900 text-blue-300',
  shipped:    'bg-indigo-900 text-indigo-300',
  delivered:  'bg-green-900 text-green-300',
  cancelled:  'bg-red-900 text-red-300',
};

const Orders = () => {
  const { data: orders = [], loading, refetch } = useFetch('/orders/admin', { auth: true });
  const [message, setMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`${config.apiUrl}/orders/admin/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        refetch();
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
        refetch();
        setMessage('Order deleted');
        setTimeout(() => setMessage(''), 2500);
      }
    } catch (err) { console.error(err); }
  };

  const filtered = filterStatus === 'all' ? orders : orders.filter(o => o.status === filterStatus);

  return (
    <div className="bg-black min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Manage Orders</h1>

        {message && (
          <div className="bg-green-900 border border-green-700 text-green-300 px-4 py-3 rounded mb-4">{message}</div>
        )}

        <div className="flex gap-2 flex-wrap mb-5">
          {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors capitalize ${
                filterStatus === s ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-gray-700 hover:border-white hover:text-white'
              }`}>
              {s === 'all' ? 'All Orders' : s}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-gray-400 py-10">Loading...</p>
        ) : filtered.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-10 text-center text-gray-400">No orders found</div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Order ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Total</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Payment</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Status</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order, i) => (
                  <React.Fragment key={order.id}>
                    <tr className={`border-b border-gray-800 ${i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800/50'}`}>
                      <td className="px-4 py-3 font-bold text-white">
                        #{order.id}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-white font-medium text-sm">{order.customer_name}</p>
                        <p className="text-gray-500 text-xs">{order.customer_email}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-sm">{order.customer_phone || '—'}</td>
                      <td className="px-4 py-3 text-white font-bold">₹{order.total}</td>
                      <td className="px-4 py-3 text-gray-400 text-sm capitalize">{order.payment_method}</td>
                      <td className="px-4 py-3 text-gray-400 text-sm">
                        {new Date(order.created_at).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${STATUS_COLORS[order.status] || 'bg-gray-800 text-gray-400'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <select value={order.status} onChange={e => updateStatus(order.id, e.target.value)}
                            className="px-2 py-1 bg-gray-800 border border-gray-700 text-white rounded text-xs cursor-pointer focus:outline-none focus:border-white">
                            {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
                              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                            ))}
                          </select>
                          <button onClick={() => deleteOrder(order.id)}
                            className="px-2 py-1 bg-red-700 text-white rounded text-xs hover:bg-red-600 transition-colors">
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Product Items - always visible */}
                    <tr className="border-b border-gray-800 bg-black/40">
                      <td colSpan="8" className="px-6 py-4">
                        <div className="flex flex-wrap gap-3">
                          {(Array.isArray(order.items) ? order.items : JSON.parse(order.items || '[]')).map((item, idx) => (
                            <div key={idx} className="flex gap-3 bg-gray-900 border border-gray-700 rounded-xl p-3 min-w-[260px]">
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0 border border-gray-700"
                                  onError={e => e.target.style.display = 'none'}
                                />
                              )}
                              <div className="flex flex-col justify-between">
                                <p className="text-white font-semibold text-sm">{item.name}</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {item.size && (
                                    <span className="bg-gray-800 text-gray-300 text-xs px-2 py-0.5 rounded-full border border-gray-700">
                                      Size: {item.size}
                                    </span>
                                  )}
                                  {item.color && (
                                    <span className="bg-gray-800 text-gray-300 text-xs px-2 py-0.5 rounded-full border border-gray-700">
                                      Color: {item.color}
                                    </span>
                                  )}
                                  {item.quantity && (
                                    <span className="bg-gray-800 text-gray-300 text-xs px-2 py-0.5 rounded-full border border-gray-700">
                                      Qty: {item.quantity}
                                    </span>
                                  )}
                                </div>
                                <p className="text-white font-bold text-sm mt-1">₹{item.price} <span className="text-gray-500 font-normal text-xs">each</span></p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-3">📍 {order.shipping_address}</p>
                      </td>
                    </tr>
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
