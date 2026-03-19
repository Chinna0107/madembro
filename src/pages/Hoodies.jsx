import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Hoodies = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    { id: 'classic-black-hoodie', name: 'Classic Black Hoodie', price: 54.99, image: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvb2RpZXxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 'embroidered-rose-hoodie', name: 'Embroidered Rose Hoodie', price: 59.99, image: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvb2RpZXxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 'premium-hoodie', name: 'Premium Hoodie', price: 64.99, image: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvb2RpZXxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 'custom-name-hoodie', name: 'Custom Name Hoodie', price: 64.99, image: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvb2RpZXxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 'embroidered-logo-hoodie', name: 'Embroidered Logo Hoodie', price: 59.99, image: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvb2RpZXxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 'vintage-hoodie', name: 'Vintage Hoodie', price: 54.99, image: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvb2RpZXxlbnwwfHwwfHx8MA%3D%3D' }
  ];

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsMobile(true);
      } else if (window.innerWidth < 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const ProductCard = ({ product }) => (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        border: '2px solid #333',
        position: 'relative',
        height: '100%'
      }}
      onMouseEnter={(e) => {
        if (!isMobile) {
          e.currentTarget.style.transform = 'translateY(-12px)';
          e.currentTarget.style.boxShadow = '0 16px 32px rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.borderColor = '#fff';
        }
      }}
      onMouseLeave={(e) => {
        if (!isMobile) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.borderColor = '#333';
        }
      }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: '250px' }}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (!isMobile) e.target.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={(e) => {
              if (!isMobile) e.target.style.transform = 'scale(1)';
            }}
          />
        </div>
        <div style={{ padding: '16px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            margin: '0 0 8px 0',
            color: '#fff',
            lineHeight: '1.3',
            minHeight: '40px'
          }}>
            {product.name}
          </h3>
          <p style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#fff',
            margin: '0',
            letterSpacing: '0.5px'
          }}>
            ${product.price}
          </p>
        </div>
      </div>
    </Link>
  );

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(40px, 8vw, 60px) clamp(16px, 5vw, 40px)' }}>
        <h2 style={{
          fontSize: 'clamp(28px, 6vw, 36px)',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#fff',
          marginBottom: '40px'
        }}>
          Hoodies
        </h2>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '40px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: '#0a0a0a',
            padding: '12px 20px',
            borderRadius: '25px',
            border: '1px solid #333',
            width: isMobile ? '100%' : '400px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#ececea';
            e.currentTarget.style.background = '#1a1a1a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#333';
            e.currentTarget.style.background = '#0a0a0a';
          }}
          >
            <span style={{ fontSize: '18px', marginRight: '10px' }}>🔍</span>
            <input
              type="text"
              placeholder="Search Hoodies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                color: '#fff',
                width: '100%',
                fontSize: '14px',
                fontFamily: 'Arial, sans-serif'
              }}
            />
          </div>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: '24px'
        }}>
          {products.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          ).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hoodies;
