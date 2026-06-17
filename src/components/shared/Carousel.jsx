import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import hero1 from "../../assets/Hero1.jpg";
import hero2 from "../../assets/hero2.jpg";
import hero3 from "../../assets/hero3.webp";

const slides = [
  {
    image: hero1,
    subtitle: "PREMIUM MENSWEAR",
    title: "Architectural Luxury",
    description:
      "Disciplined structures meet exceptional craftsmanship in precision-tailored garments designed for the modern gentleman.",
  },
  {
    image: hero2,
    subtitle: "MODERN COLLECTION",
    title: "Timeless Elegance",
    description:
      "Elevate your wardrobe with contemporary fashion inspired by sophistication, confidence, and comfort.",
  },
  {
    image: hero3,
    subtitle: "EXCLUSIVE DESIGN",
    title: "Luxury Redefined",
    description:
      "Designed for those who appreciate quality craftsmanship, refined style, and premium materials.",
  },
];

const HeroSection = () => {
  return (
    <section className="h-screen">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-screen bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />

              {/* Content */}
              <div className="relative z-10 flex h-full items-center px-6 md:px-20">
                <div className="max-w-2xl text-white">
                  <p className="mb-3 text-sm font-semibold tracking-[4px] uppercase text-primary">
                    {slide.subtitle}
                  </p>

                  <h1 className="red-hat-display-900 mb-6 text-5xl md:text-7xl leading-tight font-bold italic ">
                    {slide.title}
                  </h1>

                  <p className="mb-8 max-w-2xl text-xl lg:text-2xl leading-relaxed text-gray-200 tracking-wide">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
