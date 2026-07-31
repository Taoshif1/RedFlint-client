import { FiTrash2 } from "react-icons/fi";

const ShoppingCart = ({ isOpen, onClose, cartItems }) => {
  if (!isOpen) return null;

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

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
            <div className="h-full flex items-center justify-center">
              <p className="text-base-content/60">Your cart is empty.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 border-b border-base-300 pb-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-bold">{item.title}</h3>

                  <p className="text-sm text-base-content/60">
                    Size : {item.size}
                  </p>

                  <p className="text-sm">Qty : {item.quantity}</p>

                  <p className="font-bold text-primary mt-2">৳{item.price}</p>
                </div>

                <button className="btn btn-ghost btn-circle text-error">
                  <FiTrash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}

        <div className="border-t border-base-300 p-5 space-y-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>৳{total}</span>
          </div>

          <button className="btn btn-primary w-full">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
