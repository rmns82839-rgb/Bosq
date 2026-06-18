import React from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

const BosquejoCard = ({ bosquejo, onDelete }) => {
  const puntosCount = Array.isArray(bosquejo.puntos) ? bosquejo.puntos.length : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-serif font-semibold text-gray-900 dark:text-white">{bosquejo.titulo}</h3>
            {bosquejo.cita && (
              <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mt-1">{bosquejo.cita}</p>
            )}
          </div>
          <div className="flex space-x-2">
            <Link to={`/bosquejos/${bosquejo.id}`} className="p-2 text-gray-500 hover:text-primary-600 transition-colors" title="Ver">
              <EyeIcon className="w-5 h-5" />
            </Link>
            <Link to={`/bosquejos/${bosquejo.id}/editar`} className="p-2 text-gray-500 hover:text-blue-600 transition-colors" title="Editar">
              <PencilIcon className="w-5 h-5" />
            </Link>
            <button onClick={() => onDelete(bosquejo.id)} className="p-2 text-gray-500 hover:text-red-600 transition-colors" title="Eliminar">
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        {bosquejo.introduccion && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{bosquejo.introduccion}</p>
        )}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{puntosCount} {puntosCount === 1 ? 'punto' : 'puntos'}</span>
          <span>{new Date(bosquejo.updatedAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
        </div>
      </div>
    </div>
  );
};

export default BosquejoCard;
