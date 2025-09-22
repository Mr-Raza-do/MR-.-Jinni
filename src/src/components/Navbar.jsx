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

export default function CategoriesNav() {
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
      className="shadow-sm border-top border-bottom"
      style={{
        background: "#fff",
        padding: "8px 0",
        overflowX: "auto",
        whiteSpace: "nowrap",
      }}
    >
      <div className="d-flex align-items-center px-3" style={{ gap: "15px" }}>
        {categories.map((cat) => {
          const normCat = normalize(cat);
          const isActive = activeCategory === normCat;
          return (
            <Link
              key={cat}
              to={`/catalog?category=${normCat}`}
              className={`fw-medium`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "6px 10px",
                color: isActive ? "#1565c0" : "#333",
                textDecoration: "none",
                fontWeight: isActive ? "600" : "400",
                borderBottom: isActive ? "2px solid #1565c0" : "2px solid transparent",
                transition: "0.2s",
              }}
            >
              <span>{categoryIcons[cat] || <FaGem />}</span>
              {cat}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
