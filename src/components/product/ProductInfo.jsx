import { useState } from "react";
import toast from "react-hot-toast";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";

const ProductInfo = ({ product }) => {
  const axiosSecure = useAxiosSecure();

  const { refetch } = useCart();

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      await axiosSecure.post("/cart", {
        productId: product._id,
        title: product.title,
        image: product.images[0],
        price: product.price,
        size: selectedSize,
        quantity,
      });

      await refetch();

      toast.success("Added to cart");
    } catch (err) {
      console.error(err);

      toast.error("Failed to add product");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">{product.title}</h1>

        <p className="mt-3 text-2xl font-semibold">৳{product.price}</p>
      </div>

      <SizeSelector
        sizes={product.sizes}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />

      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

      <button onClick={handleAddToCart} className="btn btn-primary w-full">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductInfo;
