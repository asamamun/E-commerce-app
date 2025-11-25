import api from './api';

class UploadService {
  // Upload image
  static async uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  }
}

export default UploadService;