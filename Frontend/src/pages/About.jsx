// frontend/src/pages/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
// import teamImage from '../assets/images/team.jpg'; // Add an image of your team or store

const About = () => {
  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(https://source.unsplash.com/1600x900/?grocery,food)' }} // Same background as Contact page
    >
      <motion.div
        className="container mx-auto px-6 py-12 flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-6 text-green-700">About Us</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Welcome to <span className="font-semibold">GroceriesToGo</span>! We are dedicated to providing the freshest and highest quality groceries directly to your doorstep.
          Our mission is to make grocery shopping easier, faster, and more convenient for everyone.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
          <div className="md:w-1/2 mb-6 md:mb-0 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              Our mission is to provide our customers with the best selection of fresh groceries at unbeatable prices. We believe that everyone deserves access to healthy and affordable food.
            </p>
          </div>
          <div className="md:w-1/2">
            {/* <img src={teamImage} alt="Our Team" className="w-full rounded-lg shadow-lg" /> */}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>🌱 Quality: We prioritize sourcing the best products for our customers.</li>
            <li>🤝 Community: We are committed to supporting local farmers and businesses.</li>
            <li>🚚 Convenience: Our easy-to-use platform allows you to shop from the comfort of your home.</li>
            <li>💚 Sustainability: We strive to reduce waste and promote eco-friendly practices.</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
