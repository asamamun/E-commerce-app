import api from './api';

class UserService {
  // Get all users
  static async getUsers() {
    const response = await api.get('/users');
    return response;
  }

  // Get user by ID
  static async getUser(id) {
    const response = await api.get(`/users/${id}`);
    return response;
  }

  // Update user
  static async updateUser(id, userData) {
    const response = await api.put(`/users/${id}`, userData);
    return response;
  }

  // Update profile (current user)
  static async updateProfile(userData) {
    const response = await api.put('/users/profile', userData);
    return response;
  }

  // Delete user
  static async deleteUser(id) {
    const response = await api.delete(`/users/${id}`);
    return response;
  }
}

export default UserService;