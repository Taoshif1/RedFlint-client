import { useEffect, useState } from "react";

import { Link } from "react-router";

import { FaQuoteLeft, FaStar } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

import useAxiosSecure from "../../hooks/useAxiosSecure";

const CustomerReviews = () => {
  const axiosSecure = useAxiosSecure();

  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/reviews/featured?limit=12")
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

  if (!reviews.length) {
    return null;
  }

  return (
    <section className="py-20 overflow-hidden">
      {/* Heading */}

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-primary uppercase tracking-[0.2em] font-semibold text-sm">
            Customer Feedback
          </p>

          <h2 className="text-3xl md:text-5xl font-bold mt-3">
            What Our Customers Say
          </h2>

          <p className="text-base-content/60 mt-4">
            See what people are saying about RedFlint.
          </p>

          <p className="text-xs text-base-content/40 mt-3">
            Drag or swipe to explore reviews
          </p>
        </div>
      </div>

      {/* Slider */}

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={20}
          slidesPerView={1.1}
          grabCursor={true}
          loop={reviews.length > 1}
          speed={6000}
          freeMode={{
            enabled: true,
            momentum: false,
          }}
          autoplay={
            reviews.length > 1
              ? {
                  delay: 0,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },

            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },

            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="customer-reviews-swiper pb-8"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id} className="h-auto">
              <article className="card bg-base-200 border border-base-300 hover:border-primary/40 transition-all duration-300 h-full hover:-translate-y-1 hover:shadow-xl">
                <div className="card-body h-full">
                  {/* Quote */}

                  <FaQuoteLeft className="text-primary/30 text-3xl" />

                  {/* Stars */}

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

                  {/* Comment */}

                  <p className="leading-7 text-base-content/80 mt-3 line-clamp-4">
                    {review.comment}
                  </p>

                  {/* Bottom */}

                  <div className="mt-auto pt-5 border-t border-base-300">
                    <div className="flex justify-between items-center gap-3">
                      <div>
                        <h3 className="font-bold">
                          {review.customerName || "RedFlint Customer"}
                        </h3>

                        {review.createdAt && (
                          <p className="text-xs text-base-content/40 mt-1">
                            {new Date(review.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </p>
                        )}
                      </div>

                      {review.productImage && (
                        <img
                          src={review.productImage}
                          alt={review.productTitle || "Product"}
                          draggable="false"
                          className="w-14 h-14 rounded-xl object-cover border border-base-300"
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CustomerReviews;
