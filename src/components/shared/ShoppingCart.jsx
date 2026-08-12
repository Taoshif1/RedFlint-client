import { useEffect } from "react";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";

import toast from "react-hot-toast";

import { useNavigate } from "react-router";

import useCart from "../../hooks/useCart";

const ShoppingCart = ({ isOpen, onClose, cartItems }) => {
  const navigate = useNavigate();

  const { updateQuantity, removeItem, clearCart } = useCart();

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

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
      <button
        type="button"
        aria-label="Close shopping cart"
        className="absolute inset-0 cursor-default bg-black/60"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="shopping-cart-title"
        className="absolute right-0 top-0 flex h-dvh w-full max-w-md flex-col overscroll-contain bg-base-100 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-base-300 px-4 py-4 sm:px-6 sm:py-5">
          <h2 id="shopping-cart-title" className="text-xl font-bold sm:text-2xl">
            Shopping Cart
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="btn btn-ghost btn-circle min-h-11 min-w-11 text-3xl transition hover:text-primary"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto overscroll-contain p-4 sm:space-y-5 sm:p-5">
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
                  className="flex min-w-0 items-center gap-3 border-b border-base-300 pb-4 sm:gap-4"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="h-20 w-20 shrink-0 rounded-xl object-cover sm:h-24 sm:w-24"
                    />

                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <h4 className="font-semibold text-base-content line-clamp-1">
                        {item.title}
                      </h4>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-base-content/70 sm:text-sm">
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
                          type="button"
                          aria-label={`Decrease ${item.title} quantity`}
                          className="btn btn-sm min-h-9 min-w-9"
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
                          type="button"
                          aria-label={`Increase ${item.title} quantity`}
                          className="btn btn-sm min-h-9 min-w-9"
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
                    type="button"
                    onClick={() => handleDelete(item)}
                    aria-label={`Remove ${item.title} from cart`}
                    className="btn btn-ghost btn-circle min-h-11 min-w-11 shrink-0 text-error"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        <div className="safe-area-bottom space-y-3 border-t border-base-300 p-4 sm:space-y-4 sm:p-5">
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
