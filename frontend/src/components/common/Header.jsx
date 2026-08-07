import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import {
  BookOpen,
  Search,
  LogOut,
  ChevronDown,
  Menu,
  User,
  Book,
  Sparkles,
  Crown,
  Key,
  Star,
  BarChart3,
  Church,
  UserCircle,
  Building2,
  Music
} from 'lucide-react';

const modulosBiblia = [
  { emoji: '😇', label: 'Ángeles', ruta: '/biblia/angelologia', icon: UserCircle },
  { emoji: '✝️', label: 'Cristo', ruta: '/biblia/cristologia', icon: Church },
  { emoji: '🔢', label: 'Números', ruta: '/biblia/numerologia', icon: Book },
  { emoji: '🕊️', label: 'Espíritu', ruta: '/biblia/neumatologia', icon: Sparkles },
  { emoji: '👑', label: 'Reyes', ruta: '/biblia/reyes', icon: Crown },
  { emoji: '🗝️', label: 'Jesús×Libro', ruta: '/biblia/jesus-en-libros', icon: Key },
  { emoji: '⭐', label: 'Estudios', ruta: '/biblia/especiales', icon: Star },
  { emoji: '🏛️', label: 'Tabernáculo', ruta: '/biblia/tabernaculo', icon: Building2 },
  { emoji: '📊', label: 'Patrones', ruta: '/biblia/patrones', icon: BarChart3 },
  { emoji: '🎵', label: 'Salmos', ruta: '/biblia/salmos', icon: Music },
];

const Header = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [menuBibliaOpen, setMenuBibliaOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const abrirBiblia = () => {
    window.open('https://www.bible.com/bible/149/GEN.1.RVR1960', '_blank', 'noopener,noreferrer');
    setMenuBibliaOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#0b0b14] border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl sm:text-2xl font-cursive text-[#C9A84C]">
              ✝️ Eclesiastés
            </span>
          </Link>

          <Link
  to="/curso"
  style={{
    display: 'inline-flex', alignItems: 'center', gap: 6,
    fontFamily: 'var(--mono)', fontSize: 12, padding: '6px 14px',
    borderRadius: 999, textDecoration: 'none',
    color: '#C9A84C', border: '1px solid rgba(201,168,76,0.4)',
    background: 'rgba(201,168,76,0.1)',
  }}
>
  ✦ Curso
</Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/bosquejos"
              className="flex items-center p-2 text-white/60 hover:text-[#C9A84C] rounded-lg hover:bg-white/5 transition-colors"
            >
              <BookOpen className="w-5 h-5 mr-1" />
              <span className="text-sm">Bosquejos</span>
            </Link>

            {/* Menú Biblia con dropdown */}
            <div className="relative">
              <button
                onClick={() => setMenuBibliaOpen(!menuBibliaOpen)}
                className="flex items-center p-2 text-white/60 hover:text-[#C9A84C] rounded-lg hover:bg-white/5 transition-colors"
              >
                <Search className="w-5 h-5 mr-1" />
                <span className="text-sm">Biblia</span>
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${menuBibliaOpen ? 'rotate-180' : ''}`} />
              </button>

              {menuBibliaOpen && (
                <div className="absolute right-0 mt-1 w-56 bg-[#15172a] rounded-xl shadow-2xl py-1 border border-white/10 z-50">
                  <button
                    onClick={abrirBiblia}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-[#C9A84C] transition-colors"
                  >
                    <span>📖</span> Leer la Biblia <span className="ml-auto text-xs">↗</span>
                  </button>
                  {modulosBiblia.map((m) => (
                    <Link
                      key={m.label}
                      to={m.ruta}
                      onClick={() => setMenuBibliaOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-[#C9A84C] transition-colors"
                    >
                      <span>{m.emoji}</span> {m.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center p-2 text-white/60 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-1" />
              <span className="text-sm">Salir</span>
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/60 hover:text-[#C9A84C] rounded-lg hover:bg-white/5 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-2 border-t border-white/10">
            <Link
              to="/bosquejos"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-white/70 hover:bg-white/5 rounded-lg transition-colors"
            >
              <BookOpen className="w-5 h-5" /> Bosquejos
            </Link>

            <div className="px-4 py-2 text-xs font-semibold text-white/40 uppercase tracking-wider">
              Biblia
            </div>

            <button
              onClick={abrirBiblia}
              className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:bg-white/5 rounded-lg transition-colors pl-8"
            >
              <span>📖</span> Leer la Biblia <span className="ml-auto text-xs">↗</span>
            </button>

            {modulosBiblia.map((m) => (
              <Link
                key={m.label}
                to={m.ruta}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:bg-white/5 rounded-lg transition-colors pl-8"
              >
                <span>{m.emoji}</span> {m.label}
              </Link>
            ))}

            

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-white/5 rounded-lg transition-colors w-full"
            >
              <LogOut className="w-5 h-5" /> Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;