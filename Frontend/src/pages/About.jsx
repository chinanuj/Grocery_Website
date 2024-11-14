import React from 'react';
import { motion } from 'framer-motion';
import { Store, Clock, Users, MapPin, Award, Heart, ShieldCheck, Smile, School } from 'lucide-react';

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [

    {
      icon: <Store className="w-8 h-8 text-green-600" />,
      title: "Campus Partnerships",
      description: "Exclusive partnerships with S-mart to bring you the best of campus convenience."
    },
    {
      icon: <Clock className="w-8 h-8 text-green-600" />,
      title: "Quick Delivery",
      description: "Swift delivery service within IIT Jodhpur campus, making your life easier."
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Student-Focused",
      description: "Designed specifically for the IITJ community, understanding student needs and schedules."
    },
    {
      icon: <MapPin className="w-8 h-8 text-green-600" />,
      title: "Campus Coverage",
      description: "Complete coverage of all hostels and residential areas within IITJ campus."
    }
  ];

  return (

    <div className="min-h-screen">
      {/* Faded Grocery Background Header */}
      <motion.div
        className="relative h-[500px] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `
        url('https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80')
      `,
          filter: 'contrast(1)',  // Increase contrast for sharper image
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </motion.div>
 

    


      {/* Mission Statement */}
      <motion.div 
        className="container mx-auto px-6 py-16 -mt-32 relative z-10 bg-white/80 backdrop-blur-sm rounded-t-3xl"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Farm-Fresh was born from a simple observation: IIT Jodhpur students needed an easier way to access groceries and daily essentials. We bridge this gap by connecting the campus community with KB(Kendriya Bhandar) and S-mart, bringing convenience right to your doorstep.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mt-4">
            Our platform simplifies campus life by providing a seamless connection between students and their favorite campus stores. No more long walks or waiting in queues - get what you need, when you need it.
          </p>
        </div>
      </motion.div>

      {/* IITJ-Specific Objective Section */}
      <motion.div 
        className="bg-white py-16"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Our Objective</h2>
          <div className="bg-green-50 p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <School className="w-16 h-16 text-green-600 mb-4" />
                <h3 className="text-2xl font-semibold text-green-700 mb-4">Campus-Centric Solution</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Exclusive partnership with S-mart
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Direct delivery to all campus locations
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Special timings aligned with class schedules
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Student-friendly payment options
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 space-y-4 text-gray-600">
                <p>
                  We understand the unique challenges of campus life at IIT Jodhpur. Our platform is specifically designed to:
                </p>
                <ul className="space-y-2">
                  <li>✓ Save valuable study time</li>
                  <li>✓ Provide convenient access to campus stores</li>
                  <li>✓ Ensure reliable delivery service</li>
                  <li>✓ Maintain product quality and freshness</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div 
        className="container mx-auto px-6 py-16 bg-gray-50"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Values Section */}
      <motion.div 
        className="bg-green-50 py-16"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-12">Our Commitment</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Service</h3>
              <p className="text-gray-600">Reliable delivery you can count on</p>
            </div>
            <div className="text-center">
              <Heart className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Student-First</h3>
              <p className="text-gray-600">Tailored for IITJ campus life</p>
            </div>
            <div className="text-center">
              <ShieldCheck className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Reliability</h3>
              <p className="text-gray-600">Consistent and timely service</p>
            </div>
            <div className="text-center">
              <Smile className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Convenience</h3>
              <p className="text-gray-600">Making campus life easier</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Impact Section */}
      <motion.div 
        className="container mx-auto px-6 py-16"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-6">Our Impact at IITJ</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Making a difference in the IITJ community:
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-4xl font-bold text-green-600 mb-2">2000+</h3>
              <p className="text-gray-600">Students Served</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-4xl font-bold text-green-600 mb-2">2</h3>
              <p className="text-gray-600">Campus Stores Connected</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-4xl font-bold text-green-600 mb-2">30min</h3>
              <p className="text-gray-600">Average Delivery Time</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;