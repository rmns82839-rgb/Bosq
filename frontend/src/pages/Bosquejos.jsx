import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBosquejoStore } from '../stores/bosquejoStore';
import BosquejoCard from '../components/bosquejos/BosquejoCard';
import Header from '../components/common/Header';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import '../styles/app-premium.css';

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

  const bosquejosList = Array.isArray(bosquejos) ? bosquejos : [];

  const filteredBosquejos = bosquejosList.filter((b) => {
    const titulo = b.titulo || '';
    return titulo.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="premium min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="premium-titulo text-2xl sm:text-3xl font-bold">
              Mis Bosquejos
            </h1>
            <p className="premium-eyebrow mt-1">
              {filteredBosquejos.length} {filteredBosquejos.length === 1 ? 'bosquejo encontrado' : 'bosquejos encontrados'}
            </p>
          </div>
          <Link
            to="/bosquejos/nuevo"
            className="premium-btn-principal inline-flex items-center justify-center px-4 py-2 transition-colors w-full sm:w-auto"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Nuevo Bosquejo
          </Link>
        </div>

        {/* Buscador */}
        <div className="mb-6">
          <div className="relative">
            <MagnifyingGlassIcon className="premium-texto-muted absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="premium-input premium-input--con-icono"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : filteredBosquejos.length === 0 ? (
          <div className="premium-vacio">
            <p>
              {searchTerm ? 'No se encontraron bosquejos con ese título.' : 'No tienes bosquejos aún.'}
            </p>
            {!searchTerm && (
              <Link
                to="/bosquejos/nuevo"
                className="premium-btn-principal mt-4 inline-flex items-center px-4 py-2 transition-colors"
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
                key={b.id}
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
