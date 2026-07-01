import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion"; // অ্যানিমেশনের জন্য ইমপোর্ট করা হয়েছে

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
    headingColor: "from-[#E0F7FA] via-[#80DEEA] to-[#00ACC1]",
    description:
      "Disciplined structures meet exceptional craftsmanship in precision-tailored garments designed for the modern gentleman.",
  },
  {
    image: hero2,
    subtitle: "MODERN COLLECTION",
    title: "Timeless Elegance",
    headingColor: "from-blue-400 to-cyan-300",
    description:
      "Elevate your wardrobe with contemporary fashion inspired by sophistication, confidence, and comfort.",
  },
  {
    image: hero3,
    subtitle: "EXCLUSIVE DESIGN",
    title: "Luxury Redefined",
    headingColor: "from-[#FFDDD2] via-[#E29578] to-[#83C5BE]",
    description:
      "Designed for those who appreciate quality craftsmanship, refined style, and premium materials.",
  },
];

const HeroSection = () => {
  return (
    <section className="h-[80vh] max-w-7xl mx-auto my-6 px-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        className="h-full rounded-3xl overflow-hidden shadow-xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div
                className="relative h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />

                {/* Content */}
                <div className="relative z-10 flex h-full items-center px-6 md:px-20">
                  <div className="max-w-xl text-white">
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={isActive ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5 }}
                      className="mb-2 text-xs font-semibold tracking-[4px] uppercase text-red-600"
                    >
                      {slide.subtitle}
                    </motion.p>

                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={isActive ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className={`red-hat-display-900 mb-4 text-4xl md:text-6xl leading-tight font-bold italic bg-gradient-to-r ${slide.headingColor} bg-clip-text text-transparent`}
                    >
                      {slide.title}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={isActive ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="mb-6 max-w-xl text-base md:text-lg leading-relaxed text-gray-200 tracking-wide"
                    >
                      {slide.description}
                    </motion.p>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
