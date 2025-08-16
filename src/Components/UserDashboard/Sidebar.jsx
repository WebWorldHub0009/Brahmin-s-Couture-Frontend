import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaShoppingBag,
  FaHeart,
  FaAddressBook,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef();
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Dashboard",
      path: "/user/dashboard",
      icon: <FaHome />,
      description: "Overview of your account",
    },
    {
      label: "Orders",
      path: "/user/orders",
      icon: <FaShoppingBag />,
      description: "Track and manage purchases",
    },
    {
      label: "Wishlist",
      path: "/user/wishlist",
      icon: <FaHeart />,
      description: "Saved products you love",
    },
    {
      label: "Addresses",
      path: "/user/address",
      icon: <FaAddressBook />,
      description: "Manage delivery locations",
    },
    {
      label: "Profile",
      path: "/user/profile",
      icon: <FaUser />,
      description: "Edit personal information",
    },
  ];

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleTabClick = () => {
    if (window.innerWidth < 768) setIsOpen(false);
  };

  return (
    <div className="h-screen">
      {/* Hamburger Icon */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-2xl text-gray-800"
        onClick={() => setIsOpen(true)}
      >
        <FaBars />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity md:hidden" />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-white to-gray-100 shadow-md z-50 transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex`}
      >
        <div className="flex flex-col h-full w-full">
          {/* Top - Branding & Home */}
          <div className="p-6 pb-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">User Panel</h2>
              <button
                className="text-xl text-gray-600 md:hidden"
                onClick={() => setIsOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <button
              onClick={() => navigate("/")}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-blue-700 font-medium hover:bg-blue-50 transition"
            >
              <FaArrowLeft />
              Go to Home
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1 px-4 mt-4 flex-grow">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                onClick={handleTabClick}
                className={({ isActive }) =>
                  `flex flex-col px-4 py-3 rounded-lg transition ${
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`
                }
              >
                <div className="flex items-center gap-3 font-medium">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-8">{item.description}</p>
              </NavLink>
            ))}
          </nav>

          {/* Logout - Sticky Bottom */}
          <div className="px-4 py-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-red-600 font-medium hover:bg-red-50 transition"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
