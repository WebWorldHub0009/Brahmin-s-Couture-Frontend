import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaDownload } from "react-icons/fa";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order, payment } = location.state || {};

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob(
      [
        `Receipt\n\nOrder ID: ${order?.id}\nPayment ID: ${payment?.razorpay_payment_id}\nAmount: ₹${order?.amount/100}\nStatus: SUCCESS\nDate: ${new Date().toLocaleString()}`
      ],
      { type: "text/plain" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "receipt.txt";
    document.body.appendChild(element);
    element.click();
  };

  if (!order) {
    return (
      <div className="text-center mt-20">
        <p className="text-lg text-gray-700">No payment details found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-[#B02E0C] text-white px-4 py-2 rounded"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-20 bg-white p-8 rounded-lg shadow-md text-center">
      <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
      <h1 className="text-3xl font-bold text-gray-800">Payment Successful 🎉</h1>
      <p className="text-gray-600 mt-2">Thank you for your purchase!</p>

      <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-sm text-left">
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Payment ID:</strong> {payment.razorpay_payment_id}</p>
        <p><strong>Amount Paid:</strong> ₹{order.amount / 100}</p>
        <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
      </div>

      <button
        onClick={handleDownload}
        className="mt-6 flex items-center gap-2 mx-auto bg-[#B02E0C] hover:bg-[#961b00] text-white px-6 py-3 rounded-full font-semibold"
      >
        <FaDownload /> Download Receipt
      </button>
    </div>
  );
};

export default PaymentSuccess;
