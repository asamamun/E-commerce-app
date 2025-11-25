import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../features/productSlice';
import { getCategory } from '../features/categorySlice';
import { addToCart } from '../features/cartSlice';

const Category = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const { products, isLoading: productsLoading, isError: productsError, message: productsMessage } = useSelector((state) => state.product);
  const { category, isLoading: categoryLoading, isError: categoryError, message: categoryMessage } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategory(id));
    // In a real app, you would have a specific endpoint to get products by category
    // For now, we'll get all products and filter them on the frontend
    dispatch(getProducts());
  }, [dispatch, id]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // Filter products by category
  const categoryProducts = products.filter(product => product.category === category.name);

  if (categoryLoading || productsLoading) {
    return <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">Loading...</div>;
  }

  if (categoryError || productsError) {
    return <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">Error: {categoryMessage || productsMessage}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-bold mb-4">{category.name}</h1>
        <p className="text-gray-600 mb-6">{category.description}</p>
        
        {categoryProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl mb-4">No products found in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <div key={product._id} className="border rounded-lg p-4 shadow-sm">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 mb-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{product.description.substring(0, 100)}...</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;