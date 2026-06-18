import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBosquejoStore } from '../stores/bosquejoStore';
import BosquejoForm from '../components/bosquejos/BosquejoForm';
import Header from '../components/common/Header';

const EditarBosquejo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentBosquejo, isLoading, loadBosquejo, updateBosquejo } = useBosquejoStore();

  useEffect(() => { loadBosquejo(id); }, [id]);

  const handleSubmit = async (data) => {
    await updateBosquejo(id, data);
    navigate(`/bosquejos/${id}`);
  };

  if (isLoading || !currentBosquejo) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-6">Editar Bosquejo</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <BosquejoForm initialData={currentBosquejo} onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default EditarBosquejo;
