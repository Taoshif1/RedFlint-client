import { Link } from "react-router";
import toast from "react-hot-toast";

import useWishlist from "../../../hooks/useWishlist";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Wishlist = () => {
  const { wishlist, loading, refetch } = useWishlist();
  const axiosSecure = useAxiosSecure();

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  const handleRemove = async (id) => {
    try {
      await axiosSecure.delete(`/wishlist/${id}`);
      await refetch();
      toast.success("Removed from wishlist");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove wishlist item");
    }
  };

  return (
    <section className="bg-base-200 rounded-box border border-base-300 shadow-md">
      <div className="p-6 border-b border-base-300 flex justify-between items-center">
        <h2 className="text-2xl font-bold red-hat">Wishlist</h2>
        <span className="badge badge-primary">{wishlist.length}</span>
      </div>

      {wishlist.length === 0 ? (
        <div className="p-10 text-center text-base-content/60">
          Your wishlist is empty.
        </div>
      ) : (
        <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((item) => (
            <div key={item._id} className="card bg-base-100 border border-base-300 hover:shadow-xl transition-all duration-300">
              <figure className="h-60 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
              </figure>

              <div className="card-body">
                <h3 className="card-title">{item.title}</h3>
                <p className="text-primary font-bold">৳{item.price}</p>

                <div className="card-actions justify-end mt-2">
                  <Link to={`/products/${item.productId}`} className="btn btn-primary btn-sm">
                    View Product
                  </Link>

                  <button onClick={() => handleRemove(item._id)} className="btn btn-outline btn-error btn-sm">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Wishlist;
