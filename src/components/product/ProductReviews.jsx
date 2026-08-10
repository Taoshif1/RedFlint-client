import { useCallback, useEffect, useState } from "react";

import { FaStar } from "react-icons/fa";

import toast from "react-hot-toast";

import useAxiosSecure from "../../hooks/useAxiosSecure";

const Stars = ({ rating = 0, size = 18 }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={size}
          className={
            star <= Math.round(rating) ? "text-warning" : "text-base-content/20"
          }
        />
      ))}
    </div>
  );
};

const ProductReviews = ({ productId, productTitle }) => {
  const axiosSecure = useAxiosSecure();

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const [loading, setLoading] = useState(true);

  const [customerName, setCustomerName] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");

  const [submitting, setSubmitting] = useState(false);

  // =====================================
  // Load Approved Reviews
  // =====================================

  const fetchReviews = useCallback(async () => {
    setLoading(true);

    try {
      const res = await axiosSecure.get(`/reviews/product/${productId}`);

      setReviews(Array.isArray(res.data?.reviews) ? res.data.reviews : []);

      setAverageRating(Number(res.data?.averageRating || 0));

      setReviewCount(Number(res.data?.reviewCount || 0));
    } catch (error) {
      console.error("Review loading error:", error);

      setReviews([]);
      setAverageRating(0);
      setReviewCount(0);
    } finally {
      setLoading(false);
    }
  }, [axiosSecure, productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // =====================================
  // Submit Review
  // =====================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!customerName.trim()) {
      return toast.error("Please enter your name");
    }

    if (!rating) {
      return toast.error("Please select a rating");
    }

    if (comment.trim().length < 5) {
      return toast.error("Please write a review");
    }

    setSubmitting(true);

    try {
      const res = await axiosSecure.post("/reviews", {
        productId,

        customerName: customerName.trim(),

        rating,

        comment: comment.trim(),
      });

      toast.success(res.data?.message || "Review submitted successfully");

      setCustomerName("");

      setRating(5);

      setComment("");

      setShowForm(false);
    } catch (error) {
      console.error("Review submission error:", error);

      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-16 border-t border-base-300 pt-12">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-primary font-semibold uppercase tracking-wider text-sm">
            Customer Feedback
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-2">Reviews</h2>

          <p className="text-base-content/60 mt-2">
            Reviews from verified RedFlint purchases.
          </p>
        </div>

        <button
          onClick={() => setShowForm((previous) => !previous)}
          className="btn btn-primary"
        >
          {showForm ? "Cancel" : "Write a Review"}
        </button>
      </div>

      {/* Rating Summary */}

      <div className="card bg-base-200 border border-base-300 mb-8">
        <div className="card-body flex-row items-center gap-6">
          <div>
            <div className="text-5xl font-bold">
              {averageRating > 0 ? averageRating : "—"}
            </div>

            <p className="text-sm text-base-content/50 mt-1">out of 5</p>
          </div>

          <div>
            <Stars rating={averageRating} size={22} />

            <p className="text-base-content/60 mt-2">
              {reviewCount} verified {reviewCount === 1 ? "review" : "reviews"}
            </p>
          </div>
        </div>
      </div>

      {/* Review Form */}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="card bg-base-100 border border-base-300 shadow-xl mb-10"
        >
          <div className="card-body">
            <h3 className="text-2xl font-bold">Review {productTitle}</h3>

            <div className="alert bg-base-200 border-none mt-3">
              <span className="text-sm">
                Share your experience with this product. Your review will appear
                after approval.
              </span>
            </div>

            <div className="mt-4">
              <label className="form-control">
                <span className="label-text mb-2">Your Name *</span>

                <input
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                />
              </label>
            </div>

            {/* Interactive Stars */}

            <div className="mt-4">
              <p className="font-semibold mb-3">Your Rating *</p>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                    aria-label={`${star} star rating`}
                  >
                    <FaStar
                      size={30}
                      className={
                        star <= rating ? "text-warning" : "text-base-content/20"
                      }
                    />
                  </button>
                ))}
              </div>

              <p className="text-sm text-base-content/50 mt-2">{rating}/5</p>
            </div>

            <label className="form-control mt-4">
              <span className="label-text mb-2">Your Review *</span>

              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                maxLength={1000}
                rows={5}
                placeholder="Tell us about the quality, fitting, comfort or your overall experience..."
                className="textarea textarea-bordered w-full"
              />

              <span className="text-xs text-base-content/40 mt-2 text-right">
                {comment.length}/1000
              </span>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary mt-4"
            >
              {submitting ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </button>
          </div>
        </form>
      )}

      {/* Review List */}

      {loading ? (
        <div className="py-12 text-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="card bg-base-200 border border-base-300">
          <div className="card-body text-center py-12">
            <h3 className="text-xl font-bold">No reviews yet</h3>

            <p className="text-base-content/60">
              Be the first verified customer to review this product.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {reviews.map((review) => (
            <article
              key={review._id}
              className="card bg-base-100 border border-base-300"
            >
              <div className="card-body">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-lg">
                      {review.customerName || "RedFlint Customer"}
                    </h3>
                  </div>

                  <Stars rating={review.rating} />
                </div>

                <p className="text-base-content/80 leading-7 mt-3">
                  {review.comment}
                </p>

                {review.createdAt && (
                  <p className="text-xs text-base-content/40 mt-3">
                    {new Date(review.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductReviews;
