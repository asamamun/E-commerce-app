import api from './api';

class PaymentService {
  // Get payment configuration
  static async getPaymentConfig() {
    const response = await api.get('/payment/config');
    return response;
  }

  // Process payment
  static async processPayment(paymentData) {
    const response = await api.post('/payment/process', paymentData);
    return response;
  }
}

export default PaymentService;