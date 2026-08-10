import FashionBanner from "../components/shared/FashionBanner";
import HeroSection from "../components/shared/Carousel";
import FeaturedProducts from "../components/shared/FeaturedProducts";
import ShoppingCart from "../components/shared/ShoppingCart";
import CustomerReviews from "../components/shared/CustomerReviews";

const Home = () => {
  return (
    <>
      <FashionBanner />

      <HeroSection />

      <FeaturedProducts />

      <CustomerReviews />

      <ShoppingCart />
    </>
  );
};

export default Home;
