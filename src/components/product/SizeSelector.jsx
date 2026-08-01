const SizeSelector = ({ sizes, selectedSize, setSelectedSize }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Select Size</h3>

        <button className="text-sm text-primary hover:underline">
          Size Chart
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {sizes.map((item) => (
          <button
            key={item.size}
            disabled={item.stock === 0}
            onClick={() => setSelectedSize(item)}
            className={`btn min-w-14 ${
              selectedSize?.size === item.size ? "btn-primary" : "btn-outline"
            } ${item.stock === 0 ? "btn-disabled opacity-40" : ""}`}
          >
            {item.size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
