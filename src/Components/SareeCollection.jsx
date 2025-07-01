import React from "react";
import img1 from "../assets/images/saree-home/s-wide.jpg";
import img2 from "../assets/images/saree-home/s6.jpg";
import img3 from "../assets/images/saree-home/s7.jpg";
import img4 from "../assets/images/saree-home/s8.jpg";
import img5 from "../assets/images/saree-home/s3.jpg";
import img6 from "../assets/images/saree-home/s9.jpg";
import img7 from "../assets/images/saree-home/s100.jpg";
import img8 from "../assets/images/saree-home/s111.jpg";
import img9 from "../assets/images/saree-home/s122.jpg";
import img10 from "../assets/images/saree-home/blue.webp" 

const OurSareeCollection = () => {
  return (
    <div className="px-4 md:px-8 py-12 max-w-[1600px] mx-auto">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide">Our Saree Collection</h2>
        <p className="text-gray-600 mt-3 font-light tracking-wider max-w-xl mx-auto">
          Discover our premium and trending sarees, handpicked to elevate your ethnic style.
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-3 grid-rows-[repeat(4,_minmax(150px,_auto))] gap-4">
        {/* Row 1 */}
        <div className="relative col-span-2 row-span-1 h-52 sm:h-60 md:h-64 lg:h-72">
          <img src={img1} alt="Saree 1" className="w-full h-full object-cover rounded-xl" />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white p-4 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Up to 50%</h3>
            <p className="text-sm mb-3 text-center">Elegant Traditional Sarees</p>
            <button className="bg-white text-black px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition">
              Shop Now
            </button>
          </div>
        </div>

        <div className="relative col-span-1 row-span-1 h-52 sm:h-60 md:h-64 lg:h-72">
          <img src={img2} alt="Saree 2" className="w-full h-full object-cover rounded-xl" />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white p-4 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">New Arrival</h3>
            <p className="text-sm mb-3">Luxe Cotton Sarees</p>
            <button className="bg-white text-black px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition">
              Explore
            </button>
          </div>
        </div>

        {/* Row 2 */}
        <div className="relative col-span-1 row-span-1 h-52 sm:h-60 md:h-64 lg:h-72">
          <img src={img3} alt="Saree 3" className="w-full h-full object-cover rounded-xl" />
          <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center text-white p-4 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Silk Blend</h3>
            <p className="text-sm mb-3">Timeless Fashion</p>
            <button className="bg-white text-black px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition">
              View
            </button>
          </div>
        </div>

        <div className="relative col-span-2 row-span-1 h-52 sm:h-60 md:h-64 lg:h-72">
          <img src={img4} alt="Saree 4" className="w-full h-full object-cover rounded-xl" />
          <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center text-white p-4 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Cotton Comfort</h3>
            <p className="text-sm mb-3">Everyday Ethnic Wear</p>
            <button className="bg-white text-black px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition">
              Browse
            </button>
          </div>
        </div>

        {/* Row 3 */}
        <div className="relative col-span-2 row-span-1 h-52 sm:h-60 md:h-64 lg:h-72">
          <img src={img10} alt="Saree 5" className="w-full h-full object-cover rounded-xl" />
          <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center text-white p-4 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Silk Blend</h3>
            <p className="text-sm mb-3">Timeless Fashion</p>
            <button className="bg-white text-black px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition">
              View
            </button>
          </div>
        </div>

        <div className="relative col-span-1 row-span-1 h-52 sm:h-60 md:h-64 lg:h-72">
          <img src={img6} alt="Saree 6" className="w-full h-full object-cover rounded-xl" />
          <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center text-white p-4 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Cotton Comfort</h3>
            <p className="text-sm mb-3">Everyday Ethnic Wear</p>
            <button className="bg-white text-black px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition">
              Browse
            </button>
          </div>
        </div>

        {/* Row 4 */}
        <div className="relative col-span-1 row-span-1 h-52 sm:h-60 md:h-64 lg:h-72">
          <img src={img7} alt="Saree 7" className="w-full h-full object-cover rounded-xl" />
          <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center text-white p-3 rounded-xl">
            <h3 className="text-sm font-semibold">New Designs</h3>
          </div>
        </div>

        <div className="relative col-span-1 row-span-1 h-52 sm:h-60 md:h-64 lg:h-72">
          <img src={img8} alt="Saree 8" className="w-full h-full object-cover rounded-xl" />
          <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center text-white p-3 rounded-xl">
            <h3 className="text-sm font-semibold">Ethnic Charm</h3>
          </div>
        </div>

        <div className="relative col-span-1 row-span-1 h-52 sm:h-60 md:h-64 lg:h-72">
          <img src={img9} alt="Saree 9" className="w-full h-full object-cover rounded-xl" />
          <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center text-white p-3 rounded-xl">
            <h3 className="text-sm font-semibold">Ethnic Charm</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurSareeCollection;
