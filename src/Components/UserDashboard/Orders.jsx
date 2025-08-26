import React, { useEffect, useState } from "react";
import api from "../../utils/axiosConfig";
import { FaEye } from "react-icons/fa";
import { toast } from "react-toastify";

const statusColors = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      // ✅ Get logged-in user from localStorage
      const userInfo = JSON.parse(localStorage.getItem("user"));

      if (!userInfo || !userInfo._id) {
        toast.error("You must be logged in to view orders.");
        return;
      }

      // ✅ Fetch orders for that userId
      const { data } = await api.get(`/orders/${userInfo._id}`);

      setOrders(data);
    } catch (err) {
      console.error("❌ Error fetching orders", err);
      toast.error("Failed to load your orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Orders</h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-600">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">
                  Date
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">
                  Total
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">
                  Status
                </th>
                <th className="px-6 py-3 text-center font-medium text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order, index) => (
                <tr
                  key={order._id}
                  className={`hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    {order._id}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {order.orderedAt
                      ? new Date(order.orderedAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-gray-800 font-semibold">
                    ₹{order.totalAmount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusColors[order.status] ||
                        "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-indigo-600 hover:text-indigo-800 transition">
                      <FaEye className="inline mr-1" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
