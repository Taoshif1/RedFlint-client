import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import useWishlist from "../../hooks/useWishlist";
import useAuth from "../../hooks/useAuth";

const Product = ({ product }) => {
  const {
    _id,
    images = [],
    title,
    price,
    offerPrice,
    category,
    season,
    isSpecial,
  } = product;

  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  const { wishlist = [], refetch: refetchWishlist } = useWishlist();

  const wishlistItem = wishlist.find((item) => item.productId === _id);

  const isWishlisted = Boolean(wishlistItem);

  const currentPrice = offerPrice ?? price;

  const hasDiscount = Number(price) > 0 && Number(currentPrice) < Number(price);

  const discountPercentage = hasDiscount
    ? Math.round(((Number(price) - Number(currentPrice)) / Number(price)) * 100)
    : 0;

  // =====================================
  // Open Product Details
  // =====================================

  const handleCardClick = () => {
    navigate(`/products/${_id}`);
  };

  const handleCardKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      navigate(`/products/${_id}`);
    }
  };

  // =====================================
  // Wishlist
  // =====================================

  const handleWishlist = async (event) => {
    event.preventDefault();

    event.stopPropagation();

    // Guests cannot use wishlist
    if (!user) {
      toast.error("Please login to add products to wishlist");

      return;
    }

    try {
      if (isWishlisted) {
        await axiosSecure.delete(`/wishlist/${wishlistItem._id}`);

        toast.success("Removed from wishlist");
      } else {
        await axiosSecure.post("/wishlist", {
          productId: _id,

          title,

          image: images[0] || "",

          price: currentPrice,
        });

        toast.success("Added to wishlist");
      }

      await refetchWishlist();
    } catch (error) {
      console.error("Wishlist error:", error);

      toast.error("Failed to update wishlist");
    }
  };

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      className="card bg-base-300 border border-base-content/10 shadow-md hover:shadow-xl transition-shadow duration-300 h-full overflow-hidden cursor-pointer"
    >
      {/* Product Image */}

      <figure className="relative h-44 sm:h-56 lg:h-90 bg-base-200">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />

        {/* Discount */}

        {hasDiscount && (
          <span className="absolute top-2 right-2 badge badge-error badge-sm text-white font-semibold">
            -{discountPercentage}%
          </span>
        )}

        {/* Wishlist Button */}

        <button
          type="button"
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2 left-2 btn btn-circle btn-xs sm:btn-sm bg-white text-black border-0 hover:bg-primary hover:text-white"
        >
          {isWishlisted ? (
            <FaHeart className="text-red-500" size={15} />
          ) : (
            <FiHeart size={15} />
          )}
        </button>
      </figure>

      {/* Product Information */}

      <div className="card-body p-3 sm:p-4 gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <h2 className="font-bold text-sm sm:text-lg line-clamp-1 hover:text-primary transition">
            {title}
          </h2>

          {season && (
            <span className="badge badge-outline badge-xs text-[9px]">
              {season}
            </span>
          )}

          {category && (
            <span className="badge badge-primary badge-xs text-[9px]">
              {category}
            </span>
          )}

          {isSpecial && (
            <span className="badge badge-secondary badge-xs text-[9px]">
              Special
            </span>
          )}
        </div>

        {/* Price */}

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-base sm:text-xl font-bold text-primary">
            ৳{currentPrice}
          </span>

          {hasDiscount && (
            <span className="text-xs sm:text-sm line-through text-base-content/50">
              ৳{price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
