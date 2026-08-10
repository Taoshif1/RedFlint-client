import { useEffect, useState } from "react";

import { Link } from "react-router";

import { FaCheckCircle, FaQuoteLeft, FaStar } from "react-icons/fa";

import useAxiosSecure from "../../hooks/useAxiosSecure";

const CustomerReviews = () => {
  const axiosSecure = useAxiosSecure();

  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/reviews/featured?limit=6")
      .then((res) => {
        setReviews(Array.isArray(res.data) ? res.data : []);
      })
      .catch((error) => {
        console.error("Featured reviews error:", error);

        setReviews([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 text-center">
        <span className="loading loading-spinner loading-lg" />
      </section>
    );
  }

  // Don't show an empty section
  // until approved reviews exist.
  if (!reviews.length) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-primary uppercase tracking-[0.2em] font-semibold text-sm">
          Verified Experiences
        </p>

        <h2 className="text-3xl md:text-5xl font-bold mt-3">
          What Our Customers Say
        </h2>

        <p className="text-base-content/60 mt-4">
          Feedback from customers who purchased from RedFlint.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((review) => (
          <article
            key={review._id}
            className="card bg-base-200 border border-base-300 hover:border-primary/40 transition"
          >
            <div className="card-body">
              <FaQuoteLeft className="text-primary/30 text-3xl" />

              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={
                      star <= review.rating
                        ? "text-warning"
                        : "text-base-content/20"
                    }
                  />
                ))}
              </div>

              <p className="leading-7 text-base-content/80 mt-3 line-clamp-4">
                {review.comment}
              </p>

              <div className="mt-auto pt-5 border-t border-base-300">
                <div className="flex justify-between gap-3">
                  <div>
                    <h3 className="font-bold">
                      {review.customerName || "RedFlint Customer"}
                    </h3>
                  </div>

                  {review.productImage && (
                    <img
                      src={review.productImage}
                      alt={review.productTitle}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  )}
                </div>

                {review.productId && (
                  <Link
                    to={`/products/${review.productId}`}
                    className="link link-primary text-sm inline-block mt-4"
                  >
                    View {review.productTitle || "Product"}
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
