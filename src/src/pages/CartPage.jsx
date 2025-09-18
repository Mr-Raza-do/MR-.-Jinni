import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";


export default function CartPage() {
  const { cart, removeFromCart, increaseQty, decreaseQty, totalPrice } =
    useCart();

  // 🔥 Hover effect ke liye state
  const [hoveredImg, setHoveredImg] = useState(null);

  return (
    <main
      className="container my-5 p-3 p-md-4 rounded"
      style={{
        background: "linear-gradient(180deg, #e6f0ff, #d0e0ff, #f0f6ff)",
        minHeight: "100vh",
      }}
    >
      {/* 🛒 Magical Heading */}
      <div className="text-center mb-5">
        <h1
          className="fw-bold"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
            background: "linear-gradient(90deg, #0d6efd, #6f42c1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 10px rgba(13,110,253,0.5), 0 0 20px rgba(111,66,193,0.6)",
            display: "inline-block",
            position: "relative",
          }}
        >
          🛒 Your Cart
          <span
            style={{
              position: "absolute",
              left: "50%",
              bottom: "-8px",
              transform: "translateX(-50%)",
              height: "3px",
              width: "70%",
              background: "linear-gradient(90deg, #0d6efd, #6610f2)",
              borderRadius: "50px",
              boxShadow: "0 0 8px rgba(13,110,253,0.6), 0 0 15px rgba(102,16,242,0.6)",
            }}
          ></span>
        </h1>
        <p className="text-muted mt-3">
          ✨ Manage your magical collection before checkout ✨
        </p>
      </div>

      {cart.length === 0 ? (
        <div
          className="d-flex flex-column justify-content-center align-items-center text-center p-4"
          style={{ minHeight: "60vh" }}
        >
          {/* ✅ Empty cart illustration */}
        <img
  src="/images/emp.png"
  alt="Empty cart"
  className="mb-3 img-fluid"
  style={{
    maxWidth: "220px",
    animation: "bounce 2s infinite",
    filter: "drop-shadow(0 0 12px rgba(13,110,253,0.4))",
  }}
/>
    

          <h4 className="text-muted mb-2">Your cart is empty</h4>
          <p className="text-secondary mb-3">
            Looks like you haven’t added anything yet.  
            Let’s get you back to our collections!
          </p>
          <Link
            to="/catalog"
            className="btn btn-primary btn-lg shadow-sm"
            style={{
              background: "linear-gradient(90deg, #0d6efd, #6610f2)",
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 0 12px rgba(13,110,253,0.6), 0 0 18px rgba(102,16,242,0.6)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 0 18px rgba(13,110,253,0.8), 0 0 25px rgba(102,16,242,0.8)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 0 12px rgba(13,110,253,0.6), 0 0 18px rgba(102,16,242,0.6)")
            }
          >
            Start Shopping →
          </Link>
        </div>
      ) : (
        <div className="row gy-4">
          {/* Cart items */}
          <div className="col-12 col-lg-8">
            <ul className="list-group border-0">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 border-0 mb-3"
                  style={{
                    background: "rgba(255,255,255,0.8)",
                    borderRadius: "14px",
                    boxShadow:
                      "0 4px 12px rgba(13,110,253,0.2), 0 0 12px rgba(111,66,193,0.3)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 6px 16px rgba(13,110,253,0.4), 0 0 18px rgba(111,66,193,0.5)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(13,110,253,0.2), 0 0 12px rgba(111,66,193,0.3)")
                  }
                >
                  {/* Image + Name */}
                  <div className="d-flex align-items-center w-100 w-sm-auto">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="me-3 rounded img-fluid"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "12px",
                          transition: "transform 0.3s ease, box-shadow 0.3s ease",
                          transform:
                            hoveredImg === item.id
                              ? "scale(1.15) rotate(3deg)"
                              : "scale(1)",
                          boxShadow:
                            hoveredImg === item.id
                              ? "0 6px 15px rgba(13,110,253,0.4)"
                              : "none",
                        }}
                        onMouseEnter={() => setHoveredImg(item.id)}
                        onMouseLeave={() => setHoveredImg(null)}
                      />
                    )}
                    <div>
                      <h6 className="mb-1">{item.name}</h6>
                      <small className="text-muted">Rs. {item.price}</small>
                    </div>
                  </div>

                  {/* Quantity + Price + Remove */}
                  <div className="d-flex align-items-center justify-content-between w-100 w-sm-auto flex-wrap gap-2">
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => decreaseQty(item.id)}
                      >
                        −
                      </button>
                      <span className="px-3">{item.qty}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => increaseQty(item.id)}
                      >
                        +
                      </button>
                    </div>

                    <span className="fw-bold text-nowrap">
                      Rs. {item.price * item.qty}
                    </span>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        borderRadius: "8px",
                        transition: "transform 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.2)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Summary sidebar */}
          <div className="col-12 col-lg-4">
            <div
              className="card shadow border-0 sticky-lg-top"
              style={{
                top: "100px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #ffffffcc, #f0f6ffcc)",
                boxShadow:
                  "0 6px 16px rgba(13,110,253,0.2), 0 0 20px rgba(111,66,193,0.3)",
              }}
            >
              <div className="card-body">
                <h5
                  className="card-title fw-bold"
                  style={{
                    background: "linear-gradient(90deg, #0d6efd, #6610f2)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 8px rgba(13,110,253,0.5)",
                  }}
                >
                  Order Summary
                </h5>
                <p className="d-flex justify-content-between">
                  <span>Total Items</span>
                  <span>{cart.reduce((acc, item) => acc + item.qty, 0)}</span>
                </p>
                <p className="d-flex justify-content-between fw-bold">
                  <span>Total Price</span>
                  <span>Rs. {totalPrice}</span>
                </p>

                <Link to="/checkout">
                  <button
                    className="btn btn-lg w-100"
                    style={{
                      background: "linear-gradient(90deg, #0d6efd, #6610f2)",
                      color: "white",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow:
                        "0 0 12px rgba(13,110,253,0.6), 0 0 18px rgba(102,16,242,0.6)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 0 18px rgba(13,110,253,0.8), 0 0 25px rgba(102,16,242,0.8)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 0 12px rgba(13,110,253,0.6), 0 0 18px rgba(102,16,242,0.6)")
                    }
                  >
                    Proceed to Checkout →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
