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

  const styles = {
    footer: {
      background: "linear-gradient(135deg, #000 0%, #1a1a1a 100%)",
      color: "white",
      padding: isMobile ? "40px 20px 20px 20px" : "50px 10% 20px 10%",
      fontFamily: "Arial, sans-serif",
      borderTop: "2px solid #d4af37",
      marginTop: "60px",
      margin: 0,
      width: "100%",
      boxSizing: "border-box"
    },

    grid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(200px, 1fr))",
      gap: isMobile ? "30px" : "40px",
      marginBottom: "40px"
    },

    title: {
      fontSize: "18px",
      fontWeight: "700",
      marginBottom: "15px",
      color: "#d4af37",
      letterSpacing: "0.5px"
    },

    link: {
      display: "block",
      color: "#ccc",
      textDecoration: "none",
      marginBottom: "10px",
      fontSize: "14px",
      transition: "all 0.3s ease",
      cursor: "pointer"
    },

    iconRow: {
      display: "flex",
      gap: "15px",
      marginTop: "15px"
    },

    icon: {
      fontSize: "20px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      color: "#d4af37"
    },

    bottom: {
      borderTop: "1px solid #333",
      paddingTop: "20px",
      textAlign: "center",
      fontSize: "14px",
      color: "#aaa"
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.grid}>
        <div>
          <h3 style={styles.title}>Madembro</h3>
          <p style={{ color: "#bbb", fontSize: "14px", lineHeight: "1.6" }}>
            Premium custom embroidery studio. Create unique, personalized apparel with our professional embroidery services.
          </p>
        </div>

        <div>
          <h3 style={styles.title}>Shop</h3>
          <Link to="/tshirts" style={styles.link}
            onMouseEnter={(e) => e.target.style.color = "#d4af37"}
            onMouseLeave={(e) => e.target.style.color = "#ccc"}
          >
            T-Shirts
          </Link>
          <Link to="/hoodies" style={styles.link}
            onMouseEnter={(e) => e.target.style.color = "#d4af37"}
            onMouseLeave={(e) => e.target.style.color = "#ccc"}
          >
            Hoodies
          </Link>
          <Link to="/sweatshirts" style={styles.link}
            onMouseEnter={(e) => e.target.style.color = "#d4af37"}
            onMouseLeave={(e) => e.target.style.color = "#ccc"}
          >
            Sweatshirts
          </Link>
          <Link to="/custom-embroidery" style={styles.link}
            onMouseEnter={(e) => e.target.style.color = "#d4af37"}
            onMouseLeave={(e) => e.target.style.color = "#ccc"}
          >
            Custom Embroidery
          </Link>
        </div>

        <div>
          <h3 style={styles.title}>Company</h3>
          <Link to="/our-story" style={styles.link}
            onMouseEnter={(e) => e.target.style.color = "#d4af37"}
            onMouseLeave={(e) => e.target.style.color = "#ccc"}
          >
            Our Story
          </Link>
          <Link to="/contact" style={styles.link}
            onMouseEnter={(e) => e.target.style.color = "#d4af37"}
            onMouseLeave={(e) => e.target.style.color = "#ccc"}
          >
            Contact
          </Link>
          <a href="#" style={styles.link}
            onMouseEnter={(e) => e.target.style.color = "#d4af37"}
            onMouseLeave={(e) => e.target.style.color = "#ccc"}
          >
            Careers
          </a>
        </div>

        <div>
          <h3 style={styles.title}>Policies</h3>
          <Link to="/terms-and-conditions" style={styles.link}
            onMouseEnter={(e) => e.target.style.color = "#d4af37"}
            onMouseLeave={(e) => e.target.style.color = "#ccc"}
          >
            Terms & Conditions
          </Link>
          <Link to="/privacy-policy" style={styles.link}
            onMouseEnter={(e) => e.target.style.color = "#d4af37"}
            onMouseLeave={(e) => e.target.style.color = "#ccc"}
          >
            Privacy Policy
          </Link>
          <Link to="/shipping-policy" style={styles.link}
            onMouseEnter={(e) => e.target.style.color = "#d4af37"}
            onMouseLeave={(e) => e.target.style.color = "#ccc"}
          >
            Shipping Policy
          </Link>
          <Link to="/refund-policy" style={styles.link}
            onMouseEnter={(e) => e.target.style.color = "#d4af37"}
            onMouseLeave={(e) => e.target.style.color = "#ccc"}
          >
            Refund Policy
          </Link>
        </div>

        <div>
          <h3 style={styles.title}>Follow Us</h3>
          <div style={styles.iconRow}>
            <FaInstagram 
              style={styles.icon}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.2)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            />
            <FaFacebookF 
              style={styles.icon}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.2)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            />
            <FaTwitter 
              style={styles.icon}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.2)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            />
          </div>
        </div>
      </div>

      <div style={styles.bottom}>
        © {new Date().getFullYear()} Madembro. All rights reserved.
        <br />
        Developed with ❤️ by{" "}
        <a 
          href="https://www.staffarc.in" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ color: "#d4af37", textDecoration: "none", fontWeight: "600" }}
          onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
          onMouseLeave={(e) => e.target.style.textDecoration = "none"}
        >
          StaffArc
        </a>
      </div>
    </footer>
  );
}

export default Footer;
