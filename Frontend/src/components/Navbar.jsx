// frontend/src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext'; // Correct import
import logo from '../assets/images/logo.png';
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

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
              <Link to="/" className="text-gray-600 hover:text-blue-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-gray-600 hover:text-blue-500 transition">
                Products
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-gray-600 hover:text-blue-500 transition">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-600 hover:text-blue-500 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-600 hover:text-blue-500 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Authentication Links */}
        <div className="flex space-x-4">
          {!user ? (
            <>
              <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Login
              </Link>
              <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
