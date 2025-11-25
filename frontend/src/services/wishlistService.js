import api from './api';

class WishlistService {
  // Get user's wishlist
  static async getWishlist() {
    const response = await api.get('/wishlist');
    return response;
  }

  // Add item to wishlist
  static async addToWishlist(productId) {
    const response = await api.post('/wishlist', { productId });
    return response;
  }

  // Remove item from wishlist
  static async removeFromWishlist(productId) {
    const response = await api.delete(`/wishlist/${productId}`);
    return response;
  }
}

export default WishlistService;