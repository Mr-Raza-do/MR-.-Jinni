import './App.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "./src/context/AuthContext";

import Header from './src/components/layout/Header';
import Footer from './src/components/layout/Footer';
import Home from './src/pages/Home';
import NotFound from './src/pages/NotFound';
import Catalog from './src/pages/Catalog';
import CartPage from "./src/pages/CartPage";
import { CartProvider } from "./src/context/CartContext";
import Checkout from "./src/pages/Checkout";
import OrderConfirmation from "./src/pages/OrderConfirmation";
import MyOrders from "./src/pages/MyOrders";
import Sidebar from './src/components/Navbar';
import Signup from "./src/pages/Signup";
import Login from "./src/pages/Login";
import Contact from "./src/pages/Contact";
import Privacy from "./src/pages/Privacy";
import About from "./src/pages/About"; 




// ✅ Wishlist import
import { WishlistProvider } from "./src/context/WishlistContext";
import Wishlist from "./src/pages/Wishlist";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <CartProvider>
      <AuthProvider>
        <WishlistProvider> {/* ✅ Wrap with WishlistProvider */}
          <BrowserRouter>
            <Header onSearch={setSearchQuery} />

            <div className="d-flex" style={{ minHeight: "calc(100vh - 120px)" }}>
              <Sidebar />
              <div className="flex-grow-1 p-4">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/catalog/*"
                    element={<Catalog searchQuery={searchQuery} />}
                  />

                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />
                  <Route path="/my-orders" element={<MyOrders />} />
                  <Route path="/wishlist" element={<Wishlist />} /> {/* ✅ New route */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/about" element={<About />} /> 

                </Routes>
              </div>
            </div>

            <Footer />
          </BrowserRouter>
        </WishlistProvider>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
