import { create } from 'zustand';
import { bosquejoService } from '../services/bosquejoService';

export const useBosquejoStore = create((set, get) => ({
  bosquejos: [],
  currentBosquejo: null,
  isLoading: false,
  error: null,

  // ===== SETTER =====
  setCurrentBosquejo: (bosquejo) => set({ currentBosquejo: bosquejo }),

  // ===== LOAD ALL =====
  loadBosquejos: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await bosquejoService.getAll();
      set({ bosquejos: Array.isArray(data) ? data : [], isLoading: false });
    } catch (error) {
      console.error('Error loading bosquejos:', error);
      set({ bosquejos: [], error: error.message, isLoading: false });
    }
  },

  // ===== LOAD BY ID (con validación) =====
  loadBosquejo: async (id) => {
    // ✅ Si no hay ID, no hacer la llamada
    if (!id) {
      console.warn('loadBosquejo called with undefined id');
      set({ error: 'ID de bosquejo no válido', isLoading: false });
      return null;
    }
    set({ isLoading: true, error: null });
    try {
      const data = await bosquejoService.getById(id);
      set({ currentBosquejo: data, isLoading: false });
      return data;
    } catch (error) {
      console.error('Error loading bosquejo:', error);
      set({ error: error.message, isLoading: false });
      return null;
    }
  },

  // ===== CREATE =====
  createBosquejo: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const newBosquejo = await bosquejoService.create(data);
      set((state) => ({
        bosquejos: [newBosquejo, ...(state.bosquejos || [])],
        currentBosquejo: newBosquejo,
        isLoading: false,
      }));
      return newBosquejo;
    } catch (error) {
      console.error('Error creating bosquejo:', error);
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // ===== UPDATE =====
  updateBosquejo: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await bosquejoService.update(id, data);
      set((state) => ({
        bosquejos: (state.bosquejos || []).map((b) =>
          b.id === id ? updated : b
        ),
        currentBosquejo: updated,
        isLoading: false,
      }));
      return updated;
    } catch (error) {
      console.error('Error updating bosquejo:', error);
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // ===== DELETE =====
  deleteBosquejo: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await bosquejoService.delete(id);
      set((state) => ({
        bosquejos: (state.bosquejos || []).filter((b) => b.id !== id),
        currentBosquejo: state.currentBosquejo?.id === id ? null : state.currentBosquejo,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error deleting bosquejo:', error);
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
}));