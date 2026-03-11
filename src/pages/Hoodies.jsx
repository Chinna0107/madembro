import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Hoodies = () => {
  const [notification, setNotification] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { addToCart, cart } = useCart();

  const products = [
    { id: 'classic-black-hoodie', name: 'Classic Black Hoodie', price: 54.99, image: 'https://c4.wallpaperflare.com/wallpaper/190/248/840/red-hoodie-jacket-human-wallpaper-preview.jpg' },
    { id: 'embroidered-rose-hoodie', name: 'Embroidered Rose Hoodie', price: 59.99, image: 'https://c4.wallpaperflare.com/wallpaper/190/248/840/red-hoodie-jacket-human-wallpaper-preview.jpg' },
    { id: 'premium-hoodie', name: 'Premium Hoodie', price: 64.99, image: 'https://c4.wallpaperflare.com/wallpaper/190/248/840/red-hoodie-jacket-human-wallpaper-preview.jpg' },
    { id: 'custom-name-hoodie', name: 'Custom Name Hoodie', price: 64.99, image: 'https://c4.wallpaperflare.com/wallpaper/190/248/840/red-hoodie-jacket-human-wallpaper-preview.jpg' },
    { id: 'embroidered-logo-hoodie', name: 'Embroidered Logo Hoodie', price: 59.99, image: 'https://c4.wallpaperflare.com/wallpaper/190/248/840/red-hoodie-jacket-human-wallpaper-preview.jpg' },
    { id: 'vintage-hoodie', name: 'Vintage Hoodie', price: 54.99, image: 'https://c4.wallpaperflare.com/wallpaper/190/248/840/red-hoodie-jacket-human-wallpaper-preview.jpg' }
  ];

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isInCart = useCallback((productId) => {
    return cart.some(item => item.id === productId && item.size === 'M');
  }, [cart]);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: 'M',
      quantity: 1,
      image: product.image
    });
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(null), 2000);
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: 'clamp(20px, 5vw, 40px)' }}>
      {notification && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          backgroundColor: '#d4af37',
          color: '#000',
          padding: '16px 24px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)',
          zIndex: 1001,
          animation: 'slideIn 0.3s ease',
          fontWeight: 600
        }}>
          ✓ {notification}
        </div>
      )}

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(28px, 6vw, 36px)', fontWeight: 700, color: '#d4af37', marginBottom: '40px' }}>Hoodies</h1>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
          gap: isMobile ? '15px' : '30px' 
        }}>
          {products.map(product => {
            const inCart = isInCart(product.id);
            return (
              <div key={product.id} style={{
                backgroundColor: '#1a1a1a',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(212, 175, 55, 0.2)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: '2px solid #333'
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(212, 175, 55, 0.3)';
                  e.currentTarget.style.borderColor = '#d4af37';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.2)';
                  e.currentTarget.style.borderColor = '#333';
                }
              }}>
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: '#fff' }}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    style={{ 
                      width: '100%', 
                      height: isMobile ? '150px' : '300px', 
                      objectFit: 'cover' 
                    }} 
                  />
                </Link>
                <div style={{ padding: isMobile ? '12px' : '20px' }}>
                  <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: '#fff' }}>
                    <h3 style={{ 
                      fontSize: isMobile ? '14px' : '18px', 
                      fontWeight: 600, 
                      margin: '0 0 8px 0', 
                      color: '#fff',
                      lineHeight: '1.3'
                    }}>
                      {product.name}
                    </h3>
                  </Link>
                  <p style={{ 
                    fontSize: isMobile ? '16px' : '20px', 
                    fontWeight: 700, 
                    color: '#d4af37', 
                    margin: '0 0 12px 0' 
                  }}>
                    ${product.price}
                  </p>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    style={{
                      width: '100%',
                      padding: isMobile ? '10px' : '12px',
                      backgroundColor: inCart ? '#22c55e' : '#d4af37',
                      color: '#000',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: isMobile ? '13px' : '16px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!inCart && !isMobile) {
                        e.target.style.backgroundColor = '#e6c200';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 16px rgba(212, 175, 55, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!inCart && !isMobile) {
                        e.target.style.backgroundColor = '#d4af37';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  >
                    {inCart ? '✓ In Cart' : '🛒 Add'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Hoodies;
