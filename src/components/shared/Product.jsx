import React from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { FiHeart } from "react-icons/fi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaHeart } from "react-icons/fa";
import useWishlist from "../../hooks/useWishlist";

const Product = ({ product }) => {
  const {
    _id,
    images,
    title,
    price,
    offerPrice,
    category,
    season,
    isFeatured,
    isSpecial,
    description,
    totalStock,
  } = product;
  const axiosSecure = useAxiosSecure();
  const { wishlist, refetch: refetchWishlist } = useWishlist();

  const isWishlisted = wishlist.some((item) => item.productId === _id);

  // console.log("product= ", product);

  const discount = Math.round(((price - offerPrice) / price) * 100);

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (isWishlisted) {
        const item = wishlist.find((item) => item.productId === _id);

        await axiosSecure.delete(`/wishlist/${item._id}`);

        toast.success("Removed from wishlist");
      } else {
        await axiosSecure.post("/wishlist", {
          productId: _id,
          title,
          image: images[0],
          price: offerPrice,
        });

        toast.success("Added to wishlist ❤️");
      }

      refetchWishlist();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Link to={`/products/${_id}`}>
      <div className="card bg-base-100 w-full max-w-sm shadow-sm border border-base-200 hover:shadow-xl transition-all duration-300 cursor-pointer">
        <figure className="relative overflow-hidden rounded-t-xl">
          <div className="absolute top-4 right-4 z-20 badge badge-error text-white font-semibold">
            -{discount}%
          </div>
          <button
            onClick={handleWishlist}
            className="absolute top-4 left-4 z-50 btn btn-circle btn-sm bg-white text-black border-0 hover:bg-primary hover:text-white"
          >
            {isWishlisted ? (
              <FaHeart size={18} className="text-red-500" />
            ) : (
              <FiHeart size={18} />
            )}
          </button>
          <img
            src={images[0]}
            alt={title}
            className="w-full aspect-25/26 object-cover transition-transform duration-500 hover:scale-130"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title text-base-content">{title}</h2>

          <p className="text-xl font-bold">৳{price}</p>

          <p className="text-sm text-success">{totalStock} pieces available</p>

          <p className="text-sm text-base-content/70">{description}</p>
        </div>

        <div className="flex flex-wrap gap-4 mt-1 px-10">
          <span className="badge badge-outline">{season}</span>

          <span className="badge badge-primary">{category}</span>

          {isFeatured && <span className="badge badge-success">Featured</span>}

          {isSpecial && (
            <span className="badge badge-secondary">Special Edition</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Product;
