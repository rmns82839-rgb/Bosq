import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { PencilIcon, ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useBosquejoStore } from '../stores/bosquejoStore';
import Header from '../components/common/Header';
import Diapositivas from '../components/common/Diapositivas';
import BosquejoImprimible from '../components/bosquejos/BosquejoImprimible';
import { VersiculoLink } from '../lib/bibliaLink';
import { decodificarSeccion } from '../lib/bosquejoSecciones';
import { renderTextoConNotas, tieneTextoVisible } from '../lib/textoConNotas';
import '../styles/bosquejo-editor.css';
import '../styles/vb-premium.css';

const ROMANOS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
                 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'];
const LETRAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const NOMBRE_NIVEL = ['Punto', 'Subpunto', 'Punto'];

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
    <motion.div
      className="vb-modal-overlay"
      onClick={onCerrar}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        className="vb-modal-caja"
        role="dialog"
        aria-modal="true"
        aria-label="Nota"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 340, damping: 28 }}
      >
        <div className="vb-modal-encabezado">
          <h3 className="vb-modal-titulo">📝 {titulo || 'Nota'}</h3>
          <button className="vb-modal-cerrar" onClick={onCerrar} aria-label="Cerrar">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <p className="vb-modal-texto">{texto}</p>
      </motion.div>
    </motion.div>
  );
}

/** Recorre puntos y subpuntos (cualquier nivel) y arma una diapositiva
 * por cada uno, en el mismo orden en que se leen. */
function recolectarPuntos(lista, nivel, diapositivas) {
  const rol = nivel === 0 ? 'punto0' : nivel === 1 ? 'punto1' : 'punto2';
  lista.forEach((p, i) => {
    diapositivas.push({
      id: p.id,
      rol,
      etiqueta: `${NOMBRE_NIVEL[Math.min(nivel, 2)]} ${marcador(nivel, i)}`,
      tipo: 'punto',
      datos: p,
    });
    if (Array.isArray(p.subpuntos) && p.subpuntos.length > 0) {
      recolectarPuntos(p.subpuntos, nivel + 1, diapositivas);
    }
  });
}

/* ── Capa de modo predicación (pantalla completa + wake lock) ── */
function CapaPredicacion({ slides, renderSlide, titulo, onCerrar }) {
  useEffect(() => {
    let wakeLock = null;
    let cancelado = false;

    const pedir = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLock = await navigator.wakeLock.request('screen');
        }
      } catch { /* no soportado o bloqueado */ }
    };

    const onVisibilidad = () => {
      if (!cancelado && document.visibilityState === 'visible') pedir();
    };

    pedir();
    document.addEventListener('visibilitychange', onVisibilidad);
    document.body.style.overflow = 'hidden';
    const onEsc = (e) => e.key === 'Escape' && onCerrar();
    document.addEventListener('keydown', onEsc);

    return () => {
      cancelado = true;
      document.removeEventListener('visibilitychange', onVisibilidad);
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
      try { wakeLock?.release(); } catch {}
      try { if (document.fullscreenElement) document.exitFullscreen?.(); } catch {}
    };
  }, [onCerrar]);

  return (
    <div className="modo-predicacion" style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', flexDirection: 'column' }}>
      <div className="modo-predicacion-barra">
        <span className="modo-predicacion-titulo">{titulo || 'Bosquejo'}</span>
        <button type="button" className="modo-predicacion-salir" onClick={onCerrar} aria-label="Salir del modo predicación">
          ✕ Salir
        </button>
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <Diapositivas slides={slides} renderSlide={renderSlide} />
      </div>
    </div>
  );
}

const VerBosquejo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentBosquejo, loadBosquejo, isLoading, error } = useBosquejoStore();
  const [fallo, setFallo] = useState(null);
  const [nota, setNota] = useState(null);
  const [predicando, setPredicando] = useState(false);

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
      <div className="vb-premium min-h-screen">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
        </div>
      </div>
    );
  }

  if (fallo || !currentBosquejo) {
    return (
      <div className="vb-premium min-h-screen">
        <Header />
        <div className="max-w-3xl mx-auto p-6">
          <div className="vb-tarjeta text-center">
            <p className="vb-texto-cuerpo mb-4">
              {fallo || 'Ese bosquejo no existe.'}
            </p>
            <Link
              to="/bosquejos"
              className="inline-flex items-center px-4 py-2 vb-btn-editar rounded-lg transition-colors"
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
  const intro = decodificarSeccion(currentBosquejo.introduccion, 'gancho');
  const aplic = decodificarSeccion(currentBosquejo.aplicacion, 'texto');
  const concl = decodificarSeccion(currentBosquejo.conclusion, 'resumen');

  // Cada diapositiva es una parada del mensaje: Introducción, cada punto
  // y subpunto (cualquier nivel), Aplicación, Conclusión.
  const diapositivas = [];
  if (tieneTextoVisible(intro.gancho) || tieneTextoVisible(intro.conexion) || intro.notas?.trim()) {
    diapositivas.push({ id: 'intro', rol: 'intro', etiqueta: 'Introducción', tipo: 'intro', datos: intro });
  }
  recolectarPuntos(puntos, 0, diapositivas);
  if (tieneTextoVisible(aplic.texto) || aplic.notas?.trim()) {
    diapositivas.push({ id: 'aplicacion', rol: 'aplicacion', etiqueta: 'Aplicación', tipo: 'aplicacion', datos: aplic });
  }
  if (tieneTextoVisible(concl.resumen) || tieneTextoVisible(concl.llamado) || concl.notas?.trim()) {
    diapositivas.push({ id: 'conclusion', rol: 'conclusion', etiqueta: 'Conclusión', tipo: 'conclusion', datos: concl });
  }

  const abrirNota = (titulo, texto) => setNota({ titulo, texto });

  const renderSlide = (slide) => {
    if (slide.tipo === 'intro') {
      const d = slide.datos;
      return (
        <>
          {d.gancho?.trim() && (
            <div className="mb-5">
              <h3 className="vb-eyebrow mb-1">Gancho</h3>
              <p className="dp-texto">{renderTextoConNotas(d.gancho, abrirNota, 'gancho')}</p>
            </div>
          )}
          {d.conexion?.trim() && (
            <div className="mb-5">
              <h3 className="vb-eyebrow mb-1">Conexión</h3>
              <p className="dp-texto">{renderTextoConNotas(d.conexion, abrirNota, 'conexion')}</p>
            </div>
          )}
          {d.notas?.trim() && (
            <button type="button" className="vb-nota-enlace underline decoration-dotted underline-offset-2" onClick={() => abrirNota('Introducción', d.notas)}>
              📝 Ver nota
            </button>
          )}
        </>
      );
    }

    if (slide.tipo === 'punto') {
      const p = slide.datos;
      const cuerpo = p.descripcion ?? p.desarrollo ?? '';
      return (
        <div className={p.recuadro ? 'be-diapo-recuadro' : undefined}>
          {p.titulo && <h2 className="dp-titulo mb-3">{p.titulo}</h2>}
          {cuerpo && <p className="dp-texto">{renderTextoConNotas(cuerpo, abrirNota, `pt-${p.id}`)}</p>}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-5">
            {p.versos?.trim() && (
              <p className="text-base"><span className="mr-1 opacity-60">📖</span><VersiculoLink cita={p.versos} /></p>
            )}
            {p.notas?.trim() && (
              <button type="button" className="vb-nota-enlace underline decoration-dotted underline-offset-2" onClick={() => abrirNota(p.titulo, p.notas)}>
                📝 Ver nota
              </button>
            )}
          </div>
        </div>
      );
    }

    if (slide.tipo === 'aplicacion') {
      const d = slide.datos;
      return (
        <>
          {d.texto?.trim() && <p className="dp-texto">{renderTextoConNotas(d.texto, abrirNota, 'aplicacion')}</p>}
          {d.notas?.trim() && (
            <button type="button" className="vb-nota-enlace underline decoration-dotted underline-offset-2 mt-4" onClick={() => abrirNota('Aplicación', d.notas)}>
              📝 Ver nota
            </button>
          )}
        </>
      );
    }

    if (slide.tipo === 'conclusion') {
      const d = slide.datos;
      return (
        <>
          {d.resumen?.trim() && (
            <div className="mb-5">
              <h3 className="vb-eyebrow mb-1">Resumen</h3>
              <p className="dp-texto">{renderTextoConNotas(d.resumen, abrirNota, 'resumen')}</p>
            </div>
          )}
          {d.llamado?.trim() && (
            <div className="mb-5">
              <h3 className="vb-eyebrow mb-1">Llamado</h3>
              <p className="dp-texto">{renderTextoConNotas(d.llamado, abrirNota, 'llamado')}</p>
            </div>
          )}
          {d.notas?.trim() && (
            <button type="button" className="vb-nota-enlace underline decoration-dotted underline-offset-2" onClick={() => abrirNota('Conclusión', d.notas)}>
              📝 Ver nota
            </button>
          )}
        </>
      );
    }

    return null;
  };

  return (
    <div className="vb-premium" style={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <div className="px-4 sm:px-6 pt-4 pb-2 shrink-0">
        <div className="mb-3 flex items-center justify-between gap-3">
          <Link to="/bosquejos" className="inline-flex items-center vb-link-volver transition-colors">
            <ArrowLeftIcon className="w-5 h-5 mr-1" />
            Volver
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setPredicando(true);
                try { document.documentElement.requestFullscreen?.(); } catch {}
              }}
              className="inline-flex items-center px-4 py-2 vb-btn-editar rounded-lg transition-colors"
            >
              🎤 <span className="ml-1">Predicar</span>
            </button>

                <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center px-4 py-2 vb-btn-editar rounded-lg transition-colors"
            title="Imprimir o guardar como PDF"
          >
            🖨 <span className="ml-1">PDF</span>
          </button>

            <Link
              to={`/bosquejos/${id}/editar`}
              className="inline-flex items-center px-4 py-2 vb-btn-editar rounded-lg transition-colors"
            >
              <PencilIcon className="w-5 h-5 mr-2" />
              Editar
            </Link>
          </div>
        </div>

        <h1 className="vb-titulo font-serif font-bold text-2xl">
          {currentBosquejo.titulo || 'Bosquejo'}
        </h1>
        {(currentBosquejo.tema?.trim() || currentBosquejo.proposito?.trim()) && (
          <p className="vb-eyebrow mt-1">
            {currentBosquejo.tema?.trim() && <span>{currentBosquejo.tema}</span>}
            {currentBosquejo.tema?.trim() && currentBosquejo.proposito?.trim() && <span> · </span>}
            {currentBosquejo.proposito?.trim() && <span>{currentBosquejo.proposito}</span>}
          </p>
        )}
        {currentBosquejo.cita && (
          <p className="vb-cita mt-1"><span className="mr-1">📖</span><VersiculoLink cita={currentBosquejo.cita} /></p>
        )}
      </div>

      {diapositivas.length > 0 ? (
        <div className="flex-1 min-h-0">
          <Diapositivas slides={diapositivas} renderSlide={renderSlide} />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center px-6">
          <p className="vb-texto-cuerpo text-center">Este bosquejo todavía no tiene contenido.</p>
        </div>
      )}

      {predicando && (
        <CapaPredicacion
          slides={diapositivas}
          renderSlide={renderSlide}
          titulo={currentBosquejo.titulo}
          onCerrar={() => setPredicando(false)}
        />
      )}

      <BosquejoImprimible bosquejo={currentBosquejo} />

      <AnimatePresence>
        {nota && (
          <ModalNota titulo={nota.titulo} texto={nota.texto} onCerrar={() => setNota(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default VerBosquejo;
