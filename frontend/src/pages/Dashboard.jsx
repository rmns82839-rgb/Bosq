import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useBosquejoStore } from '../stores/bosquejoStore';
import BosquejoCard from '../components/bosquejos/BosquejoCard';
import Header from '../components/common/Header';
import { PlusIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user } = useAuthStore();
  const { bosquejos, isLoading, loadBosquejos, deleteBosquejo } = useBosquejoStore();

  useEffect(() => { loadBosquejos(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este bosquejo?')) await deleteBosquejo(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white">¡Hola, {user?.name}! 👋</h1>
            <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400">Tu cuaderno de bosquejos bíblicos</p>
          </div>
          <Link to="/bosquejos/nuevo" className="inline-flex items-center justify-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors w-full sm:w-auto">
            <PlusIcon className="w-5 h-5 mr-2" /> Nuevo Bosquejo
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-sm text-gray-500">Total de Bosquejos</p>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{bosquejos.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-sm text-gray-500">Última Actualización</p>
            <p className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
              {bosquejos.length > 0 ? new Date(bosquejos[0].updatedAt).toLocaleDateString('es-ES') : 'Sin bosquejos'}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-sm text-gray-500">Puntos con Versículos</p>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {bosquejos.reduce((total, b) => total + (Array.isArray(b.puntos) ? b.puntos.filter(p => p.versos).length : 0), 0)}
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white mb-4">Últimos Bosquejos</h2>
        {isLoading ? (
          <div className="text-center py-12"><div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div></div>
        ) : bosquejos.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-gray-500 dark:text-gray-400">No tienes bosquejos aún. ¡Comienza a crear uno!</p>
            <Link to="/bosquejos/nuevo" className="mt-4 inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
              Crear mi primer bosquejo
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bosquejos.slice(0, 3).map((b) => <BosquejoCard key={b.id} bosquejo={b} onDelete={handleDelete} />)}
            </div>
            {bosquejos.length > 3 && (
              <div className="mt-6 text-center">
                <Link to="/bosquejos" className="inline-flex items-center px-6 py-2 border border-primary-600 text-primary-600 hover:bg-primary-50 dark:text-primary-400 rounded-lg transition-colors">
                  Ver todos los bosquejos
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
