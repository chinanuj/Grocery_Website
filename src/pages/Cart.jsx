// frontend/src/pages/Cart.jsx
import React, { useEffect, useState, useContext } from 'react';
import api from '../utils/api';
import Alert from '../components/Alert';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';

const Cart = () => {
  const { user, logout } = useContext(AuthContext); // Removed 'user' as it's unused
  const [cart, setCart] = useState([]);
  const [alert, setAlert] = useState(null);
  // Removed 'drawerOpen', 'setDrawerOpen', 'search', 'setSearch' as they're unused

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await api.get('/api/cart');
      setCart(response.data.cart);
    } catch (error) {
      setAlert({ type: 'danger', message: 'Failed to fetch cart.' });
      console.error(error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await api.delete(`/api/cart/${productId}`);
      if (response.data.message) {
        setAlert({ type: 'success', message: response.data.message });
        fetchCart();
      }
    } catch (error) {
      setAlert({ type: 'danger', message: 'Failed to remove item from cart.' });
      console.error(error);
    }
  };

  const placeOrder = async () => {
    try {
      const response = await api.post('/api/orders');
      if (response.data.message) {
        setAlert({ type: 'success', message: response.data.message });
        setCart([]);
      }
    } catch (error) {
      setAlert({
        type: 'danger',
        message: error.response?.data?.message || 'Failed to place order.',
      });
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {alert && <Alert type={alert.type} message={alert.message} />}
      <div className="container mx-auto my-4 flex-grow">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="mt-4">Your cart is empty.</p>
        ) : (
          <div className="mt-4">
            <ul>
              {cart.map((item) => (
                <li
                  key={item.product_id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div className="flex items-center">
                    <img
                      src={`/static/images/${item.image_url}`}
                      alt={item.product_name}
                      className="w-16 h-16 object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{item.product_name}</h3>
                      <p className="text-gray-500">₹{item.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product_id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between">
              <h3 className="font-bold">
                Total: ₹
                {cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0)}
              </h3>
              <button
                onClick={placeOrder}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
