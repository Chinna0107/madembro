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
      <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: 'clamp(20px, 5vw, 40px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', paddingTop: '60px' }}>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 700, color: '#d4af37', marginBottom: '20px' }}>Your Cart is Empty</h1>
          <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', color: '#ccc', marginBottom: '30px' }}>Add items to your cart before checking out.</p>
          <button
            onClick={() => navigate('/tshirts')}
            style={{
              padding: '12px 32px',
              backgroundColor: '#d4af37',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: 'clamp(14px, 2vw, 16px)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#e6c200';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#d4af37';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: 'clamp(20px, 5vw, 40px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', backgroundColor: '#1a1a1a', padding: 'clamp(30px, 5vw, 50px)', borderRadius: '16px', border: '1px solid #333' }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>✓</div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 700, color: '#22c55e', marginBottom: '15px' }}>Order Placed Successfully!</h1>
          <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', color: '#ccc', marginBottom: '10px' }}>Thank you for your purchase.</p>
          <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', color: '#aaa', marginBottom: '30px' }}>Order confirmation has been sent to your email.</p>
          
          <div style={{ backgroundColor: '#0a0a0a', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #333' }}>
            <p style={{ color: '#d4af37', fontSize: 'clamp(12px, 2vw, 14px)', margin: '0 0 10px 0' }}>Order Number</p>
            <p style={{ color: '#fff', fontSize: 'clamp(16px, 2vw, 18px)', fontWeight: 600, margin: 0 }}>#{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>

          <button
            onClick={() => navigate('/')}
            style={{
              padding: '12px 32px',
              backgroundColor: '#d4af37',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: 'clamp(14px, 2vw, 16px)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#e6c200';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#d4af37';
              e.target.style.transform = 'translateY(0)';
            }}
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

  const inputStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#0a0a0a',
    border: '1px solid #333',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '14px',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    color: '#d4af37',
    fontSize: '14px',
    fontWeight: 600
  };

  const errorStyle = {
    color: '#ff6b6b',
    fontSize: '12px',
    marginTop: '4px'
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: 'clamp(20px, 5vw, 40px)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 700, color: '#d4af37', marginBottom: '40px' }}>Checkout</h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 350px',
          gap: isMobile ? '30px' : '40px'
        }}>
          {/* Checkout Form */}
          <form onSubmit={handlePlaceOrder}>
            {/* Shipping Information */}
            <div style={{ backgroundColor: '#1a1a1a', borderRadius: '16px', padding: 'clamp(20px, 3vw, 30px)', border: '1px solid #333', marginBottom: '30px' }}>
              <h2 style={{ fontSize: 'clamp(18px, 3vw, 20px)', fontWeight: 700, color: '#d4af37', marginBottom: '25px', margin: 0, marginBottom: '25px' }}>Shipping Information</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={labelStyle}>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="John"
                  />
                  {errors.firstName && <div style={errorStyle}>{errors.firstName}</div>}
                </div>
                <div>
                  <label style={labelStyle}>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="Doe"
                  />
                  {errors.lastName && <div style={errorStyle}>{errors.lastName}</div>}
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="john@example.com"
                />
                {errors.email && <div style={errorStyle}>{errors.email}</div>}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={labelStyle}>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && <div style={errorStyle}>{errors.phone}</div>}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={labelStyle}>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="123 Main Street"
                />
                {errors.address && <div style={errorStyle}>{errors.address}</div>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={labelStyle}>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="New York"
                  />
                  {errors.city && <div style={errorStyle}>{errors.city}</div>}
                </div>
                <div>
                  <label style={labelStyle}>State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="NY"
                  />
                  {errors.state && <div style={errorStyle}>{errors.state}</div>}
                </div>
                <div>
                  <label style={labelStyle}>Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="10001"
                  />
                  {errors.zipCode && <div style={errorStyle}>{errors.zipCode}</div>}
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div style={{ backgroundColor: '#1a1a1a', borderRadius: '16px', padding: 'clamp(20px, 3vw, 30px)', border: '1px solid #333' }}>
              <h2 style={{ fontSize: 'clamp(18px, 3vw, 20px)', fontWeight: 700, color: '#d4af37', marginBottom: '25px', margin: 0, marginBottom: '25px' }}>Payment Information</h2>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={labelStyle}>Cardholder Name</label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="John Doe"
                />
                {errors.cardName && <div style={errorStyle}>{errors.cardName}</div>}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={labelStyle}>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                />
                {errors.cardNumber && <div style={errorStyle}>{errors.cardNumber}</div>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={labelStyle}>Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="MM/YY"
                    maxLength="5"
                  />
                  {errors.expiryDate && <div style={errorStyle}>{errors.expiryDate}</div>}
                </div>
                <div>
                  <label style={labelStyle}>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="123"
                    maxLength="4"
                  />
                  {errors.cvv && <div style={errorStyle}>{errors.cvv}</div>}
                </div>
              </div>
            </div>
          </form>

          {/* Order Summary */}
          <div style={{
            backgroundColor: '#1a1a1a',
            borderRadius: '16px',
            padding: 'clamp(20px, 3vw, 30px)',
            border: '1px solid #333',
            height: 'fit-content',
            position: isMobile ? 'static' : 'sticky',
            top: '100px'
          }}>
            <h2 style={{ fontSize: 'clamp(18px, 3vw, 20px)', fontWeight: 700, color: '#d4af37', marginBottom: '25px', margin: 0, marginBottom: '25px' }}>Order Summary</h2>

            <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '25px', paddingBottom: '25px', borderBottom: '1px solid #333' }}>
              {cart.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: 'clamp(13px, 2vw, 14px)', color: '#ccc' }}>
                  <div>
                    <p style={{ margin: 0, color: '#d4af37', fontWeight: 600 }}>{item.name}</p>
                    <p style={{ margin: '4px 0 0 0', color: '#aaa', fontSize: '12px' }}>Size: {item.size} × {item.quantity}</p>
                  </div>
                  <span style={{ fontWeight: 600, color: '#d4af37' }}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '25px', paddingBottom: '25px', borderBottom: '1px solid #333' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(14px, 2vw, 16px)', color: '#ccc' }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(14px, 2vw, 16px)', color: '#ccc' }}>
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(14px, 2vw, 16px)', color: '#ccc' }}>
                <span>Shipping</span>
                <span style={{ color: shipping === 0 ? '#22c55e' : '#ccc' }}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(16px, 2.5vw, 18px)', fontWeight: 700, color: '#d4af37', marginBottom: '30px' }}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#d4af37',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                fontSize: 'clamp(14px, 2vw, 16px)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#e6c200';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 20px rgba(212, 175, 55, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#d4af37';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Place Order
            </button>

            <button
              onClick={() => navigate('/cart')}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: 'transparent',
                color: '#d4af37',
                border: '2px solid #d4af37',
                borderRadius: '8px',
                fontSize: 'clamp(14px, 2vw, 16px)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginTop: '12px'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#d4af37';
                e.target.style.color = '#000';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#d4af37';
              }}
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
