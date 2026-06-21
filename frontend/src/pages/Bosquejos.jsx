import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBosquejoStore } from '../stores/bosquejoStore';
import BosquejoCard from '../components/bosquejos/BosquejoCard';
import Header from '../components/common/Header';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Bosquejos = () => {
  const { bosquejos, isLoading, loadBosquejos, deleteBosquejo } = useBosquejoStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadBosquejos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este bosquejo?')) {
      await deleteBosquejo(id);
    }
  };

  // ✅ Asegurar que bosquejos sea un array
  const bosquejosList = Array.isArray(bosquejos) ? bosquejos : [];

  // ✅ Filtrar con validación de título (CORREGIDO)
  const filteredBosquejos = bosquejosList.filter((b) => {
    const titulo = b.titulo || ''; // Si es undefined/null, usar string vacío
    return titulo.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white">
              Mis Bosquejos
            </h1>
            <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              {filteredBosquejos.length} bosquejos encontrados
            </p>
          </div>
          <Link
            to="/bosquejos/nuevo"
            className="inline-flex items-center justify-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors w-full sm:w-auto"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Nuevo Bosquejo
          </Link>
        </div>

        {/* Buscador */}
        <div className="mb-6">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : filteredBosquejos.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm ? 'No se encontraron bosquejos con ese título.' : 'No tienes bosquejos aún.'}
            </p>
            {!searchTerm && (
              <Link
                to="/bosquejos/nuevo"
                className="mt-4 inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Crear mi primer bosquejo
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBosquejos.map((b) => (
              <BosquejoCard
                key={b.id} // ✅ KEY única aquí
                bosquejo={b}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bosquejos;