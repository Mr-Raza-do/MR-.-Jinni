import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext"; // ✅ add
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist(); // ✅ wishlist context
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    setToastMessage(message);

    const toastElement = document.getElementById("liveToast");
    const toast = new window.bootstrap.Toast(toastElement);
    toast.show();
  };

  return (
    <div
      className="card h-100 border-0 text-dark"
      style={{
        minHeight: "400px",
        background: "linear-gradient(135deg, #e0f7ff, #f0f4ff, #d6e4ff)",
        borderRadius: "20px",
        boxShadow: "0 0 25px rgba(0, 153, 255, 0.3)",
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
        e.currentTarget.style.boxShadow = "0 0 30px rgba(0, 102, 255, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 0 25px rgba(0, 153, 255, 0.3)";
      }}
    >
      {/* 🌌 Magical Image */}
      <div className="position-relative" style={{ height: "220px" }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
        />

        {/* 💙 Wishlist */}
        <button
          className="btn btn-light rounded-circle position-absolute"
          style={{
            top: "12px",
            right: "12px",
            width: "42px",
            height: "42px",
            background: "rgba(240, 248, 255, 0.9)",
            boxShadow: "0 0 12px rgba(0,153,255,0.4)",
            border: "1px solid #b3d9ff",
          }}
          onClick={() => {
            toggleWishlist(product);
            showToast(
              isInWishlist(product.id)
                ? `${product.name} removed from wishlist`
                : `${product.name} added to wishlist`
            );
          }}
        >
          <span
            style={{
              color: isInWishlist(product.id) ? "dodgerblue" : "gray",
              fontSize: "18px",
              textShadow: isInWishlist(product.id) ? "0 0 6px skyblue" : "none",
            }}
          >
            ♥
          </span>
        </button>
      </div>

      {/* 🌟 Body */}
      <div className="card-body d-flex flex-column p-3">
        <h5
          className="fw-bold text-truncate"
          style={{
            background: "linear-gradient(90deg, #1e90ff, #00bfff, #6a5acd)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {product.name}
        </h5>

        <p
          className="small mb-2"
          style={{
            color: "rgba(30, 60, 120, 0.7)",
            fontStyle: "italic",
          }}
        >
          {product.description?.slice(0, 40) || "A magical item"}...
        </p>

        <h6
          className="fw-semibold mt-2"
          style={{
            color: "#0056b3",
            textShadow: "0 0 8px rgba(0,153,255,0.6)",
          }}
        >
          Rs. {product.price.toLocaleString()}
        </h6>

        {/* 🔮 Add to Cart */}
        <button
          className="btn mt-auto rounded-pill"
          style={{
            background: "linear-gradient(90deg, #00bfff, #1e90ff, #4169e1)",
            border: "none",
            color: "white",
            fontWeight: "600",
            boxShadow: "0 0 12px rgba(0,153,255,0.6)",
          }}
          onClick={() => {
            addToCart(product);
            showToast(`${product.name} added to cart!`);
          }}
        >
          ✨ Add to Cart
        </button>
      </div>
    </div>
  );
}
