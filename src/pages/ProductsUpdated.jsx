import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Mock product data
const mockProducts = {
  'classic-logo-tshirt': {
    id: 'classic-logo-tshirt',
    name: 'Classic Logo T-Shirt',
    price: 29.99,
    originalPrice: 39.99,
    description: 'Premium quality t-shirt with classic logo embroidery. Made from 100% cotton for ultimate comfort and durability.',
    rating: 4.5,
    reviews: 128,
    stock: 45,
    sku: 'CLT-001',
    category: 'tshirts',
    colors: ['Black', 'White', 'Navy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colorImages: {
      'Black': {
        image1: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop',
        image2: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&q=80',
        image3: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&q=60'
      },
      'White': {
        image1: 'https://images.unsplash.com/photo-1503341455253-b2e723bb12dd?w=600&h=600&fit=crop',
        image2: 'https://images.unsplash.com/photo-1503341455253-b2e723bb12dd?w=600&h=600&fit=crop&q=80',
        image3: 'https://images.unsplash.com/photo-1503341455253-b2e723bb12dd?w=600&h=600&fit=crop&q=60'
      },
      'Navy': {
        image1: 'https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=600&h=600&fit=crop',
        image2: 'https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=600&h=600&fit=crop&q=80',
        image3: 'https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=600&h=600&fit=crop&q=60'
      }
    }
  },
  'embroidered-rose-hoodie': {
    id: 'embroidered-rose-hoodie',
    name: 'Embroidered Rose Hoodie',
    price: 59.99,
    originalPrice: 79.99,
    description: 'Premium quality hoodie with beautiful rose embroidery design. Made from 100% cotton for maximum comfort.',
    rating: 4.7,
    reviews: 156,
    stock: 32,
    sku: 'ERH-001',
    category: 'hoodies',
    colors: ['Black', 'Gray', 'Burgundy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colorImages: {
      'Black': {
        image1: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=600&h=600&fit=crop',
        image2: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=600&h=600&fit=crop&q=80',
        image3: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=600&h=600&fit=crop&q=60'
      },
      'Gray': {
        image1: 'https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=600&h=600&fit=crop',
        image2: 'https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=600&h=600&fit=crop&q=80',
        image3: 'https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=600&h=600&fit=crop&q=60'
      },
      'Burgundy': {
        image1: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=600&h=600&fit=crop',
        image2: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=600&h=600&fit=crop&q=80',
        image3: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=600&h=600&fit=crop&q=60'
      }
    }
  }
};

function Products() {
  const { name } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { addToCart } = useCart();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products/${name}`);
        if (response.ok) {
          const data = await response.json();
          const colorImages = data.colorImages || {};
          const firstColor = data.colors?.[0] || 'Black';
          const images = colorImages[firstColor] 
            ? [colorImages[firstColor].image1, colorImages[firstColor].image2, colorImages[firstColor].image3].filter(Boolean)
            : [];
          
          setProduct({
            ...data,
            images,
            colors: data.colors || ['Black', 'White'],
            colorImages: colorImages
          });
          setSelectedColor(firstColor);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.log('API not available, using mock data');
      }

      // Fallback to mock data
      const mockProduct = mockProducts[name];
      if (mockProduct) {
        const firstColor = mockProduct.colors[0];
        const images = [mockProduct.colorImages[firstColor].image1, mockProduct.colorImages[firstColor].image2, mockProduct.colorImages[firstColor].image3];
        setProduct({
          ...mockProduct,
          images
        });
        setSelectedColor(firstColor);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [name]);

  useEffect(() => {
    if (product && product.colorImages) {
      const colorData = product.colorImages[selectedColor];
      if (colorData) {
        const images = [colorData.image1, colorData.image2, colorData.image3].filter(Boolean);
        setCurrentImageIndex(0);
        setProduct(prev => ({\n          ...prev,
          images: images.length > 0 ? images : ['https://via.placeholder.com/600x600?text=No+Image']
        }));
      }
    }
  }, [selectedColor, product?.colorImages]);

  if (loading) return <div className="bg-black min-h-screen flex items-center justify-center text-white">Loading...</div>;
  if (!product) return <div className="bg-black min-h-screen flex items-center justify-center text-white">Product not found</div>;

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity: quantity,
      image: product.images[0],
      color: selectedColor
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-xl ${i < Math.floor(rating) ? 'text-white' : 'text-gray-600'}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-black min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-400">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
          
          {/* Product Images Section */}
          <div className="space-y-4">
            {/* Main Image with Zoom */}
            <div 
              className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 h-96 md:h-[600px] cursor-zoom-in"
              onMouseMove={!isMobile ? handleMouseMove : undefined}
              onMouseEnter={() => !isMobile && setZoomLevel(1.5)}
              onMouseLeave={() => !isMobile && setZoomLevel(1)}
            >
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: !isMobile ? `${mousePos.x}% ${mousePos.y}%` : 'center'
                }}
              />
              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
                  -{discount}%
                </div>
              )}
              {product.stock < 10 && (
                <div className="absolute bottom-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
                  Only {product.stock} left!
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentImageIndex(idx);
                    setZoomLevel(1);
                  }}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === idx 
                      ? 'border-white' 
                      : 'border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Image Counter */}
            <div className="text-center text-gray-400 text-sm">
              Image {currentImageIndex + 1} of {product.images.length}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{product.name}</h1>
                  <p className="text-gray-400 text-sm">SKU: {product.sku || 'N/A'}</p>
                </div>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`text-3xl transition-transform hover:scale-125 ${isWishlisted ? 'text-red-500' : 'text-gray-400'}`}
                >
                  {isWishlisted ? '❤️' : '🤍'}
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  {renderStars(product.rating || 4.5)}
                  <span className="text-gray-400 text-sm font-bold">({product.reviews || 0} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-green-500 text-sm font-bold">
                  <span>✓</span>
                  <span>{product.stock || 0} in stock</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-white">${product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed text-base border-b border-gray-700 pb-6">{product.description}</p>
            
            {/* Color Selection */}
            <div>
              <h3 className="text-base font-bold mb-4 text-white">Color: <span className="text-gray-400">{selectedColor}</span></h3>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 ${
                      selectedColor === color 
                        ? 'bg-white text-black border-2 border-white shadow-lg' 
                        : 'bg-gray-800 text-white border-2 border-gray-700 hover:border-white'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-base font-bold text-white mb-4">Size: <span className="text-gray-400">{selectedSize}</span></h3>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 ${
                      selectedSize === size 
                        ? 'bg-white text-black border-2 border-white shadow-lg' 
                        : 'bg-gray-800 text-white border-2 border-gray-700 hover:border-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-base font-bold mb-4 text-white">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 border-2 border-gray-700 bg-gray-800 text-white rounded-lg font-bold hover:border-white transition-colors text-lg"
                >
                  −
                </button>
                <span className="text-2xl font-bold text-white min-w-16 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 border-2 border-gray-700 bg-gray-800 text-white rounded-lg font-bold hover:border-white transition-colors text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <button 
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
                  addedToCart 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-white text-black hover:bg-gray-100 hover:-translate-y-1 shadow-lg'
                }`}
              >
                {addedToCart ? '✓ Added to Bag' : '👜 Add to Bag'}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <span className="text-xl">🚚</span>
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <span className="text-xl">↩️</span>
                <span>30-day hassle-free returns</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <span className="text-xl">✓</span>
                <span>1-year quality guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
