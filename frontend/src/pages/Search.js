import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../features/productSlice';
import { addToCart } from '../features/cartSlice';

const Search = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') || '';
  
  const { products, isLoading, isError, message } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts(searchTerm));
  }, [dispatch, searchTerm]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">Loading...</div>;
  }

  if (isError) {
    return <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">Error: {message}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-bold mb-4">
          Search Results for "{searchTerm}"
        </h1>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl mb-4">No products found matching your search</p>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-6">
              Found {filteredProducts.length} product(s)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
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
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;