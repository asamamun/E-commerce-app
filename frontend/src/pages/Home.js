import React from 'react';

const Home = () => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Welcome to Our E-Commerce Store
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-gray-500">
            Discover amazing products at great prices
          </p>
          <div className="mt-10 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <a
                href="/products"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;