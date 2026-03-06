import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const parkingAPI = {
  getSpots: () => api.get('/parking/spots'),
  getAvailableSpots: () => api.get('/parking/spots/available'),
  getSpot: (id) => api.get(`/parking/spots/${id}`),
};

export const sessionAPI = {
  start: (spotId) => api.post('/sessions/start', { parking_spot: spotId }),
  end: (sessionId) => api.post('/sessions/end', { session_id: sessionId }),
  getUserSessions: () => api.get('/sessions/user'),
};

export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
};

export default api;
