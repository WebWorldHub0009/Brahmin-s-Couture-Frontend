import React, { useEffect, useState } from "react";
import {
  FaUserEdit,
  FaShoppingBag,
  FaHeart,
  FaMapMarkerAlt,
  FaUserCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../utils/axiosConfig";

const UserDashboardHome = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/profile");
        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-600">Loading dashboard...</p>;
  }

  if (!user) {
    return <p className="p-6 text-red-600">Failed to load user data.</p>;
  }

  return (
    <div className="p-6 text-gray-800 space-y-10">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
        Welcome back, {user.name.split(" ")[0]}!
      </h1>

      {/* Profile Info + Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow p-6 flex items-start gap-4">
          <FaUserCircle className="text-5xl text-gray-400" />
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-1">Your Info</h2>
            <p className="text-sm text-gray-700"><strong>Name:</strong> {user.name}</p>
            <p className="text-sm text-gray-700"><strong>Email:</strong> {user.email}</p>
            <p className="text-sm text-gray-700"><strong>Joined:</strong> {new Date(user.createdAt).toDateString()}</p>

            <div className="flex gap-3 mt-4">
              <Link
                to="/user/profile"
                className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-black transition"
              >
                <FaUserEdit /> Edit Profile
              </Link>
              <Link
                to="/user/orders"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
              >
                <FaShoppingBag /> My Orders
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links Cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link to="/user/orders" className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-lg transition">
            <FaShoppingBag className="text-2xl text-gray-700" />
            <div>
              <h3 className="text-base font-semibold">My Orders</h3>
              <p className="text-sm text-gray-600">Track and manage orders</p>
            </div>
          </Link>
          <Link to="/user/wishlist" className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-lg transition">
            <FaHeart className="text-2xl text-pink-600" />
            <div>
              <h3 className="text-base font-semibold">My Wishlist</h3>
              <p className="text-sm text-gray-600">Saved items you love</p>
            </div>
          </Link>
          <Link to="/user/address" className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-lg transition col-span-2">
            <FaMapMarkerAlt className="text-2xl text-gray-700" />
            <div>
              <h3 className="text-base font-semibold">My Addresses</h3>
              <p className="text-sm text-gray-600">View or update shipping info</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        {user.orders?.length === 0 ? (
          <p className="text-gray-500 text-sm">No recent orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="py-2">Order ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {user.orders?.slice(-5).reverse().map((order, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 transition">
                    <td className="py-2">{order.orderId}</td>
                    <td>{new Date(order.orderedAt).toLocaleDateString()}</td>
                    <td>₹{order.totalAmount}</td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboardHome;
