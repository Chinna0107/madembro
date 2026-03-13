import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <footer className="bg-black border-t-2 border-white mt-12 md:mt-16">
      {/* Footer Grid */}
      <div className={`max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 grid ${isMobile ? 'grid-cols-1' : 'grid-cols-5'} gap-8 md:gap-12`}>
        
        {/* Madembro Section */}
        <div>
          <h3 className="text-lg md:text-xl font-bold text-white mb-4 tracking-wide">Madembro</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Premium custom embroidery studio. Create unique, personalized apparel with our professional embroidery services.
          </p>
        </div>

        {/* Shop Section */}
        <div>
          <h3 className="text-lg md:text-xl font-bold text-white mb-4 tracking-wide">Shop</h3>
          <div className="flex flex-col gap-3">
            <Link to="/tshirts" className="text-gray-400 text-sm no-underline hover:text-white transition-colors">
              T-Shirts
            </Link>
            <Link to="/hoodies" className="text-gray-400 text-sm no-underline hover:text-white transition-colors">
              Hoodies
            </Link>
            <Link to="/sweatshirts" className="text-gray-400 text-sm no-underline hover:text-white transition-colors">
              Sweatshirts
            </Link>
            <Link to="/custom-embroidery" className="text-gray-400 text-sm no-underline hover:text-white transition-colors">
              Custom Embroidery
            </Link>
          </div>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="text-lg md:text-xl font-bold text-white mb-4 tracking-wide">Company</h3>
          <div className="flex flex-col gap-3">
            <Link to="/our-story" className="text-gray-400 text-sm no-underline hover:text-white transition-colors">
              Our Story
            </Link>
            <Link to="/contact" className="text-gray-400 text-sm no-underline hover:text-white transition-colors">
              Contact
            </Link>
            <a href="#" className="text-gray-400 text-sm no-underline hover:text-white transition-colors">
              Careers
            </a>
          </div>
        </div>

        {/* Policies Section */}
        <div>
          <h3 className="text-lg md:text-xl font-bold text-white mb-4 tracking-wide">Policies</h3>
          <div className="flex flex-col gap-3">
            <Link to="/terms-and-conditions" className="text-gray-400 text-sm no-underline hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/privacy-policy" className="text-gray-400 text-sm no-underline hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/shipping-policy" className="text-gray-400 text-sm no-underline hover:text-white transition-colors">
              Shipping Policy
            </Link>
            <Link to="/refund-policy" className="text-gray-400 text-sm no-underline hover:text-white transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>

        {/* Follow Us Section */}
        <div>
          <h3 className="text-lg md:text-xl font-bold text-white mb-4 tracking-wide">Follow Us</h3>
          <div className="flex gap-4">
            <FaInstagram className="text-white text-xl cursor-pointer hover:scale-125 transition-transform" />
            <FaFacebookF className="text-white text-xl cursor-pointer hover:scale-125 transition-transform" />
            <FaTwitter className="text-white text-xl cursor-pointer hover:scale-125 transition-transform" />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 px-4 md:px-8 py-6 md:py-8 text-center">
        <p className="text-gray-500 text-xs md:text-sm">
          © {new Date().getFullYear()} Madembro. All rights reserved.
          <br />
          Developed with ❤️ by{" "}
          <a 
            href="https://www.staffarc.in" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white font-bold no-underline hover:underline"
          >
            StaffArc
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
