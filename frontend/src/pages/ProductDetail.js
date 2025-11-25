import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../features/productSlice';
import { addToCart } from '../features/cartSlice';
import { addToWishlist } from '../features/wishlistSlice';
import Reviews from '../components/Reviews';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const { product, isLoading, isError, message } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product._id));
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
        {product && Object.keys(product).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="bg-gray-200 rounded-lg overflow-hidden">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-2xl text-indigo-600 font-bold mb-6">${product.price.toFixed(2)}</p>
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Product Details</h2>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-600">Category:</div>
                  <div>{product.category}</div>
                  <div className="text-gray-600">Brand:</div>
                  <div>{product.brand || 'N/A'}</div>
                  <div className="text-gray-600">In Stock:</div>
                  <div>{product.stock > 0 ? `${product.stock} items` : 'Out of stock'}</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`px-6 py-3 rounded-md font-medium ${
                    product.stock === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <button
                  onClick={handleAddToWishlist}
                  className="px-6 py-3 rounded-md font-medium bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl">Product not found</p>
          </div>
        )}
        
        {/* Reviews Section */}
        {product && Object.keys(product).length > 0 && (
          <Reviews productId={product._id} />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;