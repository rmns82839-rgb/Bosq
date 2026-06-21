import React, { useState } from 'react';
import { PlusIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const PASOS = ['Titulo', 'Introduccion', 'Puntos', 'Aplicacion', 'Conclusion'];

const BosquejoForm = ({ initialData = {}, onSubmit, isLoading }) => {
  const [paso, setPaso] = useState(0);
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

  const siguiente = () => {
    if (paso === 0 && !formData.titulo.trim()) return;
    setPaso((p) => Math.min(p + 1, PASOS.length - 1));
  };

  const anterior = () => setPaso((p) => Math.max(p - 1, 0));

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Indicador de pasos */}
      <div className="flex items-center justify-between mb-6">
        {PASOS.map((nombre, i) => (
          <div key={nombre} className="flex-1 flex items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium shrink-0 ${
                i === paso
                  ? 'bg-primary-600 text-white'
                  : i < paso
                  ? 'bg-primary-200 text-primary-700 dark:bg-primary-800 dark:text-primary-200'
                  : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
              }`}
            >
              {i + 1}
            </div>
            {i < PASOS.length - 1 && (
              <div className={`flex-1 h-1 mx-1 ${i < paso ? 'bg-primary-400' : 'bg-gray-200 dark:bg-gray-700'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Paso 0: Titulo y Cita */}
      {paso === 0 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Titulo *</label>
            <input name="titulo" value={formData.titulo} onChange={handleChange} required autoFocus
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cita Biblica</label>
            <input name="cita" value={formData.cita} onChange={handleChange} placeholder="Ej: Juan 3:16"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500" />
          </div>
        </div>
      )}

      {/* Paso 1: Introduccion */}
      {paso === 1 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Introduccion</label>
          <textarea name="introduccion" value={formData.introduccion} onChange={handleChange} rows={8} autoFocus
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500" />
        </div>
      )}

      {/* Paso 2: Puntos de Desarrollo */}
      {paso === 2 && (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Puntos de Desarrollo</label>
            <button type="button" onClick={addPunto}
              className="inline-flex items-center px-3 py-1 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700">
              <PlusIcon className="w-4 h-4 mr-1" /> Agregar punto
            </button>
          </div>
          {formData.puntos.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">No hay puntos aun. Agrega el primero.</p>
          )}
          {formData.puntos.map((punto, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700 dark:text-gray-300">Punto {index + 1}</span>
                <button type="button" onClick={() => removePunto(index)} className="text-red-500 hover:text-red-700">
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
              <input placeholder="Titulo del punto" value={punto.titulo} onChange={(e) => updatePunto(index, 'titulo', e.target.value)}
                className="w-full mb-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white text-sm" />
              <textarea placeholder="Desarrollo" value={punto.desarrollo} onChange={(e) => updatePunto(index, 'desarrollo', e.target.value)} rows={3}
                className="w-full mb-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white text-sm" />
              <input placeholder="Versiculos de apoyo" value={punto.versos} onChange={(e) => updatePunto(index, 'versos', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white text-sm" />
            </div>
          ))}
        </div>
      )}

      {/* Paso 3: Aplicacion */}
      {paso === 3 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Aplicacion</label>
          <textarea name="aplicacion" value={formData.aplicacion} onChange={handleChange} rows={8} autoFocus
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500" />
        </div>
      )}

      {/* Paso 4: Conclusion */}
      {paso === 4 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Conclusion</label>
          <textarea name="conclusion" value={formData.conclusion} onChange={handleChange} rows={8} autoFocus
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500" />
        </div>
      )}

      {/* Navegacion */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={anterior}
          disabled={paso === 0}
          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-1" /> Atras
        </button>

        {paso < PASOS.length - 1 ? (
          <button
            type="button"
            onClick={siguiente}
            className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md"
          >
            Siguiente <ChevronRightIcon className="w-4 h-4 ml-1" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Guardando...' : 'Guardar Bosquejo'}
          </button>
        )}
      </div>
    </form>
  );
};

export default BosquejoForm;