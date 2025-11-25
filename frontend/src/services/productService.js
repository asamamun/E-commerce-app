import api from './api';

class ProductService {
  // Get all products
  static async getProducts(searchTerm = '') {
    const response = await api.get(`/products${searchTerm ? `?q=${encodeURIComponent(searchTerm)}` : ''}`);
    return response;
  }

  // Get single product
  static async getProduct(id) {
    const response = await api.get(`/products/${id}`);
    return response;
  }

  // Create product
  static async createProduct(productData) {
    const response = await api.post('/products', productData);
    return response;
  }

  // Update product
  static async updateProduct(id, productData) {
    const response = await api.put(`/products/${id}`, productData);
    return response;
  }

  // Delete product
  static async deleteProduct(id) {
    const response = await api.delete(`/products/${id}`);
    return response;
  }
}

export default ProductService;