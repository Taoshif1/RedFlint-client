import { useCallback, useEffect, useMemo, useState } from "react";

import { FaCheckCircle, FaStar, FaTrash } from "react-icons/fa";

import toast from "react-hot-toast";

import useAxiosSecure from "../../../hooks/useAxiosSecure";

const statusClasses = {
  pending: "badge-warning",

  approved: "badge-success",

  rejected: "badge-error",
};

const AdminReviews = () => {
  const axiosSecure = useAxiosSecure();

  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  const [updatingId, setUpdatingId] = useState(null);

  // =====================================
  // Fetch Reviews
  // =====================================

  const fetchReviews = useCallback(async () => {
    setLoading(true);

    try {
      const res = await axiosSecure.get("/reviews/admin/all");

      setReviews(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Admin reviews error:", error);

      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }, [axiosSecure]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // =====================================
  // Filtering
  // =====================================

  const filteredReviews = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return reviews.filter((review) => {
      const matchesStatus = filter === "all" || review.status === filter;

      const matchesSearch =
        !keyword ||
        (review.customerName || "").toLowerCase().includes(keyword) ||
        (review.productTitle || "").toLowerCase().includes(keyword) ||
        (review.orderNumber || "").toLowerCase().includes(keyword);

      return matchesStatus && matchesSearch;
    });
  }, [reviews, search, filter]);

  // =====================================
  // Update Status
  // =====================================

  const handleStatus = async (id, status) => {
    setUpdatingId(id);

    try {
      await axiosSecure.patch(`/reviews/admin/${id}/status`, {
        status,
      });

      toast.success(`Review ${status}`);

      await fetchReviews();
    } catch (error) {
      console.error(error);

      toast.error("Failed to update review");
    } finally {
      setUpdatingId(null);
    }
  };

  // =====================================
  // Delete Review
  // =====================================

  const handleDelete = async (review) => {
    const confirmed = window.confirm(
      `Delete review from ${review.customerName || "customer"}?`,
    );

    if (!confirmed) return;

    try {
      await axiosSecure.delete(`/reviews/admin/${review._id}`);

      toast.success("Review deleted");

      await fetchReviews();
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete review");
    }
  };

  const pendingCount = reviews.filter(
    (review) => review.status === "pending",
  ).length;

  const approvedCount = reviews.filter(
    (review) => review.status === "approved",
  ).length;

  const rejectedCount = reviews.filter(
    (review) => review.status === "rejected",
  ).length;

  if (loading) {
    return (
      <div className="py-20 text-center">
        <span className="loading loading-spinner loading-lg text-primary" />

        <p className="mt-4 text-zinc-400">Loading reviews...</p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">Review Management</h1>

        <p className="text-zinc-400 mt-2">
          Approve, reject and manage verified customer reviews.
        </p>
      </div>

      {/* Stats */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat bg-base-200 border border-base-300 rounded-xl">
          <div className="stat-title">Total</div>

          <div className="stat-value text-2xl">{reviews.length}</div>
        </div>

        <div className="stat bg-base-200 border border-base-300 rounded-xl">
          <div className="stat-title">Pending</div>

          <div className="stat-value text-2xl text-warning">{pendingCount}</div>
        </div>

        <div className="stat bg-base-200 border border-base-300 rounded-xl">
          <div className="stat-title">Approved</div>

          <div className="stat-value text-2xl text-success">
            {approvedCount}
          </div>
        </div>

        <div className="stat bg-base-200 border border-base-300 rounded-xl">
          <div className="stat-title">Rejected</div>

          <div className="stat-value text-2xl text-error">{rejectedCount}</div>
        </div>
      </div>

      {/* Search + Filter */}

      <div className="flex flex-col md:flex-row gap-3">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search customer, product or order..."
          className="input input-bordered flex-1"
        />

        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="select select-bordered md:w-52"
        >
          <option value="all">All Reviews</option>

          <option value="pending">Pending</option>

          <option value="approved">Approved</option>

          <option value="rejected">Rejected</option>
        </select>

        <button onClick={fetchReviews} className="btn btn-primary">
          Refresh
        </button>
      </div>

      {/* Review Cards */}

      {filteredReviews.length === 0 ? (
        <div className="card bg-base-200 border border-base-300">
          <div className="card-body text-center py-14">No reviews found.</div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <article
              key={review._id}
              className="card bg-base-200 border border-base-300"
            >
              <div className="card-body">
                <div className="flex flex-col lg:flex-row gap-5 justify-between">
                  {/* Review */}

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-bold text-lg">
                        {review.customerName || "Customer"}
                      </h2>

                      {review.verifiedPurchase && (
                        <span className="badge badge-success badge-sm gap-1">
                          <FaCheckCircle />
                          Verified
                        </span>
                      )}

                      <span
                        className={`badge badge-sm ${
                          statusClasses[review.status] || "badge-ghost"
                        }`}
                      >
                        {review.status}
                      </span>
                    </div>

                    <div className="flex gap-1 mt-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={
                            star <= review.rating
                              ? "text-warning"
                              : "text-zinc-700"
                          }
                        />
                      ))}
                    </div>

                    <p className="mt-4 leading-7 text-zinc-300">
                      {review.comment}
                    </p>

                    <div className="mt-4 text-xs text-zinc-500 space-y-1">
                      <p>Product: {review.productTitle || review.productId}</p>

                      <p>Order: {review.orderNumber}</p>

                      {review.createdAt && (
                        <p>
                          Submitted:{" "}
                          {new Date(review.createdAt).toLocaleString("en-GB")}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Product */}

                  {review.productImage && (
                    <img
                      src={review.productImage}
                      alt={review.productTitle}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                  )}

                  {/* Actions */}

                  <div className="lg:w-48 space-y-3">
                    <select
                      value={review.status || "pending"}
                      disabled={updatingId === review._id}
                      onChange={(event) =>
                        handleStatus(review._id, event.target.value)
                      }
                      className="select select-bordered w-full"
                    >
                      <option value="pending">Pending</option>

                      <option value="approved">Approved</option>

                      <option value="rejected">Rejected</option>
                    </select>

                    <button
                      onClick={() => handleDelete(review)}
                      className="btn btn-outline btn-error w-full"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminReviews;
