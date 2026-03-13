import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomEmbroidery = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [description, setDescription] = useState('');
  const [step, setStep] = useState(1);

  const categories = [
    { id: 'tshirt', name: 'T-Shirt', icon: '👕', description: 'Classic t-shirts with custom embroidery' },
    { id: 'hoodie', name: 'Hoodie', icon: '🧥', description: 'Comfortable hoodies with your design' },
    { id: 'sweatshirt', name: 'Sweatshirt', icon: '🎽', description: 'Premium sweatshirts with embroidery' }
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
        alert('Design submitted successfully!');
        setStep(1);
        setSelectedCategory('');
        setUploadedFile(null);
        setFileName('');
        setDescription('');
      }, 2000);
    }
  };

  const styles = {

    container:{
      background:'#000',
      minHeight:'100vh',
      padding:'40px'
    },

    title:{
      fontSize:'40px',
      color:'#ffffff',
      textAlign:'center',
      marginBottom:'10px'
    },

    subtitle:{
      color:'#ccc',
      textAlign:'center',
      marginBottom:'40px'
    },

    content:{
      background:'#111',
      padding:'40px',
      borderRadius:'12px',
      border:'1px solid #333'
    },

    categoryGrid:{
      display:'grid',
      gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',
      gap:'20px'
    },

    categoryCard:{
      background:'#000',
      border:'2px solid #333',
      padding:'25px',
      borderRadius:'10px',
      textAlign:'center',
      cursor:'pointer',
      transition:'0.3s'
    },

    categoryName:{
      color:'#fff',
      fontWeight:'600',
      marginTop:'10px'
    },

    uploadBox:{
      border:'2px dashed #fff',
      padding:'40px',
      textAlign:'center',
      borderRadius:'10px',
      marginBottom:'20px',
      cursor:'pointer'
    },

    textarea:{
      width:'100%',
      padding:'15px',
      background:'#000',
      border:'1px solid #333',
      borderRadius:'8px',
      color:'#fff',
      marginTop:'10px'
    },

    button:{
      background:'#ffffff',
      color:'#000',
      border:'none',
      padding:'12px 30px',
      borderRadius:'6px',
      fontWeight:'600',
      cursor:'pointer',
      marginTop:'20px'
    },

    buttonSecondary:{
      background:'transparent',
      border:'2px solid #ffffff',
      color:'#ffffff',
      padding:'12px 30px',
      borderRadius:'6px',
      marginRight:'10px',
      cursor:'pointer'
    }

  };

  return (

    <div style={styles.container}>

      <h1 style={styles.title}>Custom Embroidery Design</h1>
      <p style={styles.subtitle}>Upload your design and create your custom clothing</p>

      <div style={styles.content}>

        {/* STEP 1 */}
        {step===1 && (

          <div>
            <h2 style={{color:'#fff',marginBottom:'20px'}}>Select Category</h2>

            <div style={styles.categoryGrid}>

              {categories.map(category=>(
                <div
                  key={category.id}
                  style={{
                    ...styles.categoryCard,
                    borderColor:selectedCategory===category.id ? '#fff' : '#333'
                  }}
                  onClick={()=>{
                    setSelectedCategory(category.id)
                    setStep(2)
                  }}
                >
                  <div style={{fontSize:'40px'}}>{category.icon}</div>
                  <div style={styles.categoryName}>{category.name}</div>
                  <p style={{color:'#aaa',fontSize:'13px'}}>{category.description}</p>
                </div>
              ))}

            </div>
          </div>

        )}

        {/* STEP 2 */}

        {step===2 && (

          <div>

            <h2 style={{color:'#fff',marginBottom:'20px'}}>Upload Design</h2>

            <input
              type="file"
              id="fileUpload"
              style={{display:'none'}}
              onChange={handleFileUpload}
            />

            <div
              style={styles.uploadBox}
              onClick={()=>document.getElementById('fileUpload').click()}
            >
              {fileName ? `Uploaded: ${fileName}` : 'Click to Upload Design'}
            </div>

            <label style={{color:'#fff'}}>Description</label>

            <textarea
              style={styles.textarea}
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              placeholder="Describe your design..."
            />

            <div style={{marginTop:'20px'}}>

              <button
                style={styles.buttonSecondary}
                onClick={()=>setStep(1)}
              >
                Back
              </button>

              <button
                style={styles.button}
                disabled={!uploadedFile || !description}
                onClick={handleSubmit}
              >
                Submit Design
              </button>

            </div>

          </div>

        )}

        {/* STEP 3 */}

        {step===3 && (

          <div style={{textAlign:'center',color:'#fff'}}>

            <h2>✓ Design Submitted</h2>

            <p style={{color:'#ccc'}}>
              Our team will contact you soon with pricing and timeline.
            </p>

            <button
              style={styles.button}
              onClick={()=>navigate('/')}
            >
              Back to Home
            </button>

          </div>

        )}

      </div>

    </div>
  );
};

export default CustomEmbroidery;