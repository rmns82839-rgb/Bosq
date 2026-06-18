import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBosquejoStore } from '../stores/bosquejoStore';
import BosquejoCard from '../components/bosquejos/BosquejoCard';
import Header from '../components/common/Header';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Bosquejos = () => {
  const { bosquejos, isLoading, loadBosquejos, deleteBosquejo } = useBosquejoStore();
  const [search, setSearch] = useState('');

  useEffect(() => { loadBosquejos(); }, []);

  const filtered = bosquejos.filter(b =>
    b.titulo.toLowerCase().includes(search.toLowerCase()) ||
    (b.cita && b.cita.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este bosquejo?')) await deleteBosquejo(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Mis Bosquejos</h1>
          <Link to="/bosquejos/nuevo" className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg">
            <PlusIcon className="w-5 h-5 mr-2" /> Nuevo
          </Link>
        </div>
        <div className="relative mb-6">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Buscar bosquejos..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-primary-500 focus:border-primary-500" />
        </div>
        {isLoading ? (
          <div className="text-center py-12"><div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((b) => <BosquejoCard key={b.id} bosquejo={b} onDelete={handleDelete} />)}
          </div>
        )}
        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">No se encontraron bosquejos</div>
        )}
      </div>
    </div>
  );
};

export default Bosquejos;
