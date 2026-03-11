import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

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
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%'
        }}></div>
        <h1 style={{ fontSize: 'clamp(32px, 8vw, 48px)', margin: '0 0 20px 0', fontWeight: 700, position: 'relative', zIndex: 1 }}>Get In Touch</h1>
        <p style={{ fontSize: 'clamp(16px, 4vw, 20px)', margin: 0, position: 'relative', zIndex: 1 }}>We're here to help and answer any question you might have</p>
      </section>

      {/* Contact Info Section */}
      <section style={{ maxWidth: '1400px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '60px' }}>
          {[
            { icon: '📍', title: 'Address', content: ['123 Embroidery Lane', 'Fashion District', 'New York, NY 10001'] },
            { icon: '📞', title: 'Phone', content: ['+1 (555) 123-4567', 'Mon - Fri: 9AM - 6PM EST', 'Sat - Sun: 10AM - 4PM EST'] },
            { icon: '✉️', title: 'Email', content: ['info@meda.com', 'support@meda.com', 'custom@meda.com'] }
          ].map((item, idx) => (
            <div key={idx} style={{
              backgroundColor: '#fff',
              padding: '40px',
              borderRadius: '16px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              border: '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(102, 126, 234, 0.2)';
              e.currentTarget.style.borderColor = '#667eea';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
              e.currentTarget.style.borderColor = 'transparent';
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>{item.icon}</div>
              <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '15px', color: '#333' }}>{item.title}</h3>
              {item.content.map((line, i) => (
                <p key={i} style={{ fontSize: '16px', lineHeight: '1.6', color: '#666', margin: '5px 0' }}>{line}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section style={{ maxWidth: '900px', margin: '60px auto 80px', padding: '0 20px' }}>
        <div style={{ backgroundColor: '#fff', padding: 'clamp(30px, 5vw, 60px)', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 'clamp(28px, 6vw, 36px)', fontWeight: 700, marginBottom: '40px', color: '#333', textAlign: 'center' }}>Send us a Message</h2>
          
          {submitted && (
            <div style={{
              backgroundColor: '#d4edda',
              color: '#155724',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: 600
            }}>
              ✓ Thank you! We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: '#333' }}>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e0e0e0';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: '#333' }}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e0e0e0';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: '#333' }}>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '14px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e0e0';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="(555) 123-4567"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: '#333' }}>Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '14px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e0e0';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="How can we help?"
              />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: '#333' }}>Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                style={{
                  width: '100%',
                  padding: '14px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  fontFamily: 'Arial, sans-serif',
                  transition: 'all 0.3s ease',
                  resize: 'vertical'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e0e0';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: '#667eea',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#5568d3';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#667eea';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ maxWidth: '1200px', margin: '60px auto 80px', padding: '0 20px' }}>
        <h2 style={{ fontSize: 'clamp(28px, 6vw, 36px)', fontWeight: 700, marginBottom: '40px', textAlign: 'center', color: '#333' }}>Frequently Asked Questions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {[
            { q: 'How long does delivery take?', a: 'Standard delivery takes 5-7 business days. Express shipping is available for 2-3 business days.' },
            { q: 'Can I customize my order?', a: 'Absolutely! We offer full customization options for all our products. Contact us for details.' },
            { q: 'What is your return policy?', a: 'We offer 30-day returns on all items in original condition. Contact support for assistance.' },
            { q: 'Do you offer bulk orders?', a: 'Yes! We provide special pricing for bulk orders. Contact our sales team for a quote.' },
            { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and other digital payment methods.' },
            { q: 'How do I track my order?', a: 'You will receive a tracking number via email once your order ships.' }
          ].map((item, idx) => (
            <div key={idx} style={{
              backgroundColor: '#fff',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '15px', color: '#333' }}>❓ {item.q}</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;
