import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';
import { getProducts } from '../features/productSlice';
import { addToCart } from '../features/cartSlice';
import { addToWishlist } from '../features/wishlistSlice';

const Products = () => {
  const dispatch = useDispatch();
  const { products, isLoading, isError, message } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleAddToWishlist = async (product) => {
    try {
      const result = await dispatch(addToWishlist(product._id)).unwrap();
      toast.success(`${product.name} added to wishlist!`, {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.info(`${product.name} is already in your wishlist!`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  if (isLoading) {
    return <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">Loading...</div>;
  }

  if (isError) {
    return <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">Error: {message}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        {!products || products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
            <motion.div 
              key={product._id} 
              className="border rounded-lg shadow-sm flex flex-col h-full hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="p-4 flex-grow">
                <div className="h-48 w-full overflow-hidden rounded-lg bg-gray-200 mb-4 group">
                  <motion.img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover object-center grayscale"
                    whileHover={{ 
                      scale: 1.1,
                      filter: "grayscale(0%)"
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ filter: "grayscale(100%)" }}
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{product.description.substring(0, 100)}...</p>
              </div>
              <div className="p-4 pt-0 border-t mt-auto">
                <p className="text-xl font-bold text-gray-900 mb-3">${product.price.toFixed(2)}</p>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition-colors"
                    title="Add to Cart"
                  >
                    <FaShoppingCart className="mr-2" />
                    Cart
                  </button>
                  <button
                    onClick={() => handleAddToWishlist(product)}
                    className="inline-flex items-center justify-center p-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors"
                    title="Add to Wishlist"
                  >
                    <FaHeart />
                  </button>
                  <Link
                    to={`/products/${product._id}`}
                    className="inline-flex items-center justify-center p-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors"
                    title="View Details"
                  >
                    <FaEye />
                  </Link>
                </div>
              </div>
            </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;