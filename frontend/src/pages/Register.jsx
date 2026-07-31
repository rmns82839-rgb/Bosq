import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';
import { User, Mail, Lock, ArrowRight, CheckCircle, Sparkles, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [focused, setFocused] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [touched, setTouched] = useState({});

  const checkPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (pass.match(/[a-z]/)) strength++;
    if (pass.match(/[A-Z]/)) strength++;
    if (pass.match(/[0-9]/)) strength++;
    if (pass.match(/[^a-zA-Z0-9]/)) strength++;
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordStrength < 2) {
      toast.error('La contraseña es muy débil. Usa al menos 8 caracteres con mayúsculas, minúsculas, números y símbolos.');
      return;
    }
    try {
      await register(formData.name, formData.email, formData.password);
      toast.success('¡Cuenta creada exitosamente! 🎉');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error al registrar');
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500/60';
    if (passwordStrength <= 2) return 'bg-orange-500/60';
    if (passwordStrength <= 3) return 'bg-yellow-500/60';
    if (passwordStrength <= 4) return 'bg-blue-500/60';
    return 'bg-green-500/60';
  };

  const getStrengthText = () => {
    if (passwordStrength <= 1) return 'Débil';
    if (passwordStrength <= 2) return 'Media';
    if (passwordStrength <= 3) return 'Buena';
    if (passwordStrength <= 4) return 'Fuerte';
    return 'Muy fuerte';
  };

  const getStrengthEmoji = () => {
    if (passwordStrength <= 1) return '🔴';
    if (passwordStrength <= 2) return '🟠';
    if (passwordStrength <= 3) return '🟡';
    if (passwordStrength <= 4) return '🔵';
    return '🟢';
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 
                    bg-gradient-to-br from-[#0a0a0a] via-[#0f0f1a] to-[#1a1a2e]">
      
      {/* Background decorations */}
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
                                shadow-lg shadow-[#C9A84C]/30
                                group hover:scale-105 transition-transform duration-300">
                  <span className="text-4xl group-hover:rotate-6 transition-transform duration-300">✝️</span>
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
                Crear Cuenta
              </h1>
              <p className="mt-2 text-sm text-white/40 font-light">
                Comienza tu viaje de estudio bíblico
              </p>
            </motion.div>

            {/* Subtítulo con link a login */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-center"
            >
              <p className="text-sm text-white/30">
                ¿Ya tienes cuenta?{' '}
                <Link 
                  to="/login" 
                  className="text-[#C9A84C] hover:text-[#F6E27A] transition-colors 
                             font-medium inline-flex items-center gap-1 group"
                >
                  Inicia sesión
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </p>
            </motion.div>

            {/* Formulario */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 space-y-4"
              onSubmit={handleSubmit}
            >
              {/* Campo Nombre */}
              <div className="relative group">
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300
                                ${focused === 'name' || formData.name ? 'text-[#C9A84C]' : 'text-white/20'}`}>
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Nombre completo"
                  className="w-full pl-12 pr-4 py-3.5
                           bg-white/5 border border-white/10 
                           rounded-xl text-white placeholder:text-white/20
                           focus:border-[#C9A84C]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20
                           transition-all duration-300
                           hover:bg-white/10"
                  value={formData.name}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

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

              {/* Campo Password con visibilidad y fuerza */}
              <div className="space-y-2">
                <div className="relative group">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300
                                  ${focused === 'password' || formData.password ? 'text-[#C9A84C]' : 'text-white/20'}`}>
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Contraseña (mínimo 8 caracteres)"
                    className="w-full pl-12 pr-12 py-3.5
                             bg-white/5 border border-white/10 
                             rounded-xl text-white placeholder:text-white/20
                             focus:border-[#C9A84C]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/20
                             transition-all duration-300
                             hover:bg-white/10"
                    value={formData.password}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      checkPasswordStrength(e.target.value);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 
                               text-white/20 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Indicador de fuerza de contraseña */}
                {formData.password && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs">{getStrengthEmoji()}</span>
                      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full transition-all duration-500 rounded-full ${getStrengthColor()}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-white/30 min-w-[50px] text-right">
                        {getStrengthText()}
                      </span>
                    </div>
                    
                    {/* Requisitos de contraseña */}
                    <div className="grid grid-cols-2 gap-1 text-[10px] text-white/20">
                      <div className={`flex items-center gap-1 ${formData.password.length >= 8 ? 'text-green-400' : ''}`}>
                        {formData.password.length >= 8 ? '✅' : '⬜'} 8+ caracteres
                      </div>
                      <div className={`flex items-center gap-1 ${formData.password.match(/[A-Z]/) ? 'text-green-400' : ''}`}>
                        {formData.password.match(/[A-Z]/) ? '✅' : '⬜'} Mayúscula
                      </div>
                      <div className={`flex items-center gap-1 ${formData.password.match(/[a-z]/) ? 'text-green-400' : ''}`}>
                        {formData.password.match(/[a-z]/) ? '✅' : '⬜'} Minúscula
                      </div>
                      <div className={`flex items-center gap-1 ${formData.password.match(/[0-9]/) ? 'text-green-400' : ''}`}>
                        {formData.password.match(/[0-9]/) ? '✅' : '⬜'} Número
                      </div>
                    </div>
                  </motion.div>
                )}
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
                      Creando cuenta...
                    </>
                  ) : (
                    <>
                      Crear Cuenta
                      <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    </>
                  )}
                </span>
              </motion.button>

              {/* Términos y condiciones */}
              <div className="text-center mt-3">
                <p className="text-[10px] text-white/15 font-light">
                  Al crear una cuenta, aceptas nuestros Términos de Servicio
                </p>
                <Link 
                  to="/" 
                  className="text-xs text-white/20 hover:text-white/40 transition-colors inline-block mt-2"
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
            📖 «La verdad os hará libres» — Juan 8:32
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;