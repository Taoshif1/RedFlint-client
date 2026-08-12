import { lazy, Suspense } from "react";

import FashionBanner from "../components/shared/FashionBanner";
import HeroSection from "../components/shared/Carousel";
import FeaturedProducts from "../components/shared/FeaturedProducts";

const CustomerReviews = lazy(
  () => import("../components/shared/CustomerReviews"),
);

const Home = () => {
  return (
    <>
      <FashionBanner />

      <HeroSection />

      <FeaturedProducts />

      <Suspense
        fallback={
          <div className="flex min-h-64 items-center justify-center">
            <span className="loading loading-spinner loading-lg" />
          </div>
        }
      >
        <CustomerReviews />
      </Suspense>
    </>
  );
};

export default Home;
