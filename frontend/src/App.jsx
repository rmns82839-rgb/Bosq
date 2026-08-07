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


import Angelologia from './pages/Angelologia';
import Cristologia from './pages/Cristologia';
import Numerologia from './pages/Numerologia';
import Neumatologia from './pages/Neumatologia';
import Reyes from './pages/Reyes';
import Especiales from './pages/Especiales';
import Patrones from './pages/Patrones';
import JesusEnLibros from './pages/JesusEnLibros';
import BibliaLayout from './components/biblia/BibliaLayout';
import Tabernaculo from './pages/Tabernaculo';
import Salmos from './pages/Salmos'

import BibliaDashboard from './pages/BibliaDashboard';

import CursoDashboard from './pages/CursoDashboard'
import CursoDetalle from './pages/CursoDetalle'
import LeccionVista from './pages/LeccionVista'
import CursoProgreso from './pages/CursoProgreso'


const queryClient = new QueryClient();

function App() {
  const { token } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Toaster position="top-right" />
        <Routes>
          {/* Auth */}
          <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />

          {/* Bosquejos */}
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/bosquejos" element={<ProtectedRoute><Bosquejos /></ProtectedRoute>} />
          <Route path="/bosquejos/nuevo" element={<ProtectedRoute><NuevoBosquejo /></ProtectedRoute>} />
          <Route path="/bosquejos/:id" element={<ProtectedRoute><VerBosquejo /></ProtectedRoute>} />
          <Route path="/bosquejos/:id/editar" element={<ProtectedRoute><EditarBosquejo /></ProtectedRoute>} />
          

          {/* Biblia - Dashboard */}
          <Route path="/biblia" element={<ProtectedRoute><BibliaDashboard /></ProtectedRoute>} />

          

          {/* Biblia - Estudios */}
          <Route path="/biblia/tabernaculo" element={<ProtectedRoute><BibliaLayout titulo="Tabernáculo"><Tabernaculo /></BibliaLayout></ProtectedRoute>} />
          <Route path="/biblia/angelologia" element={<ProtectedRoute><BibliaLayout titulo="Angelología"><Angelologia /></BibliaLayout></ProtectedRoute>} />
          <Route path="/biblia/cristologia" element={<ProtectedRoute><BibliaLayout titulo="Cristología"><Cristologia /></BibliaLayout></ProtectedRoute>} />
          <Route path="/biblia/numerologia" element={<ProtectedRoute><BibliaLayout titulo="Numerología"><Numerologia /></BibliaLayout></ProtectedRoute>} />
          <Route path="/biblia/neumatologia" element={<ProtectedRoute><BibliaLayout titulo="Neumatología"><Neumatologia /></BibliaLayout></ProtectedRoute>} />
          <Route path="/biblia/reyes" element={<ProtectedRoute><BibliaLayout titulo="Reyes"><Reyes /></BibliaLayout></ProtectedRoute>} />
          <Route path="/biblia/especiales" element={<ProtectedRoute><BibliaLayout titulo="Estudios Especiales"><Especiales /></BibliaLayout></ProtectedRoute>} />
          <Route path="/biblia/jesus-en-libros" element={<ProtectedRoute><BibliaLayout titulo="Jesús en Cada Libro"><JesusEnLibros /></BibliaLayout></ProtectedRoute>} />
          <Route path="/biblia/patrones" element={<ProtectedRoute><BibliaLayout titulo="Patrones"><Patrones /></BibliaLayout></ProtectedRoute>} />
          <Route path="/biblia/salmos" element={<ProtectedRoute><BibliaLayout titulo="Salmos"><Salmos /></BibliaLayout></ProtectedRoute>} />
          <Route path="/curso" element={<ProtectedRoute><CursoDashboard /></ProtectedRoute>} />
          <Route path="/curso/:slug" element={<ProtectedRoute><CursoDetalle /></ProtectedRoute>} />
          <Route path="/curso/leccion/:id" element={<ProtectedRoute><LeccionVista /></ProtectedRoute>} />
          <Route path="/curso/:slug/progreso" element={<ProtectedRoute><CursoProgreso /></ProtectedRoute>} />
        
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;