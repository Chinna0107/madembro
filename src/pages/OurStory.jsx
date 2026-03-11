import React from 'react';

const OurStory = () => {
  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        padding: 'clamp(40px, 10vw, 100px) 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%'
        }}></div>
        <h1 style={{ fontSize: 'clamp(32px, 8vw, 48px)', margin: '0 0 20px 0', fontWeight: 700, position: 'relative', zIndex: 1 }}>Our Story</h1>
        <p style={{ fontSize: 'clamp(16px, 4vw, 20px)', margin: 0, position: 'relative', zIndex: 1 }}>Crafting Quality, Creating Memories</p>
      </section>

      {/* Story Section */}
      <section style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ backgroundColor: '#fff', padding: 'clamp(30px, 5vw, 60px)', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 'clamp(28px, 6vw, 36px)', fontWeight: 700, marginBottom: '30px', color: '#333' }}>Who We Are</h2>
          <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: '1.8', color: '#666', marginBottom: '20px' }}>
            Welcome to Meda - your premier destination for custom embroidery clothing. Founded in 2020, we started with a simple vision: to create high-quality, personalized apparel that tells your unique story.
          </p>
          <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: '1.8', color: '#666', marginBottom: '20px' }}>
            What began as a small passion project in a garage has grown into a thriving business serving thousands of satisfied customers worldwide. We believe that clothing is more than just fabric - it's a form of self-expression, a way to celebrate achievements, and a means to create lasting memories.
          </p>
          <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: '1.8', color: '#666' }}>
            Today, we continue to innovate and push the boundaries of what's possible in custom embroidery, always keeping our customers at the heart of everything we do.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ backgroundColor: '#fff', padding: 'clamp(30px, 5vw, 60px)', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 'clamp(28px, 6vw, 36px)', fontWeight: 700, marginBottom: '30px', color: '#333' }}>Our Mission</h2>
          <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: '1.8', color: '#666', marginBottom: '30px' }}>
            Our mission is to provide premium quality custom embroidery clothing that exceeds expectations. We are committed to:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {[
              'Delivering exceptional craftsmanship in every stitch',
              'Using only the finest materials and sustainable practices',
              'Offering personalized service and custom designs',
              'Creating products that bring joy and pride to our customers',
              'Building a community of satisfied, loyal customers',
              'Innovating and improving continuously'
            ].map((item, idx) => (
              <div key={idx} style={{
                backgroundColor: '#f5f5f5',
                padding: '20px',
                borderRadius: '12px',
                borderLeft: '4px solid #667eea',
                fontSize: 'clamp(14px, 2vw, 16px)',
                lineHeight: '1.6',
                color: '#666'
              }}>
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: 'clamp(28px, 6vw, 36px)', fontWeight: 700, marginBottom: '40px', textAlign: 'center', color: '#333' }}>Our Core Values</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          {[
            { icon: '🎨', title: 'Creativity', desc: 'We embrace innovation and creative thinking in every design we create.' },
            { icon: '⭐', title: 'Quality', desc: 'Excellence is not an act but a habit. We maintain the highest standards.' },
            { icon: '❤️', title: 'Customer Care', desc: 'Your satisfaction is our priority. We listen and respond to your needs.' },
            { icon: '🌱', title: 'Sustainability', desc: 'We care about our planet and use eco-friendly materials whenever possible.' },
            { icon: '🤝', title: 'Integrity', desc: 'We conduct business with honesty, transparency, and ethical practices.' },
            { icon: '🚀', title: 'Innovation', desc: 'We constantly evolve and improve to serve you better.' }
          ].map((item, idx) => (
            <div key={idx} style={{
              backgroundColor: '#fff',
              padding: '40px',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(102, 126, 234, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>{item.icon}</div>
              <h3 style={{ fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 700, marginBottom: '15px', color: '#333' }}>{item.title}</h3>
              <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', lineHeight: '1.6', color: '#666' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section style={{ maxWidth: '1200px', margin: '60px auto 80px', padding: '0 20px' }}>
        <div style={{ backgroundColor: '#fff', padding: 'clamp(30px, 5vw, 60px)', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 'clamp(28px, 6vw, 36px)', fontWeight: 700, marginBottom: '30px', color: '#333' }}>Our Passionate Team</h2>
          <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: '1.8', color: '#666', marginBottom: '20px' }}>
            Behind every beautiful piece is a dedicated team of skilled artisans, designers, and customer service professionals. Our team is passionate about what we do and committed to bringing your vision to life.
          </p>
          <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: '1.8', color: '#666' }}>
            With years of combined experience in embroidery, fashion, and customer service, we take pride in delivering products that exceed expectations and create lasting relationships with our customers. Every team member shares our commitment to excellence and customer satisfaction.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ maxWidth: '1200px', margin: '60px auto 80px', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
          {[
            { number: '5000+', label: 'Happy Customers' },
            { number: '10000+', label: 'Products Delivered' },
            { number: '50+', label: 'Design Options' },
            { number: '4.8★', label: 'Average Rating' }
          ].map((stat, idx) => (
            <div key={idx} style={{
              backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              padding: '40px',
              borderRadius: '16px',
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.2)'
            }}>
              <div style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 700, marginBottom: '10px' }}>{stat.number}</div>
              <div style={{ fontSize: 'clamp(14px, 2vw, 18px)', fontWeight: 600 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OurStory;
