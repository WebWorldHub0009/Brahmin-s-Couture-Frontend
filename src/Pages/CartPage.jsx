import React, { useEffect, useState } from "react";
import api from "../utils/axiosConfig";
import {
  FaTrash,
  FaRupeeSign,
  FaShoppingCart,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ Added

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setCartItems(Array.isArray(res.data.cart?.items) ? res.data.cart.items : []);
      } else {
        setMessage("Failed to fetch cart.");
      }
    } catch (err) {
      console.error("❌ Fetch Cart Error:", err);
      setMessage("Something went wrong while fetching cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (item, newQty) => {
    const stock = item.product?.stock || 0;
    if (newQty < 1 || newQty > stock) return;

    try {
      const token = localStorage.getItem("token");

      setCartItems((prev) =>
        prev.map((ci) =>
          ci.product._id === item.product._id
            ? { ...ci, quantity: newQty }
            : ci
        )
      );

      await api.put(
        `/cart/update`,
        {
          productId: item.product._id,
          size: item.size,
          quantity: newQty,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (err) {
      console.error("❌ Update quantity error:", err);
    }
  };

  const handleRemove = async (productId, size) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/cart/remove`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId, size },
      });

      setCartItems((prev) =>
        prev.filter(
          (item) =>
            item.product._id !== productId || (item.size || "") !== (size || "")
        )
      );
    } catch (err) {
      console.error("❌ Remove item error:", err);
    }
  };

  const totalAmount = cartItems.reduce(
    (acc, item) =>
      acc + (item.product?.price || 0) * (item.quantity || 1),
    0
  );

  const goToCheckout = () => {
    navigate("/checkout"); // ✅ Navigate with no state => from cart
  };

  if (loading) {
    return (
      <p className="text-center text-lg text-gray-600 mt-20">Loading cart...</p>
    );
  }

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return (
      <div className="text-center mt-20">
        <FaShoppingCart size={60} className="text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800">Your cart is empty</h2>
        <Link to="/" className="text-blue-600 underline mt-4 inline-block">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <FaShoppingCart size={30} className="text-[#B02E0C]" />
        <h1 className="text-3xl font-bold text-gray-800">Your Shopping Cart</h1>
      </div>

      {message && <p className="text-red-600 mb-4">{message}</p>}

      <div className="space-y-6">
        {cartItems.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row items-center justify-between border-b pb-4 gap-4"
          >
            <div className="flex items-center gap-4 w-full md:w-2/3">
              <img
                src={item.product?.images?.[0]?.url || "/placeholder.jpg"}
                alt={item.product?.name || "Product"}
                className="w-20 h-20 object-cover rounded border"
              />
              <div>
                <h3 className="font-semibold text-gray-800">
                  {item.product?.name || "Unknown Product"}
                </h3>
                {item.size && (
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                )}
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <FaRupeeSign /> {(item.product?.price || 0) * item.quantity}
                </p>
                <p className="text-xs text-gray-400">
                  Price per item: ₹{item.product?.price}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="flex items-center border rounded overflow-hidden shadow-sm">
                <button
                  onClick={() =>
                    item.quantity > 1 &&
                    handleQuantityChange(item, item.quantity - 1)
                  }
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-lg text-gray-700 disabled:opacity-50"
                  disabled={item.quantity <= 1}
                >
                  <FaMinus />
                </button>
                <span className="px-4 py-2 text-lg font-medium bg-white">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    item.quantity < item.product?.stock &&
                    handleQuantityChange(item, item.quantity + 1)
                  }
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-lg text-gray-700 disabled:opacity-50"
                  disabled={item.quantity >= item.product?.stock}
                >
                  <FaPlus />
                </button>
              </div>

              <button
                onClick={() => handleRemove(item.product._id, item.size)}
                className="text-red-600 hover:text-red-800"
                title="Remove"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-between items-center border-t pt-6">
        <h2 className="text-xl font-bold text-gray-800">Total Amount:</h2>
        <p className="text-xl font-semibold text-[#B02E0C] flex items-center gap-1">
          <FaRupeeSign />
          {totalAmount}
        </p>
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={goToCheckout}
          className="bg-[#B02E0C] hover:bg-[#961b00] text-white px-6 py-3 rounded-md shadow-md transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;