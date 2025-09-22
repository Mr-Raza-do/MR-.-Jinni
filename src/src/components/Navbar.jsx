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
      className="shadow-lg"
      style={{
        width: "250px",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #e3f2fd, #bbdefb)",
        borderRadius: "15px",
        padding: "15px",
      }}
    >
      {/* Toggle button */}
      <button
        className="btn btn-primary w-100 mb-3"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#categoryCollapse"
        aria-expanded="false"
        aria-controls="categoryCollapse"
      >
        Close Categories
      </button>

      {/* Collapse list */}
      <div className="collapse show" id="categoryCollapse">
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
                data-bs-toggle="collapse"
                data-bs-target="#categoryCollapse"
              >
                <span className="me-2">{categoryIcons[cat] || <FaGem />}</span>
                {cat}
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
