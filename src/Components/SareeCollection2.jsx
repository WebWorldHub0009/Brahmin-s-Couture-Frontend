import React from "react";
import img1 from "../assets/images/customize-slider/s1.jpg";
import img2 from "../assets/images/customize-slider/s2.jpg";
import img3 from "../assets/images/customize-slider/s7.jpg";
import img4 from "../assets/images/customize-slider/s4.jpg";
import img5 from "../assets/images/customize-slider/s5.jpg";
import img6 from "../assets/images/customize-slider/s6.jpg";
import img7 from "../assets/images/customize-slider/s7.jpg";
import img8 from "../assets/images/customize-slider/s8.jpg";
import img9 from "../assets/images/customize-slider/s9.avif";

const SareeCollection2 = () => {
    
  return (
    <div className="w-full px-4 sm:px-6 md:px-12 py-16">
      {/* First Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="relative">
          <img src={img1} alt="Saree 1" className="w-full h-full object-cover" />
        </div>
        <div className="bg-[#F5F5F5] flex flex-col items-center justify-center text-center p-8">
          <h2 className="text-xl font-bold uppercase mb-2">Up To 50%</h2>
          <p className="text-sm text-gray-600 mb-4">
            Shop our exclusive collection of customized designer sarees.
          </p>
          <button className="bg-black text-white px-6 py-2 text-sm uppercase hover:bg-gray-800 transition">
            Shop Now
          </button>
        </div>
        <div>
          <img src={img2} alt="Saree 2" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <img src={img3} alt="Saree 3" className="w-full h-full object-cover" />
        </div>
        <div className="bg-[#F5F5F5] flex flex-col items-center justify-center text-center p-8">
          <h2 className="text-xl font-bold uppercase mb-2">Up To 50%</h2>
          <p className="text-sm text-gray-600 mb-4">
            Map your tradition with our graceful handloom sarees.
          </p>
          <button className="bg-black text-white px-6 py-2 text-sm uppercase hover:bg-gray-800 transition">
            Shop Now
          </button>
        </div>
        <div>
          <img src={img4} alt="Saree 4" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <img src={img5} alt="Saree 5" className="w-full h-full object-cover" />
          <img src={img6} alt="Saree 6" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col items-center justify-center text-center bg-white p-6">
          <h2 className="text-xl font-bold uppercase mb-2">Turn Up The Volume</h2>
          <p className="text-sm text-gray-600">
            Trending designs to make you stand out.
          </p>
        </div>
      </div>

      {/* Fourth Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <img src={img7} alt="Saree 7" className="w-full h-full object-cover" />
        <img src={img8} alt="Saree 8" className="w-full h-full object-cover" />
        <img src={img9} alt="Saree 9" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default SareeCollection2;
