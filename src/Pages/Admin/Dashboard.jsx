import React from "react";
import {
  FaUsers,
  FaBoxOpen,
  FaMoneyBillWave,
  FaPlusCircle,
  FaEye,
  FaExclamationTriangle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const cards = [
    {
      title: "Total Users",
      value: 134,
      icon: <FaUsers className="text-blue-600 text-3xl" />,
      color: "from-blue-100 to-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Total Products",
      value: 42,
      icon: <FaBoxOpen className="text-green-600 text-3xl" />,
      color: "from-green-100 to-green-50",
      text: "text-green-600",
    },
    {
      title: "Total Sales",
      value: "₹12,340",
      icon: <FaMoneyBillWave className="text-red-600 text-3xl" />,
      color: "from-red-100 to-red-50",
      text: "text-red-600",
    },
  ];

  const recentOrders = [
    { id: "ORD123", customer: "Riya Sharma", total: "₹2,300", status: "Delivered" },
    { id: "ORD124", customer: "Aman Verma", total: "₹1,150", status: "Pending" },
    { id: "ORD125", customer: "Sneha Singh", total: "₹3,780", status: "Shipped" },
  ];

  const lowStockProducts = [
    { name: "Customised Saree A", stock: 3 },
    { name: "Kidswear Combo B", stock: 1 },
    { name: "Accessory Pack C", stock: 2 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl md:text-3xl font-semibold mb-8 tracking-tight">
        Welcome back, Admin!
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`bg-gradient-to-br ${card.color} rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition duration-300 transform hover:scale-[1.02]`}
          >
            <div className="p-4 bg-white rounded-full shadow-md">
              {card.icon}
            </div>
            <div>
              <h2 className="text-sm text-gray-600 font-medium mb-1">
                {card.title}
              </h2>
              <p className={`text-2xl md:text-3xl font-bold ${card.text}`}>
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          to="/admin/products/add"
          className="bg-blue-600 text-white flex items-center justify-center gap-3 py-4 px-6 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <FaPlusCircle /> Add New Product
        </Link>
        <Link
          to="/admin/products"
          className="bg-gray-800 text-white flex items-center justify-center gap-3 py-4 px-6 rounded-lg shadow hover:bg-gray-900 transition"
        >
          <FaEye /> View All Products
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="mt-12 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b text-gray-700">
              <th className="py-2">Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, i) => (
              <tr key={i} className="border-b hover:bg-gray-50 transition">
                <td className="py-2">{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.total}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;
