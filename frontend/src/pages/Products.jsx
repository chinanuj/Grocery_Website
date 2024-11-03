// frontend/src/pages/Cart.jsx
import React, { useEffect, useState, useContext } from 'react';
import api from '../utils/api';
import Alert from '../components/Alert';
import { AuthContext } from '../context/AuthContext';

const Products = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('http://localhost:5000/api/products');
      setProducts(response.data.products);
    } catch (error) {
      setAlert({ 
        type: 'danger', 
        message: error.response?.data?.message || 'Failed to fetch products.'
      });
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = async (productId) => {
    try {
      console.log(productId);
      if (!user) {
        setAlert({ type: 'warning', message: 'Please login to add items to cart.' });
        return;
    }
      
      const response = await api.post('http://localhost:5000/api/cart/add', { 
        product_id: productId,
        quantity: 1
      });
      
      setAlert({ 
        type: 'success', 
        message: response.data.message || 'Product added to cart!'
      });
    } catch (error) {
      setAlert({ 
        type: 'danger', 
        message: error.response?.data?.message || 'Failed to add item to cart.'
      });
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {alert && <Alert type={alert.type} message={alert.message} />}
      
      <h2 className="text-2xl font-bold mb-6">Our Products</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg">
            {product.image_url && (
              <img
                src={`${product.image_url}`}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">₹{product.price}</span>
                <button
                  onClick={() => addToCart(product.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Add to Cart
              </button>
            </div>
          </div>
          </div>
        ))}
      </div>
      
      {products.length === 0 && !alert && (
        <p className="text-center text-gray-500 mt-8">No products available.</p>
      )}
    </div>
  );
};

export default Products;