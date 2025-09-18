import { Link } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";
import { useState } from "react";

export default function Home() {
  const [hoverIndex, setHoverIndex] = useState(null);

  const featured = [
    { id: 101, name: "Smartphone", price: 25000, image: "/images/mobile.jpeg" },
    { id: 102, name: "Wireless Earbuds", price: 3500, image: "/images/earpod.jpeg" },
    { id: 103, name: "Backpack", price: 1500, image: "/images/bag.jpeg" },
    { id: 104, name: "Sneakers", price: 3000, image: "/images/sneakers.jpeg" },
    { id: 105, name: "Smart Watch", price: 7500, image: "/images/watch.jpeg" },
    { id: 106, name: "Headphones", price: 2000, image: "/images/headphones.jpeg" }
  ];

  // Customer testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      rating: 5,
      comment: "The smartphone I bought exceeded my expectations! The delivery was super fast and the product quality is outstanding.",
      image: "/images/customer1.jpg"
    },
    {
      id: 2,
      name: "Priya Patel",
      rating: 4,
      comment: "Great shopping experience! The wireless earbuds are amazing with crystal clear sound quality. Will definitely shop again.",
      image: "/images/customer2.jpg"
    },
    {
      id: 3,
      name: "Amit Kumar",
      rating: 5,
      comment: "This is my go-to store for all electronics. Their customer service is exceptional and products are always genuine.",
      image: "/images/customer3.jpg"
    },
    {
      id: 4,
      name: "Neha Singh",
      rating: 5,
      comment: "The deals section has amazing offers! I got my smartwatch at a 30% discount. Highly recommended!",
      image: "/images/customer4.jpg"
    }
  ];

  return (
    <main style={{ background: "#f5f7fb", minHeight: "100vh" }}>
      {/* ✅ Hero Slider */}
      <div
        id="homeCarousel"
        className="carousel slide mb-5"
        data-bs-ride="carousel"
        data-bs-interval="4000"
        style={{
          height: "90vh",
          maxHeight: "90vh",
          overflow: "hidden",
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)"
        }}
      >
        <div className="carousel-indicators">
          {[0, 1, 2, 3, 4].map((i) => (
            <button
              key={i}
              type="button"
              data-bs-target="#homeCarousel"
              data-bs-slide-to={i}
              className={i === 0 ? "active" : ""}
            ></button>
          ))}
        </div>

        <div className="carousel-inner h-100">
          {[
            "/images/Fossil Gen 6.jpeg",
            "/images/Seiko 5 Sports.jpeg",
            "/images/Tag Heuer Carrera.jpeg",
            "/images/Citizen Eco-Drive.jpeg",
            "/images/Omega Speedmaster.jpeg",
          ].map((img, idx) => (
            <div
              key={idx}
              className={`carousel-item h-100 position-relative ${idx === 0 ? "active" : ""}`}
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {/* ✅ responsive image */}
              <img
                src={img}
                alt="slide"
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "90vh",
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
              />

              {/* ✅ responsive button */}
              <div className="position-absolute top-50 end-0 translate-middle-y pe-3 pe-md-5">
                <Link
                  to="/shop"
                  className="btn btn-lg d-flex align-items-center gap-2"
                  style={{
                    background: "linear-gradient(45deg, #0d47a1, #1976d2)",
                    color: "white",
                    padding: "10px 25px",
                    borderRadius: "50px",
                    fontWeight: "600",
                    fontSize: "clamp(14px, 2vw, 18px)", // responsive font size
                    boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
                    letterSpacing: "1px",
                    transition: "all 0.4s ease",
                    opacity: hoverIndex === idx ? 1 : 0,
                    transform: hoverIndex === idx ? "translateX(0)" : "translateX(-40px)",
                    pointerEvents: hoverIndex === idx ? "auto" : "none",
                  }}
                >
                  Shop Now <i className="bi bi-arrow-right-circle-fill fs-5"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
         
      {/* ✅ Featured Products */}
      <section className="mb-5 px-3 px-md-5">
        <h2
          className="mb-4 text-center text-md-start fw-bold"
          style={{
            color: "#2c3e50",
            fontSize: "clamp(20px, 3vw, 28px)" // responsive title
          }}
        >
          Featured Products
        </h2>
        <div className="row g-4">
          {featured.map((p) => (
            <div key={p.id} className="col-12 col-sm-6 col-lg-4">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Customer Testimonials Section */}
      <section className="mb-5 px-3 px-md-5">
        <h2
          className="mb-4 text-center fw-bold"
          style={{
            color: "#2c3e50",
            fontSize: "clamp(20px, 3vw, 28px)"
          }}
        >
          What Our Customers Say
        </h2>
        <div className="row g-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="col-12 col-md-6 col-lg-3">
              <div 
                className="card h-100 border-0 shadow-sm p-3"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body d-flex flex-column">
                  {/* Rating */}
                  <div className="mb-3">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`bi bi-star${i < testimonial.rating ? "-fill" : ""} text-warning me-1`}
                      ></i>
                    ))}
                  </div>
                  
                  {/* Comment */}
                  <p className="card-text flex-grow-1 fst-italic text-muted">
                    "{testimonial.comment}"
                  </p>
                  
                  {/* Customer Info */}
                  <div className="d-flex align-items-center mt-3">
                    <div 
                      className="rounded-circle bg-secondary d-flex align-items-center justify-content-center me-3"
                      style={{ width: "50px", height: "50px", overflow: "hidden" }}
                    >
                      <i className="bi bi-person-fill text-white fs-4"></i>
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold">{testimonial.name}</h6>
                      <small className="text-muted">Verified Customer</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Deals of the Day */}
      <section className="mb-5 px-3 px-md-5 text-center">
        <div
          className="p-4 p-md-5 rounded-4 shadow-lg"
          style={{
            background: "linear-gradient(135deg, #1e88e5, #42a5f5)",
            color: "white",
          }}
        >
          <h2
            className="fw-bold mb-3"
            style={{ fontSize: "clamp(22px, 3vw, 32px)" }}
          >
            🔥 Deals of the Day
          </h2>
          <p className="fs-6 fs-md-5">
            Hurry up! Limited time offers are waiting for you ⏳
          </p>
          <Link
            to="/deals"
            className="btn btn-light btn-lg px-4 fw-bold"
            style={{ borderRadius: "30px", fontSize: "clamp(14px, 2vw, 18px)" }}
          >
            View Deals
          </Link>
        </div>
      </section>
    </main>
  );
}