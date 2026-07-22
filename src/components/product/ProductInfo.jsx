import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";

const ProductInfo = ({ product }) => {
  return (
    <div className="space-y-8">
      {/* Product Title & Price */}
      <div>
        <h1 className="text-4xl font-bold">{product.title}</h1>

        <p className="mt-3 text-2xl font-semibold">
          ৳{product.price}
        </p>
      </div>

      {/* Size Selector */}
      <SizeSelector sizes={product.sizes} />

      {/* Quantity Selector */}
      <QuantitySelector />

      {/* Add to Cart */}
      <button className="btn btn-primary w-full">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductInfo;