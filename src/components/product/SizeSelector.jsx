import { useState } from "react";

const SizeSelector = ({ sizes }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">
          Select Size
        </h3>

        <button className="text-sm text-primary hover:underline">
          Size Chart
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`btn min-w-14 ${
              selectedSize === size
                ? "btn-primary"
                : "btn-outline"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;