import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import { useBosquejoStore } from '../stores/bosquejoStore';
import BosquejoCard from '../components/bosquejos/BosquejoCard';
import Header from '../components/common/Header';
import { 
  Plus, BookOpen, Calendar, CheckCircle, TrendingUp, 
  Sparkles, ArrowRight, Clock, Flame, Zap
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuthStore();
  const { bosquejos, isLoading, loadBosquejos, deleteBosquejo } = useBosquejoStore();
  const containerRef = useRef(null);

  useEffect(() => {
    loadBosquejos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este bosquejo?')) await deleteBosquejo(id);
  };

  const bosquejosList = Array.isArray(bosquejos) ? bosquejos : [];

  // Estadísticas calculadas
  const stats = [
    { 
      label: 'Total de Bosquejos', 
      value: bosquejosList.length, 
      icon: BookOpen, 
      color: 'from-[#C9A84C] to-[#F6E27A]',
      bg: 'rgba(201,168,76,0.1)'
    },
    { 
      label: 'Última Actualización', 
      value: bosquejosList.length > 0 
        ? new Date(bosquejosList[0].updatedAt).toLocaleDateString('es-ES', { 
            day: '2-digit', month: 'short', year: 'numeric' 
          })
        : 'Sin bosquejos', 
      icon: Calendar, 
      color: 'from-blue-400 to-blue-600',
      bg: 'rgba(59,130,246,0.1)'
    },
    { 
      label: 'Puntos con Versículos', 
      value: bosquejosList.reduce((total, b) => {
        const puntos = Array.isArray(b.puntos) ? b.puntos : [];
        return total + puntos.filter(p => p.versos).length;
      }, 0),
      icon: CheckCircle, 
      color: 'from-emerald-400 to-emerald-600',
      bg: 'rgba(16,185,129,0.1)'
    },
    { 
      label: 'Tasa de Crecimiento', 
      value: bosquejosList.length > 0 ? '+12%' : '0%',
      icon: TrendingUp, 
      color: 'from-purple-400 to-purple-600',
      bg: 'rgba(168,85,247,0.1)'
    },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0f0f1a] to-[#1a1a2e]">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section con efecto parallax */}
        <motion.div 
          style={{ opacity, scale }}
          className="relative overflow-hidden rounded-3xl p-6 sm:p-8 mb-8
                     bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e]
                     border border-white/10 shadow-2xl"
        >
          {/* Background decorations */}
          <div className="absolute -top-20 -right-20 w-96 h-96 
                         bg-[#C9A84C]/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 
                         bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                         w-[600px] h-[600px] bg-[#C9A84C]/[0.02] rounded-full blur-2xl" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="inline-block mb-3"
                >
                  <span className="px-4 py-1.5 rounded-full bg-[#C9A84C]/20 
                                 border border-[#C9A84C]/30 text-[#C9A84C] text-sm font-mono
                                 backdrop-blur-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    ¡Hola, {user?.name || 'Usuario'}! 👋
                  </span>
                </motion.div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-crimson text-white font-light leading-tight">
                  Tu cuaderno de
                  <span className="block sm:inline bg-gradient-to-r from-[#C9A84C] via-[#F6E27A] to-[#C9A84C] 
                                 bg-clip-text text-transparent">
                    {' '}bosquejos bíblicos
                  </span>
                </h1>
                <p className="mt-2 text-white/40 text-sm sm:text-base font-light max-w-xl">
                  Explora, crea y profundiza en el estudio de la Palabra. 
                  Cada bosquejo es una oportunidad para crecer espiritualmente.
                </p>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/bosquejos/nuevo" 
                  className="inline-flex items-center gap-2 px-6 py-3 
                             bg-gradient-to-r from-[#C9A84C] to-[#F6E27A]
                             text-black font-semibold rounded-2xl 
                             shadow-lg shadow-[#C9A84C]/20
                             hover:shadow-[#C9A84C]/40 transition-all duration-300
                             group whitespace-nowrap"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  Nuevo Bosquejo
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative overflow-hidden rounded-2xl p-4
                             bg-white/5 backdrop-blur-sm border border-white/10
                             hover:border-[#C9A84C]/30 transition-all duration-300
                             group cursor-default"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                                transition-opacity duration-500
                                bg-gradient-to-r from-[#C9A84C]/5 to-transparent" />
                  
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color}
                                   flex items-center justify-center mb-2
                                   shadow-lg shadow-[#C9A84C]/20`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
                    <p className="text-xs text-white/40 font-light mt-0.5">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Últimos Bosquejos Section */}
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-between mb-6"
          >
            <h2 className="text-2xl font-crimson text-white flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#C9A84C] animate-pulse" />
              Últimos Bosquejos
            </h2>
            {bosquejosList.length > 3 && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/bosquejos" 
                  className="inline-flex items-center gap-1 text-sm text-[#C9A84C] 
                             hover:text-[#F6E27A] transition-colors font-mono tracking-wider"
                >
                  Ver todos
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            )}
          </motion.div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-[#C9A84C]/20 border-t-[#C9A84C] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#C9A84C] rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          ) : bosquejosList.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-white/5 backdrop-blur-sm rounded-3xl 
                         border border-white/10"
            >
              <div className="text-6xl mb-4">📖</div>
              <p className="text-white/50 font-light text-lg">No tienes bosquejos aún.</p>
              <p className="text-white/30 text-sm mt-1">¡Comienza a crear tu primer bosquejo!</p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6"
              >
                <Link 
                  to="/bosquejos/nuevo" 
                  className="inline-flex items-center gap-2 px-6 py-3 
                             bg-gradient-to-r from-[#C9A84C] to-[#F6E27A]
                             text-black font-semibold rounded-2xl 
                             shadow-lg shadow-[#C9A84C]/20"
                >
                  <Plus className="w-5 h-5" />
                  Crear mi primer bosquejo
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bosquejosList.slice(0, 3).map((b, i) => (
                  <motion.div
                    key={b.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <BosquejoCard bosquejo={b} onDelete={handleDelete} />
                  </motion.div>
                ))}
              </div>
              {bosquejosList.length > 3 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 text-center"
                >
                  <Link 
                    to="/bosquejos" 
                    className="inline-flex items-center gap-2 px-6 py-2.5 
                               border border-[#C9A84C]/30 text-[#C9A84C] 
                               hover:bg-[#C9A84C]/10 rounded-2xl 
                               transition-all duration-300 font-light"
                  >
                    Ver todos los bosquejos
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;