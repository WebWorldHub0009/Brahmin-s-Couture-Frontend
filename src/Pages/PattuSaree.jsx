import React, { useEffect, useState } from "react";
import { FaRupeeSign, FaShoppingCart } from "react-icons/fa";
import api from "../utils/axiosConfig";
import { Link } from "react-router-dom";

const PattuSaree = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPattuSarees = async () => {
    try {
      const { data } = await api.get("/products/getAll");
      const filtered = data?.products?.filter(
        (item) =>
          item.category?.toLowerCase() === "saree" &&
          item.sareeType?.toLowerCase() === "pattu"
      );
      setProducts(filtered || []);
    } catch (err) {
      console.error("Failed to fetch pattu sarees:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPattuSarees();
  }, []);

  return (
    <div className="px-4 md:px-8 py-12 max-w-[1600px] mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-light tracking-wide">
          Pattu Saree Collection
        </h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Browse our exclusive collection of traditional and elegant pattu sarees.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading pattu sarees...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No pattu sarees found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group relative"
            >
              {/* Stock Badge */}
              <div
                className={`absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full z-10 ${
                  product.stock > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </div>

              {/* Add to Cart Icon */}
              <button
                title="Add to Cart"
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition z-10"
              >
                <FaShoppingCart className="text-gray-700" />
              </button>

              {/* Product Image */}
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.images[0]?.url}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </Link>

              {/* Content */}
              <div className="p-5 flex flex-col h-[180px] justify-between">
                <div>
                  {/* Title */}
                  <Link to={`/product/${product._id}`}>
                    <h3 className="text-lg font-semibold text-gray-800 truncate hover:text-[#B02E0C] transition">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Description */}
                  <p className="text-sm text-gray-500 mt-1">
                    {product.description?.slice(0, 45)}...
                  </p>
                </div>

                {/* Price + CTA */}
                <div>
                  <div className="flex items-center gap-1 text-[#B02E0C] font-bold text-[17px]">
                    <FaRupeeSign size={14} />
                    {product.price}
                  </div>

                  <Link
                    to={`/product/${product._id}`}
                    className="mt-2 w-full inline-block text-center bg-[#B02E0C] hover:bg-[#8f2006] text-white font-medium text-sm py-2 rounded-md transition"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PattuSaree;
