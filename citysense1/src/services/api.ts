import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const parkingAPI = {
  getSpots: () => api.get('/parking/spots'),
  getAvailableSpots: () => api.get('/parking/spots/available'),
  getSpot: (id: number) => api.get(`/parking/spots/${id}`),
};

export const sessionAPI = {
  start: (spotId: number) => api.post('/sessions/start', { parking_spot: spotId }),
  end: (sessionId: number) => api.post('/sessions/end', { session_id: sessionId }),
  getUserSessions: () => api.get('/sessions/user'),
};

export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
};

export default api;
