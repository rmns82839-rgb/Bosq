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

  useEffect(() => {
    loadBosquejos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este bosquejo?')) await deleteBosquejo(id);
  };

  const bosquejosList = Array.isArray(bosquejos) ? bosquejos : [];

  const versiculosCount = bosquejosList.reduce((total, b) => {
    const puntos = Array.isArray(b.puntos) ? b.puntos : [];
    return total + puntos.filter(p => p.versos).length;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0f0f1a] to-[#1a1a2e]">
      <Header />
      <div className="max-w-7xl mx-auto p-6">

        {/* Saludo */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif font-light text-white">
              ¡Hola, {user?.name}! <span className="text-[#C9A84C]">✦</span>
            </h1>
            <p className="mt-1 text-sm sm:text-base text-white/40 font-light">
              Tu cuaderno de bosquejos bíblicos
            </p>
          </div>
          <Link
            to="/bosquejos/nuevo"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl w-full sm:w-auto
                       bg-gradient-to-r from-[#C9A84C] to-[#E6C766] text-black font-medium
                       hover:shadow-lg hover:shadow-[#C9A84C]/20 transition-all"
          >
            <PlusIcon className="w-5 h-5" /> Nuevo Bosquejo
          </Link>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <p className="text-xs uppercase tracking-wider text-white/40 font-mono">Total de Bosquejos</p>
            <p className="mt-2 text-4xl font-serif font-light text-[#C9A84C]">{bosquejosList.length}</p>
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <p className="text-xs uppercase tracking-wider text-white/40 font-mono">Última Actualización</p>
            <p className="mt-2 text-lg font-light text-white">
              {bosquejosList.length > 0 ? new Date(bosquejosList[0].updatedAt).toLocaleDateString('es-ES') : 'Sin bosquejos'}
            </p>
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <p className="text-xs uppercase tracking-wider text-white/40 font-mono">Puntos con Versículos</p>
            <p className="mt-2 text-4xl font-serif font-light text-[#C9A84C]">{versiculosCount}</p>
          </div>
        </div>

        {/* Últimos bosquejos */}
        <h2 className="text-2xl font-serif font-light text-white mb-4">Últimos Bosquejos</h2>
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#C9A84C]"></div>
          </div>
        ) : bosquejosList.length === 0 ? (
          <div className="text-center py-12 bg-white/[0.03] border border-white/10 rounded-2xl">
            <p className="text-white/50">No tienes bosquejos aún. ¡Comienza a crear uno!</p>
            <Link
              to="/bosquejos/nuevo"
              className="mt-4 inline-flex items-center px-4 py-2 rounded-xl
                         bg-gradient-to-r from-[#C9A84C] to-[#E6C766] text-black font-medium
                         hover:shadow-lg hover:shadow-[#C9A84C]/20 transition-all"
            >
              Crear mi primer bosquejo
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bosquejosList.slice(0, 3).map((b) => <BosquejoCard key={b.id} bosquejo={b} onDelete={handleDelete} />)}
            </div>
            {bosquejosList.length > 3 && (
              <div className="mt-6 text-center">
                <Link
                  to="/bosquejos"
                  className="inline-flex items-center px-6 py-2 rounded-xl border border-[#C9A84C]/40
                             text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-colors"
                >
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