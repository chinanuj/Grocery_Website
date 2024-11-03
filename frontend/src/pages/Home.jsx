// frontend/src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import chefImage from '../assets/images/chef-image.png';
import fastDeliveryIcon from '../assets/images/fast-delivery-icon.png';
import googlePlay from '../assets/images/google-play.png';
import appStore from '../assets/images/app-store.png';

const Home = () => {
  return (
    <div>
      <section className="bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-6 py-12">
          {/* Hero Text */}
          <div className="flex flex-col w-full md:w-1/2 justify-center items-start text-left">
            <h1 className="text-5xl font-bold leading-tight">
              Make a healthy life with <span className="text-green-500">fresh grocery.</span>
            </h1>
            <br />
            <p className="text-2xl my-4 text-gray-700">
              Get the best quality and freshest grocery products in the world. You can get them all using our website.
            </p>
            <br />
            <Link
              to="/products"
              className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition"
            >
              Shop Now
            </Link>
            <div className="flex items-center mt-6">
              <img src={fastDeliveryIcon} alt="Fast Delivery" className="h-10 w-10 mr-2" />
              <p className="text-gray-700">Fast Delivery – Within 30 min at your Doorstep</p>
            </div>
            <br />
            <br />

            <div className="flex space-x-4 mt-4">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={googlePlay} alt="Google Play" className="h-12" />
              </a>
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={appStore} alt="App Store" className="h-12" />
              </a>
            </div>
          </div>
          {/* Hero Image with Animation */}
          <div className="w-full md:w-1/2 py-6 text-center">
            <motion.img
              src={chefImage}
              alt="Chef holding vegetables"
              className="w-full md:w-4/5 z-10"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
