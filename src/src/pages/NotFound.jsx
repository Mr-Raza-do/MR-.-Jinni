import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 text-center"
      style={{
        background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
      }}
    >
      <div
        className="p-5 rounded-4 shadow-lg bg-white"
        style={{ maxWidth: "600px" }}
      >
        <h1
          className="display-1 fw-bold mb-3"
          style={{
            background: "linear-gradient(90deg, #d32f2f, #f44336)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </h1>
        <p className="lead mb-2">
          😢 Oops! The page you are looking for doesn’t exist.
        </p>
        <p className="text-muted mb-4">
          It might have been moved or deleted. Don’t worry, you can still
          explore!
        </p>

        <div className="d-flex gap-3 justify-content-center">
          <Link
            to="/"
            className="btn btn-lg fw-bold"
            style={{
              background: "linear-gradient(45deg, #0d47a1, #1976d2)",
              color: "white",
              borderRadius: "30px",
              padding: "12px 30px",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            ⬅ Go Back Home
          </Link>
          <Link
            to="/catalog"
            className="btn btn-outline-success btn-lg fw-bold"
            style={{ borderRadius: "30px", padding: "12px 30px" }}
          >
            🛒 Visit Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
