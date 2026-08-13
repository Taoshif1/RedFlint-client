import { useCallback, useEffect, useState } from "react";

import { CartContext } from "./CartContext";

import useAuth from "../hooks/useAuth";

import { axiosSecure } from "../hooks/useAxiosSecure";

import {
  getGuestCart,
  addGuestCartItem,
  updateGuestCartItem,
  removeGuestCartItem,
  clearGuestCart,
} from "../utils/guestCart";

const CartProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();

  const [cart, setCart] = useState([]);

  const [loading, setLoading] = useState(true);

  // =====================================
  // Fetch Cart
  // =====================================

  const fetchCart = useCallback(async () => {
    setLoading(true);

    try {
      // Logged-in customer
      if (user?.email) {
        const res = await axiosSecure.get("/cart");
        setCart(res.data);

        return;
      }

      // Guest customer
      setCart(getGuestCart());
    } catch (error) {
      console.error("Fetch cart error:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    if (!authLoading) {
      fetchCart();
    }
  }, [authLoading, fetchCart]);

  // =====================================
  // Add Item
  // =====================================

  const addItem = async (item) => {
    if (user?.email) {
      await axiosSecure.post("/cart", item);
      await fetchCart();

      return;
    }

    const updatedCart = addGuestCartItem(item);

    setCart(updatedCart);
  };

  // =====================================
  // Update Quantity
  // =====================================

  const updateQuantity = async (item, quantity) => {
    if (quantity < 1) return;

    if (user?.email) {
      await axiosSecure.patch(`/cart/${item._id}`, {
        quantity,
      });

      await fetchCart();

      return;
    }

    const updatedCart = updateGuestCartItem(item._id, quantity);

    setCart(updatedCart);
  };

  // =====================================
  // Remove Item
  // =====================================

  const removeItem = async (item) => {
    if (user?.email) {
      await axiosSecure.delete(`/cart/${item._id}`);
      await fetchCart();

      return;
    }

    const updatedCart = removeGuestCartItem(item._id);

    setCart(updatedCart);
  };

  // =====================================
  // Clear Cart
  // =====================================

  const clearCart = async () => {
    if (user?.email) {
      await axiosSecure.delete("/cart");
      setCart([]);

      return;
    }

    clearGuestCart();
    setCart([]);
  };

  const cartInfo = {
    cart,
    loading,
    refetch: fetchCart,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartInfo}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
