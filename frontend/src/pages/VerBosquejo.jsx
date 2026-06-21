import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBosquejoStore } from '../stores/bosquejoStore';
import { toast } from 'react-hot-toast';
import { PencilIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Header from '../components/common/Header';

const VerBosquejo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentBosquejo, loadBosquejo, isLoading, error } = useBosquejoStore();
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    // ✅ Validación estricta del ID
    if (!id || id === 'undefined' || id === 'null') {
      setLocalError('ID de bosquejo no válido');
      toast.error('ID de bosquejo no válido');
      navigate('/bosquejos');
      return;
    }
    loadBosquejo(id);
  }, [id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setLocalError(error);
    }
  }, [error]);

  // Si está cargando
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  // Si hay error o no hay datos
  if (localError || !currentBosquejo) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="max-w-3xl mx-auto p-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {localError || 'Bosquejo no encontrado'}
            </p>
            <Link
              to="/bosquejos"
              className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Volver a mis bosquejos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Renderizado normal
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="max-w-3xl mx-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/bosquejos"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-1" />
            Volver
          </Link>
          <Link
            to={`/bosquejos/${id}/editar`}
            className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            <PencilIcon className="w-5 h-5 mr-2" />
            Editar
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">
            {currentBosquejo.titulo || 'Bosquejo Bíblico'}
          </h1>
          {currentBosquejo.cita && (
            <p className="text-primary-600 dark:text-primary-400 font-medium mb-6">
              📖 {currentBosquejo.cita}
            </p>
          )}

          <div className="prose dark:prose-invert max-w-none">
            {currentBosquejo.introduccion && (
              <>
                <h2 className="text-xl font-serif font-semibold text-gray-800 dark:text-gray-200 mt-6">
                  ✍️ Introducción
                </h2>
                <p className="text-gray-700 dark:text-gray-300">{currentBosquejo.introduccion}</p>
              </>
            )}

            {currentBosquejo.puntos && currentBosquejo.puntos.length > 0 && (
              <>
                <h2 className="text-xl font-serif font-semibold text-gray-800 dark:text-gray-200 mt-6">
                  📚 Desarrollo
                </h2>
                {currentBosquejo.puntos.map((punto, idx) => (
                  <div key={idx} className="ml-4 mt-4 pl-4 border-l-2 border-primary-300 dark:border-primary-600">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      {idx+1}. {punto.titulo || '(Sin título)'}
                    </h3>
                    {punto.descripcion && (
                      <p className="text-gray-700 dark:text-gray-300 mt-1">{punto.descripcion}</p>
                    )}
                    {punto.versos && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 italic">
                        📌 {punto.versos}
                      </p>
                    )}
                  </div>
                ))}
              </>
            )}

            {currentBosquejo.aplicacion && (
              <>
                <h2 className="text-xl font-serif font-semibold text-gray-800 dark:text-gray-200 mt-6">
                  ⚡ Aplicación
                </h2>
                <p className="text-gray-700 dark:text-gray-300">{currentBosquejo.aplicacion}</p>
              </>
            )}

            {currentBosquejo.conclusion && (
              <>
                <h2 className="text-xl font-serif font-semibold text-gray-800 dark:text-gray-200 mt-6">
                  🎯 Conclusión
                </h2>
                <p className="text-gray-700 dark:text-gray-300">{currentBosquejo.conclusion}</p>
              </>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Creado: {new Date(currentBosquejo.createdAt).toLocaleDateString('es-ES')}</span>
            <span>Actualizado: {new Date(currentBosquejo.updatedAt).toLocaleDateString('es-ES')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerBosquejo;