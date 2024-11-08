// frontend/src/pages/Contact.jsx
import React, { useState } from 'react';
import Alert from '../components/Alert';
import api from '../utils/api';
import { motion } from 'framer-motion';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/contact', { name, email, message });
      if (response.data.message) {
        setAlert({ type: 'success', message: response.data.message });
        setName('');
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      setAlert({ type: 'danger', message: 'Failed to send message.' });
      console.error(error);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(https://source.unsplash.com/1600x900/?grocery,food)' }} // Example background image
    >
      <div className="flex-grow container mx-auto px-6 py-12">
        <motion.h1
          className="text-4xl font-bold text-center mb-6 text-green-700"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h1>
        {alert && <Alert type={alert.type} message={alert.message} />}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 w-full"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
