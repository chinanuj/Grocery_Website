import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';


const Home = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      text: "Farm-Fresh has transformed how I shop for groceries. The produce is always fresh and delivery is always on time!",
      role: "Regular Customer"
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      text: "Outstanding service and quality. Their commitment to supporting local farmers really shows in the product quality.",
      role: "Verified Buyer"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      rating: 4,
      text: "Great selection of organic products and the website is super easy to navigate. Highly recommended!",
      role: "Monthly Subscriber"
    },
    {
      id: 4,
      name: "David Wilson",
      rating: 5,
      text: "The freshness guarantee is real! Haven't been disappointed once in 6 months of ordering.",
      role: "Premium Member"
    }
  ];

  const stats = [
    { id: 1, icon: "👥", value: "10,000+", label: "Happy Customers" },
    { id: 2, icon: "🚚", value: "50+", label: "Local Farmers" },
    { id: 3, icon: "🛍️", value: "2,000+", label: "Products" },
    { id: 4, icon: "⭐", value: "4.9", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section with custom background */}
      <motion.div
        className="relative h-96 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80')`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <motion.h1 
                className="text-5xl font-bold mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Welcome to Farm-Fresh
              </motion.h1>
              <motion.p 
                className="text-xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Bringing nature's best directly to your doorstep
              </motion.p>
              <motion.div
                className="mt-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Link to="/Products">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300">
                    Shop Now
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Rest of the component remains the same */}
      {/* Stats Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-4xl mb-4">
                {stat.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-green-700 mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              At Farm-Fresh, we believe everyone deserves access to fresh, high-quality groceries. 
              We work directly with local farmers to bring you the best produce while supporting 
              sustainable farming practices and our local community.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-green-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-12">What Our Customers Say</h2>
          <div className="flex overflow-x-hidden">
            <motion.div 
              className="flex"
              animate={{ 
                x: [-1200, 0],
                transition: {
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                },
              }}
            >
              {[...reviews, ...reviews].map((review, index) => (
                <div 
                  key={`${review.id}-${index}`}
                  className="w-80 flex-shrink-0 mx-4"
                >
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xl">
                        {review.name[0]}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold text-gray-800">{review.name}</h3>
                        <p className="text-sm text-gray-600">{review.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">⭐</span>
                      ))}
                    </div>
                    <p className="text-gray-600">{review.text}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-6 py-16">
        <motion.div 
          className="bg-white p-8 rounded-lg shadow-lg"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-green-700 mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                <span className="text-2xl">🌱</span>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality First</h3>
                <p className="text-gray-600">We carefully select and verify all our products to ensure you receive only the best.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                <span className="text-2xl">🤝</span>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Support</h3>
                <p className="text-gray-600">We partner with local farmers and businesses to strengthen our community.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                <span className="text-2xl">🚚</span>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Reliable Delivery</h3>
                <p className="text-gray-600">Fast and careful delivery to ensure your groceries arrive fresh and on time.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                <span className="text-2xl">💚</span>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Sustainability</h3>
                <p className="text-gray-600">Committed to eco-friendly practices and reducing our environmental impact.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;