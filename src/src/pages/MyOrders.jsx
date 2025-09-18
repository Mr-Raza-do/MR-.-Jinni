import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function MyOrders() {
  const { user } = useAuth(); // ✅ Logged-in user
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!user) {
      // ✅ Logout hone par orders clear
      setOrders([]);
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = users.find((u) => u.email === user.email);

    if (currentUser) {
      // ✅ Orders sirf is user ke
      const ordersWithStatus = (currentUser.orders || []).map((o) => ({
        ...o,
        status: o.status || "Delivered",
      }));
      setOrders(ordersWithStatus);
    }
  }, [user]); // ✅ User change / logout detect karega

  // ✅ Filter logic
  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  // ✅ Delete handler
  const handleDelete = () => {
    if (!selectedOrder || !user) return;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let updatedUsers = users.map((u) => {
      if (u.email === user.email) {
        return {
          ...u,
          orders: u.orders.filter((o) => o.id !== selectedOrder.id),
        };
      }
      return u;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setOrders((prev) => prev.filter((o) => o.id !== selectedOrder.id));
    setSelectedOrder(null);
  };

  return (
    <main
      className="container my-5 p-4 rounded"
      style={{
        background: "linear-gradient(180deg, #e0f2fe, #ede9fe)",
        minHeight: "100vh",
      }}
    >
      {/* Page Title */}
      <div className="text-center mb-4">
        <h1
          className="fw-bold"
          style={{
            background: "linear-gradient(90deg, #3b82f6, #6366f1, #9333ea)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "2.5rem",
          }}
        >
          📦 My Orders
        </h1>
        <p className="text-muted">
          Track and view your magical purchase history ✨
        </p>
      </div>

      {/* ✅ Filter Tabs */}
      <ul className="nav nav-pills justify-content-center mb-4 gap-2">
        {["All", "Delivered", "Pending"].map((status) => (
          <li className="nav-item" key={status}>
            <button
              className={`nav-link shadow-sm ${
                filterStatus === status ? "active" : ""
              }`}
              style={{
                borderRadius: "20px",
                fontWeight: "500",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
              onClick={() => setFilterStatus(status)}
            >
              {status}
            </button>
          </li>
        ))}
      </ul>

      {filteredOrders.length === 0 ? (
        <div className="text-center my-5">
          <div
            className="alert alert-info d-inline-block shadow-sm px-4 py-3"
            style={{ borderRadius: "15px" }}
          >
            <h5 className="mb-0">No {filterStatus} orders found 🛍️</h5>
            <small className="text-muted">
              Your {filterStatus.toLowerCase()} orders will appear here.
            </small>
          </div>
        </div>
      ) : (
        <div className="row">
          {filteredOrders.map((order) => (
            <div key={order.id} className="col-md-6 mb-4">
              <div
                className="card h-100 border-0 position-relative"
                style={{
                  borderRadius: "20px",
                  background: "white",
                  boxShadow: "0 4px 12px rgba(99, 102, 241, 0.15)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 24px rgba(99,102,241,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(99,102,241,0.15)";
                }}
              >
                {/* ❌ Delete Button */}
                <button
                  className="btn btn-sm btn-outline-danger position-absolute"
                  style={{
                    top: "10px",
                    right: "10px",
                    borderRadius: "50%",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#fee2e2")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                  onClick={() => setSelectedOrder(order)}
                >
                  ✖
                </button>

                <div className="card-body">
                  <h5 className="card-title mb-3 text-primary">
                    🛒 Order #{order.id}
                  </h5>

                  <p>
                    <strong>Name:</strong> {order.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.email}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.address}
                  </p>
                  <p>
                    <strong>Payment:</strong>{" "}
                    <span className="badge bg-info text-dark px-3">
                      {order.payment}
                    </span>
                  </p>
                  <p className="fw-bold text-success fs-5">
                    Total: Rs. {order.total}
                  </p>

                  {/* Items */}
                  <h6 className="mt-3">🛍️ Items:</h6>
                  <ul className="list-group list-group-flush rounded">
                    {order.items.map((item) => (
                      <li
                        key={item.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                        style={{
                          transition: "all 0.3s ease",
                          borderRadius: "10px",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f0f9ff")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "transparent")
                        }
                      >
                        <span>
                          {item.name} <b>(x{item.qty})</b>
                        </span>
                        <span className="fw-bold text-primary">
                          Rs. {item.price * item.qty}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ✅ Status Footer */}
                <div
                  className="card-footer text-center fw-bold"
                  style={{
                    borderRadius: "0 0 20px 20px",
                    background:
                      order.status === "Delivered"
                        ? "linear-gradient(90deg,#22c55e,#16a34a)"
                        : "linear-gradient(90deg,#facc15,#eab308)",
                    color: "white",
                    fontSize: "1rem",
                  }}
                >
                  {order.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Delete Confirmation Modal (Blueish) */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* 🔵 Blueish Header */}
            <div
              className="modal-header text-white"
              style={{
                background: "linear-gradient(90deg,#2563eb,#4f46e5,#7c3aed)",
              }}
            >
              <h5 className="modal-title">Confirm Delete</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body">
              Are you sure you want to delete{" "}
              <b>Order #{selectedOrder?.id}</b>?
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button className="btn btn-light border" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                className="btn text-white"
                style={{
                  background: "linear-gradient(90deg,#2563eb,#4f46e5,#7c3aed)",
                  border: "none",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.filter = "brightness(1.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.filter = "brightness(1)")
                }
                data-bs-dismiss="modal"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MyOrders;
