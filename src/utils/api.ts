
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';


const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (userData: { name: string; email: string; password: string; avatar?: string }) =>
    api.post('/auth/register', userData),
  
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  getProfile: () => api.get('/auth/profile'),
  
  updateProfile: (userData: { name?: string; email?: string; address?: string; university?: string; avatar?: string }) =>
    api.put('/auth/profile', userData),
};

// Colleges API
export const collegesAPI = {
  getAll: (params?: { page?: number; limit?: number; search?: string }) =>
    api.get('/colleges', { params }),
  
  getFeatured: (params?: { limit?: number }) =>
    api.get('/colleges/featured', { params }),
  
  getById: (id: string) => api.get(`/colleges/${id}`),
};

// Admissions API
export const admissionsAPI = {
  create: (admissionData: any) => api.post('/admissions', admissionData),
  
  getMyAdmissions: () => api.get('/admissions/my'),
};

// Reviews API
export const reviewsAPI = {
  create: (reviewData: { rating: number; comment: string; college: string }) =>
    api.post('/reviews', reviewData),
  
  getByCollege: (collegeId: string) => api.get(`/reviews/college/${collegeId}`),
  
  getFeatured: (params?: { limit?: number }) =>
    api.get('/reviews/featured', { params }),
};

export default api;