import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import hero1 from "../../assets/hero1-optimized.webp";
import hero1Mobile from "../../assets/hero1-mobile.webp";
import hero2 from "../../assets/hero2-optimized.webp";
import hero2Mobile from "../../assets/hero2-mobile.webp";
import hero3 from "../../assets/hero3-optimized.webp";
import hero3Mobile from "../../assets/hero3-mobile.webp";

const slides = [
  {
    image: hero1,
    mobileImage: hero1Mobile,
    alt: "Model wearing a Desert Sand RedFlint shirt",
    subtitle: "PREMIUM MENSWEAR",
    title: "Architectural Luxury",
    headingColor: "from-[#E0F7FA] via-[#80DEEA] to-[#00ACC1]",
    description:
      "Disciplined structures meet exceptional craftsmanship in precision-tailored garments designed for the modern gentleman.",
  },
  {
    image: hero2,
    mobileImage: hero2Mobile,
    alt: "Model wearing an Indigo Blue RedFlint shirt",
    subtitle: "MODERN COLLECTION",
    title: "Timeless Elegance",
    headingColor: "from-blue-400 to-cyan-300",
    description:
      "Elevate your wardrobe with contemporary fashion inspired by sophistication, confidence, and comfort.",
  },
  {
    image: hero3,
    mobileImage: hero3Mobile,
    alt: "Model wearing a patterned teal RedFlint shirt",
    subtitle: "EXCLUSIVE DESIGN",
    title: "Luxury Redefined",
    headingColor: "from-[#FFDDD2] via-[#E29578] to-[#83C5BE]",
    description:
      "Designed for those who appreciate quality craftsmanship, refined style, and premium materials.",
  },
];

const HeroSection = () => {
  return (
    <section className="mx-auto my-4 h-[min(68svh,34rem)] min-h-[27rem] max-w-7xl px-3 sm:my-6 sm:h-[min(76svh,46rem)] sm:min-h-[34rem] sm:px-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        className="redflint-hero h-full overflow-hidden rounded-2xl shadow-xl sm:rounded-3xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div className="relative h-full overflow-hidden bg-base-200">
                <picture>
                  <source media="(max-width: 640px)" srcSet={slide.mobileImage} />
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    decoding="async"
                  />
                </picture>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20 sm:from-black/75 sm:via-black/40"></div>

                {/* Content */}
                <div className="relative z-10 flex h-full items-center px-5 pb-16 pt-6 sm:px-10 sm:pb-10 md:px-20">
                  <div className="max-w-xl text-white">
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={isActive ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5 }}
                      className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-red-500 sm:text-xs sm:tracking-[4px]"
                    >
                      {slide.subtitle}
                    </motion.p>

                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={isActive ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className={`red-hat-display-900 mb-3 bg-gradient-to-r text-3xl font-bold italic leading-tight text-transparent min-[380px]:text-4xl sm:mb-4 md:text-6xl ${slide.headingColor} bg-clip-text`}
                    >
                      {slide.title}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={isActive ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="mb-6 max-w-lg text-sm leading-6 text-gray-200 sm:text-base sm:leading-relaxed md:text-lg"
                    >
                      {slide.description}
                    </motion.p>
                  </div>
                </div>

                {/* View Collection button */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isActive ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="absolute bottom-12 left-5 z-20 sm:bottom-8 sm:left-auto sm:right-8"
                >
                  <Link
                    to="/products"
                    className="inline-flex min-h-11 items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-red-700"
                  >
                    View Collection
                  </Link>
                </motion.div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
