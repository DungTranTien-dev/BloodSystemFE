import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa6';

const NavLink = ({ children, onClick }) => (
  <li
    className="font-medium text-slate-700 hover:text-red-600 transition-colors duration-300 cursor-pointer"
    onClick={onClick}
  >
    {children}
  </li>
);

function Header() {
  const navigate = useNavigate();
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef();

  // Close popover when click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setShowPopover(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <FaHeartbeat className="h-8 w-8 text-red-600" />
            <span className="ml-3 text-2xl font-bold text-slate-800">
              Life<span className="text-pink-600">Stream</span>
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex items-center space-x-8 font-semibold text-base">
              <NavLink onClick={() => navigate("/")}>Home</NavLink>

              {/* Popover News */}
              <li className="relative" ref={popoverRef}>
                <div
                  onClick={() => setShowPopover(!showPopover)}
                  className="flex items-center text-slate-700 hover:text-red-600 transition-colors duration-300 cursor-pointer"
                >
                  News <FaChevronDown className="ml-1 text-sm" />
                </div>

                {showPopover && (
                  <div className="absolute top-full left-0 mt-3 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in-down">
                    <div
                      className="px-4 py-2 hover:bg-gray-100 text-slate-700 cursor-pointer"
                      onClick={() => {
                        navigate("/news");
                        setShowPopover(false);
                      }}
                    >
                      News
                    </div>
                    <div
                      className="px-4 py-2 hover:bg-gray-100 text-slate-700 cursor-pointer"
                      onClick={() => {
                        navigate("/blog");
                        setShowPopover(false);
                      }}
                    >
                      Blog
                    </div>
                  </div>
                )}
              </li>

              <NavLink onClick={() => navigate("/about-us")}>About Us</NavLink>
              <NavLink onClick={() => navigate("/find-blood")}>Find Blood</NavLink>
            </ul>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <button
              className="px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 hover:shadow-lg hover:shadow-pink-500/40 transform hover:-translate-y-0.5 transition-all duration-300"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="px-3.5 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 hover:shadow-lg hover:shadow-pink-500/40 transform hover:-translate-y-0.5 transition-all duration-300"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
