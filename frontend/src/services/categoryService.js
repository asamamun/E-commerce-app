import api from './api';

class CategoryService {
  // Get all categories
  static async getCategories() {
    const response = await api.get('/categories');
    return response;
  }

  // Get single category
  static async getCategory(id) {
    const response = await api.get(`/categories/${id}`);
    return response;
  }

  // Create category
  static async createCategory(categoryData) {
    const response = await api.post('/categories', categoryData);
    return response;
  }

  // Update category
  static async updateCategory(id, categoryData) {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response;
  }

  // Delete category
  static async deleteCategory(id) {
    const response = await api.delete(`/categories/${id}`);
    return response;
  }
}

export default CategoryService;