import { useMemo, useState } from "react";
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

  const normalizedSizes = useMemo(() => {
    if (!Array.isArray(product.sizes)) return [];

    return product.sizes
      .map((item) => {
        if (typeof item === "string") {
          return {
            size: item,
            stock: Math.max(0, Number(product.totalStock) || 0),
          };
        }

        if (item && typeof item === "object" && item.size) {
          return {
            size: item.size,
            stock: Math.max(0, Number(item.stock) || 0),
          };
        }

        return null;
      })
      .filter(Boolean);
  }, [product.sizes, product.totalStock]);

  const wishlistItem = wishlist.find((item) => item.productId === product._id);
  const isWishlisted = Boolean(wishlistItem);

  const [selectedSizeName, setSelectedSizeName] = useState(
    normalizedSizes[0]?.size || "",
  );
  const [quantity, setQuantity] = useState(1);
  const selectedSize =
    normalizedSizes.find((item) => item.size === selectedSizeName) ||
    normalizedSizes[0] ||
    null;

  const createSelectedItem = () => ({
    productId: product._id,
    title: product.title,
    image: product.images?.[0] || "",
    price: product.price,
    offerPrice: product.offerPrice,
    size: selectedSize?.size || "",
    quantity,
  });

  const validateSelection = () => {
    if (normalizedSizes.length > 0 && !selectedSize?.size) {
      toast.error("Please select a size");
      return false;
    }

    if (normalizedSizes.length > 0 && selectedSize?.stock <= 0) {
      toast.error("This size is out of stock");
      return false;
    }

    if (
      normalizedSizes.length > 0 &&
      Number.isFinite(Number(selectedSize?.stock)) &&
      quantity > Number(selectedSize.stock)
    ) {
      toast.error(`Only ${selectedSize.stock} pieces available`);
      return false;
    }

    return true;
  };

  const handleAddToCart = async () => {
    if (!validateSelection()) return;

    try {
      await addItem(createSelectedItem());
      toast.success("Added to cart");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add product");
    }
  };

  const handleBuyNow = () => {
    if (!validateSelection()) return;

    navigate("/checkout", {
      state: {
        buyNowItem: createSelectedItem(),
      },
    });
  };

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
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const outOfStock = normalizedSizes.length
    ? normalizedSizes.every((item) => item.stock <= 0)
    : Number(product.totalStock) <= 0;

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
          {product.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-3 sm:gap-4">
          <p className="text-2xl font-bold text-primary sm:text-3xl">
            ৳{product.offerPrice ?? product.price}
          </p>

          {product.offerPrice !== undefined && product.offerPrice !== null && (
            <p className="line-through text-base-content/50">৳{product.price}</p>
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

      {normalizedSizes.length > 0 && (
        <>
          <SizeSelector
            sizes={normalizedSizes}
            selectedSize={selectedSize}
            setSelectedSize={(size) => {
              setSelectedSizeName(size.size);
              setQuantity(1);
            }}
          />

          <p className={selectedSize?.stock > 0 ? "text-success font-semibold" : "text-error font-semibold"}>
            {selectedSize?.stock ?? 0} pieces available
          </p>
        </>
      )}

      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

      <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
        <button disabled={outOfStock} onClick={handleAddToCart} className="btn btn-outline btn-primary min-h-12 w-full">
          {outOfStock ? "Out of Stock" : "Add to Cart"}
        </button>

        <button disabled={outOfStock} onClick={handleBuyNow} className="btn btn-primary min-h-12 w-full text-white">
          {outOfStock ? "Out of Stock" : "Buy Now"}
        </button>
      </div>

      <button onClick={handleWishlist} className={`btn min-h-12 w-full ${isWishlisted ? "btn-error" : "btn-outline"}`}>
        {isWishlisted ? (
          <><FaHeart /> Remove from Wishlist</>
        ) : (
          <><FiHeart /> Add to Wishlist</>
        )}
      </button>
    </div>
  );
};

export default ProductInfo;
