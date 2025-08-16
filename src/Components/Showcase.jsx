import React from "react";
import img1 from "../assets/images/st1.jpg";
import img2 from "../assets/images/st2.jpg";
import img3 from "../assets/images/st3.jpg";
import img4 from "../assets/images/st4.jpg";
import img5 from "../assets/images/st5.jpg";
import img6 from "../assets/images/st7.jpg"; // reuse

const images = [img1, img2, img3, img4, img5, img6];

const Showcase = () => {
  return (
    <>
      {/* Inject custom keyframes and class via style tag (for demo/inline use) */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50%      { transform: translateY(-10px); }
          }

          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
        `}
      </style>

      <div className="bg-[#f7f4f2] py-12 px-4 sm:px-6 md:px-16">
        {/* Heading */}
        <h2 className="text-5xl md:text-6xl font-light text-center mb-12 tracking-wider text-[#2E2E2E]">
          BRAHMANI'S TRENDING COLLECTION
        </h2>

        {/* Image Grid */}
        <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-start items-end gap-2 sm:gap-3 md:gap-1 overflow-hidden">
          {images.map((image, idx) => {
            const isEven = idx % 2 === 0;
            const verticalShift = isEven ? "md:-translate-y-6" : "md:translate-y-6";
            const slideDirection = isEven
              ? "group-hover:translate-y-0 -translate-y-full"
              : "group-hover:translate-y-0 translate-y-full";

            return (
              <div
                key={idx}
                className={`group w-[48%] sm:w-[48%] md:w-[180px] lg:w-[220px] h-[300px] sm:h-[400px] relative overflow-hidden transform transition-all duration-300
                  ${verticalShift} animate-float md:[clip-path:polygon(15%_0,_100%_0,_85%_100%,_0%_100%)]`}
              >
                {/* Background Image */}
                <img
                  src={image}
                  alt={`Model ${idx + 1}`}
                  className="w-full h-full object-cover scale-110"
                />

                {/* Hover Overlay for Desktop */}
                <div
                  className={`absolute inset-0 bg-black/60 text-white px-4 py-6 flex-col justify-center items-center text-center transition-transform duration-500 ease-in-out hidden md:flex ${slideDirection} md:opacity-0 md:group-hover:opacity-100`}
                >
                  <h3 className="text-lg font-semibold mb-2">Premium Wear</h3>
                  <p className="text-sm mb-3">Style & Elegance</p>
                  <button className="bg-white text-black px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition">
                    Shop Now
                  </button>
                </div>

                {/* Mobile & Tablet Static Overlay (No button) */}
                <div className="absolute inset-0 bg-black/30 text-white px-3 py-3 flex items-end justify-center text-center md:hidden">
                  <h3 className="text-sm font-medium mb-2">Premium Wear</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Showcase;
