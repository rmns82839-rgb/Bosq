import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../common/Header';

const modulos = [
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

const BibliaLayout = ({ children, titulo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setMenuAbierto(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />

      {/* Barra de módulos */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-14 z-40">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop: fila horizontal */}
          <div className="hidden sm:flex items-center gap-1 py-2 overflow-x-auto">
            <button
              onClick={() => navigate('/biblia')}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors whitespace-nowrap font-medium"
            >
              ← Biblioteca
            </button>
            <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />
            {modulos.map((m) => {
              const activo = location.pathname === m.ruta || location.pathname.startsWith(m.ruta.replace('/1', ''));
              return (
                <button
                  key={m.ruta}
                  onClick={() => navigate(m.ruta)}
                  className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors whitespace-nowrap ${
                    activo
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-semibold'
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span>{m.emoji}</span> {m.label}
                </button>
              );
            })}
          </div>

          {/* Mobile: botón de menú desplegable */}
          <div className="flex sm:hidden items-center justify-between py-2">
            <button
              onClick={() => navigate('/biblia')}
              className="text-sm text-primary-600 dark:text-primary-400 font-medium"
            >
              ← Biblioteca
            </button>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{titulo || 'Biblia'}</span>
            <button
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="text-sm text-gray-600 dark:text-gray-300 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg"
            >
              Módulos ▾
            </button>
          </div>

          {/* Mobile: menú desplegado */}
          {menuAbierto && (
            <div className="sm:hidden grid grid-cols-3 gap-2 pb-3">
              {modulos.map((m) => (
                <button
                  key={m.ruta}
                  onClick={() => { navigate(m.ruta); setMenuAbierto(false); }}
                  className="flex flex-col items-center gap-1 p-2 text-xs text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                >
                  <span className="text-xl">{m.emoji}</span>
                  {m.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contenido - ahora con layout flexible para el sidebar del Reader */}
      <div className="flex-1 overflow-auto flex flex-col lg:flex-row">
        {children}
      </div>
    </div>
  );
};

export default BibliaLayout;