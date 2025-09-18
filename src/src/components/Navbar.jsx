import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  GiDiamondRing,
  GiClothes,
  GiCircuitry,
  GiCookingPot,
} from "react-icons/gi";
import {
  FaThLarge,
  FaTshirt,
  FaShoePrints,
  FaGem,
  FaLaptop,
  FaMobileAlt,
  FaCouch,
  FaBars,
  FaDumbbell,
  FaWatchmanMonitoring,
} from "react-icons/fa";

// ✅ normalize helper
const normalize = (str) => {
  if (!str) return "";
  if (str.toLowerCase() === "all") return "all"; // special case
  return str.toLowerCase().trim().replace(/&/g, "and").replace(/\s+/g, " ");
};

export default function Sidebar() {
  const [categories, setCategories] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const activeCategory = params.get("category") || "all";

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        const uniqueCats = ["All", ...new Set(data.map((p) => p.category))];
        setCategories(uniqueCats);
      })
      .catch((err) => console.error("Failed to load categories", err));
  }, []);

  const categoryIcons = {
    All: <FaThLarge />,
    "T-Shirts": <FaTshirt />,
    Shoes: <FaShoePrints />,
    Accessories: <GiDiamondRing />,
    Fashion: <GiClothes />,
    Laptops: <FaLaptop />,
    Mobiles: <FaMobileAlt />,
    Furniture: <FaCouch />,
    Kitchen: <GiCookingPot />,
    Electronics: <GiCircuitry />,
    "Sports & Fitness": <FaDumbbell />,
    Watches: <FaWatchmanMonitoring />,
  };

  return (
    <div
      className="shadow-lg d-flex flex-column"
      style={{
        width: collapsed ? "80px" : "250px",
        background: "linear-gradient(180deg, #e3f2fd, #bbdefb)",
        borderRadius: "15px",
        minHeight: "100vh",
        transition: "all 0.3s ease",
        padding: "15px",
      }}
    >
      {/* ✅ Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="btn btn-sm btn-light mb-4 d-flex align-items-center justify-content-center"
        style={{
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          alignSelf: collapsed ? "center" : "flex-end",
          width: "40px",
          height: "40px",
        }}
      >
        <FaBars />
      </button>

      {!collapsed && (
        <h5
          className="fw-bold mb-4 text-center"
          style={{
            background: "linear-gradient(90deg, #1565c0, #42a5f5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "1.4rem",
            letterSpacing: "1px",
          }}
        >
          ✨ Categories ✨
        </h5>
      )}

      <ul className="list-group border-0">
        {categories.map((cat) => {
          const normCat = normalize(cat);
          return (
            <Link
              key={cat}
              to={`/catalog?category=${normCat}`}
              className={`list-group-item list-group-item-action mb-3 border-0 rounded-4 fw-medium d-flex align-items-center ${
                activeCategory === normCat ? "active sparkle-active" : ""
              }`}
              style={{
                background:
                  activeCategory === normCat
                    ? "linear-gradient(90deg, #42a5f5, #1e88e5)"
                    : "rgba(255,255,255,0.9)",
                color: activeCategory === normCat ? "#fff" : "#0d47a1",
                boxShadow:
                  activeCategory === normCat
                    ? "0 4px 12px rgba(33,150,243,0.5)"
                    : "0 2px 6px rgba(0,0,0,0.05)",
                padding: "12px 16px",
                transition: "all 0.3s ease",
                fontSize: "15px",
              }}
            >
              <span className="me-2 fs-5">{categoryIcons[cat] || <FaGem />}</span>
              {!collapsed && <span>{cat}</span>}
              {activeCategory === normCat && !collapsed && (
                <span className="sparkle ms-auto">✨</span>
              )}
            </Link>
          );
        })}
      </ul>

      <style>
        {`
          .list-group-item:hover {
            background: linear-gradient(90deg, #bbdefb, #90caf9) !important;
            transform: translateX(5px);
            color: #0d47a1 !important;
          }
          .sparkle {
            animation: twinkle 1.5s infinite alternate;
          }
          @keyframes twinkle {
            from { opacity: 0.5; transform: scale(0.9) rotate(0deg); }
            to   { opacity: 1; transform: scale(1.3) rotate(15deg); }
          }
        `}
      </style>
    </div>
  );
}
