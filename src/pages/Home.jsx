import FashionBanner from "../components/shared/FashionBanner";
import HeroSection from "../components/shared/Carousel";
import FeaturedProducts from "../components/shared/FeaturedProducts";
import ShoppingCart from "../components/shared/ShoppingCart";

const Home = () => {
  return (
    <>
      <FashionBanner />

      <HeroSection />

      <FeaturedProducts />

      <ShoppingCart />
    </>
  );
};

export default Home;