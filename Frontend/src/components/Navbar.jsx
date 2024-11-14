// frontend/src/components/Navbar.jsx
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa'; // Import user icon
import logo from '../assets/images/logo.png';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference to dropdown for click outside detection

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup event listener on unmount
    };
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <motion.nav
      className="bg-white shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src={logo} alt="GroceriesToGo Logo" className="h-10 w-10 mr-2" />
          <span className="font-semibold text-xl text-gray-800">FarmFresh</span>
        </div>

        {/* Navigation Links */}
        <div>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-gray-600 hover:text-blue-500 transition">Home</Link>
            </li>
            <li>
              <Link to="/products" className="text-gray-600 hover:text-blue-500 transition">Products</Link>
            </li>
            {user && (
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-blue-500 transition">Cart</Link>
              </li>
            )}
            <li>
              <Link to="/about" className="text-gray-600 hover:text-blue-500 transition">About</Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-600 hover:text-blue-500 transition">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          {!user ? (
            <div className="flex space-x-4">
              <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Login</Link>
              <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition">Sign Up</Link>
            </div>
          ) : (
            <div
              className="cursor-pointer flex items-center text-gray-600"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              <FaUserCircle size={28} className="text-blue-500" /> {/* Profile icon */}
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-32 w-48 bg-white rounded-md shadow-lg z-10"
                >
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
                  <Link to="/order-history" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Order History</Link>
                  <Link to="/wishlist" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Wishlist</Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};


export default Navbar;
