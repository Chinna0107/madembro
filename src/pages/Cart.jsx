import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  if (cart.length === 0) {
    return (
      <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: 'clamp(20px, 5vw, 40px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', paddingTop: '60px' }}>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 700, color: '#d4af37', marginBottom: '20px' }}>Your Cart is Empty</h1>
          <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', color: '#ccc', marginBottom: '30px' }}>Add some products to get started!</p>
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

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: 'clamp(20px, 5vw, 40px)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 700, color: '#d4af37', marginBottom: '40px' }}>Shopping Cart</h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 350px',
          gap: isMobile ? '30px' : '40px'
        }}>
          {/* Cart Items */}
          <div>
            <div style={{ backgroundColor: '#1a1a1a', borderRadius: '16px', overflow: 'hidden', border: '1px solid #333' }}>
              {isMobile ? (
                // Mobile Layout - One card per row
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px' }}>
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: '#0a0a0a',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '1px solid #333',
                        display: 'grid',
                        gridTemplateColumns: '100px 1fr',
                        gap: '12px',
                        alignItems: 'start',
                        padding: '12px'
                      }}
                    >
                      {/* Product Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '100%',
                          height: '100px',
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                      />

                      {/* Product Details */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#d4af37', margin: 0, lineHeight: '1.2' }}>
                          {item.name}
                        </h3>
                        <p style={{ fontSize: '11px', color: '#aaa', margin: 0 }}>
                          Size: <span style={{ color: '#d4af37', fontWeight: 600 }}>{item.size}</span>
                        </p>
                        <p style={{ fontSize: '13px', color: '#d4af37', fontWeight: 600, margin: 0 }}>
                          ${item.price.toFixed(2)}
                        </p>

                        {/* Quantity Controls */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            style={{
                              width: '24px',
                              height: '24px',
                              border: '1px solid #333',
                              backgroundColor: '#0a0a0a',
                              color: '#d4af37',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: 600,
                              padding: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            −
                          </button>
                          <span style={{ width: '20px', textAlign: 'center', color: '#d4af37', fontWeight: 600, fontSize: '12px' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            style={{
                              width: '24px',
                              height: '24px',
                              border: '1px solid #333',
                              backgroundColor: '#0a0a0a',
                              color: '#d4af37',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: 600,
                              padding: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            +
                          </button>
                        </div>

                        {/* Total Price */}
                        <p style={{ fontSize: '12px', fontWeight: 600, color: '#d4af37', margin: '4px 0 0 0' }}>
                          Total: ${(item.price * item.quantity).toFixed(2)}
                        </p>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          style={{
                            padding: '6px 8px',
                            backgroundColor: '#8b0000',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '11px',
                            fontWeight: 600,
                            transition: 'all 0.2s ease',
                            width: '100%',
                            marginTop: '4px'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#a00000'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = '#8b0000'}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Desktop Layout - Table Style
                <div>
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '120px 1fr 100px 100px 100px',
                        gap: '20px',
                        padding: 'clamp(15px, 3vw, 25px)',
                        borderBottom: index !== cart.length - 1 ? '1px solid #333' : 'none',
                        alignItems: 'center'
                      }}
                    >
                      {/* Product Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '100%',
                          height: '120px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          border: '1px solid #333'
                        }}
                      />

                      {/* Product Details */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <h3 style={{ fontSize: 'clamp(14px, 2vw, 16px)', fontWeight: 600, color: '#d4af37', margin: 0 }}>
                          {item.name}
                        </h3>
                        <p style={{ fontSize: 'clamp(12px, 1.5vw, 14px)', color: '#aaa', margin: 0 }}>
                          Size: <span style={{ color: '#d4af37', fontWeight: 600 }}>{item.size}</span>
                        </p>
                        <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', color: '#d4af37', fontWeight: 600, margin: 0 }}>
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          style={{
                            width: '32px',
                            height: '32px',
                            border: '1px solid #333',
                            backgroundColor: '#0a0a0a',
                            color: '#d4af37',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 600,
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#1a1a1a'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = '#0a0a0a'}
                        >
                          −
                        </button>
                        <span style={{ width: '30px', textAlign: 'center', color: '#d4af37', fontWeight: 600 }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          style={{
                            width: '32px',
                            height: '32px',
                            border: '1px solid #333',
                            backgroundColor: '#0a0a0a',
                            color: '#d4af37',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 600,
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#1a1a1a'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = '#0a0a0a'}
                        >
                          +
                        </button>
                      </div>

                      {/* Total Price */}
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', fontWeight: 600, color: '#d4af37', margin: 0 }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        style={{
                          padding: '8px 12px',
                          backgroundColor: '#8b0000',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: 'clamp(12px, 1.5vw, 14px)',
                          fontWeight: 600,
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#a00000'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#8b0000'}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Checkout Section */}
          <div style={{
            backgroundColor: '#1a1a1a',
            borderRadius: '16px',
            padding: 'clamp(20px, 3vw, 30px)',
            border: '1px solid #333',
            height: 'fit-content',
            position: isMobile ? 'static' : 'sticky',
            top: '100px'
          }}>
            <h2 style={{ fontSize: 'clamp(18px, 3vw, 20px)', fontWeight: 700, color: '#d4af37', marginBottom: '25px', margin: 0, marginBottom: '25px' }}>
              Order Summary
            </h2>

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
              onClick={() => navigate('/checkout')}
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
                transition: 'all 0.3s ease',
                marginBottom: '12px'
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
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate('/tshirts')}
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
                transition: 'all 0.3s ease'
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
              Continue Shopping
            </button>

            {subtotal > 100 && (
              <div style={{
                marginTop: '20px',
                padding: '12px',
                backgroundColor: '#0a3d0a',
                borderRadius: '8px',
                border: '1px solid #22c55e',
                fontSize: 'clamp(12px, 1.5vw, 14px)',
                color: '#22c55e',
                textAlign: 'center'
              }}>
                ✓ Free shipping on this order!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
