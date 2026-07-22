import React from "react";
import FashionBanner from "../components/shared/FashionBanner";
import HeroSection from "../components/shared/Carousel";
import AboutSection from "../components/shared/AboutSection";
import ShoppingCart from "../components/shared/ShoppingCart";

const Home = () => {
  return (
    <>
      <FashionBanner></FashionBanner>
      <HeroSection></HeroSection>
      <AboutSection></AboutSection>
      <ShoppingCart></ShoppingCart>
    </>
  );
};

export default Home;
