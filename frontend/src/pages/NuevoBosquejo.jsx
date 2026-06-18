import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBosquejoStore } from '../stores/bosquejoStore';
import BosquejoForm from '../components/bosquejos/BosquejoForm';
import Header from '../components/common/Header';

const NuevoBosquejo = () => {
  const navigate = useNavigate();
  const { createBosquejo, isLoading } = useBosquejoStore();

  const handleSubmit = async (data) => {
    const bosquejo = await createBosquejo(data);
    if (bosquejo) navigate(`/bosquejos/${bosquejo.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-6">Nuevo Bosquejo</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <BosquejoForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default NuevoBosquejo;
