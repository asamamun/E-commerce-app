import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../features/orderSlice';
import { clearCart } from '../features/cartSlice';
import PaymentService from '../services/paymentService';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  
  // Ensure cartItems is always an array
  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
  
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [trxId, setTrxId] = useState('');
  const [orderComment, setOrderComment] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsProcessing(true);
    
    try {
      // Get form data
      const formData = new FormData(e.target);
      const shippingAddress = {
        address: formData.get('address'),
        city: formData.get('city'),
        postalCode: formData.get('postalCode'),
        country: formData.get('country'),
      };
      
      // Validate required fields
      if (!shippingAddress.address || !shippingAddress.city || 
          !shippingAddress.postalCode || !shippingAddress.country) {
        alert('Please fill in all shipping address fields');
        setIsProcessing(false);
        return;
      }
      
      // Validate transaction ID for non-COD payments
      if (paymentMethod !== 'COD' && !trxId.trim()) {
        alert('Transaction ID is required for ' + paymentMethod + ' payments');
        setIsProcessing(false);
        return;
      }
      
      // Create order data
      const orderData = {
        orderItems: safeCartItems.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice: totalAmount,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: totalAmount,
        orderComment: orderComment.trim(),
      };
      
      // Add transaction ID for non-COD payments
      if (paymentMethod !== 'COD') {
        orderData.transactionId = trxId.trim();
      }
      
      // Dispatch create order action
      const result = await dispatch(createOrder(orderData)).unwrap();
      
      // Process payment (for demo purposes, we'll just show a success message)
      // In a real application, you would integrate with actual payment gateways
      if (paymentMethod === 'COD') {
        // For COD, no immediate payment processing needed
        console.log('Cash on Delivery order placed');
      } else {
        // For other payment methods, simulate processing
        await PaymentService.processPayment({
          orderId: result._id,
          paymentMethod,
          transactionId: trxId.trim()
        });
      }
      
      // Clear cart
      dispatch(clearCart());
      
      // Redirect to order confirmation page
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        
        {safeCartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl mb-4">Your cart is empty</p>
            <Link 
              to="/products" 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Shipping Information Form */}
            <div>
              <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Country</label>
                  <input
                    type="text"
                    name="country"
                    required
                    defaultValue="Bangladesh"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                
                {/* Payment Method Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="COD"
                        checked={paymentMethod === 'COD'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-2"
                      />
                      Cash on Delivery (COD)
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bKash"
                        checked={paymentMethod === 'bKash'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-2"
                      />
                      bKash
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Nagad"
                        checked={paymentMethod === 'Nagad'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-2"
                      />
                      Nagad
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Rocket"
                        checked={paymentMethod === 'Rocket'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-2"
                      />
                      Rocket
                    </label>
                  </div>
                </div>
                
                {/* Transaction ID for non-COD payments */}
                {paymentMethod !== 'COD' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                    <input
                      type="text"
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value)}
                      required={paymentMethod !== 'COD'}
                      placeholder="Enter transaction ID"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                )}
                
                {/* Order Comment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Order Instructions (Optional)</label>
                  <textarea
                    value={orderComment}
                    onChange={(e) => setOrderComment(e.target.value)}
                    placeholder="Any special instructions for your order..."
                    rows="3"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full ${isProcessing ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-700'} text-white font-bold py-3 px-4 rounded`}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>
            
            {/* Order Summary */}
            <div>
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="border rounded-lg p-4">
                <div className="space-y-3 mb-4">
                  {safeCartItems.map((item) => (
                    <div key={item._id} className="flex justify-between">
                      <div>
                        <span>{item.name} x {item.quantity}</span>
                      </div>
                      <div>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Payment Method Display */}
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-medium mb-2">Payment Method</h3>
                  <p className="text-gray-700">{paymentMethod}</p>
                  {paymentMethod !== 'COD' && trxId && (
                    <p className="text-gray-700">Transaction ID: {trxId}</p>
                  )}
                </div>
                
                {/* Order Comment Display */}
                {orderComment && (
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-medium mb-2">Order Instructions</h3>
                    <p className="text-gray-700">{orderComment}</p>
                  </div>
                )}
              </div>
              
              <Link 
                to="/cart" 
                className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded text-center mt-4"
              >
                Back to Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;