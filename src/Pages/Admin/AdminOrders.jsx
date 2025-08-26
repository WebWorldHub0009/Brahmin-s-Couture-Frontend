import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FiPackage,
  FiMail,
  FiMapPin,
  FiCreditCard,
  FiUser,
  FiShoppingCart,
  FiPhone,
} from "react-icons/fi";
import {
  MdOutlinePendingActions,
  MdOutlineLocalShipping,
  MdCancel,
  MdDoneAll,
} from "react-icons/md";
import api from "../../utils/axiosConfig";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Get token safely
  const getAuthHeaders = () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const token = userInfo?.token;
    if (!token) {
      toast.error("⚠️ No token found. Please login again.");
      return null;
    }
    return { Authorization: `Bearer ${token}` };
  };

  // ✅ Fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const headers = getAuthHeaders();
      if (!headers) return;

      const { data } = await api.get("/orders/admin/all", { headers });
      setOrders(data || []);
    } catch (err) {
      console.error("❌ Error fetching orders:", err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update order status
  const updateStatus = async (orderId, status) => {
    try {
      const headers = getAuthHeaders();
      if (!headers) return;

      await api.put(`/orders/admin/${orderId}`, { status }, { headers });

      toast.success("✅ Order status updated");
      fetchOrders(); // Refresh list
    } catch (err) {
      console.error("❌ Error updating status:", err);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FiPackage className="text-indigo-600" size={28} />
        Admin Orders Dashboard
      </h2>

      {loading ? (
        <p className="text-gray-600">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-5 border rounded-lg shadow-md bg-white hover:shadow-lg transition"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <h3 className="text-lg font-semibold mb-2 md:mb-0 flex items-center gap-2">
                  <FiPackage className="text-indigo-500" /> Order #{order._id}
                </h3>
                <span
                  className={`px-3 py-1 rounded text-sm font-medium flex items-center gap-1 ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : order.status === "Processing"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status === "Delivered" && <MdDoneAll />}
                  {order.status === "Cancelled" && <MdCancel />}
                  {order.status === "Processing" && <MdOutlineLocalShipping />}
                  {order.status === "Pending" && <MdOutlinePendingActions />}
                  {order.status}
                </span>
              </div>

              {/* Order Info */}
              <div className="mt-3 space-y-2 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                  <FiUser className="text-gray-500" /> <strong>Name:</strong>{" "}
                  {order.user?.name || "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <FiMail className="text-gray-500" /> <strong>Email:</strong>{" "}
                  {order.user?.email || "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <FiPhone className="text-gray-500" /> <strong>Phone:</strong>{" "}
                  {order.user?.phone || "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <FiMapPin className="text-gray-500" /> <strong>Address:</strong>{" "}
                  {order.address || "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <FiCreditCard className="text-gray-500" />{" "}
                  <strong>Payment Method:</strong> {order.paymentMethod || "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  💰 <strong>Total Amount:</strong> ₹{order.amount || 0}
                </p>
              </div>

              {/* Products */}
              <h4 className="mt-4 font-medium flex items-center gap-2">
                <FiShoppingCart className="text-green-600" /> Products:
              </h4>
              <ul className="list-disc list-inside text-gray-800 text-sm">
                {order.products?.length > 0 ? (
                  order.products.map((item, idx) => (
                    <li key={idx}>
                      {item.product?.name || "Unnamed Product"}{" "}
                      <span className="text-gray-500">(x{item.quantity})</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No products</p>
                )}
              </ul>

              {/* Update Status Dropdown */}
              <div className="mt-5">
                <label
                  htmlFor={`status-${order._id}`}
                  className="mr-2 font-medium"
                >
                  Update Status:
                </label>
                <select
                  id={`status-${order._id}`}
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
