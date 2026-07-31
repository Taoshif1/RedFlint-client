import { useState } from "react";

const QuantitySelector = ({ quantity, setQuantity }) => {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg">Quantity</h3>

      <div className="flex items-center gap-4">
        <button
          className="btn btn-outline"
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
        >
          −
        </button>

        <span className="text-xl font-semibold w-8 text-center">
          {quantity}
        </span>

        <button
          className="btn btn-outline"
          onClick={() => setQuantity((prev) => prev + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
