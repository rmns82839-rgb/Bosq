import api from './api';

export const bosquejoService = {
  getAll: () => api.get('/bosquejos'),
  getById: (id) => api.get(`/bosquejos/${id}`),
  create: (data) => api.post('/bosquejos', data),
  update: (id, data) => api.put(`/bosquejos/${id}`, data),
  delete: (id) => api.delete(`/bosquejos/${id}`),
};
