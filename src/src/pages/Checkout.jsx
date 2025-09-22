import React, { useState, useRef } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart, clearCart, increaseQty, decreaseQty } = useCart();
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    payment: "cod",
  });

  const emailRef = useRef(null);
  const addressRef = useRef(null);
  const buttonRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert("⚠ Please login first!");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const totalAmount = cart.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );

    const newOrder = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      address: formData.address,
      payment: formData.payment,
      total: totalAmount,
      items: cart,
      date: new Date().toLocaleString(),
    };

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUser = {
      ...user,
      orders: [...(user.orders || []), newOrder],
    };

    users = users.map((u) => (u.email === user.email ? updatedUser : u));
    localStorage.setItem("users", JSON.stringify(users));

    login(updatedUser); // ✅ AuthContext update
    clearCart();        // ✅ Empty cart
    setFormData({       // ✅ Reset form
      name: updatedUser.name,
      email: updatedUser.email,
      address: "",
      payment: "cod",
    });

    navigate("/order-confirmation", { state: newOrder });
  };

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextRef?.current) {
        nextRef.current.focus();
      }
    }
  };

  return (
    <main
      className="container my-5 p-4 rounded"
      style={{
        background: "linear-gradient(180deg, #f0f4ff, #dbe5fa)",
        minHeight: "100vh",
      }}
    >
      <h1 className="text-center mb-4">Checkout</h1>

      <div className="row g-4 justify-content-center">
        {/* ✅ Checkout Form */}
        <div className="col-md-6">
          <form className="card p-4 shadow border-0" onSubmit={handleSubmit}>
            <h4 className="mb-3">Billing & Shipping</h4>

            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, emailRef)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, addressRef)}
                ref={emailRef}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Shipping Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                placeholder="123 Street, City"
                value={formData.address}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, buttonRef)}
                ref={addressRef}
                required
              />
            </div>

            {/* ✅ Payment */}
            <div className="mb-3">
              <label className="form-label d-block">Payment Method</label>
              <span className="badge bg-success fs-6 p-2">
                Cash on Delivery
              </span>
            </div>

            <button
              ref={buttonRef}
              type="submit"
              className="btn btn-primary w-100 mt-3"
            >
              Place Order →
            </button>

            <div className="alert alert-warning text-center mt-3 p-2 small">
              💡 Note: Payment will be collected in cash upon delivery.
            </div>
          </form>
        </div>

        {/* ✅ Order Summary */}
        <div className="col-md-4">
          <div className="card shadow border-0 sticky-top" style={{ top: "100px" }}>
            <div className="card-body">
              <h4 className="card-title mb-3">Order Summary</h4>

              {cart.length === 0 ? (
                <p className="text-muted">No items in cart.</p>
              ) : (
                <>
                  <ul className="list-group mb-3">
                    {cart.map((item) => (
                      <li
                        key={item.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <span>{item.name}</span>
                        <div className="d-flex align-items-center gap-2">
                          <button
                            onClick={() => decreaseQty(item.id)}
                            className="btn btn-sm btn-outline-danger rounded-circle"
                          >
                            <i className="bi bi-dash-lg"></i>
                          </button>
                          <strong>{item.qty}</strong>
                          <button
                            onClick={() => increaseQty(item.id)}
                            className="btn btn-sm btn-outline-success rounded-circle"
                          >
                            <i className="bi bi-plus-lg"></i>
                          </button>
                        </div>
                        <strong>Rs. {item.price * item.qty}</strong>
                      </li>
                    ))}
                  </ul>
                  <h5 className="d-flex justify-content-between">
                    <span>Total:</span>
                    <span>Rs. {totalAmount}</span>
                  </h5>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
