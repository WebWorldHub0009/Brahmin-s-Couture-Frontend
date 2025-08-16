import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import api from "../../utils/axiosConfig";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const userInfo = JSON.parse(localStorage.getItem("user"));
      const token = userInfo?.token;

      if (!token) {
        toast.error("No token found. Please login again.");
        return;
      }

      const { data } = await api.get("/orders/admin/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(data);
    } catch (err) {
      console.error("❌ Error fetching orders:", err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      const token = userInfo?.token;

      if (!token) {
        toast.error("No token found. Please login again.");
        return;
      }

      await api.put(
        `/orders/admin/${orderId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order status updated");
      fetchOrders();
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
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="p-4 border rounded shadow">
              <h3 className="text-lg font-semibold mb-2">Order #{order._id}</h3>
              <p><strong>Name:</strong> {order.user?.name}</p>
              <p><strong>Email:</strong> {order.user?.email}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
              <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
              <p><strong>Status:</strong> {order.status}</p>

              <h4 className="mt-4 font-medium">Products:</h4>
              <ul className="list-disc list-inside">
                {order.products.map((item, idx) => (
                  <li key={idx}>
                    {item.product?.name} (x{item.quantity})
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <label htmlFor={`status-${order._id}`} className="mr-2 font-medium">
                  Update Status:
                </label>
                <select
                  id={`status-${order._id}`}
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="border px-2 py-1 rounded"
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
