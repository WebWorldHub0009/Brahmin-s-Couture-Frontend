import React, { useEffect, useState } from "react";
import { FaRupeeSign, FaShoppingCart } from "react-icons/fa";
import api from "../utils/axiosConfig";
import { Link } from "react-router-dom";

const CustomisedCombo = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomisedCombos = async () => {
    try {
      const { data } = await api.get("/products/getAll");
      const filtered = data?.products?.filter(
        (item) =>
          item.category?.toLowerCase() === "customised combo"
      );
      setProducts(filtered || []);
    } catch (err) {
      console.error("Failed to fetch customised combos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomisedCombos();
  }, []);

  return (
    <div className="px-4 md:px-8 py-12 max-w-[1600px] mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-light tracking-wide">
          Customised Combo Collection
        </h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Explore unique customised combos tailored for your special occasions and style.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading customised combos...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No customised combos found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 relative"
            >
              {/* Add to Cart Icon */}
              <button
                title="Add to Cart"
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
              >
                <FaShoppingCart className="text-gray-700" />
              </button>

              {/* Product Image */}
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.images[0]?.url}
                  alt={product.name}
                  className="w-full h-60 object-cover"
                />
              </Link>

              <div className="p-4 flex flex-col justify-between h-[200px]">
                <div>
                  {/* Product Name */}
                  <Link to={`/product/${product._id}`}>
                    <h3 className="text-lg font-medium text-gray-800 mb-1 truncate hover:underline">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Truncated Description */}
                  <p className="text-sm text-gray-500 mb-2">
                    {product.description?.slice(0, 20)}...
                  </p>

                  {/* Price & Stock */}
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[#B02E0C] font-bold flex items-center gap-1">
                      <FaRupeeSign size={14} />
                      {product.price}
                    </span>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        product.stock > 0
                          ? "bg-green-600 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>

                {/* Shop Now Button */}
                <Link
                  to={`/product/${product._id}`}
                  className="mt-4 w-full inline-block text-center bg-[#B02E0C] hover:bg-[#961b00] text-white text-sm py-2 rounded-full transition"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomisedCombo;
