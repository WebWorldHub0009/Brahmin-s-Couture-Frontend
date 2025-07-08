import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaSearch,
  FaSignOutAlt,
  FaTimes,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaPinterestP,
  FaXTwitter,
} from "react-icons/fa6";
import { FiShoppingBag } from "react-icons/fi";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const tabs = [
    "Home",
    "Customised Sarees",
    "Handloom Sarees",
    "Pattu Sarees",
    "Customised Family Combo’s",
    "Accessories",
    "Contact",
  ];

  const routeMap = {
    Home: "/",
    "Customised Sarees": "/customised-sarees",
    "Handloom Sarees": "/handloom-saree",
    "Pattu Sarees": "/pattu-saree",
    "Customised Family Combo’s": "/family-combo",
    Accessories: "/accessaries",
    Contact: "/contact",
  };

  // Watch login/logout events
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkAuth(); // check initially
    window.addEventListener("authChange", checkAuth);

    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("authChange", checkAuth);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("authChange")); // inform other components
    navigate("/");
  };

  return (
    <div className="w-full font-sans overflow-x-hidden">
      {/* Top Bar */}
      {!scrolled && (
        <div className="bg-red-900 text-white text-center text-sm py-2 px-2 z-50 w-full">
          <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-6">
            <span className="hidden md:inline">UDYAM-TS-02-0118192</span>
            <span>Contact: +918179941102</span>
            <span>Email: Info@brahmanicouture.com</span>
          </div>
        </div>
      )}

      {/* Desktop Navbar */}
      <div
        className={`bg-[#F9F9F9] border-b border-gray-200 z-[999] w-full transition-all duration-500 ${
          scrolled ? "fixed top-0 py-2 shadow-md" : "relative py-4"
        } hidden md:flex items-center justify-between px-4 md:px-6`}
      >
        {/* Left Social Icons */}
        <div className="flex gap-3 items-center text-xl text-[#2E2E2E]">
          <a href="https://www.facebook.com/sirifashionn/" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://www.instagram.com/brahmani_couture/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://www.youtube.com/@brahmanicouture2023" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          <a href="https://www.linkedin.com/in/brahmaniscouture/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
          <a href="https://in.pinterest.com/Brahmanidesignerboutique/" target="_blank" rel="noopener noreferrer"><FaPinterestP /></a>
          <a href="https://x.com/brahmanicouture" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
        </div>

        {/* Logo */}
        <h2 className="text-xl font-bold">
          Brahmani <span className="text-red-600">Couture</span>
        </h2>

        {/* Right Actions */}
        <div className="flex items-center gap-4 text-xl text-[#2E2E2E]">
          <button className="hover:opacity-70 transition"><FaSearch /></button>

          <Link to="/cart" className="relative hover:opacity-80 transition">
            <FiShoppingBag />
            <span className="absolute -top-2 -right-2 bg-[#B02E0C] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">1</span>
          </Link>

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="flex items-center gap-1 text-sm bg-[#2E2E2E] text-white px-3 py-1.5 rounded hover:bg-[#444]"
              >
                <FaSignInAlt /> Login
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-1 text-sm bg-[#C19A6B] text-white px-3 py-1.5 rounded hover:bg-[#b28858]"
              >
                <FaUserPlus /> Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-sm bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700"
            >
              <FaSignOutAlt /> Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div
        className={`bg-[#F9F9F9] border-b border-gray-200 z-[999] w-full transition-all duration-500 ${
          scrolled ? "fixed top-0 py-2 shadow-md" : "relative py-4"
        } flex md:hidden items-center justify-between px-4`}
      >
        <div className="flex items-center gap-4 text-xl text-[#2E2E2E]">
          <button onClick={() => setMenuOpen(true)}><FaBars /></button>
          <button><FaSearch /></button>
        </div>

        <div className="text-[#2E2E2E] flex items-center justify-center">
          <img src={logo} alt="Logo" className={`${scrolled ? "h-10" : "h-12"} transition-all duration-300 object-contain`} />
        </div>

        <div className="flex items-center gap-4 text-xl text-[#2E2E2E]">
          <Link to="/cart" className="relative hover:opacity-80 transition">
            <FiShoppingBag />
            <span className="absolute -top-2 -right-2 bg-[#B02E0C] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">1</span>
          </Link>
        </div>
      </div>

      {/* Bottom Tabs */}
      <div
        className={`bg-[#1E1E1E] text-white z-[998] w-full transition-all duration-500 ${
          scrolled ? "fixed top-[45px]" : ""
        } hidden md:block`}
      >
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm md:text-base font-medium py-3 px-2 text-center">
          {tabs.map((tab, idx) => (
            <Link
              key={idx}
              to={routeMap[tab]}
              onClick={() => setActiveTab(tab)}
              className="relative text-white hover:text-[#C19A6B] transition-all duration-300 pb-1"
            >
              <span className="z-10 relative">{tab}</span>
              <span className={`absolute left-0 bottom-0 h-[2px] w-full transition-all duration-300 ${
                activeTab === tab ? "bg-white scale-x-100" : "bg-[#C19A6B] scale-x-0 group-hover:scale-x-100"
              }`} />
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#1E1E1E] text-white z-[9999] transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-600">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setMenuOpen(false)} className="text-white text-xl"><FaTimes /></button>
        </div>

        <div className="flex flex-col gap-4 px-4 py-6">
          {tabs.map((tab, idx) => (
            <Link
              key={idx}
              to={routeMap[tab]}
              onClick={() => {
                setActiveTab(tab);
                setMenuOpen(false);
              }}
              className={`text-left transition-all duration-300 pb-1 border-b border-transparent hover:border-[#C19A6B] ${
                activeTab === tab ? "border-[#C19A6B] text-[#C19A6B]" : ""
              }`}
            >
              {tab}
            </Link>
          ))}

          {/* Mobile Auth Buttons */}
          <div className="mt-4 border-t border-gray-500 pt-4 flex flex-col gap-2">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-sm bg-[#2E2E2E] text-white px-3 py-2 rounded hover:bg-[#444]"
                >
                  <FaSignInAlt /> Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-sm bg-[#C19A6B] text-white px-3 py-2 rounded hover:bg-[#b28858]"
                >
                  <FaUserPlus /> Signup
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 text-sm bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
              >
                <FaSignOutAlt /> Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className={`${scrolled ? "mt-[100px] md:mt-[120px]" : ""}`} />
    </div>
  );
};

export default Navbar;
