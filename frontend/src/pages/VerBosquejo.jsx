import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { PencilIcon, ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useBosquejoStore } from '../stores/bosquejoStore';
import Header from '../components/common/Header';
import { VersiculoLink } from '../lib/bibliaLink';
import { decodificarSeccion } from '../lib/bosquejoSecciones';
import { renderTextoConNotas } from '../lib/textoConNotas';
import '../styles/bosquejo-editor.css';

const ROMANOS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
                 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'];
const LETRAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function marcador(nivel, i) {
  if (nivel === 0) return ROMANOS[i] || String(i + 1);
  if (nivel === 1) return LETRAS[i] || String(i + 1);
  return String(i + 1);
}

/* ── Modal de nota ─────────────────────────────────────────── */
function ModalNota({ titulo, texto, onCerrar }) {
  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && onCerrar();
    document.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [onCerrar]);

  return (
    <div className="vb-modal-overlay" onClick={onCerrar}>
      <div
        className="vb-modal-caja"
        role="dialog"
        aria-modal="true"
        aria-label="Nota"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="vb-modal-encabezado">
          <h3 className="vb-modal-titulo">📝 {titulo || 'Nota'}</h3>
          <button className="vb-modal-cerrar" onClick={onCerrar} aria-label="Cerrar">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <p className="vb-modal-texto">{texto}</p>
      </div>
    </div>
  );
}

/* ── Un punto y sus subpuntos, recursivo ─────────────────────── */
function PuntoLeido({ punto, indice, nivel, registrarRef, abrirNota }) {
  const subs = Array.isArray(punto.subpuntos) ? punto.subpuntos : [];
  const cuerpo = punto.descripcion ?? punto.desarrollo ?? '';

  const tamanos = ['text-lg', 'text-base', 'text-sm'];
  const sangrias = ['ml-0', 'ml-5', 'ml-9'];

  const refCallback = nivel === 0 ? (el) => registrarRef(punto.id, el) : undefined;

  return (
    <div
      ref={refCallback}
      data-punto-id={nivel === 0 ? punto.id : undefined}
      className={`mt-4 ${sangrias[nivel] || 'ml-9'} ${nivel === 0 ? 'scroll-mt-28' : ''}`}
    >
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
              {renderTextoConNotas(cuerpo, abrirNota, `pt-${punto.id}`)}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
            {punto.versos?.trim() && (
              <p className="text-sm">
                <span className="mr-1 opacity-60">📖</span>
                <VersiculoLink cita={punto.versos} />
              </p>
            )}

            {punto.notas?.trim() && (
              <button
                type="button"
                className="text-sm text-primary-600 dark:text-primary-400 underline decoration-dotted underline-offset-2 hover:text-primary-700 dark:hover:text-primary-300"
                onClick={() => abrirNota(punto.titulo, punto.notas)}
              >
                📝 Ver nota
              </button>
            )}
          </div>

          {subs.map((sub, i) => (
            <PuntoLeido
              key={sub.id || i}
              punto={sub}
              indice={i}
              nivel={nivel + 1}
              registrarRef={registrarRef}
              abrirNota={abrirNota}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Barra de progreso ────────────────────────────────────────── */
function BarraProgreso({ puntos, activo, onSaltar }) {
  if (puntos.length === 0) return null;

  const i = puntos.findIndex((p) => p.id === activo);
  const etiqueta =
    i === -1 ? null : `Punto ${marcador(0, i)} de ${puntos.length}${puntos[i].titulo ? ' — ' + puntos[i].titulo : ''}`;

  return (
    <div className="vb-progreso-envoltura">
      <div className="vb-progreso-segmentos">
        {puntos.map((p, idx) => (
          <button
            key={p.id}
            type="button"
            className={`vb-progreso-segmento ${p.id === activo ? 'vb-progreso-activo' : ''}`}
            onClick={() => onSaltar(p.id)}
            title={p.titulo || `Punto ${marcador(0, idx)}`}
            aria-current={p.id === activo}
          />
        ))}
      </div>
      {etiqueta && <p className="vb-progreso-etiqueta">{etiqueta}</p>}
    </div>
  );
}

/* Sección con uno o más campos con rótulo (Gancho/Conexión, Resumen/Llamado…)
   y un enlace de nota opcional para la sección completa. */
function SeccionCampos({ titulo, campos, notas, abrirNota }) {
  const conContenido = campos.filter((c) => c.texto?.trim());
  if (conContenido.length === 0 && !notas?.trim()) return null;

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between gap-3 mb-2">
        <h2 className="text-xl font-serif font-semibold text-gray-800 dark:text-gray-200">
          {titulo}
        </h2>
        {notas?.trim() && (
          <button
            type="button"
            className="text-sm text-primary-600 dark:text-primary-400 underline decoration-dotted underline-offset-2 hover:text-primary-700 dark:hover:text-primary-300 shrink-0"
            onClick={() => abrirNota(titulo, notas)}
          >
            📝 Ver nota
          </button>
        )}
      </div>
      {conContenido.map((c, i) => (
        <div key={i} className={i > 0 ? 'mt-3' : ''}>
          {c.rotulo && (
            <h3 className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-0.5">
              {c.rotulo}
            </h3>
          )}
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
            {renderTextoConNotas(c.texto, abrirNota, `sec-${titulo}-${i}`)}
          </p>
        </div>
      ))}
    </section>
  );
}

const VerBosquejo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentBosquejo, loadBosquejo, isLoading, error } = useBosquejoStore();
  const [fallo, setFallo] = useState(null);
  const [nota, setNota] = useState(null);
  const [activo, setActivo] = useState(null);

  const refsPuntos = useRef(new Map());
  const registrarRef = useCallback((idPunto, el) => {
    if (el) refsPuntos.current.set(idPunto, el);
    else refsPuntos.current.delete(idPunto);
  }, []);

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

  const puntos = Array.isArray(currentBosquejo?.puntos) ? currentBosquejo.puntos : [];
  const intro = decodificarSeccion(currentBosquejo?.introduccion, 'gancho');
  const aplic = decodificarSeccion(currentBosquejo?.aplicacion, 'texto');
  const concl = decodificarSeccion(currentBosquejo?.conclusion, 'resumen');

  useEffect(() => {
    if (puntos.length === 0) return;
    if (!activo) setActivo(puntos[0].id);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibles = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibles[0]) setActivo(visibles[0].target.dataset.puntoId);
      },
      { rootMargin: '-15% 0px -65% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    refsPuntos.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [puntos.length, currentBosquejo?.id]);

  const saltarAPunto = (idPunto) => {
    const el = refsPuntos.current.get(idPunto);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <div className="max-w-3xl mx-auto p-4 sm:p-6" style={puntos.length > 1 ? { paddingBottom: '84px' } : undefined}>
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

          {(currentBosquejo.tema?.trim() || currentBosquejo.proposito?.trim()) && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 italic">
              {currentBosquejo.tema?.trim() && <span>{currentBosquejo.tema}</span>}
              {currentBosquejo.tema?.trim() && currentBosquejo.proposito?.trim() && <span> · </span>}
              {currentBosquejo.proposito?.trim() && <span>{currentBosquejo.proposito}</span>}
            </p>
          )}

          {currentBosquejo.cita && (
            <p className="text-primary-600 dark:text-primary-400 font-medium mb-6">
              <span className="mr-1">📖</span>
              <VersiculoLink cita={currentBosquejo.cita} />
            </p>
          )}

          <SeccionCampos
            titulo="Introducción"
            campos={[
              { rotulo: 'Gancho', texto: intro.gancho },
              { rotulo: 'Conexión', texto: intro.conexion },
            ]}
            notas={intro.notas}
            abrirNota={(titulo, texto) => setNota({ titulo, texto })}
          />

          {puntos.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-serif font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Desarrollo
              </h2>
              {puntos.map((p, i) => (
                <PuntoLeido
                  key={p.id || i}
                  punto={p}
                  indice={i}
                  nivel={0}
                  registrarRef={registrarRef}
                  abrirNota={(titulo, texto) => setNota({ titulo, texto })}
                />
              ))}
            </section>
          )}

          <SeccionCampos
            titulo="Aplicación"
            campos={[{ rotulo: null, texto: aplic.texto }]}
            notas={aplic.notas}
            abrirNota={(titulo, texto) => setNota({ titulo, texto })}
          />

          <SeccionCampos
            titulo="Conclusión"
            campos={[
              { rotulo: 'Resumen', texto: concl.resumen },
              { rotulo: 'Llamado', texto: concl.llamado },
            ]}
            notas={concl.notas}
            abrirNota={(titulo, texto) => setNota({ titulo, texto })}
          />

          <footer className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-2 justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Creado: {new Date(currentBosquejo.createdAt).toLocaleDateString('es-CO')}</span>
            <span>Actualizado: {new Date(currentBosquejo.updatedAt).toLocaleDateString('es-CO')}</span>
          </footer>
        </article>
      </div>

      {puntos.length > 1 && (
        <BarraProgreso puntos={puntos} activo={activo} onSaltar={saltarAPunto} />
      )}

      {nota && (
        <ModalNota
          titulo={nota.titulo}
          texto={nota.texto}
          onCerrar={() => setNota(null)}
        />
      )}
    </div>
  );
};

export default VerBosquejo;
