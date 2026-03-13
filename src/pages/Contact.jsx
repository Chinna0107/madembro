import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    { icon: '📍', title: 'Address', content: '123 Embroidery Lane, Creative City, CC 12345' },
    { icon: '📞', title: 'Phone', content: '+1 (555) 123-4567' },
    { icon: '✉️', title: 'Email', content: 'hello@madembro.com' },
    { icon: '🕐', title: 'Hours', content: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM' }
  ];

  const faqs = [
    {
      question: 'How long does custom embroidery take?',
      answer: 'Standard orders take 5-7 business days. Rush orders available for additional fee.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer 30-day returns on all items in original condition. Custom orders are non-refundable.'
    },
    {
      question: 'Do you offer bulk orders?',
      answer: 'Yes! We offer special pricing for bulk orders. Contact us for a custom quote.'
    },
    {
      question: 'What materials do you use?',
      answer: 'We use premium quality cotton, cotton blends, and fleece materials from trusted suppliers.'
    },
    {
      question: 'Can I track my order?',
      answer: 'Yes, you\'ll receive a tracking number via email once your order ships.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to most countries. International shipping rates apply.'
    }
  ];

  const [expandedFaq, setExpandedFaq] = useState(null);

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
          Get in Touch
        </h1>
        <p style={{
          fontSize: 'clamp(16px, 3vw, 20px)',
          color: '#ccc',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </section>

      {/* Contact Info Cards */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: '24px',
          marginBottom: '60px'
        }}>
          {contactInfo.map((info, idx) => (
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
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>{info.icon}</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
                {info.title}
              </h3>
              <p style={{ color: '#ccc', fontSize: '14px' }}>
                {info.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form & Map */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px)',
        borderTop: '2px solid #333'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '40px'
        }}>
          {/* Form */}
          <div>
            <h2 style={{
              fontSize: 'clamp(24px, 5vw, 32px)',
              fontWeight: 'bold',
              marginBottom: '30px'
            }}>
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#1a1a1a',
                    border: '2px solid #333',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#fff';
                    e.target.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#333';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#1a1a1a',
                    border: '2px solid #333',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#fff';
                    e.target.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#333';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#1a1a1a',
                    border: '2px solid #333',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#fff';
                    e.target.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#333';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#1a1a1a',
                    border: '2px solid #333',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#fff';
                    e.target.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#333';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#fff',
                  color: '#000',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
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
                }}
              >
                Send Message
              </button>

              {submitted && (
                <div style={{
                  marginTop: '20px',
                  padding: '16px',
                  backgroundColor: '#22c55e',
                  borderRadius: '8px',
                  textAlign: 'center',
                  color: '#000',
                  fontWeight: '600'
                }}>
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}
            </form>
          </div>

          {/* Info */}
          <div>
            <h2 style={{
              fontSize: 'clamp(24px, 5vw, 32px)',
              fontWeight: 'bold',
              marginBottom: '30px'
            }}>
              Why Contact Us?
            </h2>
            <div style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '12px',
              padding: '30px',
              border: '2px solid #333'
            }}>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
                  📧 Customer Support
                </h3>
                <p style={{ color: '#ccc', lineHeight: '1.6' }}>
                  Have questions about your order? Our support team is here to help.
                </p>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
                  🎨 Custom Orders
                </h3>
                <p style={{ color: '#ccc', lineHeight: '1.6' }}>
                  Interested in bulk orders or special projects? Let's discuss your needs.
                </p>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
                  🤝 Partnerships
                </h3>
                <p style={{ color: '#ccc', lineHeight: '1.6' }}>
                  Looking to collaborate? We'd love to explore partnership opportunities.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
                  💡 Feedback
                </h3>
                <p style={{ color: '#ccc', lineHeight: '1.6' }}>
                  Your feedback helps us improve. Share your thoughts and suggestions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
          Frequently Asked Questions
        </h2>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {faqs.map((faq, idx) => (
            <div key={idx} style={{
              marginBottom: '16px',
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              border: '2px solid #333',
              overflow: 'hidden'
            }}>
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                style={{
                  width: '100%',
                  padding: '20px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#fff',
                  textAlign: 'left',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span>{faq.question}</span>
                <span style={{
                  transform: expandedFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  ▼
                </span>
              </button>
              {expandedFaq === idx && (
                <div style={{
                  padding: '0 20px 20px 20px',
                  borderTop: '1px solid #333',
                  color: '#ccc',
                  lineHeight: '1.6'
                }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;
