import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaThLarge,
  FaTshirt,
  FaShoePrints,
  FaGem,
  FaLaptop,
  FaMobileAlt,
  FaCouch,
  FaDumbbell,
  FaWatchmanMonitoring,
} from "react-icons/fa";
import { GiDiamondRing, GiClothes, GiCircuitry, GiCookingPot } from "react-icons/gi";

const normalize = (str) => {
  if (!str) return "";
  if (str.toLowerCase() === "all") return "all";
  return str.toLowerCase().trim().replace(/&/g, "and").replace(/\s+/g, " ");
};

export default function Sidebar() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    if (activeCategory) setOpen(false);
  }, [activeCategory]);

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
    <>
      {/* Desktop Sidebar */}
      <div
        className="d-none d-lg-flex flex-column shadow-lg"
        style={{
          width: "250px",
          minHeight: "100vh",
          background: "linear-gradient(180deg, #e3f2fd, #bbdefb)",
          borderRadius: "15px",
          padding: "15px",
        }}
      >
        <h5
          className="fw-bold mb-4 text-center"
          style={{
            background: "linear-gradient(90deg, #1565c0, #42a5f5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ✨ Categories ✨
        </h5>

        <ul className="list-group border-0">
          {categories.map((cat) => {
            const normCat = normalize(cat);
            return (
              <Link
                key={cat}
                to={`/catalog?category=${normCat}`}
                className={`list-group-item list-group-item-action mb-2 border-0 rounded-4 fw-medium d-flex align-items-center ${
                  activeCategory === normCat ? "active" : ""
                }`}
                style={{
                  background:
                    activeCategory === normCat
                      ? "linear-gradient(90deg, #42a5f5, #1e88e5)"
                      : "rgba(255,255,255,0.9)",
                  color: activeCategory === normCat ? "#fff" : "#0d47a1",
                }}
              >
                <span className="me-2">{categoryIcons[cat] || <FaGem />}</span>
                {cat}
              </Link>
            );
          })}
        </ul>
      </div>

      {/* Mobile Dropdown */}
      <div className="d-lg-none mb-3">
        <button
          className="btn w-100 fw-bold text-white"
          style={{
            background: "linear-gradient(90deg, #1565c0, #42a5f5)",
            borderRadius: "10px",
          }}
          onClick={() => setOpen(!open)}
        >
          {open ? "Close Categories ✖" : "Browse Categories ▼"}
        </button>

        {open && (
          <div
            className="mt-2 p-2 shadow-sm"
            style={{
              background: "#fff",
              borderRadius: "10px",
            }}
          >
            <ul className="list-unstyled m-0">
              {categories.map((cat) => {
                const normCat = normalize(cat);
                return (
                  <li key={cat} className="mb-1">
                    <Link
                      to={`/catalog?category=${normCat}`}
                      className={`d-flex align-items-center p-2 rounded ${
                        activeCategory === normCat ? "active" : ""
                      }`}
                      style={{
                        textDecoration: "none",
                        background:
                          activeCategory === normCat
                            ? "linear-gradient(90deg, #42a5f5, #1e88e5)"
                            : "rgba(255,255,255,0.9)",
                        color: activeCategory === normCat ? "#fff" : "#0d47a1",
                      }}
                      onClick={() => setOpen(false)}
                    >
                      <span className="me-2">
                        {categoryIcons[cat] || <FaGem />}
                      </span>
                      {cat}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
