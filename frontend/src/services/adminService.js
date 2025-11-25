import api from './api';

class AdminService {
  // Reviews
  getAllReviews() {
    return api.get('/admin/reviews');
  }

  deleteReview(reviewId) {
    return api.delete(`/admin/reviews/${reviewId}`);
  }
}

const adminServiceInstance = new AdminService();
export default adminServiceInstance;