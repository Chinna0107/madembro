import React from 'react';

const About = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const values = [
    { icon: '✨', title: 'Quality', description: 'Premium materials and expert craftsmanship in every piece' },
    { icon: '🎨', title: 'Creativity', description: 'Custom designs that express your unique style' },
    { icon: '💚', title: 'Sustainability', description: 'Eco-friendly practices and ethical production' },
    { icon: '🤝', title: 'Community', description: 'Building connections through shared passion' }
  ];

  const team = [
    { name: 'Sarah Johnson', role: 'Founder & Creative Director', image: '👩‍💼' },
    { name: 'Michael Chen', role: 'Head of Production', image: '👨‍💼' },
    { name: 'Emma Davis', role: 'Customer Experience Lead', image: '👩‍💼' },
    { name: 'James Wilson', role: 'Design Specialist', image: '👨‍💼' }
  ];

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
      {/* Hero Section */}
      <section style={{
        padding: 'clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px)',
        textAlign: 'center',
        borderBottom: '2px solid #333'
      }}>
        <h1 style={{
          fontSize: 'clamp(32px, 8vw, 56px)',
          fontWeight: 'bold',
          marginBottom: '20px'
        }}>
          About MADEMBRO
        </h1>
        <p style={{
          fontSize: 'clamp(16px, 3vw, 20px)',
          color: '#ccc',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Crafting premium embroidered clothing since 2018. We believe in quality, creativity, and community.
        </p>
      </section>

      {/* Our Story */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '40px',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{
              fontSize: 'clamp(28px, 6vw, 40px)',
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>
              Our Story
            </h2>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#ccc',
              marginBottom: '16px'
            }}>
              MADEMBRO started as a passion project in a small studio. What began with a single embroidery machine and a dream has grown into a thriving custom apparel business serving thousands of satisfied customers worldwide.
            </p>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#ccc',
              marginBottom: '16px'
            }}>
              We're dedicated to creating high-quality, custom embroidered clothing that tells your story. Every piece is crafted with attention to detail and a commitment to excellence.
            </p>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#ccc'
            }}>
              Today, we continue to innovate and expand our offerings while maintaining the same passion and quality that started it all.
            </p>
          </div>
          <div style={{
            backgroundColor: '#1a1a1a',
            borderRadius: '12px',
            padding: '40px',
            textAlign: 'center',
            border: '2px solid #333'
          }}>
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>🧵</div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
              6+ Years
            </h3>
            <p style={{ color: '#ccc' }}>Of Excellence in Embroidery</p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px)',
        borderTop: '2px solid #333'
      }}>
        <h2 style={{
          fontSize: 'clamp(28px, 6vw, 40px)',
          fontWeight: 'bold',
          marginBottom: '50px',
          textAlign: 'center'
        }}>
          Our Values
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '30px'
        }}>
          {values.map((value, idx) => (
            <div key={idx} style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '12px',
              padding: '30px',
              border: '2px solid #333',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.borderColor = '#fff';
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(255, 255, 255, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.borderColor = '#333';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>{value.icon}</div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
                {value.title}
              </h3>
              <p style={{ color: '#ccc', lineHeight: '1.6' }}>
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Team */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px)',
        borderTop: '2px solid #333'
      }}>
        <h2 style={{
          fontSize: 'clamp(28px, 6vw, 40px)',
          fontWeight: 'bold',
          marginBottom: '50px',
          textAlign: 'center'
        }}>
          Meet Our Team
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: '24px'
        }}>
          {team.map((member, idx) => (
            <div key={idx} style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '12px',
              padding: '30px',
              textAlign: 'center',
              border: '2px solid #333',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.borderColor = '#fff';
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(255, 255, 255, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.borderColor = '#333';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}>
              <div style={{ fontSize: '60px', marginBottom: '15px' }}>{member.image}</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                {member.name}
              </h3>
              <p style={{ color: '#ccc', fontSize: '14px' }}>
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{
        backgroundColor: '#1a1a1a',
        padding: 'clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px)',
        borderTop: '2px solid #333',
        borderBottom: '2px solid #333'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: '30px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '10px' }}>10K+</div>
            <p style={{ color: '#ccc' }}>Happy Customers</p>
          </div>
          <div>
            <div style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '10px' }}>50K+</div>
            <p style={{ color: '#ccc' }}>Items Shipped</p>
          </div>
          <div>
            <div style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '10px' }}>98%</div>
            <p style={{ color: '#ccc' }}>Satisfaction Rate</p>
          </div>
          <div>
            <div style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '10px' }}>24/7</div>
            <p style={{ color: '#ccc' }}>Customer Support</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px)',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: 'clamp(28px, 6vw, 40px)',
          fontWeight: 'bold',
          marginBottom: '20px'
        }}>
          Ready to Create Something Amazing?
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#ccc',
          marginBottom: '30px'
        }}>
          Explore our collection and bring your vision to life with custom embroidery.
        </p>
        <a href="/tshirts" style={{ textDecoration: 'none' }}>
          <button style={{
            backgroundColor: '#fff',
            color: '#000',
            padding: '12px 32px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '25px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#f0f0f0';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 20px rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#fff';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}>
            Shop Now
          </button>
        </a>
      </section>
    </div>
  );
};

export default About;
