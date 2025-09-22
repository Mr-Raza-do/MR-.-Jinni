import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";

const normalize = (str) => {
  if (!str) return "";
  if (str.toLowerCase() === "all") return "all";
  return str.toLowerCase().trim().replace(/&/g, "and").replace(/\s+/g, " ");
};

export default function Catalog({ searchQuery }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category") || "all";

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  // ✅ Search + Category filter
  let filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  );

  if (category !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) => normalize(p.category) === category
    );
  }

  // ✅ Sorting
  if (sort === "low-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sort === "high-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  return (
    <main
      style={{
        background: "linear-gradient(180deg, #f0f7ff, #d6e4ff)",
        minHeight: "100vh",
        width: "100%",
        padding: "2rem 0",
        color: "#222",
      }}
      className="container-fluid"
    >
      {/* Page Title */}
      <div className="text-center mb-5 position-relative magic-title" style={{ zIndex: 1 }}>
        <h1
          className="fw-bold position-relative d-inline-block"
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            background: "linear-gradient(90deg, #0d6efd, #6610f2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 15px rgba(0,153,255,0.6)",
            letterSpacing: "1px",
          }}
        >
          Collections
          <span className="glow-underline"></span>
        </h1>

        <p
          className="text-muted mt-3"
          style={{
            fontSize: "1.1rem",
            textShadow: "0 0 6px rgba(13,110,253,0.2)",
          }}
        >
          Showing category: <b>{category}</b>
        </p>
      </div>

      {/* Sort Selector */}
      <div className="mb-4 d-flex flex-column flex-sm-row align-items-sm-center gap-3">
        <label className="fw-semibold">Sort Products:</label>
        <select
          className="form-select form-select-sm shadow-sm"
          style={{
            width: "180px",
            borderRadius: "8px",
          }}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="low-high">Price: Low → High</option>
          <option value="high-low">Price: High → Low</option>
        </select>
      </div>

      {/* Product Grid */}
      {loading ? (
        <p>Loading...</p>
      ) : filteredProducts.length > 0 ? (
        <div
          className="product-grid"
          style={{
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(3, 1fr)", // ✅ Always 3 cards
            overflowX: "auto", // ✅ Scroll if too small
          }}
        >
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p>No products found</p>
      )}
    </main>
  );
}
