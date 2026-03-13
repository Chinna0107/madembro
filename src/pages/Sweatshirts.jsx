import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sweatshirts = () => {
  const [isMobile, setIsMobile] = useState(false);

  const products = [
    { id: 'classic-sweatshirt', name: 'Classic Sweatshirt', price: 49.99, image: 'https://image.hm.com/assets/hm/e0/d8/e0d8250dfe2e3d9baec690f7302023a83062a574.jpg?imwidth=2160' },
    { id: 'premium-sweatshirt', name: 'Premium Sweatshirt', price: 49.99, image: 'https://image.hm.com/assets/hm/e0/d8/e0d8250dfe2e3d9baec690f7302023a83062a574.jpg?imwidth=2160' },
    { id: 'vintage-sweatshirt', name: 'Vintage Sweatshirt', price: 44.99, image: 'https://image.hm.com/assets/hm/e0/d8/e0d8250dfe2e3d9baec690f7302023a83062a574.jpg?imwidth=2160' },
    { id: 'embroidered-logo-sweatshirt', name: 'Embroidered Logo Sweatshirt', price: 54.99, image: 'https://image.hm.com/assets/hm/e0/d8/e0d8250dfe2e3d9baec690f7302023a83062a574.jpg?imwidth=2160' },
    { id: 'custom-name-sweatshirt', name: 'Custom Name Sweatshirt', price: 59.99, image: 'https://image.hm.com/assets/hm/e0/d8/e0d8250dfe2e3d9baec690f7302023a83062a574.jpg?imwidth=2160' },
    { id: 'oversized-sweatshirt', name: 'Oversized Sweatshirt', price: 52.99, image: 'https://image.hm.com/assets/hm/e0/d8/e0d8250dfe2e3d9baec690f7302023a83062a574.jpg?imwidth=2160' }
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
          Sweatshirts
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: '24px'
        }}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sweatshirts;
