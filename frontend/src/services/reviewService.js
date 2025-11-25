import api from './api';

class ReviewService {
  // Get reviews for a product
  getProductReviews(productId) {
    return api.get(`/reviews/product/${productId}`);
  }

  // Add a review
  addReview(reviewData) {
    return api.post('/reviews', reviewData);
  }

  // Update a review
  updateReview(reviewId, reviewData) {
    return api.put(`/reviews/${reviewId}`, reviewData);
  }

  // Delete a review
  deleteReview(reviewId) {
    return api.delete(`/reviews/${reviewId}`);
  }
}

const reviewServiceInstance = new ReviewService();
export default reviewServiceInstance;