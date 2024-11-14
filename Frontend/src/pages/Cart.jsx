import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Package, AlertCircle, CheckCircle, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

// Alert Notification Component
const AlertNotification = ({ alert, onClose }) => {
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert, onClose]);

  if (!alert) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`transform transition-all duration-300 ease-in-out
        ${alert ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        max-w-sm bg-white rounded-lg shadow-lg overflow-hidden`}>
        <div className={`flex items-center gap-3 p-4 border-l-4 ${alert.type === 'error' ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'
          }`}>
          {alert.type === 'error' ? (
            <AlertCircle className="h-5 w-5 text-red-500" />
          ) : (
            <CheckCircle className="h-5 w-5 text-green-500" />
          )}

          <p className={`flex-1 text-sm font-medium ${alert.type === 'error' ? 'text-red-600' : 'text-green-600'
            }`}>
            {alert.message}
          </p>

          <button
            onClick={onClose}
            className={`p-1 rounded-full hover:bg-opacity-20 transition-colors ${alert.type === 'error' ? 'hover:bg-red-200' : 'hover:bg-green-200'
              }`}
          >
            <X className={`h-4 w-4 ${alert.type === 'error' ? 'text-red-500' : 'text-green-500'
              }`} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState({});
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Wrapping fetchCart with useCallback to avoid dependency issues
  const fetchCart = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get('http://localhost:5001/api/cart');
      setCart(response.data.cart);
      await fetchProductDetails(response.data.cart);
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || 'Failed to fetch cart.'
      });
      console.error('Error fetching cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [user, navigate, fetchCart]);

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
      setAlert({
        type: 'error',
        message: 'Failed to fetch product details.'
      });
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await api.delete(`http://localhost:5001/api/cart/${productId}`);
      setAlert({
        type: 'success',
        message: 'Item successfully removed from cart'
      });
      fetchCart();
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || 'Failed to remove item from cart.'
      });
      console.error('Error removing from cart:', error);
    }
  };

  const placeOrder = async () => {
    try {
      await api.post('http://localhost:5001/api/orders');
      setAlert({
        type: 'success',
        message: 'Order placed successfully!'
      });
      setCart([]);
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || 'Failed to place order.'
      });
      console.error('Error placing order:', error);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (products[item.product_id._id]?.price * item.quantity), 0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <AlertNotification
        alert={alert}
        onClose={() => setAlert(null)}
      />

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-blue-500" />
            Your Shopping Cart
          </h1>
          <span className="text-gray-500">
            {cart.length} {cart.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500">Start shopping to add items to your cart.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => {
              const product = products[item.product_id._id];
              if (!product) return null;
              return (
                <div
                  key={item.product_id._id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0">
                        {product.image_url && (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-24 h-24 object-cover rounded-lg shadow-sm"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Quantity: {item.quantity}</span>
                          <span>•</span>
                          <span className="font-medium text-blue-600">₹{product.price}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product_id._id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="bg-white rounded-lg shadow-sm mt-8">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="space-y-1">
                    <p className="text-lg font-medium text-gray-900">Order Summary</p>
                    <p className="text-sm text-gray-500">{cart.length} items in cart</p>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    ₹{calculateTotal().toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={placeOrder}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
