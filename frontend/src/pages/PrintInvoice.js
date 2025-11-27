import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrder } from '../features/orderSlice';

const PrintInvoice = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const { order, isLoading, isError, message } = useSelector((state) => state.order);

  useEffect(() => {
    if (id) {
      dispatch(getOrder(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    // Automatically print when the component loads and order data is available
    if (order && Object.keys(order).length > 0 && !isLoading) {
      setTimeout(() => {
        window.print();
      }, 500);
    }
  }, [order, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading invoice...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600">Error: {message}</p>
      </div>
    );
  }

  if (!order || Object.keys(order).length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Order not found.</p>
      </div>
    );
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 font-sans print-invoice">
      {/* Invoice Header */}
      <div className="border-b-2 border-gray-300 pb-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
            <p className="text-gray-600 mt-1">Order #{order._id?.substring(0, 8)}</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-gray-800">E-COMMERCE</h2>
            <p className="text-gray-600 mt-1">123 Business Street</p>
            <p className="text-gray-600">City, State 12345</p>
            <p className="text-gray-600">contact@ecommerce.com</p>
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Bill To:</h3>
          <p className="text-gray-700">{order.user?.name}</p>
          <p className="text-gray-700">{order.shippingAddress?.address}</p>
          <p className="text-gray-700">{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
          <p className="text-gray-700">{order.shippingAddress?.country}</p>
          <p className="text-gray-700 mt-2">{order.user?.email}</p>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Invoice Date:</p>
              <p className="font-medium">{formatDate(order.createdAt)}</p>
            </div>
            <div>
              <p className="text-gray-600">Payment Method:</p>
              <p className="font-medium">{order.paymentMethod}</p>
            </div>
            <div>
              <p className="text-gray-600">Order Status:</p>
              <p className="font-medium capitalize">{order.orderStatus || 'pending'}</p>
            </div>
            {order.transactionId && (
              <div>
                <p className="text-gray-600">Transaction ID:</p>
                <p className="font-medium">{order.transactionId}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left py-2 px-4">Item</th>
              <th className="text-right py-2 px-4">Price</th>
              <th className="text-center py-2 px-4">Quantity</th>
              <th className="text-right py-2 px-4">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems?.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-3 px-4">
                  <p className="font-medium">{item.product?.name || 'Product'}</p>
                </td>
                <td className="py-3 px-4 text-right">{formatCurrency(item.price)}</td>
                <td className="py-3 px-4 text-center">{item.quantity}</td>
                <td className="py-3 px-4 text-right">{formatCurrency(item.price * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Summary */}
      <div className="ml-auto w-full max-w-xs">
        <div className="border-t-2 border-gray-300 pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">{formatCurrency(order.itemsPrice)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Shipping:</span>
            <span className="font-medium">{formatCurrency(order.shippingPrice)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Tax:</span>
            <span className="font-medium">{formatCurrency(order.taxPrice)}</span>
          </div>
          <div className="flex justify-between mt-4 pt-4 border-t-2 border-gray-300">
            <span className="text-lg font-bold text-gray-800">Total:</span>
            <span className="text-lg font-bold text-gray-800">{formatCurrency(order.totalPrice)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t-2 border-gray-300 text-center text-gray-600">
        <p>Thank you for your business!</p>
        <p className="mt-1">This invoice was generated on {formatDate(new Date())}</p>
      </div>
    </div>
  );
};

export default PrintInvoice;