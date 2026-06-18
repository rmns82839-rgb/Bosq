import React, { useState } from "react";
import { bibliaService } from "../services/bibliaService";
import Header from "../components/common/Header";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const BuscarBiblia = () => {
  const [referencia, setReferencia] = useState("");
  const [resultado, setResultado] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const buscar = async (e) => {
    e.preventDefault();
    if (!referencia.trim()) return;
    setIsLoading(true);
    setError("");
    setResultado(null);
    try {
      const res = await bibliaService.buscar(referencia);
      setResultado(res.data);
    } catch {
      setError("No se encontro el versiculo. Intenta con formato: Juan 3:16 o Romanos 8:28");
    } finally {
      setIsLoading(false);
    }
  };

  const aleatorio = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await bibliaService.aleatorio();
      setResultado(res.data);
      setReferencia(res.data.reference || "");
    } catch {
      setError("Error al obtener versiculo aleatorio");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="max-w-2xl mx-auto p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Buscar en la Biblia</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <form onSubmit={buscar} className="flex gap-2 mb-4">
            <input type="text" placeholder="Ej: Juan 3:16, Salmos 23:1" value={referencia}
              onChange={(e) => setReferencia(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
            <button type="submit" disabled={isLoading}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
          </form>
          <button onClick={aleatorio} disabled={isLoading}
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline disabled:opacity-50">
            Ver versiculo aleatorio
          </button>

          {isLoading && (
            <div className="mt-6 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
          )}

          {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}

          {resultado && (
            <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
              <p className="text-lg font-serif text-gray-800 dark:text-gray-200 leading-relaxed italic">
                {resultado.text}
              </p>
              <p className="mt-3 text-primary-600 dark:text-primary-400 font-medium text-right">
                {resultado.reference}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Referencias de ejemplo</h2>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {["Juan 3:16", "Salmos 23", "Romanos 8:28", "Filipenses 4:13", "Proverbios 3:5", "Jeremias 29:11"].map((ref) => (
              <button key={ref} onClick={() => setReferencia(ref)}
                className="px-3 py-1 text-sm border border-primary-300 dark:border-primary-700 text-primary-600 dark:text-primary-400 rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/20">
                {ref}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Recursos de Estudio Biblico
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Para estudio inductivo profundo, comentarios y analisis por libro:
          </p>
          <a href="https://www.indubiblia.org" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm font-medium">
            Abrir Indubiblia.org
          </a>
        </div>

      </div>
    </div>
  );
};

export default BuscarBiblia;