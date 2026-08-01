import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';

const modulos = [
  { titulo: 'Leer la Biblia', descripcion: 'Abre la RVR1960 en YouVersion', emoji: '📖', ruta: 'https://www.bible.com/bible/149/GEN.1.RVR1960', externo: true },
  { titulo: 'Angelología', descripcion: 'Estudio de los ángeles en la Biblia', emoji: '👼', ruta: '/biblia/angelologia' },
  { titulo: 'Cristología', descripcion: 'Estudio de Jesucristo en las Escrituras', emoji: '✝️', ruta: '/biblia/cristologia' },
  { titulo: 'Numerología', descripcion: 'Significado de los números bíblicos', emoji: '🔢', ruta: '/biblia/numerologia' },
  { titulo: 'Neumatología', descripcion: 'El Espíritu Santo en la Biblia', emoji: '🕊️', ruta: '/biblia/neumatologia' },
  { titulo: 'Jesús en Cada Libro', descripcion: 'Cómo se anticipa o se revela a Cristo en los 66 libros', emoji: '🗝️', ruta: '/biblia/jesus-en-libros' },
  { titulo: 'Reyes de Israel', descripcion: 'Timeline paralelo de reyes de Israel y Judá', emoji: '👑', ruta: '/biblia/reyes' },
  { titulo: 'Estudios Especiales', descripcion: 'Palabras de Jesús, profecías y juicios', emoji: '⭐', ruta: '/biblia/especiales' },
  { titulo: 'Patrones Bíblicos', descripcion: 'Patrones literarios y estructurales en la Biblia', emoji: '📊', ruta: '/biblia/patrones' },
  { titulo: 'Tabernáculo', descripcion: 'El tabernáculo y las figuras de la Iglesia como tipos de Cristo', emoji: '🏕️', ruta: '/biblia/tabernaculo' },
];

const BibliaDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white">
            📚 Biblioteca Bíblica
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Reina Valera 1960 — Selecciona un módulo de estudio
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modulos.map((m) => (
            <button
              key={m.ruta}
              onClick={() => m.externo ? window.open(m.ruta, '_blank', 'noopener,noreferrer') : navigate(m.ruta)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-left hover:shadow-lg hover:border-primary-400 border-2 border-transparent transition-all duration-200 group"
            >
              <div className="text-4xl mb-3">{m.emoji}</div>
              <h2 className="text-lg font-serif font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                {m.titulo}{m.externo && <span className="ml-1 text-xs align-super">↗</span>}
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {m.descripcion}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BibliaDashboard;