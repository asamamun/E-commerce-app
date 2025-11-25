import api from './api';

class AnalyticsService {
  // Get dashboard analytics
  getDashboardAnalytics() {
    return api.get('/analytics');
  }
}

const analyticsServiceInstance = new AnalyticsService();
export default analyticsServiceInstance;