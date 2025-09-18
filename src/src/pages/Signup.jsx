import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find((u) => u.email === form.email);
    if (exists) {
      setError("Email already registered. Please login instead.");
      return;
    }

    const newUser = {
      name: form.name,
      email: form.email,
      password: form.password,
      orders: [],
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    login(newUser);
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f4f8",
        padding: "2rem 1rem",
      }}
    >
      <div
        className="p-5"
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "linear-gradient(90deg, #0d47a1, #1976d2)",
          borderRadius: "25px",
          boxShadow: "0 12px 25px rgba(0,0,0,0.3)",
          color: "white",
          animation: "floatCard 4s ease-in-out infinite",
          textAlign: "center",
        }}
      >
        <style>
          {`
            @keyframes floatCard {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-6px); }
            }
          `}
        </style>

        <h2
          className="mb-4"
          style={{ fontWeight: "700", letterSpacing: "1px" }}
        >
          Sign - up
        </h2>

        {error && (
          <div
            className="alert alert-danger"
            style={{
              backgroundColor: "#ff4d6d",
              border: "none",
              color: "white",
              textAlign: "center",
              padding: "0.75rem",
              marginBottom: "1rem",
              borderRadius: "10px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="form-control mb-3"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            style={{
              borderRadius: "25px",
              padding: "0.8rem 1rem",
              border: "1px solid rgba(255,255,255,0.5)",
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "white",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
              transition: "all 0.3s",
            }}
          />

          <input
            type="email"
            placeholder="Email"
            className="form-control mb-3"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            style={{
              borderRadius: "25px",
              padding: "0.8rem 1rem",
              border: "1px solid rgba(255,255,255,0.5)",
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "white",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
              transition: "all 0.3s",
            }}
          />

          <div className="input-group mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="form-control"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              style={{
                borderRadius: "25px 0 0 25px",
                padding: "0.8rem 1rem",
                border: "1px solid rgba(255,255,255,0.5)",
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "white",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
                transition: "all 0.3s",
              }}
            />
            <button
              type="button"
              className="btn"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                borderRadius: "0 25px 25px 0",
                border: "1px solid rgba(255,255,255,0.5)",
                backgroundColor: "rgba(0,0,0,0.2)",
                color: "white",
                fontWeight: "600",
                transition: "0.3s",
                padding: "0.8rem 1rem",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.35)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.2)")
              }
            >
              {showPassword ? "🙈 Hide" : "👁️ Show"}
            </button>
          </div>

          <button
            type="submit"
            className="btn w-100 mb-3"
            style={{
              background: "linear-gradient(90deg, #0d47a1, #1976d2)",
              color: "white",
              borderRadius: "25px",
              padding: "0.75rem",
              fontWeight: "700",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              transition: "all 0.3s",
            }}
            onMouseOver={(e) =>
              Object.assign(e.currentTarget.style, {
                transform: "scale(1.03)",
                boxShadow: "0 6px 15px rgba(0,0,0,0.35)",
              })
            }
            onMouseOut={(e) =>
              Object.assign(e.currentTarget.style, {
                transform: "scale(1)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              })
            }
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
