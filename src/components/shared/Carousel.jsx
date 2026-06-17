import React from "react";
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
      "Disciplined structures meet exceptional craftsmanship in precision-tailored garments designed for the modern connoisseur.",
  },
  {
    image: hero2,
    subtitle: "MODERN COLLECTION",
    title: "Timeless Elegance",
    description:
      "Elevate your wardrobe with contemporary fashion inspired by sophistication and confidence.",
  },
  {
    image: hero3,
    subtitle: "EXCLUSIVE DESIGN",
    title: "Luxury Redefined",
    description:
      "Designed for those who appreciate quality, craftsmanship, and refined style.",
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
        loop={true}
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
              <div className="absolute inset-0 bg-black/30"></div>

              {/* Content */}
              <div className="relative z-10 flex h-full items-center px-6 md:px-20">
                <div className="max-w-xl text-white">
                  <p className="mb-3 text-xs md:text-sm tracking-[4px] uppercase text-red-300">
                    {slide.subtitle}
                  </p>

                  <h1 className="mb-5 text-5xl md:text-7xl font-bold leading-tight">
                    {slide.title}
                  </h1>

                  <p className="mb-8 text-gray-200 text-lg leading-relaxed">
                    {slide.description}
                  </p>

                  <div className="flex gap-4">
                    <button className="bg-black px-8 py-3 text-sm font-semibold uppercase hover:bg-gray-900 transition">
                      Shop Collection
                    </button>

                    <button className="border border-white px-8 py-3 text-sm font-semibold uppercase hover:bg-white hover:text-black transition">
                      View Lookbook
                    </button>
                  </div>
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
