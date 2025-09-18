import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useAuth(); // ✅ current logged-in user
  const [wishlist, setWishlist] = useState([]);

  // ✅ Load wishlist from localStorage on login
  useEffect(() => {
    if (!user) {
      setWishlist([]);
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = users.find((u) => u.email === user.email);

    if (currentUser) {
      setWishlist(currentUser.wishlist || []);
    } else {
      setWishlist([]);
    }
  }, [user]);

  // ✅ Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!user) return;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let updatedUsers = users.map((u) => {
      if (u.email === user.email) {
        return { ...u, wishlist }; // ✅ save inside currentUser
      }
      return u;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }, [wishlist, user]);

  // ✅ Toggle product
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
