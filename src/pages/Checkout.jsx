import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="bg-black min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto text-center pt-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Your Cart is Empty</h1>
          <p className="text-gray-400 mb-8 text-base md:text-lg">Add items to your cart before checking out.</p>
          <button
            onClick={() => navigate('/tshirts')}
            className="bg-white text-black px-8 py-3 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="bg-black min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-gray-900 p-8 md:p-12 rounded-xl border border-gray-800 text-center">
          <div className="text-6xl mb-6">✓</div>
          <h1 className="text-3xl md:text-4xl font-bold text-green-500 mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-400 mb-2 text-base md:text-lg">Thank you for your purchase.</p>
          <p className="text-gray-500 mb-8 text-base md:text-lg">Order confirmation has been sent to your email.</p>
          
          <div className="bg-gray-800 p-6 rounded-lg mb-8 border border-gray-700">
            <p className="text-white text-sm mb-2">Order Number</p>
            <p className="text-white text-xl md:text-2xl font-bold">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="bg-white text-black px-8 py-3 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setOrderPlaced(true);
      clearCart();
    }
  };

  const inputStyle = 'w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors';
  const labelStyle = 'block mb-2 text-white font-bold text-sm md:text-base';
  const errorStyle = 'text-red-500 text-xs mt-1';

  return (
    <div className="bg-black min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-12">Checkout</h1>

        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'} gap-6 md:gap-8`}>
          {/* Checkout Form */}
          <form onSubmit={handlePlaceOrder} className={isMobile ? 'col-span-1' : 'lg:col-span-2'}>
            {/* Shipping Information */}
            <div className="bg-gray-900 rounded-xl p-6 md:p-8 border border-gray-800 mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelStyle}>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="John"
                  />
                  {errors.firstName && <div className={errorStyle}>{errors.firstName}</div>}
                </div>
                <div>
                  <label className={labelStyle}>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="Doe"
                  />
                  {errors.lastName && <div className={errorStyle}>{errors.lastName}</div>}
                </div>
              </div>

              <div className="mb-4">
                <label className={labelStyle}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputStyle}
                  placeholder="john@example.com"
                />
                {errors.email && <div className={errorStyle}>{errors.email}</div>}
              </div>

              <div className="mb-4">
                <label className={labelStyle}>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={inputStyle}
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && <div className={errorStyle}>{errors.phone}</div>}
              </div>

              <div className="mb-4">
                <label className={labelStyle}>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={inputStyle}
                  placeholder="123 Main Street"
                />
                {errors.address && <div className={errorStyle}>{errors.address}</div>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={labelStyle}>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="New York"
                  />
                  {errors.city && <div className={errorStyle}>{errors.city}</div>}
                </div>
                <div>
                  <label className={labelStyle}>State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="NY"
                  />
                  {errors.state && <div className={errorStyle}>{errors.state}</div>}
                </div>
                <div>
                  <label className={labelStyle}>Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="10001"
                  />
                  {errors.zipCode && <div className={errorStyle}>{errors.zipCode}</div>}
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-gray-900 rounded-xl p-6 md:p-8 border border-gray-800">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Payment Information</h2>
              
              <div className="mb-4">
                <label className={labelStyle}>Cardholder Name</label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  className={inputStyle}
                  placeholder="John Doe"
                />
                {errors.cardName && <div className={errorStyle}>{errors.cardName}</div>}
              </div>

              <div className="mb-4">
                <label className={labelStyle}>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className={inputStyle}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                />
                {errors.cardNumber && <div className={errorStyle}>{errors.cardNumber}</div>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelStyle}>Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="MM/YY"
                    maxLength="5"
                  />
                  {errors.expiryDate && <div className={errorStyle}>{errors.expiryDate}</div>}
                </div>
                <div>
                  <label className={labelStyle}>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="123"
                    maxLength="4"
                  />
                  {errors.cvv && <div className={errorStyle}>{errors.cvv}</div>}
                </div>
              </div>
            </div>
          </form>

          {/* Order Summary */}
          <div className={`bg-gray-900 rounded-xl p-6 md:p-8 border border-gray-800 h-fit ${isMobile ? 'col-span-1' : 'lg:col-span-1'}`}>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Order Summary</h2>

            <div className="max-h-64 overflow-y-auto mb-6 pb-6 border-b border-gray-700">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between mb-4 text-sm md:text-base text-gray-400">
                  <div>
                    <p className="text-white font-bold">{item.name}</p>
                    <p className="text-xs text-gray-500">Size: {item.size} × {item.quantity}</p>
                  </div>
                  <span className="font-bold text-white">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-gray-700">
              <div className="flex justify-between text-sm md:text-base text-gray-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm md:text-base text-gray-400">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm md:text-base text-gray-400">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-500 font-bold' : 'text-gray-400'}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
            </div>

            <div className="flex justify-between text-lg md:text-xl font-bold text-white mb-6">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-white text-black py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 mb-3"
            >
              Place Order
            </button>

            <button
              onClick={() => navigate('/cart')}
              className="w-full bg-transparent text-white border-2 border-white py-3 rounded-lg font-bold hover:bg-white hover:text-black transition-all duration-300"
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
