// frontend/src/components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-800 text-white py-4 mt-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} GroceriesToGo. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
