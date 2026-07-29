import { create } from 'zustand';
import { bosquejoService } from '../services/bosquejoService';

// Caché en localStorage: al abrir la app, la lista se pinta de inmediato
// con lo que ya había, sin esperar la red. La versión fresca del backend
// llega en segundo plano y actualiza tanto la pantalla como la caché.
const CACHE_KEY = 'bosqu_bosquejos_cache_v1';

function leerCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null; // localStorage no disponible o dato corrupto — sin caché, no es crítico
  }
}

function guardarCache(bosquejos) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(bosquejos));
  } catch {
    // localStorage lleno o bloqueado — seguimos funcionando sin caché
  }
}

export const useBosquejoStore = create((set, get) => ({
  bosquejos: [],
  currentBosquejo: null,
  isLoading: false,
  error: null,

  // ===== SETTER =====
  setCurrentBosquejo: (bosquejo) => set({ currentBosquejo: bosquejo }),

  // ===== LOAD ALL (con caché instantánea + refresco en segundo plano) =====
  loadBosquejos: async () => {
    const cache = leerCache();
    if (cache) {
      // Ya hay algo que mostrar — nada de spinner, se ve de inmediato.
      set({ bosquejos: cache, error: null });
    } else {
      set({ isLoading: true, error: null });
    }

    try {
      const data = await bosquejoService.getAll();
      const lista = Array.isArray(data) ? data : [];
      set({ bosquejos: lista, isLoading: false });
      guardarCache(lista);
    } catch (error) {
      console.error('Error loading bosquejos:', error);
      // Si ya había caché en pantalla, la dejamos — no la vaciamos por un
      // error de red pasajero. Solo mostramos error si no había nada.
      if (cache) set({ isLoading: false, error: error.message });
      else set({ bosquejos: [], error: error.message, isLoading: false });
    }
  },

  // ===== LOAD BY ID (con validación) =====
  loadBosquejo: async (id) => {
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
      set((state) => {
        const bosquejos = [newBosquejo, ...(state.bosquejos || [])];
        guardarCache(bosquejos);
        return { bosquejos, currentBosquejo: newBosquejo, isLoading: false };
      });
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
      set((state) => {
        const bosquejos = (state.bosquejos || []).map((b) =>
          b.id === id ? updated : b
        );
        guardarCache(bosquejos);
        return { bosquejos, currentBosquejo: updated, isLoading: false };
      });
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
      set((state) => {
        const bosquejos = (state.bosquejos || []).filter((b) => b.id !== id);
        guardarCache(bosquejos);
        return {
          bosquejos,
          currentBosquejo: state.currentBosquejo?.id === id ? null : state.currentBosquejo,
          isLoading: false,
        };
      });
    } catch (error) {
      console.error('Error deleting bosquejo:', error);
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
}));
