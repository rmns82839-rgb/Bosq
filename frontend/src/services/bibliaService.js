import api from './api';

export const bibliaService = {
  buscar: (referencia) => api.get(`/biblia/buscar/${encodeURIComponent(referencia)}`),
  aleatorio: () => api.get('/biblia/random'),
};