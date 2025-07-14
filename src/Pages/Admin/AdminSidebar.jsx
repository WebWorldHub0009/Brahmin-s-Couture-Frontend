import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaTachometerAlt,
  FaBoxOpen,
  FaPlusCircle,
  FaClipboardList,
  FaUsers,
  FaInfoCircle,
  FaTools,
} from "react-icons/fa";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

const AdminSidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isOpen &&
        !e.target.closest(".sidebar-panel") &&
        !e.target.closest(".toggle-btn")
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  const linkClasses = (path) =>
    `group flex items-center gap-3 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
      location.pathname === path
        ? "bg-gradient-to-r from-[#B02E0C] to-[#7a1600] text-white shadow-md"
        : "text-gray-700 hover:bg-gray-100 hover:pl-5"
    }`;

  return (
    <>
      {/* Hamburger Icon */}
      {!isOpen && (
        <div className="md:hidden fixed top-4 left-4 z-[999] toggle-btn">
          <button
            onClick={toggleSidebar}
            className="bg-[#B02E0C] text-white p-2 rounded-full shadow-md hover:scale-110 transition"
          >
            <HiOutlineMenuAlt3 size={22} />
          </button>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40 backdrop-blur-sm"></div>
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 z-50 w-72 h-full bg-white shadow-xl border-r transform transition-transform duration-300 ease-in-out sidebar-panel
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:w-64`}
      >
        {/* Sticky Wrapper */}
        <div className="flex flex-col h-full p-6">
          {/* Close Button */}
          <div className="md:hidden absolute top-4 right-4 z-[1000]">
            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-red-500 transition"
            >
              <HiOutlineX size={26} />
            </button>
          </div>

          {/* Header */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6 tracking-wide">
            Admin Panel
          </h2>

          {/* 🏠 Home Button */}
          <Link
            to="/"
            className="mb-4 block px-4 py-2 rounded-md font-medium text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition"
          >
            <FaHome size={16} />
            Go to Home
          </Link>

          {/* Scrollable Content with scrollbar hidden */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-6 hide-scrollbar">
            {/* Main */}
            <div>
              <h4 className="text-xs text-gray-500 uppercase mb-2">Main</h4>
              <nav className="space-y-2">
                <Link to="/admin/dashboard" className={linkClasses("/admin/dashboard")}>
                  <FaTachometerAlt size={16} />
                  Dashboard
                </Link>
                <Link to="/admin/products" className={linkClasses("/admin/products")}>
                  <FaBoxOpen size={16} />
                  Products
                </Link>
                <Link to="/admin/products/add" className={linkClasses("/admin/products/add")}>
                  <FaPlusCircle size={16} />
                  Add Product
                </Link>
              </nav>
            </div>

            {/* Orders */}
            <div>
              <h4 className="text-xs text-gray-500 uppercase mb-2">Orders</h4>
              <nav className="space-y-2">
                <Link to="/admin/orders" className={linkClasses("/admin/orders")}>
                  <FaClipboardList size={16} />
                  Manage Orders
                </Link>
              </nav>
            </div>

            {/* Customers */}
            <div>
              <h4 className="text-xs text-gray-500 uppercase mb-2">Customers</h4>
              <nav className="space-y-2">
                <Link to="/admin/customers" className={linkClasses("/admin/customers")}>
                  <FaUsers size={16} />
                  Manage Customers
                </Link>
              </nav>
            </div>

            {/* Info */}
            <div>
              <h4 className="text-xs text-gray-500 uppercase mb-2">Quick Info</h4>
              <div className="text-sm text-gray-600 space-y-1 leading-relaxed">
                <p>
                  <FaInfoCircle className="inline mr-2 text-gray-500" />
                  Track orders and stock regularly.
                </p>
                <p>
                  <FaTools className="inline mr-2 text-gray-500" />
                  Keep product listings updated.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-xs text-gray-400 border-t pt-4 mt-4">
            &copy; {new Date().getFullYear()} Brahmani's Couture <br />
            Admin Panel v1.0
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
