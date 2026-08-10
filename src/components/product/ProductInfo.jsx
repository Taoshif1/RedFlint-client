import { useState } from "react";

import toast from "react-hot-toast";

import { FiHeart } from "react-icons/fi";

import { FaHeart } from "react-icons/fa";

import { useNavigate } from "react-router";

import useAxiosSecure from "../../hooks/useAxiosSecure";

import useCart from "../../hooks/useCart";

import useWishlist from "../../hooks/useWishlist";

import useAuth from "../../hooks/useAuth";

import SizeSelector from "./SizeSelector";

import QuantitySelector from "./QuantitySelector";

const ProductInfo = ({ product }) => {
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();

  const { user } = useAuth();

  const { addItem } = useCart();

  const { wishlist, refetch: refetchWishlist } = useWishlist();

  const wishlistItem = wishlist.find((item) => item.productId === product._id);

  const isWishlisted = !!wishlistItem;

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");

  const [quantity, setQuantity] = useState(1);

  // =====================================
  // Prepare selected product
  // =====================================

  const createSelectedItem = () => {
    return {
      productId: product._id,

      title: product.title,

      image: product.images?.[0] || "",

      price: product.price,

      offerPrice: product.offerPrice,

      size: selectedSize?.size || "",

      quantity,
    };
  };

  // =====================================
  // Validation
  // =====================================

  const validateSelection = () => {
    if (product.sizes?.length > 0 && !selectedSize?.size) {
      toast.error("Please select a size");

      return false;
    }

    if (selectedSize?.stock === 0) {
      toast.error("This size is out of stock");

      return false;
    }

    if (selectedSize?.stock && quantity > selectedSize.stock) {
      toast.error(`Only ${selectedSize.stock} pieces available`);

      return false;
    }

    return true;
  };

  // =====================================
  // Add To Cart
  // =====================================

  const handleAddToCart = async () => {
    if (!validateSelection()) return;

    try {
      const item = createSelectedItem();

      await addItem(item);

      toast.success("Added to cart");
    } catch (error) {
      console.error(error);

      toast.error("Failed to add product");
    }
  };

  // =====================================
  // Buy Now
  // =====================================

  const handleBuyNow = () => {
    if (!validateSelection()) return;

    const item = createSelectedItem();

    navigate("/checkout", {
      state: {
        buyNowItem: item,
      },
    });
  };

  // =====================================
  // Wishlist
  // =====================================

  const handleWishlist = async () => {
    if (!user) {
      toast.error("Please login to use wishlist");

      return;
    }

    try {
      if (isWishlisted) {
        await axiosSecure.delete(`/wishlist/${wishlistItem._id}`);

        toast.success("Removed from wishlist");
      } else {
        await axiosSecure.post("/wishlist", {
          productId: product._id,

          title: product.title,

          image: product.images?.[0] || "",

          price: product.offerPrice ?? product.price,
        });

        toast.success("Added to wishlist");
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
            ৳{product.offerPrice ?? product.price}
          </p>

          {product.offerPrice && (
            <p className="line-through text-base-content/50">
              ৳{product.price}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <span className="badge badge-outline">{product.season}</span>

          <span className="badge badge-primary">{product.category}</span>

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
        {selectedSize?.stock ?? 0} pieces available
      </p>

      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

      {/* =============================== */}
      {/* Purchase Buttons */}
      {/* =============================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          disabled={selectedSize?.stock === 0}
          onClick={handleAddToCart}
          className="btn btn-outline btn-primary w-full"
        >
          Add to Cart
        </button>

        <button
          disabled={selectedSize?.stock === 0}
          onClick={handleBuyNow}
          className="btn btn-primary w-full text-white"
        >
          Buy Now
        </button>
      </div>

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
