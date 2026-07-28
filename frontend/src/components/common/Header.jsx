import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { BookOpenIcon, MagnifyingGlassIcon, ArrowRightOnRectangleIcon, ChevronDownIcon, Bars3Icon } from '@heroicons/react/24/outline';

const modulosBiblia = [
  { emoji: '📖', label: 'Leer', ruta: '/biblia/leer/1' },
  { emoji: '🔍', label: 'Buscar', ruta: '/buscar-biblia' },
  { emoji: '👼', label: 'Ángeles', ruta: '/biblia/angelologia' },
  { emoji: '✝️', label: 'Cristo', ruta: '/biblia/cristologia' },
  { emoji: '🔢', label: 'Números', ruta: '/biblia/numerologia' },
  { emoji: '🕊️', label: 'Espíritu', ruta: '/biblia/neumatologia' },
  { emoji: '👑', label: 'Reyes', ruta: '/biblia/reyes' },
  { emoji: '⭐', label: 'Estudios', ruta: '/biblia/especiales' },
  { emoji: '📊', label: 'Patrones', ruta: '/biblia/patrones' },
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

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl sm:text-2xl font-cursive text-primary-600 dark:text-primary-400">✝️ Bosqu</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/bosquejos" className="flex items-center p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <BookOpenIcon className="w-5 h-5 mr-1" />
              <span className="text-sm">Bosquejos</span>
            </Link>

            {/* Menú Biblia con dropdown */}
            <div className="relative">
              <button
                onClick={() => setMenuBibliaOpen(!menuBibliaOpen)}
                className="flex items-center p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <MagnifyingGlassIcon className="w-5 h-5 mr-1" />
                <span className="text-sm">Biblia</span>
                <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform ${menuBibliaOpen ? 'rotate-180' : ''}`} />
              </button>

              {menuBibliaOpen && (
                <div className="absolute right-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 border border-gray-200 dark:border-gray-700 z-50">
                  {modulosBiblia.map((m) => (
                    <Link
                      key={m.ruta}
                      to={m.ruta}
                      onClick={() => setMenuBibliaOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span>{m.emoji}</span> {m.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button onClick={handleLogout} className="flex items-center p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <ArrowRightOnRectangleIcon className="w-5 h-5 mr-1" />
              <span className="text-sm">Salir</span>
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-2 border-t border-gray-200 dark:border-gray-700">
            <Link
              to="/bosquejos"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <BookOpenIcon className="w-5 h-5" /> Bosquejos
            </Link>
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Biblia</div>
            {modulosBiblia.map((m) => (
              <Link
                key={m.ruta}
                to={m.ruta}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors pl-8"
              >
                <span>{m.emoji}</span> {m.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors w-full"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" /> Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;