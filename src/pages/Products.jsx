import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useCart } from '../context/CartContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Products() {
  const { name } = useParams();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sliderRef = useRef(null);
  const { addToCart } = useCart();

  const productsData = {
    'classic-logo-tshirt': { 
      name: 'Classic Logo T-Shirt', 
      price: 29.99, 
      originalPrice: 39.99,
      description: 'Premium quality t-shirt with classic logo embroidery. Made from 100% cotton for ultimate comfort and durability. Perfect for everyday wear with a timeless design.', 
      rating: 4.5, 
      reviews: 128, 
      inStock: 45,
      sku: 'CLT-001',
      features: ['100% Cotton', 'Classic Logo Embroidery', 'Machine Washable', 'Unisex Fit', 'Breathable Fabric'],
      specifications: {
        'Material': '100% Premium Cotton',
        'Weight': '180 GSM',
        'Care': 'Machine wash cold, tumble dry low',
        'Fit': 'Unisex Regular Fit',
        'Embroidery': 'Front chest logo'
      },
      colors: ['Black', 'White', 'Navy', 'Gray'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      shipping: 'Free shipping on orders over $100',
      returns: '30-day hassle-free returns',
      warranty: '1-year quality guarantee'
    },
    'embroidered-rose-hoodie': { 
      name: 'Embroidered Rose Hoodie', 
      price: 59.99, 
      originalPrice: 79.99,
      description: 'Premium quality hoodie with beautiful rose embroidery design. Made from 100% cotton for maximum comfort. Perfect for those who love elegant designs.', 
      rating: 4.5, 
      reviews: 128, 
      inStock: 32,
      sku: 'ERH-001',
      features: ['100% Cotton', 'Rose Embroidery', 'Machine Washable', 'Unisex Fit', 'Premium Quality'],
      specifications: {
        'Material': '100% Premium Cotton',
        'Weight': '280 GSM',
        'Care': 'Machine wash cold, tumble dry low',
        'Fit': 'Unisex Regular Fit',
        'Embroidery': 'Front chest rose design'
      },
      colors: ['Black', 'White', 'Burgundy'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      shipping: 'Free shipping on orders over $100',
      returns: '30-day hassle-free returns',
      warranty: '1-year quality guarantee'
    },
  };

  const productData = productsData[name] || productsData['embroidered-rose-hoodie'];
  
  const product = {
    id: name,
    name: productData.name,
    price: productData.price,
    originalPrice: productData.originalPrice,
    discount: Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100),
    images: [
      'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvb2RpZXxlbnwwfHwwfHx8MA%3D%3D',
      'https://image.hm.com/assets/hm/e0/d8/e0d8250dfe2e3d9baec690f7302023a83062a574.jpg?imwidth=2160',
      'https://image.hm.com/assets/hm/e0/d8/e0d8250dfe2e3d9baec690f7302023a83062a574.jpg?imwidth=2160',
      'https://image.hm.com/assets/hm/e0/d8/e0d8250dfe2e3d9baec690f7302023a83062a574.jpg?imwidth=2160'
    ],
    description: productData.description,
    sizes: productData.sizes,
    colors: productData.colors,
    rating: productData.rating,
    reviews: productData.reviews,
    inStock: productData.inStock,
    sku: productData.sku,
    features: productData.features,
    specifications: productData.specifications,
    shipping: productData.shipping,
    returns: productData.returns,
    warranty: productData.warranty
  };

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

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current, next) => setCurrentImageIndex(next)
  };

  const relatedProducts = [
    { id: 'classic-logo-tshirt', name: 'Classic Logo T-Shirt', price: 29.99, image: 'https://image.hm.com/assets/hm/e0/d8/e0d8250dfe2e3d9baec690f7302023a83062a574.jpg?imwidth=2160', rating: 4.5 },
    { id: 'premium-hoodie', name: 'Premium Hoodie', price: 64.99, image: 'https://image.hm.com/assets/hm/e0/d8/e0d8250dfe2e3d9baec690f7302023a83062a574.jpg?imwidth=2160', rating: 4.6 },
    { id: 'custom-name-sweatshirt', name: 'Custom Name Sweatshirt', price: 59.99, image: 'https://image.hm.com/assets/hm/e0/d8/e0d8250dfe2e3d9baec690f7302023a83062a574.jpg?imwidth=2160', rating: 4.7 },
  ];

  return (
    <div className="bg-black min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-400">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-white transition-colors">Products</Link>
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
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setZoomLevel(1.5)}
              onMouseLeave={() => setZoomLevel(1)}
            >
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`
                }}
              />
              {product.discount > 0 && (
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
                  -{product.discount}%
                </div>
              )}
              {product.inStock < 10 && (
                <div className="absolute bottom-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
                  Only {product.inStock} left!
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
                    sliderRef.current?.slickGoTo(idx);
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
                  <p className="text-gray-400 text-sm">SKU: {product.sku}</p>
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
                  <span className="text-lg">{'⭐'.repeat(Math.floor(product.rating))}</span>
                  <span className="text-gray-400 text-sm font-bold">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-green-500 text-sm font-bold">
                  <span>✓</span>
                  <span>{product.inStock} in stock</span>
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
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white">Size: <span className="text-gray-400">{selectedSize}</span></h3>
                <a href="#" className="text-white text-sm hover:underline">📏 Size Guide</a>
              </div>
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
                {addedToCart ? '✓ Added to Cart' : '🛒 Add to Cart'}
              </button>
              {/* <button className="w-full py-4 rounded-lg font-bold text-lg border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300">
                💳 Buy Now
              </button> */}
            </div>

            {/* Trust Badges */}
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <span className="text-xl">🚚</span>
                <span>{product.shipping}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <span className="text-xl">↩️</span>
                <span>{product.returns}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <span className="text-xl">✓</span>
                <span>{product.warranty}</span>
              </div>
            </div>

            {/* Share Section */}
            {/* <div className="border-t border-gray-700 pt-4">
              <p className="text-gray-400 text-sm mb-3">Share this product:</p>
              <div className="flex gap-3">
                <button className="p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors text-xl">📘</button>
                <button className="p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors text-xl">𝕏</button>
                <button className="p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors text-xl">📧</button>
                <button className="p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors text-xl">🔗</button>
              </div>
            </div> */}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 mb-12">
          <div className="flex border-b border-gray-700 overflow-x-auto">
            {['description', 'specifications', 'features', 'reviews', 'shipping'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 font-bold text-center transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'text-white border-b-2 border-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8">
            {activeTab === 'description' && (
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>{product.description}</p>
                <p>This premium product is crafted with attention to detail and made from the finest materials. Perfect for anyone looking for quality and style combined.</p>
                <p>Each piece is carefully inspected to ensure it meets our high standards of quality and craftsmanship.</p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-3 border-b border-gray-700">
                    <span className="text-gray-400 font-medium">{key}</span>
                    <span className="text-white font-bold">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'features' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="p-4 bg-gray-800 rounded-lg text-gray-300 font-medium border border-gray-700 flex items-center gap-3">
                    <span className="text-white font-bold text-lg">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center gap-8 mb-8 pb-8 border-b border-gray-700">
                  <div className="text-5xl font-bold text-white">{product.rating}</div>
                  <div>
                    <div className="text-2xl mb-2">{'⭐'.repeat(Math.floor(product.rating))}</div>
                    <div className="text-gray-400 text-sm">Based on {product.reviews} verified reviews</div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'John D.', rating: 5, comment: 'Amazing quality! The embroidery is perfect and the fabric is so comfortable.', verified: true },
                    { name: 'Sarah M.', rating: 4, comment: 'Love this product! Fits perfectly and the custom design looks great.', verified: true },
                    { name: 'Mike T.', rating: 5, comment: 'Best purchase ever! Highly recommend to everyone.', verified: true }
                  ].map((review, idx) => (
                    <div key={idx} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                        <div>
                          <span className="font-bold text-white">{review.name}</span>
                          {review.verified && <span className="ml-2 text-xs bg-green-900 text-green-400 px-2 py-1 rounded">✓ Verified</span>}
                        </div>
                        <span>{'⭐'.repeat(review.rating)}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Shipping Options</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <p className="font-bold text-white mb-1">Standard Shipping</p>
                      <p className="text-gray-400 text-sm">5-7 business days - $10</p>
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <p className="font-bold text-white mb-1">Express Shipping</p>
                      <p className="text-gray-400 text-sm">2-3 business days - $20</p>
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg border border-green-700 bg-green-900/20">
                      <p className="font-bold text-white mb-1">Free Shipping</p>
                      <p className="text-gray-400 text-sm">On orders over $100</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Return Policy</h3>
                  <p className="text-gray-300">30-day hassle-free returns. If you're not satisfied with your purchase, simply return it within 30 days for a full refund.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map(prod => (
              <Link key={prod.id} to={`/product/${prod.id}`} className="no-underline">
                <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-white transition-all duration-300 hover:-translate-y-2 group">
                  <div className="relative overflow-hidden h-64">
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-white text-black px-3 py-1 rounded-lg text-sm font-bold">
                      ⭐ {prod.rating}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-gray-300 transition-colors">{prod.name}</h3>
                    <p className="text-2xl font-bold text-white">${prod.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-gray-900 p-8 rounded-xl border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'What is the material composition?', a: 'This product is made from premium materials as specified in the specifications tab.' },
              { q: 'How do I care for this product?', a: 'Please refer to the care instructions in the specifications tab for detailed washing and maintenance guidelines.' },
              { q: 'Is this product available in other colors?', a: 'Yes, this product is available in multiple colors as shown in the color selection above.' },
              { q: 'What is your return policy?', a: 'We offer a 30-day hassle-free return policy. See the shipping tab for more details.' }
            ].map((faq, idx) => (
              <details key={idx} className="group border border-gray-700 rounded-lg p-4 cursor-pointer hover:border-white transition-colors">
                <summary className="font-bold text-white flex justify-between items-center">
                  {faq.q}
                  <span className="text-xl group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-400 mt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .slick-dots {
          bottom: 20px !important;
        }

        .slick-dots li button:before {
          color: white !important;
          font-size: 12px !important;
        }

        .slick-dots li.slick-active button:before {
          color: white !important;
        }
      `}</style>
    </div>
  );
}

export default Products;
