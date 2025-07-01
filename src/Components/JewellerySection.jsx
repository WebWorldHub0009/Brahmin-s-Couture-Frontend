import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

// Import 8 jewellery images
import img1 from "../assets/images/bag.jpg";
import img2 from "../assets/images/bag.jpg";
import img3 from "../assets/images/bag.jpg";
import img4 from "../assets/images/bag.jpg";
import img5 from "../assets/images/bag.jpg";
import img6 from "../assets/images/bag.jpg";
import img7 from "../assets/images/bag.jpg";
import img8 from "../assets/images/bag.jpg";

const products = [
  { id: 1, title: "Kundan Set", image: img1 },
  { id: 2, title: "Pearl Necklace", image: img2 },
  { id: 3, title: "Temple Jhumkas", image: img3 },
  { id: 4, title: "Diamond Ring", image: img4 },
  { id: 5, title: "Gold Bangle", image: img5 },
  { id: 6, title: "Antique Haar", image: img6 },
  { id: 7, title: "Meenakari Choker", image: img7 },
  { id: 8, title: "Oxidized Earrings", image: img8 },
];

const JewellerySection = () => {
  return (
    <div className="py-12 px-4 sm:px-6 md:px-12 bg-[#F9F9F9]">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#2E2E2E]">Our Jewellery Collection</h2>
        <p className="text-[#2E2E2E] mt-2">Grace yourself with timeless elegance.</p>
      </div>

      {/* Desktop Grid View: 4 items per row, 2 rows */}
      <div className="hidden lg:grid grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative bg-white shadow-[0_4px_10px_#1E1E1E1A] overflow-hidden w-[280px] h-[280px] group rounded-lg mx-auto"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-4 right-4">
              <button className="bg-blue-900 text-white font-medium px-3 py-2 rounded-full text-sm shadow-md hover:bg-[#C19A6B] transition">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile & Tablet Swiper */}
      <div className="lg:hidden">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          speed={600}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[Autoplay]}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="relative bg-white shadow-[0_4px_10px_#1E1E1E1A] rounded-lg overflow-hidden w-[220px] h-[220px] sm:w-[240px] sm:h-[240px] mx-auto group">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-4 right-4">
                  <button className="bg-[#D4AF37] text-white font-medium px-3 py-2 rounded-full text-sm shadow-md hover:bg-[#C19A6B] transition">
                    Shop Now
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default JewellerySection;
