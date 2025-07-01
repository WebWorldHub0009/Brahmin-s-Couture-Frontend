import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Desktop images
import dImg1 from "../assets/images/customize-slider/s4.jpg";
import dImg2 from "../assets/images/customize-slider/s5.jpg";
import dImg3 from "../assets/images/customize-slider/s9.avif";
import dImg4 from "../assets/images/customize-slider/s8.jpg";

// Mobile images
import mImg1 from "../assets/images/smallslider/s6.jpg";
import mImg2 from "../assets/images/smallslider/s5.jpg";
import mImg3 from "../assets/images/smallslider/s3.jpg";
import mImg4 from "../assets/images/smallslider/s4.jpg";

const desktopSlides = [
  {
    image: dImg1,
    title: "Timeless Style",
    description:
      "Handcrafted custom dresses designed for elegance, grace, and individuality. Our pieces blend traditional artistry with modern sophistication, ensuring you radiate timeless charm on every occasion.",
  },
  {
    image: dImg2,
    title: "Tailored Grace",
    description:
      "Every stitch whispers uniqueness. Our garments are custom-fit to your body and style, celebrating your identity with luxurious fabrics, delicate details, and flawless craftsmanship that turns heads effortlessly.",
  },
  {
    image: dImg3,
    title: "Effortless Beauty",
    description:
      "Discover silhouettes that flow like poetry and fabrics that feel like a second skin. Our collections are thoughtfully curated to help you express your confidence, femininity, and bold sense of beauty with ease.",
  },
  {
    image: dImg4,
    title: "Unveil Your Elegance",
    description:
      "Step into the spotlight with designs made exclusively for you. Whether it’s a grand celebration or an intimate moment, our customized dresses bring out the queen in you with every thread and fold.",
  },
];

const mobileSlides = [
  {
    image: mImg1,
    title: "Timeless Style",
    description: "Elegance and individuality in every thread — now beautifully optimized for mobile.",
  },
  {
    image: mImg2,
    title: "Tailored Grace",
    description: "Sleek fits and bold presence made just for you — experience grace on-the-go.",
  },
  {
    image: mImg3,
    title: "Effortless Beauty",
    description: "A collection designed for ease, comfort, and unmistakable mobile glamour.",
  },
  {
    image: mImg4,
    title: "Unveil Your Elegance",
    description: "Lightweight, luxurious, and perfect for mobile viewing — radiate elegance anywhere.",
  },
];

const CustomizeDressSlider = ({ slides }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(false);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % slides.length);
        setAnimating(true);
      }, 100);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden z-[99]">
      {/* Image Background Transition */}
      <AnimatePresence>
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: animating ? 1.1 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 4 }}
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[currentImage].image})` }}
        />
      </AnimatePresence>

      {/* Overlay Text */}
      <div className="absolute inset-0 flex items-center bg-black/40 px-6 md:px-16 z-10">
        <div className="text-white max-w-2xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5 drop-shadow-xl tracking-wide">
            {slides[currentImage].title}
          </h2>
          <p className="text-base sm:text-lg md:text-2xl font-light drop-shadow-lg font-sans">
            {slides[currentImage].description}
          </p>
        </div>
      </div>

      {/* Arrows (Manual Control) */}
      <div className=" absolute top-1/2 -translate-y-1/2 w-full hidden md:flex justify-between px-4 md:px-6 z-20">
        <button
          onClick={() =>
            setCurrentImage((prev) => (prev - 1 + slides.length) % slides.length)
          }
          className="bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition duration-300"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={() => setCurrentImage((prev) => (prev + 1) % slides.length)}
          className="bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition duration-300"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

const ResponsiveDressSlider = () => {
  return (
    <>
      {/* Desktop + Tablet */}
      <div className="hidden md:block">
        <CustomizeDressSlider slides={desktopSlides} />
      </div>

      {/* Mobile */}
      <div className="block md:hidden">
        <CustomizeDressSlider slides={mobileSlides} />
      </div>
    </>
  );
};

export default ResponsiveDressSlider;
