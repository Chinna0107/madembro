import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { useCart } from '../context/CartContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Products() {
  const { name } = useParams();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const sliderRef = useRef(null);
  const { addToCart } = useCart();

  const productsData = {
    'classic-logo-tshirt': { name: 'Classic Logo T-Shirt', price: 29.99, description: 'Premium quality t-shirt with classic logo embroidery. Made from 100% cotton for ultimate comfort and durability. Perfect for everyday wear with a timeless design.', rating: 4.5, reviews: 128, features: ['100% Cotton', 'Classic Logo Embroidery', 'Machine Washable', 'Unisex Fit', 'Breathable Fabric'] },
    'vintage-print-tshirt': { name: 'Vintage Print T-Shirt', price: 34.99, description: 'Stylish vintage print t-shirt featuring retro-inspired embroidery design. Crafted from premium cotton blend for a soft, comfortable feel. Great for casual outings and vintage enthusiasts.', rating: 4.3, reviews: 95, features: ['Cotton Blend', 'Vintage Print Design', 'Soft Touch', 'Fade Resistant', 'Comfortable Fit'] },
    'embroidered-rose-tshirt': { name: 'Embroidered Rose T-Shirt', price: 39.99, description: 'Beautiful rose embroidery on premium cotton t-shirt. Hand-crafted design with intricate details. Perfect for those who appreciate elegant and artistic clothing.', rating: 4.7, reviews: 112, features: ['100% Premium Cotton', 'Hand-Crafted Rose Design', 'Intricate Embroidery', 'Elegant Style', 'Durable Stitching'] },
    'signature-embroidered-tee': { name: 'Signature Embroidered Tee', price: 34.99, description: 'Our signature embroidered t-shirt featuring our iconic design. Made from high-quality cotton with professional embroidery work. A bestseller among our customers.', rating: 4.6, reviews: 189, features: ['100% Cotton', 'Signature Design', 'Professional Embroidery', 'Best Seller', 'Premium Quality'] },
    'custom-name-tshirt': { name: 'Custom Name T-Shirt', price: 44.99, description: 'Personalize your t-shirt with your own name or text. Premium cotton construction with custom embroidery. Perfect gift for friends and family.', rating: 4.4, reviews: 76, features: ['100% Cotton', 'Custom Name Embroidery', 'Personalized', 'Gift Ready', 'Multiple Colors'] },
    'premium-cotton-tshirt': { name: 'Premium Cotton T-Shirt', price: 32.99, description: 'Ultra-soft premium cotton t-shirt with minimalist embroidery. Designed for maximum comfort and longevity. Ideal for everyday wear.', rating: 4.5, reviews: 103, features: ['Premium Cotton', 'Minimalist Design', 'Ultra Soft', 'Long Lasting', 'Eco-Friendly'] },
    'classic-sweatshirt': { name: 'Classic Sweatshirt', price: 49.99, description: 'Comfortable classic sweatshirt with embroidery options. Made from soft fleece blend for warmth and comfort. Perfect for casual wear and layering.', rating: 4.4, reviews: 87, features: ['Fleece Blend', 'Classic Design', 'Warm & Cozy', 'Embroidery Ready', 'Durable'] },
    'premium-sweatshirt': { name: 'Premium Sweatshirt', price: 49.99, description: 'High-quality premium sweatshirt with custom embroidery. Crafted from premium fleece for superior comfort. Great for layering or standalone wear.', rating: 4.6, reviews: 105, features: ['Premium Fleece', 'Custom Embroidery', 'Superior Comfort', 'Warm Lining', 'Professional Quality'] },
    'vintage-sweatshirt': { name: 'Vintage Sweatshirt', price: 44.99, description: 'Retro-inspired vintage sweatshirt with classic embroidery. Soft fleece construction with vintage aesthetic. Perfect for a nostalgic, comfortable look.', rating: 4.3, reviews: 68, features: ['Fleece Material', 'Vintage Style', 'Retro Design', 'Comfortable Fit', 'Timeless Appeal'] },
    'embroidered-logo-sweatshirt': { name: 'Embroidered Logo Sweatshirt', price: 54.99, description: 'Premium sweatshirt featuring embroidered logo design. Made from high-quality fleece with professional embroidery work. Ideal for branding and personal style.', rating: 4.5, reviews: 92, features: ['Premium Fleece', 'Logo Embroidery', 'Professional Work', 'Branded Style', 'Quality Construction'] },
    'custom-name-sweatshirt': { name: 'Custom Name Sweatshirt', price: 59.99, description: 'Personalized sweatshirt with custom name embroidery. Premium fleece construction for comfort and durability. Perfect personalized gift.', rating: 4.7, reviews: 114, features: ['Premium Fleece', 'Custom Name', 'Personalized', 'Gift Perfect', 'Durable Stitching'] },
    'oversized-sweatshirt': { name: 'Oversized Sweatshirt', price: 52.99, description: 'Trendy oversized sweatshirt with comfortable fit. Made from soft fleece with embroidery options. Perfect for a relaxed, modern look.', rating: 4.4, reviews: 81, features: ['Fleece Material', 'Oversized Fit', 'Trendy Style', 'Comfortable', 'Modern Design'] },
    'classic-black-hoodie': { name: 'Classic Black Hoodie', price: 54.99, description: 'Premium black hoodie with custom embroidery design. Made from 100% cotton for maximum comfort and durability. Versatile piece for any wardrobe.', rating: 4.5, reviews: 142, features: ['100% Cotton', 'Custom Embroidery', 'Machine Washable', 'Unisex Fit', 'Premium Quality'] },
    'embroidered-rose-hoodie': { name: 'Embroidered Rose Hoodie', price: 59.99, description: 'Premium quality hoodie with beautiful rose embroidery design. Made from 100% cotton for maximum comfort. Perfect for those who love elegant designs.', rating: 4.5, reviews: 128, features: ['100% Cotton', 'Rose Embroidery', 'Machine Washable', 'Unisex Fit', 'Premium Quality'] },
    'premium-hoodie': { name: 'Premium Hoodie', price: 64.99, description: 'High-quality premium hoodie with superior construction. Made from premium cotton blend with custom embroidery options. Ideal for comfort and style.', rating: 4.6, reviews: 135, features: ['Premium Cotton Blend', 'Superior Construction', 'Custom Embroidery', 'Comfortable Fit', 'Durable'] },
    'custom-name-hoodie': { name: 'Custom Name Hoodie', price: 64.99, description: 'Personalized hoodie with custom name embroidery. Premium cotton construction for comfort and longevity. Perfect personalized gift for anyone.', rating: 4.7, reviews: 156, features: ['Premium Cotton', 'Custom Name', 'Personalized', 'Gift Ready', 'Professional Embroidery'] },
    'embroidered-logo-hoodie': { name: 'Embroidered Logo Hoodie', price: 59.99, description: 'Premium hoodie featuring embroidered logo design. Made from high-quality cotton with professional embroidery. Great for branding and personal style.', rating: 4.6, reviews: 118, features: ['Premium Cotton', 'Logo Embroidery', 'Professional Work', 'Branded Style', 'Quality Construction'] },
    'vintage-hoodie': { name: 'Vintage Hoodie', price: 54.99, description: 'Retro-inspired vintage hoodie with classic embroidery. Soft cotton construction with vintage aesthetic. Perfect for a nostalgic, comfortable look.', rating: 4.4, reviews: 97, features: ['Cotton Material', 'Vintage Style', 'Retro Design', 'Comfortable Fit', 'Timeless Appeal'] },
    'custom-logo-design': { name: 'Custom Logo Design', price: 69.99, description: 'Create your own custom logo embroidery on any garment. Professional embroidery service with unlimited design possibilities. Perfect for businesses and personal branding.', rating: 4.8, reviews: 156, features: ['Custom Design', 'Professional Embroidery', 'Any Garment', 'Unlimited Options', 'Business Ready'] },
    'personalized-name-embroidery': { name: 'Personalized Name Embroidery', price: 59.99, description: 'Add personalized name embroidery to any garment. Professional embroidery service with high-quality stitching. Perfect for gifts and personal items.', rating: 4.7, reviews: 142, features: ['Custom Name', 'Professional Embroidery', 'High Quality', 'Gift Perfect', 'Durable Stitching'] },
    'custom-team-embroidery': { name: 'Custom Team Embroidery', price: 74.99, description: 'Custom team embroidery for sports teams and groups. Professional embroidery with team logos and names. Perfect for team uniforms and group events.', rating: 4.6, reviews: 89, features: ['Team Logos', 'Professional Embroidery', 'Group Ready', 'Uniform Quality', 'Bulk Options'] },
    'monogram-embroidery': { name: 'Monogram Embroidery', price: 54.99, description: 'Elegant monogram embroidery on premium garments. Professional embroidery service with classic designs. Perfect for personalized gifts and special occasions.', rating: 4.5, reviews: 76, features: ['Monogram Design', 'Professional Embroidery', 'Elegant Style', 'Premium Quality', 'Gift Ready'] },
    'custom-design-hoodie': { name: 'Custom Design Hoodie', price: 79.99, description: 'Premium hoodie with fully custom design embroidery. Professional embroidery service with unlimited customization. Perfect for unique personal style.', rating: 4.7, reviews: 124, features: ['Custom Design', 'Premium Hoodie', 'Professional Embroidery', 'Unlimited Options', 'Unique Style'] },
    'corporate-embroidery': { name: 'Corporate Embroidery', price: 84.99, description: 'Professional corporate embroidery service for businesses. Custom logo and branding embroidery on premium garments. Perfect for corporate gifts and uniforms.', rating: 4.8, reviews: 167, features: ['Corporate Logos', 'Professional Service', 'Premium Garments', 'Bulk Ready', 'Business Quality'] }
  };

  const productData = productsData[name] || productsData['embroidered-rose-hoodie'];
  
  const product = {
    id: name,
    name: productData.name,
    price: productData.price,
    images: [
      'https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556821552-5f63b1c2c723?w=500&h=600&fit=crop'
    ],
    description: productData.description,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    rating: productData.rating,
    reviews: productData.reviews,
    features: productData.features
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity: quantity,
      image: product.images[0]
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: 'clamp(20px, 5vw, 40px)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(30px, 5vw, 60px)', backgroundColor: '#1a1a1a', padding: 'clamp(20px, 5vw, 40px)', borderRadius: '16px', boxShadow: '0 8px 24px rgba(212, 175, 55, 0.1)' }}>
          
          {/* Product Images Carousel */}
          <div style={{ position: 'relative' }}>
            <Slider ref={sliderRef} {...sliderSettings}>
              {product.images.map((img, idx) => (
                <div key={idx} style={{ borderRadius: '16px', overflow: 'hidden' }}>
                  <img 
                    src={img} 
                    alt={`${product.name} ${idx + 1}`} 
                    style={{ 
                      width: '100%', 
                      height: 'auto',
                      display: 'block',
                      borderRadius: '16px',
                      border: '2px solid #333'
                    }} 
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Product Details */}
          <div>
            <h1 style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 700, margin: '0 0 15px 0', color: '#d4af37' }}>{product.name}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '25px', flexWrap: 'wrap', paddingBottom: '20px', borderBottom: '1px solid #333' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: 'clamp(16px, 2vw, 20px)' }}>{'⭐'.repeat(Math.floor(product.rating))}</span>
                <span style={{ color: '#aaa', fontSize: 'clamp(13px, 1.5vw, 15px)', fontWeight: 500 }}>({product.reviews})</span>
              </div>
              <span style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 700, color: '#d4af37' }}>${product.price}</span>
            </div>

            <p style={{ color: '#ccc', lineHeight: '1.8', marginBottom: '30px', fontSize: 'clamp(14px, 2vw, 16px)' }}>{product.description}</p>
            
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: 'clamp(14px, 2vw, 16px)', fontWeight: 600, marginBottom: '12px', color: '#d4af37' }}>Size</h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: '10px 16px',
                      border: selectedSize === size ? '2px solid #d4af37' : '2px solid #333',
                      backgroundColor: selectedSize === size ? '#d4af37' : '#0a0a0a',
                      color: selectedSize === size ? '#000' : '#d4af37',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: 'clamp(12px, 2vw, 14px)',
                      transition: 'all 0.3s ease'
                    }}
                  >{size}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: 'clamp(14px, 2vw, 16px)', fontWeight: 600, marginBottom: '12px', color: '#d4af37' }}>Quantity</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    padding: '10px 16px',
                    border: '2px solid #333',
                    backgroundColor: '#0a0a0a',
                    color: '#d4af37',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 600,
                    transition: 'all 0.3s ease'
                  }}
                >−</button>
                <span style={{ fontSize: 'clamp(16px, 3vw, 20px)', fontWeight: 600, minWidth: '50px', textAlign: 'center', color: '#d4af37' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    padding: '10px 16px',
                    border: '2px solid #333',
                    backgroundColor: '#0a0a0a',
                    color: '#d4af37',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 600,
                    transition: 'all 0.3s ease'
                  }}
                >+</button>
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: addedToCart ? '#22c55e' : '#d4af37',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                fontSize: 'clamp(14px, 2vw, 18px)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (!addedToCart) {
                  e.target.style.backgroundColor = '#e6c200';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(212, 175, 55, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!addedToCart) {
                  e.target.style.backgroundColor = '#d4af37';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              {addedToCart ? '✓ Added to Cart' : '🛒 Add to Cart'}
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div style={{ backgroundColor: '#1a1a1a', padding: 'clamp(20px, 5vw, 40px)', borderRadius: '16px', marginTop: '30px', boxShadow: '0 8px 24px rgba(212, 175, 55, 0.1)', border: '1px solid #333' }}>
          <h2 style={{ fontSize: 'clamp(20px, 4vw, 24px)', fontWeight: 700, marginBottom: '25px', color: '#d4af37' }}>✨ Product Features</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {product.features.map((feature, index) => (
              <div key={index} style={{ 
                padding: '14px 18px', 
                backgroundColor: '#0a0a0a', 
                borderRadius: '10px', 
                fontSize: 'clamp(14px, 2vw, 16px)', 
                color: '#ccc', 
                fontWeight: 500,
                border: '1px solid #333',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{ color: '#d4af37', fontWeight: 700, fontSize: '18px' }}>✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div style={{ backgroundColor: '#1a1a1a', padding: 'clamp(20px, 5vw, 40px)', borderRadius: '16px', marginTop: '30px', boxShadow: '0 8px 24px rgba(212, 175, 55, 0.1)', border: '1px solid #333' }}>
          <h2 style={{ fontSize: 'clamp(20px, 4vw, 24px)', fontWeight: 700, marginBottom: '20px', color: '#d4af37' }}>⭐ Customer Reviews</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
            <div style={{ fontSize: 'clamp(36px, 8vw, 48px)', fontWeight: 700, color: '#d4af37' }}>{product.rating}</div>
            <div>
              <div style={{ fontSize: 'clamp(18px, 3vw, 24px)' }}>{'⭐'.repeat(Math.floor(product.rating))}</div>
              <div style={{ color: '#aaa', fontSize: 'clamp(12px, 2vw, 14px)' }}>Based on {product.reviews} reviews</div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #333', paddingTop: '20px' }}>
            {[
              { name: 'John D.', rating: 5, comment: 'Amazing quality! The embroidery is perfect and the fabric is so comfortable.' },
              { name: 'Sarah M.', rating: 4, comment: 'Love this product! Fits perfectly and the custom design looks great.' }
            ].map((review, idx) => (
              <div key={idx} style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#0a0a0a', borderRadius: '8px', border: '1px solid #333' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 600, fontSize: 'clamp(14px, 2vw, 16px)', color: '#d4af37' }}>{review.name}</span>
                  <span style={{ fontSize: 'clamp(12px, 2vw, 14px)' }}>{'⭐'.repeat(review.rating)}</span>
                </div>
                <p style={{ color: '#ccc', margin: 0, fontSize: 'clamp(13px, 2vw, 15px)' }}>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .slick-prev, .slick-next {
          width: 50px;
          height: 50px;
          background-color: #d4af37 !important;
          border-radius: 8px;
          z-index: 10;
          top: 50% !important;
          transform: translateY(-50%) !important;
        }

        .slick-prev:before, .slick-next:before {
          font-size: 24px;
          color: #000 !important;
        }

        .slick-prev:hover, .slick-next:hover {
          background-color: #e6c200 !important;
        }

        .slick-prev {
          left: -70px !important;
        }

        .slick-next {
          right: -70px !important;
        }
      `}</style>
    </div>
  );
};

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        left: '-70px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '50px',
        height: '50px',
        backgroundColor: '#d4af37',
        border: 'none',
        borderRadius: '8px',
        fontSize: '24px',
        cursor: 'pointer',
        zIndex: 10,
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => e.target.style.backgroundColor = '#e6c200'}
      onMouseLeave={(e) => e.target.style.backgroundColor = '#d4af37'}
    >
      &lt;
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        right: '-70px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '50px',
        height: '50px',
        backgroundColor: '#d4af37',
        border: 'none',
        borderRadius: '8px',
        fontSize: '24px',
        cursor: 'pointer',
        zIndex: 10,
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => e.target.style.backgroundColor = '#e6c200'}
      onMouseLeave={(e) => e.target.style.backgroundColor = '#d4af37'}
    >
      &gt;
    </button>
  );
};

export default Products;
