import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, BookOpen, Search, ArrowLeft, 
  Sparkles, ChevronRight, Menu 
} from 'lucide-react';
import Header from '../common/Header';

const modulosBiblia = [
  { emoji: '👼', label: 'Angelología', ruta: '/biblia/angelologia' },
  { emoji: '✝️', label: 'Cristología', ruta: '/biblia/cristologia' },
  { emoji: '🔢', label: 'Numerología', ruta: '/biblia/numerologia' },
  { emoji: '🕊️', label: 'Neumatología', ruta: '/biblia/neumatologia' },
  { emoji: '👑', label: 'Reyes', ruta: '/biblia/reyes' },
  { emoji: '⭐', label: 'Estudios Especiales', ruta: '/biblia/especiales' },
  { emoji: '🗝️', label: 'Jesús en Cada Libro', ruta: '/biblia/jesus-en-libros' },
  { emoji: '📊', label: 'Patrones', ruta: '/biblia/patrones' },
];

const BibliaLayout = ({ children, titulo }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0f0f1a] to-[#1a1a2e]">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb premium */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-sm text-white/30 mb-6 font-mono"
        >
          <Link to="/" className="hover:text-[#C9A84C] transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Inicio</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/biblia" className="hover:text-[#C9A84C] transition-colors flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Biblia</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/60">{titulo}</span>
        </motion.nav>

        {/* Header con gradiente animado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="relative overflow-hidden rounded-3xl p-6 sm:p-8 mb-8
                     bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e]
                     border border-white/10 shadow-2xl"
        >
          {/* Background decorations */}
          <div className="absolute -top-20 -right-20 w-96 h-96 
                         bg-[#C9A84C]/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 
                         bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
          
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="inline-block mb-2"
                >
                  <span className="px-3 py-1 rounded-full bg-[#C9A84C]/20 
                                 border border-[#C9A84C]/30 text-[#C9A84C] text-xs font-mono
                                 backdrop-blur-sm flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    ESTUDIO BÍBLICO
                  </span>
                </motion.div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-crimson text-white font-light">
                  {titulo}
                </h1>
                <p className="mt-2 text-white/40 text-sm font-light max-w-xl">
                  Explorando las Escrituras con profundidad y entendimiento espiritual.
                </p>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/biblia" 
                  className="inline-flex items-center gap-2 px-4 py-2 
                             bg-white/5 backdrop-blur-sm border border-white/10
                             text-white/70 hover:text-white rounded-xl
                             hover:bg-white/10 transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm font-light">Volver al Dashboard</span>
                </Link>
              </motion.div>
            </div>

            {/* Navegación rápida entre módulos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/5"
            >
              {modulosBiblia.map((modulo) => {
                const isActive = location.pathname === modulo.ruta;
                return (
                  <motion.div
                    key={modulo.ruta}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={modulo.ruta}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm
                                 transition-all duration-300 font-light
                                 ${isActive 
                                   ? 'bg-gradient-to-r from-[#C9A84C] to-[#F6E27A] text-black shadow-lg shadow-[#C9A84C]/20' 
                                   : 'bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10'
                                 }`}
                    >
                      <span className="text-base">{modulo.emoji}</span>
                      {modulo.label}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* Contenido de la página con animación de entrada */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default BibliaLayout;