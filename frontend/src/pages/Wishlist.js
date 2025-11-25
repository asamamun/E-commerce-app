import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getWishlist, removeFromWishlist } from '../features/wishlistSlice';
import { addToCart } from '../features/cartSlice';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlist, isLoading, isError, message } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
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
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
        
        {wishlist && wishlist.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl mb-4">Your wishlist is empty</p>
            <Link 
              to="/products" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist && wishlist.map((item) => (
              <div key={item.product._id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex-shrink-0 w-full h-48 bg-gray-200 rounded-md overflow-hidden">
                  <img 
                    src={item.product.imageUrl} 
                    alt={item.product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">{item.product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{item.product.description.substring(0, 100)}...</p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-lg font-medium text-gray-900">${item.product.price.toFixed(2)}</p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => handleAddToCart(item.product)}
                      className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded text-sm hover:bg-indigo-700"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(item.product._id)}
                      className="flex-1 bg-gray-200 text-gray-800 px-3 py-2 rounded text-sm hover:bg-gray-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;