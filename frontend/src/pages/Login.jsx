import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';
import '../styles/app-premium.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      toast.success('¡Bienvenido de vuelta!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="premium min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="premium-logo text-center text-4xl font-cursive">✝️ Bosqu</h1>
          <h2 className="premium-titulo mt-6 text-center text-3xl font-semibold">Iniciar Sesión</h2>
          <p className="premium-eyebrow mt-2 text-center">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="premium-link">Regístrate aquí</Link>
          </p>
        </div>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="Email"
            className="premium-input"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            required
            placeholder="Contraseña"
            className="premium-input"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="premium-btn-principal w-full flex justify-center py-2.5 px-4"
          >
            {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
