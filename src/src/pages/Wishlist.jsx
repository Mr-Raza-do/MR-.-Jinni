import React from "react";
import { useWishlist } from "../context/WishlistContext";

function MyWishlist() {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <main
      className="container my-5 p-4 rounded"
      style={{
        background: "linear-gradient(180deg, #faf5ff, #eff6ff)",
        minHeight: "100vh",
      }}
    >
      {/* Title */}
      <div className="text-center mb-5">
        <h1
          className="fw-bold"
          style={{
            background: "linear-gradient(90deg, #ec4899, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "2.8rem",
            letterSpacing: "1px",
          }}
        >
          💖 My Wishlist
        </h1>
        <p className="text-muted fs-5">
          Your handpicked favorites, all in one place ✨
        </p>
      </div>

      {/* Empty Wishlist */}
      {wishlist.length === 0 ? (
        <div className="text-center my-5">
          <div
            className="p-5 shadow-sm"
            style={{
              borderRadius: "20px",
              background: "linear-gradient(135deg, #fdf2f8, #ede9fe)",
            }}
          >
            <h4 className="fw-bold mb-2">No items in wishlist 💔</h4>
            <p className="text-muted">
              Browse products and add your favorites to see them here.
            </p>
          </div>
        </div>
      ) : (
        <div className="row">
          {wishlist.map((item) => (
            <div key={item.id} className="col-md-4 mb-4">
              <div
                className="card h-100 border-0"
                style={{
                  borderRadius: "20px",
                  boxShadow: "0 6px 14px rgba(139, 92, 246, 0.15)",
                  transition: "all 0.3s ease",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 10px 20px rgba(236, 72, 153, 0.25)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 6px 14px rgba(139, 92, 246, 0.15)")
                }
              >
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.name}
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{item.name}</h5>
                  <p
                    className="fw-bold mb-3"
                    style={{
                      background: "linear-gradient(90deg, #ec4899, #8b5cf6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: "1.2rem",
                    }}
                  >
                    Rs. {item.price}
                  </p>
                  <button
                    className="btn btn-sm px-3 py-2 fw-semibold"
                    style={{
                      borderRadius: "12px",
                      border: "2px solid #ef4444",
                      color: "#ef4444",
                      background: "transparent",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#ef4444";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#ef4444";
                    }}
                    onClick={() => toggleWishlist(item)}
                  >
                    ❌ Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default MyWishlist;
