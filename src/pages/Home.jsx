import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const categories = [
    { id: 1, name: 'T-Shirts', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeIY969YenTvHsgWRjmSsFWgpWdnRS0aEaYw&s', link: 'tshirts' },
    { id: 2, name: 'Sweatshirts', image: 'https://media.istockphoto.com/id/1090883146/photo/young-man-in-oversized-sweatshirt-isolated-on-textured-gray-wall-background.jpg?s=612x612&w=0&k=20&c=4w9Gqdh_kdCc5Mo4jJbd-3DCEPwXDN1zCK11mco-AA8=', link: 'sweatshirts' },
    { id: 3, name: 'Hoodies', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJf7YSmgkWvB9aY1SRF-d9hVVpX7jJ8BjYSA&s', link: 'hoodies' },
    { id: 4, name: 'Custom Embroidery', image: 'https://img.freepik.com/free-photo/row-hoodies-with-different-colors-one-that-says-hoodie_188544-43266.jpg?semt=ais_rp_progressive&w=740&q=80', link: 'custom' }
  ];

  const newArrivals = [
    { id: 1, name: 'Embroidered Rose Hoodie', price: 59.99, image: 'https://img.freepik.com/free-photo/row-hoodies-with-different-colors-one-that-says-hoodie_188544-43266.jpg?semt=ais_rp_progressive&w=740&q=80', rating: 4.5 },
    { id: 2, name: 'Classic Logo T-Shirt', price: 29.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop', rating: 4.3 },
    { id: 3, name: 'Premium Sweatshirt', price: 49.99, image: 'https://img.freepik.com/free-photo/row-hoodies-with-different-colors-one-that-says-hoodie_188544-43266.jpg?semt=ais_rp_progressive&w=740&q=80', rating: 4.6 },
    { id: 4, name: 'Custom Name Hoodie', price: 64.99, image: 'https://img.freepik.com/free-photo/row-hoodies-with-different-colors-one-that-says-hoodie_188544-43266.jpg?semt=ais_rp_progressive&w=740&q=80', rating: 4.7 }
  ];

  const bestSellers = [
    { id: 1, name: 'Signature Embroidered Tee', price: 34.99, image: 'https://img.freepik.com/free-photo/row-hoodies-with-different-colors-one-that-says-hoodie_188544-43266.jpg?semt=ais_rp_progressive&w=740&q=80', sales: 1250, rating: 4.8 },
    { id: 2, name: 'Classic Black Hoodie', price: 54.99, image: 'https://img.freepik.com/free-photo/row-hoodies-with-different-colors-one-that-says-hoodie_188544-43266.jpg?semt=ais_rp_progressive&w=740&q=80', sales: 980, rating: 4.5 },
    { id: 3, name: 'Vintage Sweatshirt', price: 44.99, image: 'https://img.freepik.com/free-photo/row-hoodies-with-different-colors-one-that-says-hoodie_188544-43266.jpg?semt=ais_rp_progressive&w=740&q=80', sales: 850, rating: 4.4 },
    { id: 4, name: 'Embroidered Logo Hoodie', price: 59.99, image: 'https://img.freepik.com/free-photo/row-hoodies-with-different-colors-one-that-says-hoodie_188544-43266.jpg?semt=ais_rp_progressive&w=740&q=80', sales: 720, rating: 4.6 }
  ];

  const heroImages = [
    'https://png.pngtree.com/thumb_back/fh260/background/20230720/pngtree-yellow-background-with-3d-t-shirts-rendered-image_3711716.jpg',
    'https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=1200&h=600&fit=crop'
  ];

  const [gridColumns, setGridColumns] = React.useState('grid-cols-4');

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setGridColumns('grid-cols-1');
      else if (window.innerWidth < 1024) setGridColumns('grid-cols-2');
      else setGridColumns('grid-cols-4');
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-sm ${i < Math.floor(rating) ? 'text-white' : 'text-gray-600'}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Carousel */}
      <section className="relative w-full h-screen md:h-[600px]">
        <Slider {...sliderSettings}>
          {heroImages.map((img, idx) => (
            <div key={idx} className="relative w-full h-screen md:h-[600px]">
              <img 
                src={img} 
                alt={`Hero ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
          ))}
        </Slider>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="text-center text-white px-4 md:px-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
              Premium Embroidery Clothing
            </h1>
            <p className="text-lg md:text-2xl mb-8 text-white drop-shadow-md">
              Handcrafted Quality, Timeless Style
            </p>
            <button className="bg-white text-black px-8 md:px-12 py-3 md:py-4 text-base md:text-lg font-bold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
              Explore Collection
            </button>
          </div>
          
          {/* Scroll Down Arrow */}
          <div className="absolute bottom-12 animate-bounce text-white text-3xl font-bold pointer-events-none">
            ↓
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Shop by Category
        </h2>
        <div className={`grid ${gridColumns} gap-4 md:gap-6`}>
          {categories.map(cat => (
            <a key={cat.id} href={cat.link} className="no-underline text-white group">
              <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-white cursor-pointer">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 md:p-6 text-center">
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    {cat.name}
                  </h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          New Arrivals
        </h2>
        <div className={`grid ${gridColumns} gap-4 md:gap-6`}>
          {newArrivals.map(product => (
            <Link key={product.id} to={`/product/classic-logo-tshirt`} className="no-underline text-white group">
              <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-white cursor-pointer">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white text-black px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1">
                    ★ {product.rating}
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-bold text-white mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-lg md:text-xl font-bold text-white">
                      ${product.price}
                    </p>
                    {renderStars(product.rating)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Best Sellers
        </h2>
        <div className={`grid ${gridColumns} gap-4 md:gap-6`}>
          {bestSellers.map(product => (
            <Link key={product.id} to={`/product/classic-black-hoodie`} className="no-underline text-white group relative">
              <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-white cursor-pointer">
                <div className="relative">
                  <span className="absolute top-3 left-3 bg-white text-black px-3 py-1 rounded-lg text-xs md:text-sm font-bold z-10">
                    🔥 Best Seller
                  </span>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white text-black px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1">
                    ★ {product.rating}
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-bold text-white mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-lg md:text-xl font-bold text-white">
                      ${product.price}
                    </p>
                    {renderStars(product.rating)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

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

        .slick-prev, .slick-next {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default Home;
