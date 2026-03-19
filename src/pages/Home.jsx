import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import config from '../config';

const API_BASE_URL = config.apiUrl;

const defaultHeroImages = [
  'https://png.pngtree.com/thumb_back/fh260/background/20230720/pngtree-yellow-background-with-3d-t-shirts-rendered-image_3711716.jpg',
  'https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=1200&h=600&fit=crop'
];

const categories = [
  { id: 1, name: 'T-Shirts', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeIY969YenTvHsgWRjmSsFWgpWdnRS0aEaYw&s', link: 'tshirts' },
  { id: 2, name: 'Sweatshirts', image: 'https://media.istockphoto.com/id/1090883146/photo/young-man-in-oversized-sweatshirt-isolated-on-textured-gray-wall-background.jpg?s=612x612&w=0&k=20&c=4w9Gqdh_kdCc5Mo4jJbd-3DCEPwXDN1zCK11mco-AA8=', link: 'sweatshirts' },
  { id: 3, name: 'Hoodies', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJf7YSmgkWvB9aY1SRF-d9hVVpX7jJ8BjYSA&s', link: 'hoodies' },
  { id: 4, name: 'Custom Embroidery', image: 'https://img.freepik.com/free-photo/row-hoodies-with-different-colors-one-that-says-hoodie_188544-43266.jpg?semt=ais_rp_progressive&w=740&q=80', link: 'custom' }
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  arrows: false,
  fade: true
};

const renderStars = (rating) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <span key={i} className={`text-sm ${i < Math.floor(rating) ? 'text-white' : 'text-gray-600'}`}>★</span>
    ))}
  </div>
);

const ProductCard = ({ product, badge }) => (
  <Link to={`/product/${product.id}`} className="no-underline text-white group">
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-white cursor-pointer">
      <div className="relative">
        {badge && (
          <span className="absolute top-3 left-3 bg-white text-black px-3 py-1 rounded-lg text-xs font-bold z-10">{badge}</span>
        )}
        <img
          src={product.image_url || 'https://via.placeholder.com/300x400?text=No+Image'}
          alt={product.name}
          className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white text-black px-3 py-1 rounded-lg text-sm font-bold">
          ★ {product.rating || '4.5'}
        </div>
      </div>
      <div className="p-4 md:p-6">
        <h3 className="text-base md:text-lg font-bold text-white mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-lg md:text-xl font-bold text-white">₹{product.price}</p>
          {renderStars(product.rating || 4.5)}
        </div>
      </div>
    </div>
  </Link>
);

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gridColumns, setGridColumns] = useState('grid-cols-4');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannersRes, productsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/admin/public/banners`),
          fetch(`${API_BASE_URL}/admin/public/products`)
        ]);
        if (bannersRes.ok) setBanners(await bannersRes.json());
        if (productsRes.ok) setProducts(await productsRes.json());
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setGridColumns('grid-cols-1');
      else if (window.innerWidth < 1024) setGridColumns('grid-cols-2');
      else setGridColumns('grid-cols-4');
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const heroImages = banners.length > 0 ? banners.map(b => b.image_url) : defaultHeroImages;
  const newArrivals = products.slice(0, 4);
  const bestSellers = products.slice(-4).reverse();

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Carousel */}
      <section className="relative w-full h-screen md:h-[600px]">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-900">
            <div className="text-white text-center">
              <div className="text-4xl mb-4">⏳</div>
              <p>Loading...</p>
            </div>
          </div>
        ) : (
          <Slider {...sliderSettings}>
            {heroImages.map((img, idx) => (
              <div key={idx} className="relative w-full h-screen md:h-[600px]">
                <img
                  src={img}
                  alt={banners[idx]?.title || `Hero ${idx + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = defaultHeroImages[idx % defaultHeroImages.length]; }}
                />
                <div className="absolute inset-0 bg-black/50"></div>
              </div>
            ))}
          </Slider>
        )}

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="text-center text-white px-4 md:px-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Premium Embroidery Clothing</h1>
            <p className="text-lg md:text-2xl mb-8 drop-shadow-md">Handcrafted Quality, Timeless Style</p>
            <Link to="/tshirts">
              <button className="bg-white text-black px-8 md:px-12 py-3 md:py-4 text-base md:text-lg font-bold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                Explore Collection
              </button>
            </Link>
          </div>
          <div className="absolute bottom-12 animate-bounce text-white text-3xl font-bold pointer-events-none">↓</div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Shop by Category</h2>
        <div className={`grid ${gridColumns} gap-4 md:gap-6`}>
          {categories.map(cat => (
            <Link key={cat.id} to={`/${cat.link}`} className="no-underline text-white group">
              <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-white cursor-pointer">
                <img src={cat.image} alt={cat.name} className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-4 md:p-6 text-center">
                  <h3 className="text-lg md:text-xl font-bold text-white">{cat.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">New Arrivals</h2>
          <div className={`grid ${gridColumns} gap-4 md:gap-6`}>
            {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Best Sellers</h2>
          <div className={`grid ${gridColumns} gap-4 md:gap-6`}>
            {bestSellers.map(p => <ProductCard key={p.id} product={p} badge="🔥 Best Seller" />)}
          </div>
        </section>
      )}

      <style>{`
        .slick-dots { bottom: 20px !important; }
        .slick-dots li button:before { color: white !important; font-size: 12px !important; }
        .slick-dots li.slick-active button:before { color: white !important; }
        .slick-prev, .slick-next { display: none !important; }
      `}</style>
    </div>
  );
};

export default Home;
