import ball from "/src/assets/mrj.png"; // 🖼️ apni image ka path lagao
import { useState, useEffect } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Footer animation on component mount
    setIsVisible(true);
    
    // Update year if needed (though it's not really necessary)
    const interval = setInterval(() => {
      const newYear = new Date().getFullYear();
      if (newYear !== currentYear) {
        setCurrentYear(newYear);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [currentYear]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer
      className="text-light pt-4 pb-3 mt-auto position-relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0d47a1 0%, #1976d2 50%, #0d47a1 100%)",
        backgroundSize: "200% 200%",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.4)",
        animation: isVisible ? "gradientShift 8s ease infinite" : "none",
        transform: isVisible ? "translateY(0)" : "translateY(100px)",
        opacity: isVisible ? 1 : 0,
        transition: "transform 0.8s ease, opacity 0.8s ease"
      }}
    >
      {/* Animated Background Particles */}
      <div className="position-absolute top-0 left-0 w-100 h-100" style={{ zIndex: 0, pointerEvents: "none" }}>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="position-absolute rounded-circle"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: "rgba(255, 255, 255, 0.3)",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Glow Line on Top */}
      <div
        style={{
          height: "4px",
          background: "linear-gradient(90deg, #ffcc00, #ff4081, #00e5ff, #ffcc00)",
          backgroundSize: "300% 100%",
          boxShadow: "0 0 12px rgba(255, 255, 255, 0.8)",
          animation: "gradientMove 3s linear infinite",
        }}
      ></div>

      <div className="container mt-4 position-relative" style={{ zIndex: 1 }}>
        <div className="row align-items-center gy-3">
          {/* Branding with Image */}
          <div className="col-md-4 text-center text-md-start d-flex align-items-center justify-content-center justify-content-md-start">
            <div className="position-relative">
              <img
                src={ball}
                alt="MR Jinni Logo"
                style={{
                  width: "45px",
                  height: "45px",
                  marginRight: "10px",
                  animation: "float 3s ease-in-out infinite",
                  filter: "drop-shadow(0 0 8px rgba(255, 204, 0, 0.7))",
                  cursor: "pointer"
                }}
                onClick={scrollToTop}
                title="Scroll to Top"
              />
              <div className="position-absolute top-0 start-0 w-100 h-100 rounded-circle" 
                style={{
                  background: "radial-gradient(circle, rgba(255,204,0,0.4) 0%, transparent 70%)",
                  animation: "pulseGlow 2s infinite alternate",
                  pointerEvents: "none"
                }}
              ></div>
            </div>
            <div>
              <h5
                className="fw-bold mb-1"
                style={{
                  background: "linear-gradient(90deg, #ffcc00, #ff4081, #ffcc00)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 8px rgba(255,255,255,0.6)",
                  animation: "textShimmer 3s infinite linear"
                }}
              >
                MR . Jinni
              </h5>
              <small className="text-light-50" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>
                © {currentYear} MR Jinni. All rights reserved.
              </small>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 text-center">
            <a href="/about" className="text-decoration-none text-light mx-2 footer-link position-relative">
              <i className="bi bi-info-circle me-1"></i>About
            </a>
            <a href="/contact" className="text-decoration-none text-light mx-2 footer-link position-relative">
              <i className="bi bi-envelope me-1"></i>Contact
            </a>
            <a href="/privacy" className="text-decoration-none text-light mx-2 footer-link position-relative">
              <i className="bi bi-shield-lock me-1"></i>Privacy
            </a>
          </div>

          {/* Social Icons */}
          <div className="col-md-4 text-center text-md-end">
            <a href="#" className="text-light fs-5 mx-2 social-icon position-relative" aria-label="Facebook" 
               style={{ animationDelay: "0.1s" }}>
              <i className="bi bi-facebook"></i>
              <span className="social-tooltip">Facebook</span>
            </a>
            <a href="#" className="text-light fs-5 mx-2 social-icon position-relative" aria-label="Instagram"
               style={{ animationDelay: "0.2s" }}>
              <i className="bi bi-instagram"></i>
              <span className="social-tooltip">Instagram</span>
            </a>
            <a href="#" className="text-light fs-5 mx-2 social-icon position-relative" aria-label="Twitter"
               style={{ animationDelay: "0.3s" }}>
              <i className="bi bi-twitter-x"></i>
              <span className="social-tooltip">Twitter</span>
            </a>
            <a href="#" className="text-light fs-5 mx-2 social-icon position-relative" aria-label="YouTube"
               style={{ animationDelay: "0.4s" }}>
              <i className="bi bi-youtube"></i>
              <span className="social-tooltip">YouTube</span>
            </a>
          </div>
        </div>

        {/* Additional Info Row */}
        <div className="row mt-3">
          <div className="col-12 text-center">
            <p className="mb-0 small" style={{ opacity: 0.8, textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>
              Made with <i className="bi bi-heart-fill text-danger" style={{ animation: "heartbeat 1.5s infinite" }}></i> for amazing shopping experiences
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="btn btn-warning btn-sm position-fixed rounded-circle d-flex align-items-center justify-content-center"
        style={{
          width: "45px",
          height: "45px",
          bottom: "90px",
          right: "20px",
          zIndex: 1000,
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          animation: "bounce 2s infinite",
          transition: "all 0.3s ease"
        }}
        title="Scroll to Top"
      >
        <i className="bi bi-arrow-up"></i>
      </button>

      {/* Custom Animations */}
      <style>
        {`
          .footer-link {
            position: relative;
            transition: color 0.3s ease;
            padding: 0.3rem 0.5rem;
            border-radius: 4px;
          }
          .footer-link::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -2px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(90deg, #ffcc00, #ff4081);
            transition: width 0.3s ease;
          }
          .footer-link:hover {
            color: #ffeb3b !important;
            background: rgba(255, 255, 255, 0.1);
          }
          .footer-link:hover::after {
            width: 80%;
          }

          .social-icon {
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            position: relative;
          }
          .social-icon:hover {
            color: #fff !important;
            transform: scale(1.2) translateY(-3px);
            text-shadow: 0 0 12px rgba(255, 235, 59, 0.8);
            background: rgba(255, 255, 255, 0.15);
          }

          .social-tooltip {
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.75rem;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            white-space: nowrap;
          }
          .social-icon:hover .social-tooltip {
            opacity: 1;
            visibility: visible;
            transform: translateX(-50%) translateY(-5px);
          }

          /* Animations */
          @keyframes float {
            0%   { transform: translateY(0px); }
            50%  { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
          }

          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            100% { background-position: 300% 50%; }
          }

          @keyframes textShimmer {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }

          @keyframes pulseGlow {
            0% { opacity: 0.3; transform: scale(1); }
            100% { opacity: 0.6; transform: scale(1.2); }
          }

          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
          }

          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }

          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-8px); }
            60% { transform: translateY(-4px); }
          }
        `}
      </style>
    </footer>
  );
}