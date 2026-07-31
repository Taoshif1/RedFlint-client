import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import useAuth from "../hooks/useAuth";
import { axiosSecure } from "../hooks/useAxiosSecure";

const CartProvider = ({ children }) => {
  const { user } = useAuth();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCart = async () => {
    if (!user?.email) {
      setCart([]);
      setLoading(false);
      return;
    }

    try {
      const res = await axiosSecure.get("/cart");
      setCart(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const cartInfo = {
    cart,
    loading,
    refetch: fetchCart,
  };
  return (
    <CartContext.Provider value={cartInfo}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
