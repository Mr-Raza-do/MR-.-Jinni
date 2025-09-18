import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state;

  if (!order) {
    return (
      <div
        className="container text-center py-5"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #dbeafe, #ede9fe)",
        }}
      >
        <h2 className="text-danger fw-bold">❌ No order found!</h2>
        <button
          className="btn btn-primary mt-3 shadow"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <main
      className="container d-flex align-items-center justify-content-center py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #dbeafe, #ede9fe)", // 🌈 soft magical bg
      }}
    >
      <div
        className="card shadow-lg border-0 p-4 text-center"
        style={{
          borderRadius: "20px",
          maxWidth: "700px",
          width: "100%",
          background: "white",
          boxShadow: "0 0 25px rgba(99, 102, 241, 0.4)", // glowing effect
        }}
      >
        {/* ✅ Heading */}
        <h1
          className="fw-bold mb-3"
          style={{
            fontSize: "2.2rem",
            background: "linear-gradient(90deg, #0ea5e9, #6366f1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ✨ Order Confirmed ✨
        </h1>

        <p className="lead">
          Thank you, <b>{order.name}</b>! 💖  
          Your order has been placed successfully.
        </p>

        {/* ✅ Order Details */}
        <div className="mt-4">
          <h3
            style={{
              fontSize: "1.5rem",
              color: "#6366f1",
              fontWeight: "600",
            }}
          >
            🧾 Order Details
          </h3>
          <ul className="list-group list-group-flush text-start my-3">
            <li className="list-group-item">
              <b>Email:</b> {order.email}
            </li>
            <li className="list-group-item">
              <b>Address:</b> {order.address}
            </li>
            <li className="list-group-item">
              <b>Payment:</b>{" "}
              <span className="badge bg-success">{order.payment}</span>
            </li>
            <li className="list-group-item">
              <b>Total:</b>{" "}
              <span className="fw-bold text-primary">Rs. {order.total}</span>
            </li>
          </ul>
        </div>

        {/* ✅ Buttons */}
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button
            className="btn btn-success px-4 shadow-sm"
            onClick={() => navigate("/")}
          >
            🏠 Go to Home
          </button>
          <Link
            to="/collections"
            className="btn btn-primary px-4 shadow-sm"
          >
            🛒 Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

export default OrderConfirmation;
