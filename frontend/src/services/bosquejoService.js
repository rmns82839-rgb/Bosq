import api from './api';

export const bosquejoService = {
  getAll: () => api.get('/bosquejos').then(res => res.data),
  getById: (id) => api.get(`/bosquejos/${id}`).then(res => res.data),
  create: (data) => api.post('/bosquejos', data).then(res => res.data),
  update: (id, data) => api.put(`/bosquejos/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/bosquejos/${id}`).then(res => res.data),
};

