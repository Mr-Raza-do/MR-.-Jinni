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

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
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
    setTimeout(() => searchInputRef.current?.focus(), 0);
  };

  // Auto collapse search
  useEffect(() => {
    if (searchActive && query === "") {
      collapseTimer.current = setTimeout(() => setSearchActive(false), 5000);
    }
    return () => clearTimeout(collapseTimer.current);
  }, [searchActive, query]);

  // ✅ Navbar auto collapse on link click
  const handleCollapse = () => {
    const nav = document.getElementById("navbarNav");
    if (nav && nav.classList.contains("show")) {
      new window.bootstrap.Collapse(nav).hide();
    }
  };

  return (
    <>
      {/* Animations */}
      <style>
        {`
        .nav-link {
          position: relative;
          transition: color 0.3s ease;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: #ffcc00;
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: #ffcc00 !important;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        @keyframes float {0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes bounce {0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        @keyframes expand {0%{width:0;opacity:0}100%{width:220px;opacity:1}}
        @keyframes pulse {0%{transform:scale(1)}50%{transform:scale(1.05)}100%{transform:scale(1)}}
        @keyframes glow {0%{box-shadow:0 0 5px rgba(255,204,0,.5)}50%{box-shadow:0 0 20px rgba(255,204,0,.8)}100%{box-shadow:0 0 5px rgba(255,204,0,.5)}}
        @keyframes shimmer {0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes doorOpen {0%{transform:perspective(800px) rotateY(90deg);opacity:0}100%{transform:perspective(800px) rotateY(0);opacity:1}}
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
          padding: isScrolled ? "0.4rem 0" : "0.8rem 0",
        }}
      >
        <div className="container-fluid px-3">
          {/* Logo */}
          <Link
            className="navbar-brand fw-bold fs-3 d-flex align-items-center ms-5"
            to="/"
            onClick={handleCollapse}
            style={{
              background: "linear-gradient(90deg, #ffcc00, #ff4081, #ffcc00)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0px 0px 8px rgba(255,255,255,0.6)",
              animation: "shimmer 3s infinite linear, pulse 2s infinite",
              marginRight: "1rem",
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
                filter: "drop-shadow(0 0 8px rgba(255, 204, 0, 0.7))",
              }}
            />
            MR . Jinni
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ border: "1px solid rgba(255,255,255,0.3)" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul
              className="navbar-nav ms-auto align-items-lg-center"
              style={{ gap: "0.5rem" }}
            >
              {/* Home */}
              <li className="nav-item">
                <Link
                  className="nav-link text-white fw-medium"
                  to="/"
                  onClick={handleCollapse}
                >
                  Home
                </Link>
              </li>

              {/* Collection */}
              <li className="nav-item">
                <Link
                  className="nav-link text-white fw-medium"
                  to="/catalog"
                  onClick={handleCollapse}
                >
                  Collection
                </Link>
              </li>

              {/* My Orders */}
              {user && (
                <li className="nav-item">
                  <Link
                    className="nav-link text-white fw-medium"
                    to="/my-orders"
                    onClick={handleCollapse}
                  >
                    My Orders
                  </Link>
                </li>
              )}

              {/* Search */}
              <li className="nav-item">
                <form className="d-flex" onSubmit={handleSubmit}>
                  {!searchActive ? (
                    <i
                      className="bi bi-search fs-5 text-white"
                      style={{ cursor: "pointer" }}
                      onClick={handleSearchClick}
                    ></i>
                  ) : (
                    <input
                      ref={searchInputRef}
                      type="search"
                      placeholder="Search..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      style={{
                        maxWidth: "200px",
                        borderRadius: "20px",
                        background: "rgba(255,255,255,0.15)",
                        color: "white",
                        border: "1px solid rgba(255,255,255,0.3)",
                        padding: "0.4rem 1rem",
                      }}
                    />
                  )}
                </form>
              </li>

              {/* Cart */}
              <li className="nav-item position-relative">
                <Link
                  className="nav-link text-white"
                  to="/cart"
                  onClick={handleCollapse}
                >
                  <i className="bi bi-cart3 fs-5"></i>
                  {totalItems > 0 && (
                    <span className="badge bg-warning text-dark position-absolute top-0 start-100 translate-middle rounded-pill">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </li>

              {/* Wishlist */}
              <li className="nav-item position-relative">
                <Link
                  className="nav-link text-white"
                  to="/wishlist"
                  onClick={handleCollapse}
                >
                  <i className="bi bi-heart fs-5"></i>
                  {totalWishlist > 0 && (
                    <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
                      {totalWishlist}
                    </span>
                  )}
                </Link>
              </li>

              {/* User Section */}
              <li className="nav-item">
                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      handleCollapse();
                    }}
                    className="btn btn-sm btn-danger ms-2"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="btn btn-sm ms-2"
                    onClick={handleCollapse}
                    style={{
                      background: "linear-gradient(90deg, #0d47a1, #1976d2)",
                      color: "white",
                      border: "none",
                    }}
                  >
                    Login
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
