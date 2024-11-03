// frontend/src/pages/About.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-6 flex-grow">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-gray-700">
          Welcome to GroceriesToGo! We are dedicated to providing the freshest and highest quality groceries directly to your doorstep.
        </p>
        {/* Add more content as needed */}
      </div>
      <Footer />
    </div>
  );
};

export default About;
