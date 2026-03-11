import React, { useEffect, useState, useRef } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { getCartCount, isLoaded } = useCart();
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);
  const menuBtnRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setCartCount(getCartCount());
    }
  }, [isLoaded, getCartCount]);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth <= 900);
      if (window.innerWidth > 900) setIsOpen(false);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        menuBtnRef.current &&
        !menuBtnRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    navigate('/');
  };

  const userName = localStorage.getItem('userName') || 'User';

  const styles = {
    header: {
      width: "100%",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      background: "linear-gradient(135deg, #000 0%, #1a1a1a 100%)",
      borderBottom: "2px solid #d4af37",
      fontFamily: "Arial, sans-serif",
      color: "white",
      boxShadow: "0 4px 20px rgba(212, 175, 55, 0.15)"
    },

    promoBar: {
      background: "linear-gradient(90deg, #166534, #22c55e)",
      color: "white",
      textAlign: "center",
      padding: isMobile ? "8px 10px" : "10px",
      fontSize: isMobile ? "12px" : "14px",
      fontWeight: 600,
      letterSpacing: "0.5px"
    },

    promoLink: {
      marginLeft: "10px",
      color: "#fff",
      fontWeight: "bold",
      textDecoration: "underline",
      cursor: "pointer"
    },

    shell: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: isMobile ? "12px 16px" : "16px 40px",
      flexWrap: "wrap",
      gap: isMobile ? "10px" : "0"
    },

    brand: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      cursor: "pointer",
      textDecoration: "none"
    },

    logo: {
      width: isMobile ? "96px" : "140px",
      height: isMobile ? "68px" : "100px",
      borderRadius: "8px",
      objectFit: "cover",
      boxShadow: "0 4px 12px rgba(212, 175, 55, 0.2)"
    },

    brandName: {
      fontWeight: "700",
      fontSize: isMobile ? "18px" : "22px",
      color: "#d4af37",
      letterSpacing: "1px"
    },

    brandTag: {
      fontSize: isMobile ? "11px" : "12px",
      color: "#aaa",
      fontWeight: 500
    },

    nav: {
      display: isMobile ? "none" : "flex",
      gap: "32px",
      fontWeight: "600",
      alignItems: "center"
    },

    navLink: {
      textDecoration: "none",
      color: "#ccc",
      fontSize: "15px",
      fontWeight: "600",
      letterSpacing: "0.5px",
      transition: "all 0.3s ease",
      position: "relative",
      padding: "8px 0"
    },

    actions: {
      display: isMobile ? "none" : "flex",
      alignItems: "center",
      gap: "16px"
    },

    search: {
      display: "flex",
      alignItems: "center",
      background: "#0a0a0a",
      padding: "10px 16px",
      borderRadius: "25px",
      color: "white",
      border: "1px solid #333",
      transition: "all 0.3s ease"
    },

    searchInput: {
      border: "none",
      background: "transparent",
      outline: "none",
      marginLeft: "8px",
      color: "white",
      width: isMobile ? "100%" : "150px",
      fontSize: "14px"
    },

    iconBtn: {
      border: "none",
      background: "#0a0a0a",
      padding: "10px",
      borderRadius: "50%",
      cursor: "pointer",
      color: "white",
      position: "relative",
      transition: "all 0.3s ease",
      fontSize: "18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "40px",
      height: "40px",
      border: "1px solid #333"
    },

    cartBadge: {
      position: "absolute",
      top: "-8px",
      right: "-8px",
      background: "#d4af37",
      color: "#000",
      borderRadius: "50%",
      width: "22px",
      height: "22px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      fontWeight: "700",
      border: "2px solid #000"
    },

    userBtn: {
      background: "linear-gradient(135deg, #d4af37, #e6c200)",
      border: "none",
      color: "#000",
      padding: "10px 16px",
      borderRadius: "25px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "14px",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    },

    logoutBtn: {
      background: "#8b0000",
      border: "none",
      color: "#fff",
      padding: "10px 16px",
      borderRadius: "25px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "14px",
      transition: "all 0.3s ease"
    },

    menuBtn: {
      display: isMobile ? "flex" : "none",
      flexDirection: "column",
      gap: "5px",
      border: "none",
      background: "transparent",
      cursor: "pointer"
    },

    menuLine: {
      width: "24px",
      height: "3px",
      background: "#d4af37",
      transition: "all 0.3s ease"
    },

    mobilePanel: {
      display: isOpen ? "block" : "none",
      background: "linear-gradient(135deg, #0b0b0b 0%, #1a1a1a 100%)",
      borderTop: "2px solid #d4af37",
      padding: "20px",
      maxHeight: "calc(100vh - 200px)",
      overflowY: "auto",
      position: "relative"
    },

    closeBtn: {
      position: "absolute",
      top: "15px",
      right: "15px",
      background: "transparent",
      border: "none",
      color: "#d4af37",
      fontSize: "28px",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "all 0.3s ease",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },

    mobileNav: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      marginBottom: "20px",
      marginTop: "30px"
    },

    mobileLink: {
      textDecoration: "none",
      color: "#ccc",
      fontSize: "16px",
      fontWeight: "600",
      padding: "12px",
      borderRadius: "8px",
      transition: "all 0.3s ease",
      display: "block"
    },

    mobileCTA: {
      width: "100%",
      background: "linear-gradient(135deg, #d4af37, #e6c200)",
      color: "#000",
      border: "none",
      padding: "12px",
      borderRadius: "25px",
      fontWeight: "600",
      cursor: "pointer",
      marginBottom: "10px"
    },

    mobileActions: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
      marginBottom: "16px",
      flexWrap: "wrap"
    },

    mobileIconRow: {
      display: "flex",
      gap: "10px"
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.promoBar}>
        🎉 Limited drop: stitched essentials for spring.
        <a href="#new" style={styles.promoLink}>
          Shop new arrivals →
        </a>
      </div>

      <div style={styles.shell}>
        <a href="/" style={{ ...styles.brand, textDecoration: "none" }} onClick={closeMenu}>
          <img
            src="https://res.cloudinary.com/dgyykbmt6/image/upload/v1773144048/md01_ailgiu.jpg"
            alt="Meda"
            style={styles.logo}
          />
          <div>
            <div style={styles.brandName}>MADEMBRO</div>
            <div style={styles.brandTag}>Custom embroidery studio</div>
          </div>
        </a>

        <nav style={styles.nav}>
          <a 
            href="/" 
            style={styles.navLink}
            onMouseEnter={(e) => e.target.style.color = "#d4af37"}
            onMouseLeave={(e) => e.target.style.color = "#ccc"}
          >
            Home
          </a>
          <a 
            href="/tshirts" 
            style={styles.navLink}
            onMouseEnter={(e) => e.target.style.color = "#d4af37"}
            onMouseLeave={(e) => e.target.style.color = "#ccc"}
          >
            T-Shirts
          </a>
          <a 
            href="/sweatshirts" 
            style={styles.navLink}
            onMouseEnter={(e) => e.target.style.color = "#d4af37"}
            onMouseLeave={(e) => e.target.style.color = "#ccc"}
          >
            Sweatshirts
          </a>
          <a 
            href="/hoodies" 
            style={styles.navLink}
            onMouseEnter={(e) => e.target.style.color = "#d4af37"}
            onMouseLeave={(e) => e.target.style.color = "#ccc"}
          >
            Hoodies
          </a>
          <a 
            href="/custom-embroidery" 
            style={styles.navLink}
            onMouseEnter={(e) => e.target.style.color = "#d4af37"}
            onMouseLeave={(e) => e.target.style.color = "#ccc"}
          >
            Custom
          </a>
        </nav>

        <div style={styles.actions}>
          <div style={styles.search}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#d4af37";
              e.currentTarget.style.background = "#1a1a1a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#333";
              e.currentTarget.style.background = "#0a0a0a";
            }}
          >
            🔍
            <input
              type="search"
              placeholder="Search products..."
              style={styles.searchInput}
            />
          </div>

          <a href="/cart" style={{ textDecoration: "none" }}>
            <button 
              style={styles.iconBtn}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "#d4af37";
                e.target.style.background = "#1a1a1a";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "#333";
                e.target.style.background = "#0a0a0a";
              }}
            >
              🛒
              {cartCount > 0 && <div style={styles.cartBadge}>{cartCount}</div>}
            </button>
          </a>

          {isLoggedIn ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "14px", color: "#d4af37", fontWeight: "600" }}>
                👤 {userName}
              </span>
              <button
                onClick={handleLogout}
                style={styles.logoutBtn}
                onMouseEnter={(e) => {
                  e.target.style.background = "#a00000";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#8b0000";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              style={styles.userBtn}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(212, 175, 55, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              👤 Login
            </button>
          )}
        </div>

        <button 
          ref={menuBtnRef}
          style={styles.menuBtn} 
          onClick={toggleMenu}
          onMouseEnter={(e) => {
            e.currentTarget.querySelectorAll('span').forEach(line => {
              line.style.background = "#d4af37";
            });
          }}
          onMouseLeave={(e) => {
            e.currentTarget.querySelectorAll('span').forEach(line => {
              line.style.background = "#d4af37";
            });
          }}
        >
          <span style={styles.menuLine}></span>
          <span style={styles.menuLine}></span>
          <span style={styles.menuLine}></span>
        </button>
      </div>

      <div ref={mobileMenuRef} style={styles.mobilePanel}>
        <button
          style={styles.closeBtn}
          onClick={closeMenu}
          onMouseEnter={(e) => {
            e.target.style.color = "#e6c200";
            e.target.style.transform = "scale(1.2)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#d4af37";
            e.target.style.transform = "scale(1)";
          }}
        >
          ✕
        </button>

        <nav style={styles.mobileNav}>
          <a 
            href="/" 
            style={styles.mobileLink}
            onClick={closeMenu}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#d4af37";
              e.target.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#ccc";
            }}
          >
            Home
          </a>
          <a 
            href="/tshirts" 
            style={styles.mobileLink}
            onClick={closeMenu}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#d4af37";
              e.target.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#ccc";
            }}
          >
            T-Shirts
          </a>
          <a 
            href="/sweatshirts" 
            style={styles.mobileLink}
            onClick={closeMenu}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#d4af37";
              e.target.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#ccc";
            }}
          >
            Sweatshirts
          </a>
          <a 
            href="/hoodies" 
            style={styles.mobileLink}
            onClick={closeMenu}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#d4af37";
              e.target.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#ccc";
            }}
          >
            Hoodies
          </a>
          <a 
            href="/custom-embroidery" 
            style={styles.mobileLink}
            onClick={closeMenu}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#d4af37";
              e.target.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#ccc";
            }}
          >
            Custom Embroidery
          </a>
        </nav>

        <div style={styles.mobileActions}>
          <a href="/cart" style={{ textDecoration: "none", flex: 1 }} onClick={closeMenu}>
            <button style={{ ...styles.iconBtn, width: "100%", justifyContent: "center" }}>
              🛒 Cart {cartCount > 0 && `(${cartCount})`}
            </button>
          </a>
        </div>

        {isLoggedIn ? (
          <button
            onClick={() => {
              handleLogout();
              closeMenu();
            }}
            style={{ ...styles.mobileCTA, background: "#8b0000", color: "#fff" }}
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              navigate('/login');
              closeMenu();
            }}
            style={styles.mobileCTA}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
