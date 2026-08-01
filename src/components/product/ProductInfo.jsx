import { useState } from "react";
import toast from "react-hot-toast";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";

import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";

const ProductInfo = ({ product }) => {
  const axiosSecure = useAxiosSecure();

  const { wishlist, refetch: refetchWishlist } = useWishlist();

  const { refetch } = useCart();

  const wishlistItem = wishlist.find((item) => item.productId === product._id);

  const isWishlisted = !!wishlistItem;

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      await axiosSecure.post("/cart", {
        productId: product._id,
        title: product.title,
        image: product.images[0],
        price: product.price,
        offerPrice: product.offerPrice,
        size: selectedSize.size,
        quantity,
      });

      await refetch();

      toast.success("Added to cart");
    } catch (err) {
      console.error(err);

      toast.error("Failed to add product");
    }
  };

  const handleWishlist = async () => {
    try {
      if (isWishlisted) {
        await axiosSecure.delete(`/wishlist/${wishlistItem._id}`);

        toast.success("Removed from wishlist");
      } else {
        await axiosSecure.post("/wishlist", {
          productId: product._id,
          title: product.title,
          image: product.images[0],
          price: product.offerPrice,
        });

        toast.success("Added to wishlist ❤️");
      }

      await refetchWishlist();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">{product.title}</h1>

        <div className="flex items-center gap-4 mt-3">
          <p className="text-3xl font-bold text-primary">
            ৳{product.offerPrice}
          </p>

          <p className="line-through text-base-content/50">৳{product.price}</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <span className="badge badge-outline">{product.season}</span>

          <span className="badge badge-primary">{product.category}</span>

          {product.isFeatured && (
            <span className="badge badge-success">Featured</span>
          )}

          {product.isSpecial && (
            <span className="badge badge-secondary">Special Edition</span>
          )}
        </div>
      </div>

      <SizeSelector
        sizes={product.sizes}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />

      <p className="text-success font-semibold">
        {selectedSize?.stock} pieces available
      </p>

      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

      <button
        disabled={selectedSize?.stock === 0}
        onClick={handleAddToCart}
        className="btn btn-primary w-full"
      >
        Add to Cart
      </button>

      <button
        onClick={handleWishlist}
        className={`btn w-full ${isWishlisted ? "btn-error" : "btn-outline"}`}
      >
        {isWishlisted ? (
          <>
            <FaHeart />
            Remove from Wishlist
          </>
        ) : (
          <>
            <FiHeart />
            Add to Wishlist
          </>
        )}
      </button>
    </div>
  );
};

export default ProductInfo;
