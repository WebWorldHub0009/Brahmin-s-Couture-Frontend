import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/axiosConfig";
import {
  FaRupeeSign,
  FaCheckCircle,
  FaTimesCircle,
  FaShoppingCart,
} from "react-icons/fa";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/getOne/${id}`);
        if (data.success) {
          setProduct(data.product);
          setSelectedImage(data.product.images[0]?.url);
        }
      } catch (error) {
        console.error("❌ Error loading product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <p className="text-center text-gray-500 text-lg mt-20">
        Loading product details...
      </p>
    );
  }

  const increaseQty = () => {
    if (quantity < product.stock) setQuantity((q) => q + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Image Section - Sticky */}
      <div className="md:sticky md:top-30 self-start">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-2 max-h-[500px] overflow-auto">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={`thumb-${i}`}
                onClick={() => setSelectedImage(img.url)}
                className={`w-20 h-20 object-cover rounded-md border cursor-pointer ${
                  selectedImage === img.url ? "ring-2 ring-[#B02E0C]" : ""
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-lg border"
            />
          </div>
        </div>
      </div>

      {/* Right Info Section - Scrollable if long */}
      <div className="flex flex-col gap-6 overflow-auto max-h-[580px] pr-1">
        <h2 className="text-3xl font-semibold text-gray-800">
          {product.name}
        </h2>

        {/* Price & Stock */}
        <div className="flex items-center gap-4">
          <p className="text-xl font-bold text-[#B02E0C] flex items-center gap-1">
            <FaRupeeSign size={16} />
            {product.price}
          </p>
          {product.stock > 0 ? (
            <span className="text-sm text-green-600 flex items-center gap-1">
              <FaCheckCircle /> In Stock
            </span>
          ) : (
            <span className="text-sm text-red-600 flex items-center gap-1">
              <FaTimesCircle /> Out of Stock
            </span>
          )}
        </div>

        {/* Size Selection */}
        {product.sizes.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-1">Select Size:</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-1.5 rounded border text-sm ${
                    selectedSize === size
                      ? "bg-[#B02E0C] text-white"
                      : "bg-white text-gray-700 border-gray-300"
                  } hover:bg-gray-100 transition`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Counter */}
        <div>
          <p className="text-sm font-medium mb-1">Quantity:</p>
          <div className="flex items-center w-fit border rounded-md overflow-hidden">
            <button
              onClick={decreaseQty}
              className="px-3 py-1 text-lg font-bold bg-gray-100 hover:bg-gray-200"
            >
              -
            </button>
            <span className="px-4 py-1.5">{quantity}</span>
            <button
              onClick={increaseQty}
              className="px-3 py-1 text-lg font-bold bg-gray-100 hover:bg-gray-200"
            >
              +
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
            <FaShoppingCart /> Add to Cart
          </button>
          <button className="flex-1 bg-[#B02E0C] hover:bg-[#961b00] text-white px-6 py-3 rounded-full transition">
            Shop Now
          </button>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-lg font-semibold mt-4 mb-2">Description</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            {product.description || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
