import React, { useEffect, useState } from "react";
import { FaCreditCard, FaAddressBook, FaReceipt } from "react-icons/fa";
import api from "../utils/axiosConfig";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [billing, setBilling] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    country: "",
  });
  const [loading, setLoading] = useState(true);

  const directPurchaseData = location.state?.directPurchase
    ? {
        product: location.state.product,
        quantity: location.state.quantity,
        size: location.state.size,
      }
    : null;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (directPurchaseData) {
          // Direct purchase: set single product manually
          setCart([
            {
              product: directPurchaseData.product,
              quantity: directPurchaseData.quantity,
              size: directPurchaseData.size,
            },
          ]);
        } else {
          // Normal cart checkout
          const { data } = await api.get("/cart");
          if (data.success) setCart(data.cart.items);
        }
      } catch (err) {
        console.error("❌ Fetch cart error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [directPurchaseData]);

  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleInput = (e) => {
    setBilling((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 🔐 TODO: Payment integration
    alert("Payment processed!\nOrder placed successfully.");
    navigate("/order-confirmation");
  };

  if (loading) return <p className="text-center mt-20 text-gray-600">Loading checkout...</p>;
  if (cart.length === 0)
    return (
      <div className="text-center mt-20">
        <p className="text-gray-600">Your cart is empty.</p>
        <button onClick={() => navigate("/")} className="mt-4 text-blue-600 underline">
          Continue Shopping
        </button>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 🧾 Order Summary */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FaReceipt /> Order Summary
          </h2>
          <div className="space-y-4 mb-6">
            {cart.map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity} × ₹{item.product.price}
                  </p>
                  {item.size && (
                    <p className="text-xs text-gray-400">Size: {item.size}</p>
                  )}
                </div>
                <p className="font-semibold">₹{item.product.price * item.quantity}</p>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 text-right">
            <p className="text-lg font-bold">
              Total: <span className="text-[#B02E0C]">₹{total}</span>
            </p>
          </div>
        </div>

        {/* 🏠 Billing & Payment */}
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FaAddressBook /> Billing Details
          </h2>
          <div className="space-y-4 mb-8">
            <input
              type="text"
              name="fullName"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Full Name"
              required
              value={billing.fullName}
              onChange={handleInput}
            />
            <input
              type="email"
              name="email"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Email Address"
              required
              value={billing.email}
              onChange={handleInput}
            />
            <textarea
              name="address"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Street Address"
              required
              value={billing.address}
              onChange={handleInput}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                className="w-full border px-4 py-2 rounded-md"
                placeholder="City"
                required
                value={billing.city}
                onChange={handleInput}
              />
              <input
                type="text"
                name="pincode"
                className="w-full border px-4 py-2 rounded-md"
                placeholder="Pincode"
                required
                value={billing.pincode}
                onChange={handleInput}
              />
            </div>
            <input
              type="text"
              name="country"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Country"
              required
              value={billing.country}
              onChange={handleInput}
            />
          </div>

          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FaCreditCard /> Payment Method
          </h2>
          <p className="mb-6 text-gray-600">
            We use secure payment gateway (integrate Stripe/PayPal).
          </p>

          <button
            type="submit"
            className="w-full bg-[#B02E0C] hover:bg-[#961b00] text-white px-6 py-3 rounded-full font-semibold transition"
          >
            Pay ₹{total}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
