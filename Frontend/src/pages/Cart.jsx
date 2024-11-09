import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Alert from '../components/Alert';
import { AuthContext } from '../context/AuthContext';

const Cart = ({ onNavigate }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState({});
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/cart');
      return;
    }
    fetchCart();
  }, [user, navigate]);

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('http://localhost:5001/api/cart');
      setCart(response.data.cart);
      await fetchProductDetails(response.data.cart);
    } catch (error) {
      setAlert({
        type: 'danger',
        message: error.response?.data?.message || 'Failed to fetch cart.'
      });
      console.error('Error fetching cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProductDetails = async (cartItems) => {
    try {
      const productData = {};
      for (const item of cartItems) {
        const productResponse = await api.get(`http://localhost:5001/api/products/${item.product_id._id}`);
        productData[item.product_id._id] = productResponse.data;
      }
      setProducts(productData);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await api.delete(`http://localhost:5001/api/cart/${productId}`);
      setAlert({ type: 'success', message: response.data.message });
      fetchCart();
    } catch (error) {
      setAlert({
        type: 'danger',
        message: error.response?.data?.message || 'Failed to remove item from cart.'
      });
      console.error('Error removing from cart:', error);
    }
  };

  const placeOrder = async () => {
    try {
      const response = await api.post('http://localhost:5001/api/orders');
      setAlert({ type: 'success', message: response.data.message });
      setCart([]);
    } catch (error) {
      setAlert({
        type: 'danger',
        message: error.response?.data?.message || 'Failed to place order.'
      });
      console.error('Error placing order:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Loading cart...</p>
      </div>
    );
  }

  return (
    <div
      className="container mx-auto px-4 py-8"
      style={{
        backgroundImage: `url(${require('../assets/images/cart.png')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {alert && <Alert type={alert.type} message={alert.message} />}

      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => {
            const product = products[item.product_id._id];
            if (!product) return null;
            return (
              <div key={item.product_id} className="flex justify-between items-center border p-4 rounded">
                <div className="flex items-center space-x-4">
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-gray-600">₹{product.price}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.product_id._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            );
          })}

          <div className="flex justify-between items-center border-t pt-4 mt-4">
            <div className="text-xl font-bold">
              Total: ₹{cart.reduce((total, item) => total + (products[item.product_id._id]?.price * item.quantity), 0)}
            </div>
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
  );
};

export default Cart;
