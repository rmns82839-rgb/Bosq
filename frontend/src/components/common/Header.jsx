import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Search, LogOut, ChevronDown, Menu, 
  User, Sparkles, Home, Library, 
  Angel, Cross, Hash, Feather, Crown, Star, BarChart3
} from 'lucide-react';

const modulosBiblia = [
  { emoji: '📖', label: 'Leer', ruta: '/biblia/leer/1', icon: BookOpen },
  { emoji: '🔍', label: 'Buscar', ruta: '/buscar-biblia', icon: Search },
  { emoji: '👼', label: 'Ángeles', ruta: '/biblia/angelologia', icon: Angel },
  { emoji: '✝️', label: 'Cristo', ruta: '/biblia/cristologia', icon: Cross },
  { emoji: '🔢', label: 'Números', ruta: '/biblia/numerologia', icon: Hash },
  { emoji: '🕊️', label: 'Espíritu', ruta: '/biblia/neumatologia', icon: Feather },
  { emoji: '👑', label: 'Reyes', ruta: '/biblia/reyes', icon: Crown },
  { emoji: '🗝️', label: 'Jesús×Libro', ruta: '/biblia/jesus-en-libros', icon: Star },
  { emoji: '⭐', label: 'Estudios', ruta: '/biblia/especiales', icon: Sparkles },
  { emoji: '📊', label: 'Patrones', ruta: '/biblia/patrones', icon: BarChart3 },
];

const Header = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [menuBibliaOpen, setMenuBibliaOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
          : 'bg-white/10 dark:bg-gray-900/80 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo con glow */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#C9A84C]/20 blur-xl rounded-full group-hover:bg-[#C9A84C]/30 transition-all duration-500" />
              <span className="relative text-2xl sm:text-3xl font-cursive text-[#C9A84C] dark:text-[#F6E27A] drop-shadow-lg">
                ✝️
              </span>
            </motion.div>
            <motion.span 
              className="text-xl sm:text-2xl font-cursive bg-gradient-to-r from-[#C9A84C] via-[#F6E27A] to-[#C9A84C] bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
            >
              Bosqu
            </motion.span>
            <span className="hidden sm:inline text-[10px] font-mono text-white/30 tracking-widest">
              .AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/bosquejos" 
                className="flex items-center gap-2 px-3 py-2 text-white/70 hover:text-white rounded-xl 
                          hover:bg-white/10 transition-all duration-300 group"
              >
                <BookOpen className="w-4 h-4 group-hover:text-[#C9A84C] transition-colors" />
                <span className="text-sm font-light">Bosquejos</span>
              </Link>
            </motion.div>

            {/* Menú Biblia con dropdown premium */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMenuBibliaOpen(!menuBibliaOpen)}
                className={`flex items-center gap-2 px-3 py-2 text-white/70 hover:text-white 
                           rounded-xl hover:bg-white/10 transition-all duration-300 group
                           ${menuBibliaOpen ? 'bg-white/10 text-white' : ''}`}
              >
                <Search className="w-4 h-4 group-hover:text-[#C9A84C] transition-colors" />
                <span className="text-sm font-light">Biblia</span>
                <motion.div
                  animate={{ rotate: menuBibliaOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4 text-white/40" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {menuBibliaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 bg-black/95 backdrop-blur-xl 
                               rounded-2xl border border-white/10 shadow-2xl shadow-black/50 
                               py-2 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-2 border-b border-white/5">
                      <p className="text-[10px] font-mono text-[#C9A84C] tracking-widest">
                        EXPLORAR LA BIBLIA
                      </p>
                    </div>
                    {modulosBiblia.map((m, i) => (
                      <motion.div
                        key={m.ruta}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        whileHover={{ x: 5, background: 'rgba(201,168,76,0.1)' }}
                      >
                        <Link
                          to={m.ruta}
                          onClick={() => setMenuBibliaOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 
                                     hover:text-white transition-colors"
                        >
                          <span className="text-lg">{m.emoji}</span>
                          <span className="font-light">{m.label}</span>
                          <motion.span 
                            className="ml-auto text-[10px] text-white/20 font-mono"
                            whileHover={{ opacity: 1 }}
                          >
                            →
                          </motion.span>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Botón Salir */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-white/50 hover:text-red-400 
                         rounded-xl hover:bg-red-500/10 transition-all duration-300 group"
            >
              <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span className="text-sm font-light">Salir</span>
            </motion.button>
          </nav>

          {/* User info + Mobile menu */}
          <div className="flex items-center gap-3">
            {/* User badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full 
                         bg-gradient-to-r from-[#C9A84C]/10 to-[#F6E27A]/10 
                         border border-[#C9A84C]/20"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#F6E27A] 
                            flex items-center justify-center text-xs font-bold text-black">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span className="text-sm text-white/80 font-light">
                {user?.name?.split(' ')[0] || 'Usuario'}
              </span>
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white/60 hover:text-white rounded-xl 
                         hover:bg-white/10 transition-all duration-300"
            >
              <Menu className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation con animación */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-white/5"
            >
              <div className="py-3 space-y-1">
                <motion.div whileHover={{ x: 5 }}>
                  <Link
                    to="/bosquejos"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-white/70 hover:text-white 
                               hover:bg-white/5 rounded-xl transition-all duration-300"
                  >
                    <BookOpen className="w-5 h-5 text-[#C9A84C]" />
                    Bosquejos
                  </Link>
                </motion.div>
                
                <div className="px-4 py-2 text-[10px] font-mono text-[#C9A84C] tracking-widest">
                  BIBLIA
                </div>
                
                {modulosBiblia.map((m) => (
                  <motion.div key={m.ruta} whileHover={{ x: 5 }}>
                    <Link
                      to={m.ruta}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-white/60 
                                 hover:text-white hover:bg-white/5 rounded-xl 
                                 transition-all duration-300 pl-8"
                    >
                      <span>{m.emoji}</span>
                      <span className="font-light">{m.label}</span>
                    </Link>
                  </motion.div>
                ))}
                
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-2.5 text-red-400/70 hover:text-red-400 
                             hover:bg-red-500/10 rounded-xl transition-all duration-300 w-full"
                >
                  <LogOut className="w-5 h-5" />
                  Cerrar sesión
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;