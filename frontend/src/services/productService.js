import api from './api';

class ProductService {
  // Get all products
  static async getProducts() {
    const response = await api.get('/products');
    return response.data;
  }

  // Get single product
  static async getProduct(id) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  }

  // Create product
  static async createProduct(productData) {
    const response = await api.post('/products', productData);
    return response.data;
  }

  // Update product
  static async updateProduct(id, productData) {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  }

  // Delete product
  static async deleteProduct(id) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  }
}

export default ProductService;