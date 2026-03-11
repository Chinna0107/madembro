import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const categories = [
    { id: 1, name: 'T-Shirts', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeIY969YenTvHsgWRjmSsFWgpWdnRS0aEaYw&s', link: 'tshirts' },
    { id: 2, name: 'Sweatshirts', image: 'https://media.istockphoto.com/id/1090883146/photo/young-man-in-oversized-sweatshirt-isolated-on-textured-gray-wall-background.jpg?s=612x612&w=0&k=20&c=4w9Gqdh_kdCc5Mo4jJbd-3DCEPwXDN1zCK11mco-AA8=', link: 'sweatshirts' },
    { id: 3, name: 'Hoodies', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJf7YSmgkWvB9aY1SRF-d9hVVpX7jJ8BjYSA&s', link: 'hoodies' },
    { id: 4, name: 'Custom Embroidery', image: 'https://img.freepik.com/free-photo/row-hoodies-with-different-colors-one-that-says-hoodie_188544-43266.jpg?semt=ais_rp_progressive&w=740&q=80', link: 'custom' }
  ];

  const newArrivals = [
    { id: 1, name: 'Embroidered Rose Hoodie', price: 59.99, image: 'https://img.freepik.com/free-photo/row-hoodies-with-different-colors-one-that-says-hoodie_188544-43266.jpg?semt=ais_rp_progressive&w=740&q=80' },
    { id: 2, name: 'Classic Logo T-Shirt', price: 29.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop' },
    { id: 3, name: 'Premium Sweatshirt', price: 49.99, image: 'https://img.freepik.com/free-photo/row-hoodies-with-different-colors-one-that-says-hoodie_188544-43266.jpg?semt=ais_rp_progressive&w=740&q=80' },
    { id: 4, name: 'Custom Name Hoodie', price: 64.99, image: 'https://img.freepik.com/free-photo/row-hoodies-with-different-colors-one-that-says-hoodie_188544-43266.jpg?semt=ais_rp_progressive&w=740&q=80' }
  ];

  const bestSellers = [
    { id: 1, name: 'Signature Embroidered Tee', price: 34.99, image: 'https://img.freepik.com/free-photo/row-hoodies-with-different-colors-one-that-says-hoodie_188544-43266.jpg?semt=ais_rp_progressive&w=740&q=80', sales: 1250 },
    { id: 2, name: 'Classic Black Hoodie', price: 54.99, image: 'https://img.freepik.com/free-photo/row-hoodies-with-different-colors-one-that-says-hoodie_188544-43266.jpg?semt=ais_rp_progressive&w=740&q=80', sales: 980 },
    { id: 3, name: 'Vintage Sweatshirt', price: 44.99, image: 'https://img.freepik.com/free-photo/row-hoodies-with-different-colors-one-that-says-hoodie_188544-43266.jpg?semt=ais_rp_progressive&w=740&q=80', sales: 850 },
    { id: 4, name: 'Embroidered Logo Hoodie', price: 59.99, image: 'https://img.freepik.com/free-photo/row-hoodies-with-different-colors-one-that-says-hoodie_188544-43266.jpg?semt=ais_rp_progressive&w=740&q=80', sales: 720 }
  ];

  const [gridColumns, setGridColumns] = React.useState('repeat(4, 1fr)');

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setGridColumns('repeat(1, 1fr)');
      else if (window.innerWidth < 1024) setGridColumns('repeat(2, 1fr)');
      else setGridColumns('repeat(4, 1fr)');
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', margin: 0, padding: 0 }}>
      {/* Full Screen Hero Image */}
      <section style={{
        width: '100%',
        height: 'clamp(300px, calc(100vh - 120px), 800px)',
        backgroundImage: 'url(https://png.pngtree.com/thumb_back/fh260/background/20230720/pngtree-yellow-background-with-3d-t-shirts-rendered-image_3711716.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginTop: '0'
      }}>
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1
        }}></div>
        
        {/* Hero Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          color: '#fff',
          padding: 'clamp(20px, 5vw, 40px)'
        }}>
          <h1 style={{
            fontSize: 'clamp(32px, 10vw, 64px)',
            fontWeight: 700,
            margin: '0 0 20px 0',
            color: '#d4af37',
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
            lineHeight: '1.2'
          }}>Premium Embroidery Clothing</h1>
          <p style={{
            fontSize: 'clamp(16px, 5vw, 24px)',
            margin: '0 0 30px 0',
            color: '#fff',
            textShadow: '1px 1px 4px rgba(0, 0, 0, 0.7)',
            lineHeight: '1.4'
          }}>Handcrafted Quality, Timeless Style</p>
          <button style={{
            backgroundColor: '#d4af37',
            color: '#000',
            border: 'none',
            padding: 'clamp(12px, 3vw, 16px) clamp(28px, 8vw, 48px)',
            fontSize: 'clamp(14px, 3vw, 18px)',
            fontWeight: 700,
            borderRadius: '30px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#e6c200';
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 12px 32px rgba(212, 175, 55, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#d4af37';
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 8px 24px rgba(212, 175, 55, 0.3)';
          }}>
            Explore Collection
          </button>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          animation: 'bounce 2s infinite',
          fontSize: '28px',
          color: '#d4af37',
          fontWeight: 'bold',
          pointerEvents: 'none'
        }}>
          ↓
        </div>
      </section>

      {/* Shop by Category */}
      <section style={{ maxWidth: '1400px', margin: '60px auto', padding: 'clamp(20px, 5vw, 40px)' }}>
        <h2 style={{ 
          fontSize: 'clamp(24px, 6vw, 32px)', 
          fontWeight: 700, 
          marginBottom: '40px', 
          textAlign: 'center', 
          color: '#d4af37' 
        }}>Shop by Category</h2>
        <div style={{ display: 'grid', gridTemplateColumns: gridColumns, gap: 'clamp(15px, 4vw, 30px)' }}>
          {categories.map(cat => (
            <a key={cat.id} href={cat.link} style={{ textDecoration: 'none', color: '#fff' }}>
              <div style={{
                backgroundColor: '#1a1a1a',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(212, 175, 55, 0.2)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: '2px solid #333'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#d4af37';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(212, 175, 55, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#333';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.2)';
              }}>
                <img src={cat.image} alt={cat.name} style={{ width: '100%', height: 'clamp(200px, 50vw, 300px)', objectFit: 'cover' }} />
                <div style={{ padding: 'clamp(12px, 3vw, 20px)', textAlign: 'center' }}>
                  <h3 style={{ fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 600, margin: 0, color: '#d4af37' }}>{cat.name}</h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section style={{ maxWidth: '1400px', margin: '60px auto', padding: 'clamp(20px, 5vw, 40px)' }}>
        <h2 style={{ 
          fontSize: 'clamp(24px, 6vw, 32px)', 
          fontWeight: 700, 
          marginBottom: '40px', 
          textAlign: 'center', 
          color: '#d4af37' 
        }}>New Arrivals</h2>
        <div style={{ display: 'grid', gridTemplateColumns: gridColumns, gap: 'clamp(15px, 4vw, 30px)' }}>
          {newArrivals.map(product => (
            <Link key={product.id} to={`/product/classic-logo-tshirt`} style={{ textDecoration: 'none', color: '#fff' }}>
              <div style={{
                backgroundColor: '#1a1a1a',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(212, 175, 55, 0.2)',
                cursor: 'pointer',
                border: '2px solid #333',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#d4af37';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(212, 175, 55, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#333';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.2)';
              }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: 'clamp(200px, 50vw, 300px)', objectFit: 'cover' }} />
                <div style={{ padding: 'clamp(12px, 3vw, 20px)' }}>
                  <h3 style={{ fontSize: 'clamp(14px, 3vw, 18px)', fontWeight: 600, margin: '0 0 10px 0', color: '#fff' }}>{product.name}</h3>
                  <p style={{ fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 700, color: '#d4af37', margin: 0 }}>${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section style={{ maxWidth: '1400px', margin: '60px auto 0', padding: 'clamp(20px, 5vw, 40px)', backgroundColor: '#000' }}>
        <h2 style={{ 
          fontSize: 'clamp(24px, 6vw, 32px)', 
          fontWeight: 700, 
          marginBottom: '40px', 
          textAlign: 'center', 
          color: '#d4af37' 
        }}>Best Sellers</h2>
        <div style={{ display: 'grid', gridTemplateColumns: gridColumns, gap: 'clamp(15px, 4vw, 30px)' }}>
          {bestSellers.map(product => (
            <Link key={product.id} to={`/product/classic-black-hoodie`} style={{ textDecoration: 'none', color: '#fff' }}>
              <div style={{
                backgroundColor: '#1a1a1a',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(212, 175, 55, 0.2)',
                cursor: 'pointer',
                position: 'relative',
                border: '2px solid #333',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#d4af37';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(212, 175, 55, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#333';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.2)';
              }}>
                <span style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: '#d4af37',
                  color: '#000',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: 'clamp(10px, 2vw, 12px)',
                  fontWeight: 600,
                  zIndex: 1
                }}>🔥 Best Seller</span>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: 'clamp(200px, 50vw, 300px)', objectFit: 'cover' }} />
                <div style={{ padding: 'clamp(12px, 3vw, 20px)' }}>
                  <h3 style={{ fontSize: 'clamp(14px, 3vw, 18px)', fontWeight: 600, margin: '0 0 10px 0', color: '#fff' }}>{product.name}</h3>
                  <p style={{ fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 700, color: '#d4af37', margin: 0 }}>${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateX(-50%) translateY(10px);
            opacity: 0.7;
          }
        }
        
        @media (max-width: 640px) {
          body {
            font-size: 14px;
          }
        }
        
        @media (max-width: 1024px) {
          body {
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
