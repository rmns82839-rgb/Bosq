import { create } from 'zustand';
import { bosquejoService } from '../services/bosquejoService';
import toast from 'react-hot-toast';

export const useBosquejoStore = create((set, get) => ({
  bosquejos: [],
  currentBosquejo: null,
  isLoading: false,
  error: null,

  loadBosquejos: async () => {
    set({ isLoading: true });
    try {
      const response = await bosquejoService.getAll();
      set({ bosquejos: response.data, isLoading: false });
    } catch (error) {
      set({ error: 'Error al cargar bosquejos', isLoading: false });
    }
  },

  loadBosquejo: async (id) => {
    set({ isLoading: true });
    try {
      const response = await bosquejoService.getById(id);
      set({ currentBosquejo: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: 'Error al cargar bosquejo', isLoading: false });
    }
  },

  createBosquejo: async (data) => {
    try {
      const response = await bosquejoService.create(data);
      set((state) => ({ bosquejos: [response.data, ...state.bosquejos] }));
      toast.success('Bosquejo creado correctamente');
      return response.data;
    } catch (error) {
      toast.error('Error al crear bosquejo');
      throw error;
    }
  },

  updateBosquejo: async (id, data) => {
    try {
      const response = await bosquejoService.update(id, data);
      set((state) => ({
        bosquejos: state.bosquejos.map((b) => b.id === id ? response.data : b),
        currentBosquejo: response.data,
      }));
      toast.success('Bosquejo actualizado');
      return response.data;
    } catch (error) {
      toast.error('Error al actualizar bosquejo');
      throw error;
    }
  },

  deleteBosquejo: async (id) => {
    try {
      await bosquejoService.delete(id);
      set((state) => ({ bosquejos: state.bosquejos.filter((b) => b.id !== id) }));
      toast.success('Bosquejo eliminado');
    } catch (error) {
      toast.error('Error al eliminar bosquejo');
      throw error;
    }
  },
}));
