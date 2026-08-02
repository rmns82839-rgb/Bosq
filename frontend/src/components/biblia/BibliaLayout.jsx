import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Home, BookOpen, ArrowLeft,
  Sparkles, ChevronRight, ChevronDown
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
  { emoji: '🏛️', label: 'Tabernáculo', ruta: '/biblia/tabernaculo' },
];

const BibliaLayout = ({ children, titulo }) => {
  const location = useLocation();
  const [modulosAbiertos, setModulosAbiertos] = useState(false);

  // Parallax: el hero se hunde suave y se desvanece al hacer scroll,
  // mientras la barra de módulos queda fija arriba.
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 300], [0, 60]);
  const heroOpacity = useTransform(scrollY, [0, 260], [1, 0.25]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0f0f1a] to-[#1a1a2e]">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/30 mb-4 font-mono">
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
        </nav>

        {/* ── Barra fija de módulos (desplegable) ── */}
        <div className="sticky top-14 sm:top-16 z-40 mb-6">
          <div className="rounded-2xl bg-[#0b0b14]/85 backdrop-blur-md border border-white/10 shadow-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setModulosAbiertos((v) => !v)}
              className="w-full flex items-center justify-between px-4 py-3 text-left"
            >
              <span className="flex items-center gap-2 font-crimson text-white text-lg">
                <Sparkles className="w-4 h-4 text-[#C9A84C]" /> {titulo}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-white/60">
                Módulos
                <ChevronDown className={`w-4 h-4 transition-transform ${modulosAbiertos ? 'rotate-180' : ''}`} />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {modulosAbiertos && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden border-t border-white/10"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3">
                    {modulosBiblia.map((modulo) => {
                      const isActive = location.pathname === modulo.ruta;
                      return (
                        <Link
                          key={modulo.ruta}
                          to={modulo.ruta}
                          onClick={() => setModulosAbiertos(false)}
                          className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm text-center
                                     transition-all duration-300 font-light min-h-[46px]
                                     ${isActive
                                       ? 'bg-gradient-to-r from-[#C9A84C] to-[#F6E27A] text-black shadow-lg shadow-[#C9A84C]/20'
                                       : 'bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10'
                                     }`}
                        >
                          <span className="text-base shrink-0">{modulo.emoji}</span>
                          <span>{modulo.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Hero con parallax ── */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative overflow-hidden rounded-3xl p-6 sm:p-8 mb-8
                     bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e]
                     border border-white/10 shadow-2xl"
        >
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full bg-[#C9A84C]/20
                               border border-[#C9A84C]/30 text-[#C9A84C] text-xs font-mono backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  ESTUDIO BÍBLICO
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-crimson text-white font-light">
                  {titulo}
                </h1>
                <p className="mt-2 text-white/40 text-sm font-light max-w-xl">
                  Explorando las Escrituras con profundidad y entendimiento espiritual.
                </p>
              </div>

              <Link
                to="/biblia"
                className="inline-flex items-center gap-2 px-4 py-2 self-start
                           bg-white/5 backdrop-blur-sm border border-white/10
                           text-white/70 hover:text-white rounded-xl
                           hover:bg-white/10 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-light">Volver al Dashboard</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Contenido de la página */}
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BibliaLayout;