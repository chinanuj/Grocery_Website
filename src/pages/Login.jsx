import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Alert from '../components/Alert';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login({ email, password });
    if (response.success) {
      setAlert({ type: 'success', message: 'Logged in successfully!' });
      setTimeout(() => {
        window.location.reload();
        navigate('/');
      }, 2000);
    } else {
      setAlert({ type: 'danger', message: response.message });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center px-4"
      style={{ backgroundImage: 'url(https://source.unsplash.com/1600x900/?grocery,food)' }} // Example background image
    >
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 sm:p-12 rounded-xl shadow-lg w-full max-w-md"
      >
        <motion.h2
          className="text-4xl font-bold mb-8 text-center text-green-700"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Login
        </motion.h2>
        {alert && <Alert type={alert.type} message={alert.message} />}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-6 relative">
          <label className="block text-gray-700 font-semibold mb-2">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div
            className="absolute inset-y-0 right-3 top-7 flex items-center cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <div className="mb-8 text-right">
          <a
            href="/forgot-password" // Adjust link to match your route
            className="text-green-500 hover:text-green-600 text-sm"
          >
            Forgot Password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
