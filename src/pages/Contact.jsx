// frontend/src/pages/Contact.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Alert from '../components/Alert';
import api from '../utils/api';

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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        {alert && <Alert type={alert.type} message={alert.message} />}
        <form onSubmit={handleSubmit} className="max-w-lg">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
