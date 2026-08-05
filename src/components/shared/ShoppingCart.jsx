import { FiShoppingCart, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const ShoppingCart = ({ isOpen, onClose, cartItems, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Switched from item.price to offerPrice (with fallback to price)
  const total = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.offerPrice ?? item.price ?? 0) * Number(item.quantity),
    0,
  );

  const formattedTotal = total.toLocaleString("en-BD");

  const updateQuantity = async (item, quantity) => {
    if (quantity < 1) return;

    try {
      await axiosSecure.patch(`/cart/${item._id}`, {
        quantity,
      });

      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/cart/${id}`);

      toast.success("Removed from cart");

      refetch();
    } catch (err) {
      console.error(err);

      toast.error("Failed to remove item");
    }
  };

  const handleClearCart = async () => {
    try {
      await axiosSecure.delete("/cart");

      toast.success("Cart cleared");

      refetch();
    } catch (err) {
      console.error(err);

      toast.error("Failed");
    }
  };

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-screen w-full max-w-md bg-base-100 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="border-b border-base-300 px-6 py-5 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>

          <button
            onClick={onClose}
            className="text-4xl hover:text-primary transition"
          >
            &times;
          </button>
        </div>

        {/* Cart Items */}
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
                  {/* Left side: Image and details */}
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

                      {/* Size and Price Row */}
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

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          className="btn btn-xs"
                          onClick={() =>
                            updateQuantity(item, item.quantity - 1)
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
                            updateQuantity(item, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right side: Delete Button */}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost btn-circle text-error flex-shrink-0"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
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
