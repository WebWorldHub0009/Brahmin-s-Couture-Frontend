import React, { useEffect, useState, useMemo } from "react";
import {
  FaCreditCard,
  FaAddressBook,
  FaReceipt,
  FaBoxOpen,
  FaUser,
  FaMapMarkedAlt,
  FaCity,
  FaEnvelope,
  FaGlobe,
  FaMapPin,
} from "react-icons/fa";
import api from "../utils/axiosConfig";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [billing, setBilling] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    country: "",
  });
  const [loading, setLoading] = useState(true);

  // ✅ Memoize direct purchase data to avoid infinite re-renders
  const directPurchaseData = useMemo(() => {
    return location.state?.directPurchase
      ? {
          product: location.state.product,
          quantity: location.state.quantity,
          size: location.state.size,
        }
      : null;
  }, [location.state]);

  useEffect(() => {
    const fetchCartAndAddresses = async () => {
      try {
        // Cart fetch
        if (directPurchaseData) {
          setCart([
            {
              product: directPurchaseData.product,
              quantity: directPurchaseData.quantity,
              size: directPurchaseData.size,
            },
          ]);
        } else {
          const { data } = await api.get("/cart");
          if (data.success) setCart(data.cart.items);
        }

        // Address fetch
        const res = await api.get("/address");
        if (res.data.success) {
          setAddresses(res.data.addresses || []);

          const defaultIndex = res.data.addresses.findIndex(
            (addr) => addr.default === true
          );

          // Avoid unnecessary state update
          if (
            defaultIndex !== -1 &&
            selectedAddressIndex === null // ✅ only set if not already set
          ) {
            setSelectedAddressIndex(defaultIndex);
            setBilling(res.data.addresses[defaultIndex]);
          }
        }
      } catch (err) {
        console.error("❌ Error fetching cart/addresses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartAndAddresses();
  }, [directPurchaseData, selectedAddressIndex]);

  const handleAddressSelect = (e) => {
    const index = e.target.value;
    setSelectedAddressIndex(index);
    setBilling(addresses[index]);
  };

  const total = cart
  .filter(item => item?.product && typeof item.product.price === "number")
  .reduce((acc, item) => acc + item.product.price * item.quantity, 0);


  const handleInput = (e) => {
    setBilling((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Step 1: Create Razorpay order via backend
    const { data: razorOrder } = await api.post("/payments/create-order", {
  amount: total,
});

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: razorOrder.order.amount,     // ✅ access inside "order"
  currency: razorOrder.order.currency, // ✅
  name: "Brahmani Couture",
  description: "Order Payment",
  order_id: razorOrder.order.id,       // ✅
  prefill: {
    name: billing.fullName,
    email: billing.email,
    contact: billing.phone || "0000000000",
  },
      handler: async function (response) {
        try {
          // Step 2: Verify payment on backend
          const verifyRes = await api.post("/payments/verify", {
            ...response,
            cart,
            billing,
            totalAmount: total,
          });

          if (verifyRes.data.success) {
            // ✅ Save order dynamically in DB
            await api.post("/orders", {
              cart,
              billing,
              payment: response,
              totalAmount: total,
            });

            navigate("/payment-success", {
              state: { order: verifyRes.data.order, payment: response },
            });
          } else {
            alert("❌ Payment verification failed!");
          }
        } catch (err) {
          console.error("Error saving order:", err);
          alert("Failed to complete order. Contact support.");
        }
      },
      theme: { color: "#B02E0C" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Payment error:", error);
    alert("Something went wrong with payment!");
  }
};

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-600">Loading checkout...</p>
    );

  if (cart.length === 0)
    return (
      <div className="text-center mt-20">
        <p className="text-gray-600 text-lg">🛒 Your cart is empty.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-blue-600 underline"
        >
          Continue Shopping
        </button>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 flex items-center gap-3">
        <FaBoxOpen className="text-[#B02E0C]" /> Checkout
      </h1>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Billing Form */}
        <form
          onSubmit={handleSubmit}
          className="md:w-2/3 w-full bg-white p-6 rounded-lg shadow-md space-y-6"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <FaAddressBook className="text-[#B02E0C]" /> Billing Information
          </h2>

          {/* Address Dropdown */}
          {addresses.length > 0 && (
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">
                Select Saved Address:
              </label>
              <select
                className="w-full border px-4 py-2 rounded-md"
                onChange={handleAddressSelect}
                value={selectedAddressIndex ?? ""}
              >
                <option value="" disabled>
                  -- Choose an address --
                </option>
                {addresses.map((addr, idx) => (
                  <option key={idx} value={idx}>
                    {addr.fullName}, {addr.address}, {addr.city}, {addr.pincode}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaUser className="text-gray-500" />
              <input
                type="text"
                name="fullName"
                className="w-full border px-4 py-2 rounded-md"
                placeholder="Full Name"
                required
                value={billing.fullName}
                onChange={handleInput}
              />
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-gray-500" />
              <input
                type="email"
                name="email"
                className="w-full border px-4 py-2 rounded-md"
                placeholder="Email Address"
                required
                value={billing.email}
                onChange={handleInput}
              />
            </div>

            {/* Phone input */}
<div className="flex items-center gap-3">
  <FaUser className="text-gray-500" />
  <input
    type="tel"
    name="phone"
    className="w-full border px-4 py-2 rounded-md"
    placeholder="Phone Number"
    required
    value={billing.phone}
    onChange={handleInput}
  />
</div>

            <div className="flex items-start gap-3">
              <FaMapMarkedAlt className="mt-2 text-gray-500" />
              <textarea
                name="address"
                className="w-full border px-4 py-2 rounded-md"
                placeholder="Street Address"
                required
                value={billing.address}
                onChange={handleInput}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <FaCity className="text-gray-500" />
                <input
                  type="text"
                  name="city"
                  className="w-full border px-4 py-2 rounded-md"
                  placeholder="City"
                  required
                  value={billing.city}
                  onChange={handleInput}
                />
              </div>

              <div className="flex items-center gap-3">
                <FaMapPin className="text-gray-500" />
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
            </div>

            <div className="flex items-center gap-3">
              <FaGlobe className="text-gray-500" />
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
          </div>

          <div className="pt-8">
            <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
              <FaCreditCard className="text-[#B02E0C]" /> Payment
            </h2>
            <p className="text-gray-600 mb-4">
              💳 We use secure payment gateways (Stripe/PayPal).
            </p>
            <button
              type="submit"
              className="w-full bg-[#B02E0C] hover:bg-[#961b00] text-white px-6 py-3 rounded-full font-semibold text-lg transition"
            >
              Pay ₹{total}
            </button>
          </div>
        </form>

        {/* Order Summary */}
        <div className="md:w-1/3 w-full bg-gray-50 p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-2xl font-semibold mb-5 flex items-center gap-2">
            <FaReceipt className="text-[#B02E0C]" /> Order Summary
          </h2>

          <div className="space-y-5">
            {cart
  .filter(item => item?.product && typeof item.product.price === "number")
  .map((item, i) => (
    <div key={i} className="flex justify-between gap-4 items-start border-b pb-4">
      <div>
        <p className="font-medium text-gray-800">{item.product.name}</p>
        <p className="text-sm text-gray-600">
          Qty: {item.quantity} × ₹{item.product.price}
        </p>
        {item.size && (
          <p className="text-xs text-gray-400">Size: {item.size}</p>
        )}
      </div>
      <p className="font-semibold text-gray-800 whitespace-nowrap">
        ₹{item.product.price * item.quantity}
      </p>
    </div>
))}

          </div>

          <div className="border-t pt-4 mt-6 text-right">
            <p className="text-lg font-bold">
              Total: <span className="text-[#B02E0C]">₹{total}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
