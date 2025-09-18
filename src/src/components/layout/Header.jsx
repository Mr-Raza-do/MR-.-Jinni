import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import ball from "/src/assets/mrj.png";

export default function Header({ onSearch }) {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalWishlist = wishlist.length;

  const [query, setQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef();
  const collapseTimer = useRef();

  // Add scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearchClick = () => {
    setSearchActive(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 0);
  };

  // Auto-collapse search if empty for 10 seconds
  useEffect(() => {
    if (searchActive && query === "") {
      collapseTimer.current = setTimeout(() => {
        setSearchActive(false);
      }, 10000);
    }
    return () => clearTimeout(collapseTimer.current);
  }, [searchActive, query]);

  return (
    <>
      {/* Inline keyframes for animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }

          @keyframes expand {
            0% { width: 0; opacity: 0; }
            100% { width: 220px; opacity: 1; }
          }
          
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          
          @keyframes glow {
            0% { box-shadow: 0 0 5px rgba(255,204,0,0.5); }
            50% { box-shadow: 0 0 20px rgba(255,204,0,0.8); }
            100% { box-shadow: 0 0 5px rgba(255,204,0,0.5); }
          }
          
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }

          @keyframes doorOpen {
            0% { transform: perspective(800px) rotateY(90deg); opacity: 0; }
            100% { transform: perspective(800px) rotateY(0deg); opacity: 1; }
          }
        `}
      </style>

      <nav
        className="navbar navbar-expand-lg navbar-dark shadow-sm sticky-top"
        style={{ 
          background: isScrolled 
            ? "linear-gradient(90deg, #0d47a1, #1976d2, #0d47a1)" 
            : "linear-gradient(90deg, #0d47a1, #1976d2)",
          backgroundSize: isScrolled ? "200% auto" : "100%",
          transition: "all 0.3s ease",
          animation: isScrolled ? "shimmer 3s infinite linear" : "none",
          backdropFilter: isScrolled ? "blur(10px)" : "none",
          padding: isScrolled ? "0.4rem 0" : "0.8rem 0"
        }}
      >
        <div className="container">
          {/* Logo with floating animation */}
          <Link
            className="navbar-brand fw-bold fs-3 d-flex align-items-center"
            to="/"
            style={{
              background: "linear-gradient(90deg, #ffcc00, #ff4081, #ffcc00)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0px 0px 8px rgba(255,255,255,0.6)",
              animation: "shimmer 3s infinite linear, pulse 2s infinite",
              transition: "all 0.3s ease",
              marginRight: "1rem"
            }}
          >
            <img
              src={ball}
              alt="magic ball"
              style={{
                width: "45px",
                height: "45px",
                marginRight: "8px",
                animation: "float 2s ease-in-out infinite",
                filter: "drop-shadow(0 0 8px rgba(255, 204, 0, 0.7))"
              }}
            />
            MR . Jinni
          </Link>

          {/* Mobile toggle with animation */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{
              border: "1px solid rgba(255,255,255,0.3)",
              animation: "pulse 2s infinite",
              padding: "0.25rem 0.5rem"
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center" style={{ gap: "0.5rem" }}>
              <li className="nav-item">
                <Link 
                  className="nav-link fw-medium position-relative" 
                  to="/"
                  style={{
                    color: "white",
                    transition: "all 0.3s ease",
                    padding: "0.4rem 0.6rem"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.textShadow = "0 0 10px rgba(255,255,255,0.8)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.textShadow = "none";
                  }}
                >
                  <span className="position-relative">
                    Home
                    <span className="position-absolute bottom-0 start-0 w-100 bg-warning" style={{ height: "2px", transform: "scaleX(0)", transition: "transform 0.3s ease" }}></span>
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link fw-medium position-relative" 
                  to="/catalog"
                  style={{
                    color: "white",
                    transition: "all 0.3s ease",
                    padding: "0.4rem 0.6rem"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.textShadow = "0 0 10px rgba(255,255,255,0.8)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.textShadow = "none";
                  }}
                >
                  <span className="position-relative">
                    Collection
                    <span className="position-absolute bottom-0 start-0 w-100 bg-warning" style={{ height: "2px", transform: "scaleX(0)", transition: "transform 0.3s ease" }}></span>
                  </span>
                </Link>
              </li>
              {user && (
                <li className="nav-item">
                  <Link 
                    className="nav-link fw-medium position-relative" 
                    to="/my-orders"
                    style={{
                      color: "white",
                      transition: "all 0.3s ease",
                      padding: "0.4rem 0.6rem"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.textShadow = "0 0 10px rgba(255,255,255,0.8)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.textShadow = "none";
                    }}
                  >
                    <span className="position-relative">
                      My Orders
                      <span className="position-absolute bottom-0 start-0 w-100 bg-warning" style={{ height: "2px", transform: "scaleX(0)", transition: "transform 0.3s ease" }}></span>
                    </span>
                  </Link>
                </li>
              )}

              {/* Search */}
              <li className="nav-item" style={{ margin: "0 0.3rem" }}>
                <form
                  className="d-flex position-relative"
                  onSubmit={handleSubmit}
                >
                  {!searchActive && (
                    <i
                      className="bi bi-search fs-5"
                      style={{ 
                        cursor: "pointer", 
                        color: "white",
                        transition: "all 0.3s ease",
                        textShadow: "0 0 8px rgba(255,255,255,0.5)",
                        padding: "0.5rem"
                      }}
                      onClick={handleSearchClick}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.2)";
                        e.target.style.textShadow = "0 0 12px rgba(255,255,255,0.8)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                        e.target.style.textShadow = "0 0 8px rgba(255,255,255,0.5)";
                      }}
                    ></i>
                  )}
                  {searchActive && (
                    <input
                      ref={searchInputRef}
                      type="search"
                      placeholder="Search..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      style={{
                        maxWidth: "200px",
                        background: "rgba(255,255,255,0.15)",
                        color: "white",
                        border: "1px solid rgba(255,255,255,0.3)",
                        borderRadius: "50px",
                        padding: "0.4rem 1rem",
                        animation: "expand 0.3s forwards",
                        transition: "all 0.3s ease",
                        backdropFilter: "blur(5px)"
                      }}
                      onFocus={(e) => {
                        e.target.style.background = "rgba(255,255,255,0.25)";
                        e.target.style.boxShadow = "0 0 15px rgba(255,255,255,0.3)";
                      }}
                      onBlur={(e) => {
                        e.target.style.background = "rgba(255,255,255,0.15)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  )}
                </form>
              </li>

              {/* Cart */}
              <li className="nav-item position-relative" style={{ margin: "0 0.3rem" }}>
                <Link
                  className="nav-link d-flex align-items-center gap-1 fw-bold text-white"
                  to="/cart"
                  style={{
                    animation: totalItems > 0 ? "bounce 0.6s ease-in-out infinite" : "",
                    transition: "all 0.3s ease",
                    padding: "0.5rem"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                    e.currentTarget.style.textShadow = "0 0 10px rgba(255,255,255,0.8)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.textShadow = "none";
                  }}
                >
                  <i className="bi bi-cart3 fs-5"></i>
                  {totalItems > 0 && (
                    <span
                      className="badge bg-warning text-dark rounded-pill position-absolute top-0 start-100 translate-middle d-flex align-items-center justify-content-center"
                      style={{ 
                        fontSize: "0.65rem",
                        minWidth: "18px",
                        height: "18px",
                        animation: "pulse 1s infinite",
                        boxShadow: "0 0 6px rgba(255,204,0,0.8)"
                      }}
                    >
                      {totalItems}
                    </span>
                  )}
                </Link>
              </li>

              {/* Wishlist */}
              <li className="nav-item position-relative" style={{ margin: "0 0.3rem" }}>
                <Link 
                  className="nav-link fw-medium text-white d-flex align-items-center" 
                  to="/wishlist"
                  style={{
                    transition: "all 0.3s ease",
                    padding: "0.5rem"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                    e.currentTarget.style.textShadow = "0 0 10px rgba(255,105,180,0.8)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.textShadow = "none";
                  }}
                >
                  <span 
                    className="position-relative"
                    style={{
                      color: totalWishlist > 0 ? "#ff4081" : "white",
                      transition: "all 0.3s ease"
                    }}
                  >
                    ❤️{totalWishlist > 0 && " Wishlist"}
                    {totalWishlist > 0 && (
                      <span 
                        className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"
                        style={{
                          fontSize: "5px",
                          animation: "pulse 1.5s infinite"
                        }}
                      >
                      </span>
                    )}
                  </span>
                </Link>
              </li>

              {/* User Section - Only show Exit/Door when logged in */}
              <li className="nav-item" style={{ marginLeft: "0.5rem" }}>
                {user ? (
                  <div className="d-flex align-items-center gap-2">
                    {/* User welcome message with animation */}
                    <span
                      className="d-none d-md-block"
                      style={{
                        background: "linear-gradient(90deg, #ff6a00, #ee0979)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: "600",
                        textShadow: "0 0 8px rgba(255,105,180,0.5)",
                        animation: "doorOpen 0.8s ease-out",
                        fontSize: "0.9rem",
                        marginRight: "0.5rem"
                      }}
                    >
                       {user.name}
                    </span>
                    
                    {/* Exit/Door button */}
                    <button
                      onClick={handleLogout}
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        background: "linear-gradient(135deg, #ff4081 0%, #ff6a00 100%)",
                        border: "none",
                        color: "white",
                        borderRadius: "50%",
                        width: "42px",
                        height: "42px",
                        fontWeight: "600",
                        boxShadow: "0 3px 8px rgba(0,0,0,0.2), 0 0 12px rgba(255,64,129,0.4)",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        animation: "doorOpen 0.8s ease-out",
                        position: "relative",
                        overflow: "hidden"
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "scale(1.1) rotate(5deg)";
                        e.currentTarget.style.boxShadow = "0 5px 12px rgba(0,0,0,0.3), 0 0 16px rgba(255,64,129,0.6)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "scale(1) rotate(0)";
                        e.currentTarget.style.boxShadow = "0 3px 8px rgba(0,0,0,0.2), 0 0 12px rgba(255,64,129,0.4)";
                      }}
                      title="Exit"
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      <span style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                        transform: "translateX(-100%)",
                        transition: "transform 0.6s ease"
                      }} 
                      onMouseOver={(e) => {
                        e.target.style.transform = "translateX(100%)";
                      }}></span>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="d-flex align-items-center"
                    style={{
                      background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 50%, #6a11cb 100%)",
                      backgroundSize: "200% auto",
                      color: "white",
                      borderRadius: "25px",
                      padding: "0.5rem 1.2rem",
                      fontWeight: "600",
                      textDecoration: "none",
                      boxShadow: "0 4px 12px rgba(106, 17, 203, 0.4)",
                      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      position: "relative",
                      overflow: "hidden",
                      fontSize: "0.9rem"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundPosition = "right center";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 6px 16px rgba(106, 17, 203, 0.6)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundPosition = "left center";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(106, 17, 203, 0.4)";
                    }}
                  >
                    <i className="bi bi-box-arrow-in-right" style={{ fontSize: "1rem" }}></i>
                    <span>Login</span>
                    <span style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                      transform: "translateX(-100%)",
                      transition: "transform 0.6s ease"
                    }} 
                    onMouseOver={(e) => {
                      e.target.style.transform = "translateX(100%)";
                    }}></span>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}