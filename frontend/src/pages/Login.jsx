import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [focused, setFocused] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      toast.success('¡Bienvenido de vuelta! ✨');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 
                      bg-gradient-to-br from-[#0a0a0a] via-[#0f0f1a] to-[#1a1a2e]">
      
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 
                        bg-[#C9A84C]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 
                        bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        w-[800px] h-[800px] bg-[#C9A84C]/[0.02] rounded-full blur-2xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
        className="relative w-full max-w-md"
      >
        {/* Card principal con glassmorphism */}
        <div className="relative overflow-hidden rounded-3xl 
                        bg-white/5 backdrop-blur-xl 
                        border border-white/10 
                        shadow-2xl shadow-black/50
                        p-8 sm:p-10">
          
          {/* Glow decorativo */}
          <div className="absolute -top-20 -right-20 w-64 h-64 
                          bg-[#C9A84C]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 
                          bg-[#C9A84C]/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            {/* Logo con animación */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-[#C9A84C]/20 blur-2xl rounded-full" />
                <div className="relative w-20 h-20 rounded-2xl 
                                bg-gradient-to-br from-[#C9A84C] to-[#F6E27A]
                                flex items-center justify-center
                                shadow-lg shadow-[#C9A84C]/30">
                  <span className="text-4xl">✝️</span>
                </div>
              </div>
            </motion.div>

            {/* Títulos */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h1 className="text-3xl font-crimson font-light text-white">
                Bienvenido a
                <span className="block bg-gradient-to-r from-[#C9A84C] via-[#F6E27A] to-[#C9A84C] 
                               bg-clip-text text-transparent text-4xl mt-1">
                  Bosqu.AI
                </span>
              </h1>
              <p className="mt-3 text-sm text-white/40 font-light">
                Tu cuaderno de bosquejos bíblicos
              </p>
            </motion.div>

            {/* Subtítulo con link a registro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-white/30">
                ¿No tienes cuenta?{' '}
                <Link 
                  to="/register" 
                  className="text-[#C9A84C] hover:text-[#F6E27A] transition-colors 
                             font-medium inline-flex items-center gap-1 group"
                >
                  Regístrate aquí
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </p>
            </motion.div>

            {/* Formulario */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 space-y-5"
              onSubmit={handleSubmit}
            >
              {/* Campo Email */}
              <div className="relative group">
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300
                                ${focused === 'email' || formData.email ? 'text-[#C9A84C]' : 'text-white/20'}`}>
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Correo electrónico"
                  className="w-full pl-12 pr-4 py-3.5
                           bg-white/5 border border-white/10 
                           rounded-xl text-white placeholder:text-white/20
                           focus:border-[#C9A84C]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20
                           transition-all duration-300
                           hover:bg-white/10"
                  value={formData.email}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {/* Campo Password */}
              <div className="relative group">
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300
                                ${focused === 'password' || formData.password ? 'text-[#C9A84C]' : 'text-white/20'}`}>
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  required
                  placeholder="Contraseña"
                  className="w-full pl-12 pr-4 py-3.5
                           bg-white/5 border border-white/10 
                           rounded-xl text-white placeholder:text-white/20
                           focus:border-[#C9A84C]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20
                           transition-all duration-300
                           hover:bg-white/10"
                  value={formData.password}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              {/* Botón Submit */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full relative overflow-hidden
                           bg-gradient-to-r from-[#C9A84C] to-[#F6E27A]
                           text-black font-semibold py-3.5 rounded-xl
                           shadow-lg shadow-[#C9A84C]/20
                           hover:shadow-[#C9A84C]/40
                           transition-all duration-300
                           disabled:opacity-60 disabled:cursor-not-allowed
                           flex items-center justify-center gap-2
                           group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Cargando...
                    </>
                  ) : (
                    <>
                      Iniciar Sesión
                      <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    </>
                  )}
                </span>
              </motion.button>

              {/* Link de ayuda */}
              <div className="text-center mt-4">
                <Link 
                  to="/" 
                  className="text-xs text-white/20 hover:text-white/40 transition-colors"
                >
                  ← Volver al inicio
                </Link>
              </div>
            </motion.form>
          </div>
        </div>

        {/* Footer con versículo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-center"
        >
          <p className="text-[10px] text-white/10 font-mono tracking-widest">
            📖 «Escudriñad las Escrituras» — Juan 5:39
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;