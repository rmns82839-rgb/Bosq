import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../services/authService';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (email, password) => {
  set({ isLoading: true, error: null });
  try {
    const response = await authService.login(email, password);
    const data = response.data; // <-- aquí está el fix
    set({ user: data.user, token: data.token, isLoading: false });
    return data;
  } catch (error) {
    set({ error: error.response?.data?.error || 'Error al iniciar sesión', isLoading: false });
    throw error;
  }
},

      register: async (name, email, password) => {
  set({ isLoading: true, error: null });
  try {
    const response = await authService.register(name, email, password);
    const data = response.data; // <-- mismo fix
    set({ user: data.user, token: data.token, isLoading: false });
    return data;
  } catch (error) {
    set({ error: error.response?.data?.error || 'Error al registrar usuario', isLoading: false });
    throw error;
  }
},

      logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem('auth-storage');
      },

      checkAuth: async () => {
        const { token } = get();
        if (!token) return false;
        try {
          const user = await authService.getProfile(token);
          set({ user });
          return true;
        } catch (error) {
          set({ user: null, token: null });
          return false;
        }
      }
    }),
    { name: 'auth-storage' }
  )
);
