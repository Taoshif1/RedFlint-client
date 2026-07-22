import React from "react";

const ShoppingCart = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div className="absolute right-0 top-0 h-screen w-full max-w-md bg-white rounded-l-3xl shadow-2xl">
        <div className="border-b px-6 py-5 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">
                    Cart
            </h2>

             <button
               onClick={onClose}
               aria-label="Close cart"
               className="text-4xl leading-none text-gray-500 hover:text-black transition"
             >
               &times;
            </button>
        </div>

        <div className="p-6">
          <p className="text-gray-500">
            Your cart is empty.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 border-t">
          <button className="w-full font-extrabold bg-black text-rose-700 py-3 rounded">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;