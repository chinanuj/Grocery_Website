import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(1);
  const [image, setImage] = useState(null);
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const MAX_FILE_SIZE = 45 * 1024; // 45KB to stay safely under EmailJS 50KB limit

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const resizeImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Resize image to maintain aspect ratio
          const MAX_DIMENSION = 800; // Adjust as per your requirement
          if (width > height && width > MAX_DIMENSION) {
            height = (height * MAX_DIMENSION) / width;
            width = MAX_DIMENSION;
          } else if (height > MAX_DIMENSION) {
            width = (width * MAX_DIMENSION) / height;
            height = MAX_DIMENSION;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Compress the image
          let quality = 0.9; // Start with high quality
          let dataUrl = canvas.toDataURL('image/jpeg', quality);

          // Decrease quality until the file size is within the limit
          while (dataUrl.length > MAX_FILE_SIZE && quality > 0.1) {
            quality -= 0.1;
            dataUrl = canvas.toDataURL('image/jpeg', quality);
          }

          if (dataUrl.length > MAX_FILE_SIZE) {
            reject(new Error('Unable to compress image to required size'));
          } else {
            resolve(dataUrl);
          }
        };
        img.onerror = reject;
        img.src = event.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setAlert({ type: 'danger', message: 'Please upload an image file' });
        return;
      }

      try {
        const resizedImage = await resizeImage(file);
        setImage(resizedImage);
        setAlert({ type: 'success', message: 'Image processed successfully' });
      } catch (error) {
        setAlert({
          type: 'danger',
          message: 'Could not process image. Please try a smaller image.'
        });
        // Reset file input
        e.target.value = '';
        setImage(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const emailParams = {
        to_name: name,
        from_email: email,
        message: message,
        rating: rating,
        image_attachment: image
      };

      console.log(emailParams);

      const response = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        emailParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setAlert({ type: 'success', message: 'Message sent successfully!' });
        // Reset form
        setName('');
        setEmail('');
        setMessage('');
        setRating(1);
        setImage(null);
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
      }
    } catch (error) {
      setAlert({
        type: 'danger',
        message: 'Failed to send message. Please try again with a smaller image.'
      });
      console.error(error);
    } finally {
      setIsLoading(false);
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center items-center justify-center"
      style={{ backgroundImage: 'url(/api/placeholder/1600/900)' }}
    >
      <div className="container mx-auto px-6 py-12 max-w-2xl">
        <motion.h1
          className="text-4xl font-bold text-center mb-6 text-green-700"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h1>

        <AnimatePresence>
          {alert && (
            <motion.div
              className={`fixed top-16 right-4 p-4 rounded-md shadow-lg ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                } text-white`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {alert.message}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 space-y-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="your.email@example.com"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-32"
              placeholder="Your message here..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value={1}>1 - Very Bad</option>
              <option value={2}>2 - Bad</option>
              <option value={3}>3 - Neutral</option>
              <option value={4}>4 - Good</option>
              <option value={5}>5 - Excellent</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Upload Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              Max file size: 50KB. Larger images will be automatically resized.
            </p>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-2 rounded-lg transition duration-200 ${isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
              } text-white font-semibold`}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
