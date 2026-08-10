import { FiShoppingCart, FiTrash2 } from "react-icons/fi";

import toast from "react-hot-toast";

import { useNavigate } from "react-router";

import useCart from "../../hooks/useCart";

const ShoppingCart = ({ isOpen, onClose, cartItems }) => {
  const navigate = useNavigate();

  const { updateQuantity, removeItem, clearCart } = useCart();

  if (!isOpen) return null;

  const total = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.offerPrice ?? item.price ?? 0) * Number(item.quantity),
    0,
  );

  const formattedTotal = total.toLocaleString("en-BD");

  const handleQuantity = async (item, quantity) => {
    if (quantity < 1) return;

    try {
      await updateQuantity(item, quantity);
    } catch (error) {
      console.error(error);

      toast.error("Failed to update cart");
    }
  };

  const handleDelete = async (item) => {
    try {
      await removeItem(item);

      toast.success("Removed from cart");
    } catch (error) {
      console.error(error);

      toast.error("Failed to remove item");
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();

      toast.success("Cart cleared");
    } catch (error) {
      console.error(error);

      toast.error("Failed to clear cart");
    }
  };

  return (
    <div className="fixed inset-0 z-[9999]">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="absolute right-0 top-0 h-screen w-full max-w-md bg-base-100 shadow-2xl flex flex-col">
        <div className="border-b border-base-300 px-6 py-5 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>

          <button
            onClick={onClose}
            className="text-4xl hover:text-primary transition"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5">
              <FiShoppingCart size={60} />

              <p>Your cart is empty.</p>

              <button onClick={onClose} className="btn btn-primary">
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
              const itemPrice = Number(item.offerPrice ?? item.price ?? 0);

              return (
                <div
                  key={item._id}
                  className="flex items-center justify-between gap-4 border-b border-base-300 pb-4"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 rounded-xl object-cover"
                    />

                    <div className="flex flex-col gap-1">
                      <h4 className="font-semibold text-base-content line-clamp-1">
                        {item.title}
                      </h4>

                      <div className="flex items-center gap-2 text-sm text-base-content/70">
                        <span>৳{itemPrice.toLocaleString("en-BD")}</span>

                        {item.size && (
                          <>
                            <span className="text-base-content/30">•</span>

                            <span className="badge badge-sm badge-outline">
                              Size: {item.size}
                            </span>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <button
                          className="btn btn-xs"
                          onClick={() =>
                            handleQuantity(item, item.quantity - 1)
                          }
                        >
                          -
                        </button>

                        <span className="font-medium min-w-[20px] text-center">
                          {item.quantity}
                        </span>

                        <button
                          className="btn btn-xs"
                          onClick={() =>
                            handleQuantity(item, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-ghost btn-circle text-error flex-shrink-0"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        <div className="border-t border-base-300 p-5 space-y-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>

            <span>৳{formattedTotal}</span>
          </div>

          <button
            className="btn btn-primary w-full"
            disabled={!cartItems.length}
            onClick={() => {
              onClose();

              navigate("/checkout");
            }}
          >
            Proceed to Checkout
          </button>

          <button
            onClick={handleClearCart}
            disabled={!cartItems.length}
            className="btn btn-outline w-full"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
