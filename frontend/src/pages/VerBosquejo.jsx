import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { PencilIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useBosquejoStore } from '../stores/bosquejoStore';
import Header from '../components/common/Header';
import { VersiculoLink } from '../lib/bibliaLink';

/* Notación homilética: I → A → 1 (igual que en el editor) */
const ROMANOS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
                 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'];
const LETRAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function marcador(nivel, i) {
  if (nivel === 0) return ROMANOS[i] || String(i + 1);
  if (nivel === 1) return LETRAS[i] || String(i + 1);
  return String(i + 1);
}

/* Un punto y sus subpuntos, recursivo */
function PuntoLeido({ punto, indice, nivel }) {
  const subs = Array.isArray(punto.subpuntos) ? punto.subpuntos : [];
  // tolera datos viejos guardados como `desarrollo`
  const cuerpo = punto.descripcion ?? punto.desarrollo ?? '';

  const tamanos = ['text-lg', 'text-base', 'text-sm'];
  const sangrias = ['ml-0', 'ml-5', 'ml-9'];

  return (
    <div className={`mt-4 ${sangrias[nivel] || 'ml-9'}`}>
      <div className="flex gap-3">
        <span
          className="font-serif text-primary-600 dark:text-primary-400 shrink-0 select-none"
          style={{ minWidth: '2.1ch', textAlign: 'right' }}
          aria-hidden="true"
        >
          {marcador(nivel, indice)}.
        </span>

        <div className="min-w-0 flex-1">
          {punto.titulo && (
            <h3 className={`font-semibold text-gray-800 dark:text-gray-200 ${tamanos[nivel] || 'text-sm'}`}>
              {punto.titulo}
            </h3>
          )}

          {cuerpo && (
            <p className="text-gray-700 dark:text-gray-300 mt-1 whitespace-pre-wrap leading-relaxed">
              {cuerpo}
            </p>
          )}

          {punto.versos?.trim() && (
            <p className="text-sm mt-1">
              <span className="mr-1 opacity-60">📖</span>
              <VersiculoLink cita={punto.versos} />
            </p>
          )}

          {subs.map((sub, i) => (
            <PuntoLeido key={sub.id || i} punto={sub} indice={i} nivel={nivel + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* Bloque de texto de una sección */
function Seccion({ rotulo, texto }) {
  if (!texto?.trim()) return null;
  return (
    <section className="mt-8">
      <h2 className="text-xl font-serif font-semibold text-gray-800 dark:text-gray-200 mb-2">
        {rotulo}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
        {texto}
      </p>
    </section>
  );
}

const VerBosquejo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentBosquejo, loadBosquejo, isLoading, error } = useBosquejoStore();
  const [fallo, setFallo] = useState(null);

  useEffect(() => {
    if (!id || id === 'undefined' || id === 'null') {
      setFallo('Ese bosquejo no existe.');
      navigate('/bosquejos');
      return;
    }
    loadBosquejo(id);
  }, [id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setFallo(error);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
        </div>
      </div>
    );
  }

  if (fallo || !currentBosquejo) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="max-w-3xl mx-auto p-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {fallo || 'Ese bosquejo no existe.'}
            </p>
            <Link
              to="/bosquejos"
              className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Ver mis bosquejos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const puntos = Array.isArray(currentBosquejo.puntos) ? currentBosquejo.puntos : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="max-w-3xl mx-auto p-4 sm:p-6">
        <div className="mb-6 flex items-center justify-between gap-3">
          <Link
            to="/bosquejos"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-1" />
            Volver
          </Link>
          <Link
            to={`/bosquejos/${id}/editar`}
            className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            <PencilIcon className="w-5 h-5 mr-2" />
            Editar
          </Link>
        </div>

        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">
            {currentBosquejo.titulo || 'Bosquejo'}
          </h1>

          {currentBosquejo.cita && (
            <p className="text-primary-600 dark:text-primary-400 font-medium mb-6">
              <span className="mr-1">📖</span>
              <VersiculoLink cita={currentBosquejo.cita} />
            </p>
          )}

          <Seccion rotulo="Introducción" texto={currentBosquejo.introduccion} />

          {puntos.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-serif font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Desarrollo
              </h2>
              {puntos.map((p, i) => (
                <PuntoLeido key={p.id || i} punto={p} indice={i} nivel={0} />
              ))}
            </section>
          )}

          <Seccion rotulo="Aplicación" texto={currentBosquejo.aplicacion} />
          <Seccion rotulo="Conclusión" texto={currentBosquejo.conclusion} />

          <footer className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-2 justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Creado: {new Date(currentBosquejo.createdAt).toLocaleDateString('es-CO')}</span>
            <span>Actualizado: {new Date(currentBosquejo.updatedAt).toLocaleDateString('es-CO')}</span>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default VerBosquejo;
