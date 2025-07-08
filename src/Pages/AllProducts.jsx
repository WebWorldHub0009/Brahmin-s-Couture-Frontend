import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import api from "../utils/axiosConfig"; // ✅ Use Axios instance

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllProducts = async () => {
    try {
      const { data } = await api.get("/products/getAll");
      setProducts(data?.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="px-4 md:px-8 py-12 max-w-[1600px] mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-light tracking-wide">
          All Product Collections
        </h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Browse through our complete collection across sarees, accessories, combos and more.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-lg text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow hover:shadow-xl transition duration-300 overflow-hidden"
            >
              <img
                src={product.images[0]?.url}
                alt={product.name}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                  {product.description || "No description available."}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[#B02E0C] font-bold flex items-center gap-1">
                    <FaRupeeSign size={14} />
                    {product.price}
                  </span>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      product.stock > 0
                        ? "bg-green-600 text-white"
                        : "bg-gray-400 text-gray-200"
                    }`}
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
