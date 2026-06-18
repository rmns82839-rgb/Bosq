import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './stores/authStore';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Bosquejos from './pages/Bosquejos';
import NuevoBosquejo from './pages/NuevoBosquejo';
import EditarBosquejo from './pages/EditarBosquejo';
import VerBosquejo from './pages/VerBosquejo';
import BuscarBiblia from './pages/BuscarBiblia';

const queryClient = new QueryClient();

function App() {
  const { token } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/bosquejos" element={<ProtectedRoute><Bosquejos /></ProtectedRoute>} />
          <Route path="/bosquejos/nuevo" element={<ProtectedRoute><NuevoBosquejo /></ProtectedRoute>} />
          <Route path="/bosquejos/:id" element={<ProtectedRoute><VerBosquejo /></ProtectedRoute>} />
          <Route path="/bosquejos/:id/editar" element={<ProtectedRoute><EditarBosquejo /></ProtectedRoute>} />
          <Route path="/buscar-biblia" element={<ProtectedRoute><BuscarBiblia /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
