import React, { useEffect, useState, useContext } from 'react';
import api from '../utils/api';
import Alert from '../components/Alert';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowUpDown, Image as ImageIcon } from 'lucide-react';

// Product Card Component with improved image handling
const ProductCard = ({ product, quantity, loading, onUpdateQuantity, onAddToCart }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className="flex-none w-64 border rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="w-full h-48 relative bg-gray-100 group">
        {!imageError ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="animate-pulse flex items-center justify-center w-full h-full">
                  <ImageIcon className="h-12 w-12 text-gray-300" />
                </div>
              </div>
            )}
            <img
              src={product.image_url}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${imageLoading ? 'opacity-0' : 'opacity-100'
                }`}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <ImageIcon className="h-12 w-12 text-gray-300 mx-auto" />
              <p className="text-sm text-gray-500 mt-2">{product.name}</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col h-64">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">{product.description}</p>

        <div className="mt-auto space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
          </div>

          <div className="flex items-center justify-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onUpdateQuantity(product._id, -1)}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
            >
              -
            </button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <button
              onClick={() => onUpdateQuantity(product._id, 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
            >
              +
            </button>
          </div>

          <button
            onClick={() => onAddToCart(product._id)}
            disabled={loading}
            className={`w-full ${loading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
              } text-white px-4 py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center font-medium`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Adding...
              </span>
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Products Component
const Products = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('lowToHigh');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('http://localhost:5001/api/products');
      setProducts(response.data.products);
      const initialQuantities = {};
      response.data.products.forEach(product => {
        initialQuantities[product._id] = 1;
      });
      setQuantities(initialQuantities);
    } catch (error) {
      setAlert({
        type: 'danger',
        message: error.response?.data?.message || 'Failed to fetch products.',
      });
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = (productId, delta) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, Math.min(10, (prev[productId] || 1) + delta))
    }));
  };

  const addToCart = async (productId) => {
    if (!user) {
      setAlert({ type: 'warning', message: 'Please login to add items to cart.' });
      setTimeout(() => {
        navigate('/login');
      }, 1800);
      return;
    }
    console.log(productId);
    setLoading(prev => ({ ...prev, [productId]: true }));

    try {
      const response = await api.post('http://localhost:5001/api/cart/add', {
        product_id: productId,
        quantity: quantities[productId] || 1,
      });

      setAlert({
        type: 'success',
        message: response.data.message || 'Product added to cart!',
      });

      setTimeout(() => {
        setAlert(null);
      }, 1500);
    } catch (error) {
      setAlert({
        type: 'danger',
        message: error.response?.data?.message || 'Failed to add item to cart.',
      });
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(prev => ({ ...prev, [productId]: false }));
    }
  };

  // Get unique categories
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'lowToHigh') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {alert && (
        <div className="fixed top-4 right-4 z-50">
          <Alert type={alert.type} message={alert.message} />
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Our Products</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          {/* Sort Options */}
          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full p-2 pl-10 appearance-none border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
            <ArrowUpDown className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              quantity={quantities[product._id] || 1}
              loading={loading[product._id]}
              onUpdateQuantity={updateQuantity}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      )}

      {!isLoading && sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Products;