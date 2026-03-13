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

  const [gridColumns, setGridColumns] = React.useState('grid-cols-4');
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setGridColumns('grid-cols-1');
        setIsMobile(true);
      } else if (window.innerWidth < 1024) {
        setGridColumns('grid-cols-2');
        setIsMobile(true);
      } else {
        setGridColumns('grid-cols-4');
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const ProductCard = ({ product, isBestSeller = false }) => (
    <Link to={`/product/classic-logo-tshirt`} style={{ textDecoration: 'none' }}>
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
        {isBestSeller && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: '#fff',
            color: '#000',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold',
            zIndex: 10,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}>
            🔥 Best Seller
          </div>
        )}
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
      {/* Hero Section */}
      <section 
        style={{
          width: '100%',
          height: 'clamp(400px, 60vh, 600px)',
          backgroundImage: 'url(https://png.pngtree.com/thumb_back/fh260/background/20230720/pngtree-yellow-background-with-3d-t-shirts-rendered-image_3711716.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 10
        }}></div>
        
        {/* Hero Content */}
        <div style={{
          position: 'relative',
          zIndex: 20,
          textAlign: 'center',
          color: '#fff',
          padding: '20px'
        }}>
          <h1 style={{
            fontSize: 'clamp(32px, 8vw, 56px)',
            fontWeight: 'bold',
            marginBottom: '16px',
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
          }}>
            Premium Embroidery Clothing
          </h1>
          <p style={{
            fontSize: 'clamp(16px, 4vw, 24px)',
            marginBottom: '32px',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
          }}>
            Handcrafted Quality, Timeless Style
          </p>
          <button style={{
            backgroundColor: '#fff',
            color: '#000',
            padding: 'clamp(12px, 2vw, 16px) clamp(24px, 5vw, 48px)',
            fontSize: 'clamp(14px, 2vw, 18px)',
            fontWeight: 'bold',
            borderRadius: '25px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#f0f0f0';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#fff';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
          }}>
            Explore Collection
          </button>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 30,
          animation: 'bounce 2s infinite',
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#fff',
          pointerEvents: 'none'
        }}>
          ↓
        </div>
      </section>

      {/* Shop by Category */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(40px, 8vw, 60px) clamp(16px, 5vw, 40px)' }}>
        <h2 style={{
          fontSize: 'clamp(28px, 6vw, 36px)',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#fff',
          marginBottom: '40px'
        }}>
          Shop by Category
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: '24px'
        }}>
          {categories.map(cat => (
            <a key={cat.id} href={cat.link} style={{ textDecoration: 'none' }}>
              <div style={{
                backgroundColor: '#1a1a1a',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                border: '2px solid #333',
                cursor: 'pointer'
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
                <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
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
                <div style={{ padding: '16px', textAlign: 'center' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#fff',
                    margin: 0
                  }}>
                    {cat.name}
                  </h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(40px, 8vw, 60px) clamp(16px, 5vw, 40px)' }}>
        <h2 style={{
          fontSize: 'clamp(28px, 6vw, 36px)',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#fff',
          marginBottom: '40px'
        }}>
          New Arrivals
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: '24px'
        }}>
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(40px, 8vw, 60px) clamp(16px, 5vw, 40px)' }}>
        <h2 style={{
          fontSize: 'clamp(28px, 6vw, 36px)',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#fff',
          marginBottom: '40px'
        }}>
          Best Sellers
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: '24px'
        }}>
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} isBestSeller={true} />
          ))}
        </div>
      </section>

      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(10px);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
