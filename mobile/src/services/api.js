import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: __DEV__ ? 'http://localhost:3000' : 'https://your-production-api.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token from storage:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(
            `${api.defaults.baseURL}/auth/refresh`,
            { refreshToken }
          );
          
          const { accessToken } = response.data;
          await AsyncStorage.setItem('accessToken', accessToken);
          
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user']);
        // You might want to dispatch a logout action here
      }
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signIn: async (credentials) => {
    const response = await api.post('/auth/signin', credentials);
    return response.data;
  },

  signUp: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  refreshToken: async (refreshToken) => {
    const response = await api.post('/auth/refresh', { refreshToken });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

// Courses API
export const coursesAPI = {
  getUnlockedCourses: async () => {
    const response = await api.get('/courses/unlocked');
    return response.data;
  },

  getCourseLessons: async (courseId) => {
    const response = await api.get(`/courses/${courseId}/lessons`);
    return response.data;
  },

  getAllCourses: async (params = {}) => {
    const response = await api.get('/courses', { params });
    return response.data;
  },
};

// Lessons API
export const lessonsAPI = {
  getLesson: async (lessonId) => {
    const response = await api.get(`/lessons/${lessonId}`);
    return response.data;
  },

  markLessonComplete: async (lessonId) => {
    const response = await api.post(`/lessons/${lessonId}/complete`);
    return response.data;
  },
};

// Quizzes API
export const quizzesAPI = {
  getQuiz: async (quizId) => {
    const response = await api.get(`/quizzes/${quizId}`);
    return response.data;
  },

  submitQuiz: async (quizId, answers) => {
    const response = await api.post(`/quizzes/${quizId}/submit`, { answers });
    return response.data;
  },

  getQuizResults: async (quizId) => {
    const response = await api.get(`/quizzes/${quizId}/results`);
    return response.data;
  },
};

// Coupons API
export const couponsAPI = {
  redeemCoupon: async (couponCode) => {
    const response = await api.post('/coupons/redeem', { code: couponCode });
    return response.data;
  },

  getAvailableCoupons: async () => {
    const response = await api.get('/coupons/available');
    return response.data;
  },
};

// Uploads API (for teachers)
export const uploadsAPI = {
  uploadContent: async (formData) => {
    const response = await api.post('/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getMyUploads: async () => {
    const response = await api.get('/uploads/my-uploads');
    return response.data;
  },

  getUploadStatus: async (uploadId) => {
    const response = await api.get(`/uploads/${uploadId}/status`);
    return response.data;
  },
};

// Users API (for admin)
export const usersAPI = {
  getUsers: async (params = {}) => {
    const response = await api.get('/users', { params });
    return response.data;
  },

  updateUser: async (userId, userData) => {
    const response = await api.patch(`/users/${userId}`, userData);
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  },
};

export default api;