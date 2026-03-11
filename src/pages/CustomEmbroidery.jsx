import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomEmbroidery = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [description, setDescription] = useState('');
  const [step, setStep] = useState(1);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    { id: 'tshirt', name: 'T-Shirt', icon: '👕', description: 'Classic t-shirts with custom embroidery' },
    { id: 'hoodie', name: 'Hoodie', icon: '🧥', description: 'Comfortable hoodies with your design' },
    { id: 'sweatshirt', name: 'Sweatshirt', icon: '🎽', description: 'Premium sweatshirts with embroidery' },
    // { id: 'jacket', name: 'Jacket', icon: '🧤', description: 'Stylish jackets with custom embroidery' },
    // { id: 'cap', name: 'Cap', icon: '🧢', description: 'Custom embroidered caps' },
    // { id: 'bag', name: 'Bag', icon: '👜', description: 'Personalized bags with embroidery' }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = () => {
    if (selectedCategory && uploadedFile && description) {
      setStep(3);
      setTimeout(() => {
        alert('Design submitted successfully! Our team will review and contact you soon.');
        setStep(1);
        setSelectedCategory('');
        setUploadedFile(null);
        setFileName('');
        setDescription('');
      }, 2000);
    }
  };

  const styles = {
    container: {
      backgroundColor: '#000',
      minHeight: '100vh',
      padding: 'clamp(20px, 5vw, 40px)',
      margin: 0,
      width: '100%',
      boxSizing: 'border-box'
    },

    maxWidth: {
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box'
    },

    header: {
      textAlign: 'center',
      marginBottom: '60px'
    },

    title: {
      fontSize: 'clamp(32px, 6vw, 48px)',
      fontWeight: '700',
      color: '#d4af37',
      marginBottom: '15px',
      letterSpacing: '1px'
    },

    subtitle: {
      fontSize: 'clamp(16px, 2vw, 20px)',
      color: '#ccc',
      marginBottom: '10px',
      lineHeight: '1.6'
    },

    description: {
      fontSize: 'clamp(14px, 1.8vw, 16px)',
      color: '#aaa',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.8'
    },

    stepIndicator: {
      display: 'flex',
      justifyContent: 'center',
      gap: isMobile ? '10px' : '30px',
      marginBottom: '50px',
      flexWrap: 'wrap'
    },

    stepItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },

    stepNumber: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '700',
      fontSize: '16px',
      transition: 'all 0.3s ease'
    },

    stepLabel: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#ccc'
    },

    content: {
      backgroundColor: '#1a1a1a',
      borderRadius: '16px',
      padding: 'clamp(30px, 5vw, 50px)',
      border: '1px solid #333',
      boxShadow: '0 8px 32px rgba(212, 175, 55, 0.1)'
    },

    categoryGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
      gap: '20px',
      marginBottom: '40px'
    },

    categoryCard: {
      backgroundColor: '#0a0a0a',
      border: '2px solid #333',
      borderRadius: '12px',
      padding: '25px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },

    categoryIcon: {
      fontSize: '48px',
      marginBottom: '15px'
    },

    categoryName: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#d4af37',
      marginBottom: '8px'
    },

    categoryDesc: {
      fontSize: '12px',
      color: '#aaa',
      lineHeight: '1.4'
    },

    uploadSection: {
      backgroundColor: '#0a0a0a',
      border: '2px dashed #d4af37',
      borderRadius: '12px',
      padding: '40px 20px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginBottom: '30px'
    },

    uploadIcon: {
      fontSize: '48px',
      marginBottom: '15px'
    },

    uploadText: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#d4af37',
      marginBottom: '8px'
    },

    uploadSubtext: {
      fontSize: '14px',
      color: '#aaa'
    },

    fileInput: {
      display: 'none'
    },

    formGroup: {
      marginBottom: '25px'
    },

    label: {
      display: 'block',
      marginBottom: '10px',
      color: '#d4af37',
      fontSize: '14px',
      fontWeight: '600',
      letterSpacing: '0.5px'
    },

    textarea: {
      width: '100%',
      padding: '15px',
      backgroundColor: '#0a0a0a',
      border: '2px solid #333',
      borderRadius: '8px',
      color: '#fff',
      fontSize: '14px',
      fontFamily: 'inherit',
      boxSizing: 'border-box',
      resize: 'vertical',
      minHeight: '120px',
      transition: 'all 0.3s ease'
    },

    button: {
      padding: '14px 32px',
      backgroundColor: '#d4af37',
      color: '#000',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      letterSpacing: '0.5px'
    },

    buttonSecondary: {
      padding: '14px 32px',
      backgroundColor: 'transparent',
      color: '#d4af37',
      border: '2px solid #d4af37',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginRight: '12px'
    },

    buttonGroup: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap'
    },

    successMessage: {
      backgroundColor: '#0a3d0a',
      border: '2px solid #22c55e',
      borderRadius: '12px',
      padding: '30px',
      textAlign: 'center',
      color: '#22c55e'
    },

    successIcon: {
      fontSize: '64px',
      marginBottom: '15px'
    },

    features: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: '30px',
      marginTop: '60px',
      paddingTop: '60px',
      borderTop: '1px solid #333'
    },

    featureCard: {
      textAlign: 'center'
    },

    featureIcon: {
      fontSize: '40px',
      marginBottom: '15px'
    },

    featureTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#d4af37',
      marginBottom: '10px'
    },

    featureText: {
      fontSize: '14px',
      color: '#aaa',
      lineHeight: '1.6'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Custom Embroidery Design</h1>
          <p style={styles.subtitle}>Create Your Unique Design</p>
          <p style={styles.description}>
            Upload your design and choose from our premium product categories. Our expert team will bring your vision to life with precision embroidery.
          </p>
        </div>

        {/* Step Indicator */}
        <div style={styles.stepIndicator}>
          <div style={styles.stepItem}>
            <div style={{
              ...styles.stepNumber,
              backgroundColor: step >= 1 ? '#d4af37' : '#333',
              color: step >= 1 ? '#000' : '#aaa'
            }}>
              1
            </div>
            <span style={styles.stepLabel}>Select Category</span>
          </div>
          <div style={styles.stepItem}>
            <div style={{
              ...styles.stepNumber,
              backgroundColor: step >= 2 ? '#d4af37' : '#333',
              color: step >= 2 ? '#000' : '#aaa'
            }}>
              2
            </div>
            <span style={styles.stepLabel}>Upload Design</span>
          </div>
          <div style={styles.stepItem}>
            <div style={{
              ...styles.stepNumber,
              backgroundColor: step >= 3 ? '#d4af37' : '#333',
              color: step >= 3 ? '#000' : '#aaa'
            }}>
              3
            </div>
            <span style={styles.stepLabel}>Confirm</span>
          </div>
        </div>

        {/* Main Content */}
        <div style={styles.content}>
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: 'clamp(24px, 4vw, 28px)', fontWeight: '700', color: '#d4af37', marginBottom: '30px', margin: 0, marginBottom: '30px' }}>
                Select Product Category
              </h2>
              <div style={styles.categoryGrid}>
                {categories.map(category => (
                  <div
                    key={category.id}
                    style={{
                      ...styles.categoryCard,
                      borderColor: selectedCategory === category.id ? '#d4af37' : '#333',
                      backgroundColor: selectedCategory === category.id ? '#1a1a1a' : '#0a0a0a',
                      boxShadow: selectedCategory === category.id ? '0 0 20px rgba(212, 175, 55, 0.3)' : 'none'
                    }}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setStep(2);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#d4af37';
                      e.currentTarget.style.transform = 'translateY(-5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = selectedCategory === category.id ? '#d4af37' : '#333';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={styles.categoryIcon}>{category.icon}</div>
                    <div style={styles.categoryName}>{category.name}</div>
                    <div style={styles.categoryDesc}>{category.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontSize: 'clamp(24px, 4vw, 28px)', fontWeight: '700', color: '#d4af37', marginBottom: '30px', margin: 0, marginBottom: '30px' }}>
                Upload Your Design
              </h2>

              <div style={{ marginBottom: '30px' }}>
                <label style={styles.label}>Selected Category</label>
                <div style={{
                  padding: '15px',
                  backgroundColor: '#0a0a0a',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  color: '#d4af37',
                  fontWeight: '600'
                }}>
                  {categories.find(c => c.id === selectedCategory)?.name}
                </div>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={styles.label}>Upload Design File</label>
                <input
                  type="file"
                  id="fileInput"
                  style={styles.fileInput}
                  onChange={handleFileUpload}
                  accept="image/*,.pdf"
                />
                <div
                  style={styles.uploadSection}
                  onClick={() => document.getElementById('fileInput').click()}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1a1a1a';
                    e.currentTarget.style.borderColor = '#e6c200';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#0a0a0a';
                    e.currentTarget.style.borderColor = '#d4af37';
                  }}
                >
                  <div style={styles.uploadIcon}>📤</div>
                  <div style={styles.uploadText}>
                    {fileName ? `✓ ${fileName}` : 'Click to upload or drag and drop'}
                  </div>
                  <div style={styles.uploadSubtext}>
                    PNG, JPG, PDF up to 10MB
                  </div>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Design Description</label>
                <textarea
                  style={styles.textarea}
                  placeholder="Describe your design, colors, placement, and any special requirements..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#d4af37';
                    e.target.style.backgroundColor = '#1a1a1a';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#333';
                    e.target.style.backgroundColor = '#0a0a0a';
                  }}
                />
              </div>

              <div style={styles.buttonGroup}>
                <button
                  style={styles.buttonSecondary}
                  onClick={() => setStep(1)}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#d4af37';
                    e.target.style.color = '#000';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#d4af37';
                  }}
                >
                  Back
                </button>
                <button
                  style={{
                    ...styles.button,
                    opacity: selectedCategory && uploadedFile && description ? 1 : 0.5,
                    cursor: selectedCategory && uploadedFile && description ? 'pointer' : 'not-allowed'
                  }}
                  onClick={handleSubmit}
                  disabled={!selectedCategory || !uploadedFile || !description}
                  onMouseEnter={(e) => {
                    if (selectedCategory && uploadedFile && description) {
                      e.target.style.backgroundColor = '#e6c200';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 20px rgba(212, 175, 55, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#d4af37';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Submit Design
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={styles.successMessage}>
              <div style={styles.successIcon}>✓</div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 10px 0' }}>
                Design Submitted Successfully!
              </h2>
              <p style={{ fontSize: '16px', margin: '0 0 20px 0', lineHeight: '1.6' }}>
                Thank you for your submission. Our design team will review your custom embroidery request and contact you within 24 hours with a quote and timeline.
              </p>
              <button
                style={styles.button}
                onClick={() => navigate('/')}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#e6c200';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#d4af37';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Back to Home
              </button>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div style={styles.features}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🎨</div>
            <div style={styles.featureTitle}>Custom Design</div>
            <div style={styles.featureText}>
              Upload your unique design and we'll bring it to life with precision embroidery
            </div>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>⚡</div>
            <div style={styles.featureTitle}>Fast Turnaround</div>
            <div style={styles.featureText}>
              Quick processing and delivery. Most orders completed within 5-7 business days
            </div>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>✨</div>
            <div style={styles.featureTitle}>Premium Quality</div>
            <div style={styles.featureText}>
              Professional embroidery with high-quality materials and expert craftsmanship
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomEmbroidery;
