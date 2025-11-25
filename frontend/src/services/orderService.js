import api from './api';

class OrderService {
  // Create new order
  static async createOrder(orderData) {
    const response = await api.post('/orders', orderData);
    return response;
  }

  // Get order by ID
  static async getOrder(id) {
    const response = await api.get(`/orders/${id}`);
    return response;
  }

  // Get logged in user orders
  static async getMyOrders() {
    const response = await api.get('/orders/myorders');
    return response;
  }

  // Update order to paid
  static async payOrder(orderId, paymentResult) {
    const response = await api.put(`/orders/${orderId}/pay`, paymentResult);
    return response;
  }

  // Update order to delivered
  static async deliverOrder(orderId) {
    const response = await api.put(`/orders/${orderId}/deliver`);
    return response;
  }

  // Get all orders (admin)
  static async getOrders() {
    const response = await api.get('/orders');
    return response;
  }
}

export default OrderService;