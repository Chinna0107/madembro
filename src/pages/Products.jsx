import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="600"%3E%3Crect fill="%23333" width="600" height="600"/%3E%3Ctext x="50%" y="50%" font-size="20" fill="%23999" text-anchor="middle" dy=".3em"%3ENo Image Available%3C/text%3E%3C/svg%3E';
const PLACEHOLDER_SMALL = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23333" width="300" height="300"/%3E%3Ctext x="50%" y="50%" font-size="14" fill="%23999" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const COLORS = ['Black', 'White', 'Navy', 'Grey', 'Olive'];

const renderStars = (rating) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <span key={i} className={`text-xl ${i < Math.floor(rating) ? 'text-white' : 'text-gray-600'}`}>★</span>
    ))}
  </div>
);

function Products() {
  const { name } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/admin/public/products`);
        if (res.ok) {
          const all = await res.json();
          // match by id or by slug (name param)
          const found = all.find(p => String(p.id) === String(name) || p.name.toLowerCase().replace(/\s+/g, '-') === name);
          if (found) {
            setProduct(found);
            setRelatedProducts(all.filter(p => p.id !== found.id && p.category === found.category).slice(0, 4));
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [name]);

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity,
      image: product.image_url
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  if (loading) return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="text-white text-center">
        <div className="text-4xl mb-4 animate-spin">⏳</div>
        <p>Loading product...</p>
      </div>
    </div>
  );

  if (!product) return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-white text-xl">Product not found</p>
      <Link to="/" className="text-gray-400 hover:text-white underline">← Back to Home</Link>
    </div>
  );

  return (
    <div className="bg-black min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-400">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          {product.category && (
            <>
              <Link to={`/${product.category}`} className="hover:text-white transition-colors capitalize">{product.category}</Link>
              <span>/</span>
            </>
          )}
          <span className="text-white">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">

          {/* Image */}
          <div className="space-y-4">
            <div
              className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 h-96 md:h-[600px] cursor-zoom-in"
              onMouseMove={!isMobile ? handleMouseMove : undefined}
              onMouseEnter={() => !isMobile && setZoomLevel(1.5)}
              onMouseLeave={() => !isMobile && setZoomLevel(1)}
            >
              <img
                src={product.image_url || PLACEHOLDER_IMAGE}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: !isMobile ? `${mousePos.x}% ${mousePos.y}%` : 'center'
                }}
                onError={(e) => { e.target.src = PLACEHOLDER_IMAGE; }}
              />
              {product.stock > 0 && product.stock < 10 && (
                <div className="absolute bottom-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
                  Only {product.stock} left!
                </div>
              )}
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">Out of Stock</span>
                </div>
              )}
            </div>
            {!isMobile && <p className="text-center text-gray-500 text-xs">Hover to zoom</p>}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{product.name}</h1>
                  <p className="text-gray-500 text-sm capitalize">{product.category}</p>
                </div>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="text-3xl transition-transform hover:scale-125"
                >
                  {isWishlisted ? '❤️' : '🤍'}
                </button>
              </div>

              <div className="flex items-center gap-4 mb-4">
                {renderStars(4.5)}
                <span className="text-gray-400 text-sm">4.5 rating</span>
                <span className="text-green-500 text-sm font-bold">✓ {product.stock} in stock</span>
              </div>

              <p className="text-4xl font-bold text-white">₹{product.price}</p>
            </div>

            {product.description && (
              <p className="text-gray-300 leading-relaxed border-b border-gray-700 pb-6">{product.description}</p>
            )}

            {/* Color */}
            <div>
              <h3 className="text-sm font-bold text-white mb-3">Color: <span className="text-gray-400">{selectedColor}</span></h3>
              <div className="flex gap-2 flex-wrap">
                {COLORS.map(color => (
                  <button key={color} onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
                      selectedColor === color
                        ? 'bg-white text-black border-2 border-white'
                        : 'bg-gray-800 text-white border-2 border-gray-700 hover:border-white'
                    }`}>
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <h3 className="text-sm font-bold text-white mb-3">Size: <span className="text-gray-400">{selectedSize}</span></h3>
              <div className="flex gap-2 flex-wrap">
                {SIZES.map(size => (
                  <button key={size} onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
                      selectedSize === size
                        ? 'bg-white text-black border-2 border-white'
                        : 'bg-gray-800 text-white border-2 border-gray-700 hover:border-white'
                    }`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-bold text-white mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border-2 border-gray-700 bg-gray-800 text-white rounded-lg font-bold hover:border-white transition-colors text-lg">
                  −
                </button>
                <span className="text-2xl font-bold text-white w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
                  className="w-10 h-10 border-2 border-gray-700 bg-gray-800 text-white rounded-lg font-bold hover:border-white transition-colors text-lg">
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
                  product.stock === 0
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : addedToCart
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-black hover:bg-gray-100 hover:-translate-y-1 shadow-lg'
                }`}>
                {product.stock === 0 ? 'Out of Stock' : addedToCart ? '✓ Added to Bag' : '👜 Add to Bag'}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-300"><span>🚚</span><span>Free shipping on orders over ₹999</span></div>
              <div className="flex items-center gap-3 text-sm text-gray-300"><span>↩️</span><span>30-day hassle-free returns</span></div>
              <div className="flex items-center gap-3 text-sm text-gray-300"><span>✓</span><span>1-year quality guarantee</span></div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="border-t border-gray-800 pt-12">
            <h2 className="text-2xl font-bold text-white mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map(p => (
                <Link key={p.id} to={`/product/${p.id}`} className="no-underline text-white group">
                  <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-white transition-all duration-300">
                    <img
                      src={p.image_url || PLACEHOLDER_SMALL}
                      alt={p.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.target.src = PLACEHOLDER_SMALL; }}
                    />
                    <div className="p-3">
                      <p className="font-bold text-sm line-clamp-1">{p.name}</p>
                      <p className="text-gray-400 text-sm mt-1">₹{p.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

export default Products;
