import React, { useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const BosquejoForm = ({ initialData = {}, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    titulo: initialData.titulo || '',
    cita: initialData.cita || '',
    introduccion: initialData.introduccion || '',
    aplicacion: initialData.aplicacion || '',
    conclusion: initialData.conclusion || '',
    puntos: initialData.puntos || [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addPunto = () => {
    setFormData({
      ...formData,
      puntos: [...formData.puntos, { titulo: '', desarrollo: '', versos: '' }],
    });
  };

  const updatePunto = (index, field, value) => {
    const newPuntos = [...formData.puntos];
    newPuntos[index] = { ...newPuntos[index], [field]: value };
    setFormData({ ...formData, puntos: newPuntos });
  };

  const removePunto = (index) => {
    setFormData({ ...formData, puntos: formData.puntos.filter((_, i) => i !== index) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título *</label>
        <input name="titulo" value={formData.titulo} onChange={handleChange} required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cita Bíblica</label>
        <input name="cita" value={formData.cita} onChange={handleChange} placeholder="Ej: Juan 3:16"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Introducción</label>
        <textarea name="introduccion" value={formData.introduccion} onChange={handleChange} rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500" />
      </div>

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Puntos de Desarrollo</label>
          <button type="button" onClick={addPunto}
            className="inline-flex items-center px-3 py-1 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700">
            <PlusIcon className="w-4 h-4 mr-1" /> Agregar punto
          </button>
        </div>
        {formData.puntos.map((punto, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">Punto {index + 1}</span>
              <button type="button" onClick={() => removePunto(index)} className="text-red-500 hover:text-red-700">
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
            <input placeholder="Título del punto" value={punto.titulo} onChange={(e) => updatePunto(index, 'titulo', e.target.value)}
              className="w-full mb-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white text-sm" />
            <textarea placeholder="Desarrollo" value={punto.desarrollo} onChange={(e) => updatePunto(index, 'desarrollo', e.target.value)} rows={2}
              className="w-full mb-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white text-sm" />
            <input placeholder="Versículos de apoyo" value={punto.versos} onChange={(e) => updatePunto(index, 'versos', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white text-sm" />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Aplicación</label>
        <textarea name="aplicacion" value={formData.aplicacion} onChange={handleChange} rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Conclusión</label>
        <textarea name="conclusion" value={formData.conclusion} onChange={handleChange} rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500" />
      </div>

      <button type="submit" disabled={isLoading}
        className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-base">
        {isLoading ? 'Guardando...' : 'Guardar Bosquejo'}
      </button>
    </form>
  );
};

export default BosquejoForm;
