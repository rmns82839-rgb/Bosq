import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { PencilIcon, ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useBosquejoStore } from '../stores/bosquejoStore';
import Header from '../components/common/Header';
import { VersiculoLink } from '../lib/bibliaLink';
import { decodificarSeccion } from '../lib/bosquejoSecciones';
import { renderTextoConNotas, tieneTextoVisible } from '../lib/textoConNotas';
import '../styles/bosquejo-editor.css';
import '../styles/vb-premium.css';

const ROMANOS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
                 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'];
const LETRAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function marcador(nivel, i) {
  if (nivel === 0) return ROMANOS[i] || String(i + 1);
  if (nivel === 1) return LETRAS[i] || String(i + 1);
  return String(i + 1);
}

/* ── Modal de nota, con entrada/salida animada ─────────────────── */
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

/* ── Un punto y sus subpuntos, recursivo ─────────────────────
   Cada punto y cada subpunto — sin importar el nivel — se registra
   como una parada del listón de progreso. */
function PuntoLeido({ punto, indice, nivel, registrarRef, abrirNota, estadoDe }) {
  const subs = Array.isArray(punto.subpuntos) ? punto.subpuntos : [];
  const cuerpo = punto.descripcion ?? punto.desarrollo ?? '';

  const tamanos = ['text-lg', 'text-base', 'text-sm'];
  const sangrias = ['ml-0', 'ml-5', 'ml-9'];
  const roles = ['rol-punto0', 'rol-punto1', 'rol-punto2'];
  const estado = estadoDe(punto.id);

  return (
    <div
      ref={(el) => registrarRef(punto.id, el)}
      data-punto-id={punto.id}
      className={clsx(
        'mt-4 scroll-mt-28',
        sangrias[nivel] || 'ml-9',
        roles[nivel] || 'rol-punto2',
        `vb-texto-${estado}`
      )}
    >
      <div className="flex gap-3">
        <span
          className="font-serif vb-marcador"
          aria-hidden="true"
        >
          {marcador(nivel, indice)}.
        </span>

        <div className="min-w-0 flex-1">
          {punto.titulo && (
            <h3 className={clsx('font-semibold vb-titulo-punto', tamanos[nivel] || 'text-sm')}>
              {punto.titulo}
            </h3>
          )}

          {cuerpo && (
            <p className="vb-texto-cuerpo mt-1 whitespace-pre-wrap leading-relaxed">
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
                className="vb-nota-enlace underline decoration-dotted underline-offset-2"
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
              estadoDe={estadoDe}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── El listón — un marcapáginas que se desliza sobre una pista.
   Las marcas son referencia y punto de salto; el listón (framer-
   motion) es el elemento que de verdad dice "por dónde vas". ──── */
function Cinta({ paradas, activo, maxVisto, onSaltar }) {
  if (paradas.length < 2) return null;

  const idx = paradas.findIndex((p) => p.id === activo);
  const total = paradas.length;
  const pct = idx <= 0 ? 0 : (idx / (total - 1)) * 100;
  const etiqueta = idx === -1 ? null : `${idx + 1} de ${total} — ${paradas[idx].etiqueta}`;

  return (
    <div className="vb-cinta-envoltura">
      <div className="vb-cinta-pista">
        {paradas.map((p, i) => {
          const esActivo = p.id === activo;
          const yaVisitado = i <= maxVisto && !esActivo;
          return (
            <button
              key={p.id}
              type="button"
              className={clsx(
                'vb-cinta-marca',
                `rol-${p.rol}`,
                esActivo && 'vb-cinta-marca-activa',
                yaVisitado && 'vb-cinta-marca-visitada'
              )}
              style={{ left: `${total > 1 ? (i / (total - 1)) * 100 : 0}%` }}
              onClick={() => onSaltar(p.id)}
              title={p.etiqueta}
              aria-current={esActivo}
            />
          );
        })}
        <motion.div
          className="vb-cinta-listón"
          animate={{ left: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 280, damping: 30 }}
        />
      </div>
      {etiqueta && <p className="vb-cinta-etiqueta">{etiqueta}</p>}
    </div>
  );
}

/* Sección con uno o más campos con rótulo (Gancho/Conexión, Resumen/Llamado…),
   registrada también como parada del listón de progreso. */
function SeccionCampos({ id, rol, titulo, campos, notas, abrirNota, registrarRef, estadoDe }) {
  const conContenido = campos.filter((c) => c.texto?.trim());
  if (conContenido.length === 0 && !notas?.trim()) return null;
  const estado = estadoDe(id);

  return (
    <section
      ref={(el) => registrarRef(id, el)}
      data-punto-id={id}
      className={clsx('mt-8 scroll-mt-28', `rol-${rol}`, `vb-texto-${estado}`)}
    >
      <div className="flex items-center justify-between gap-3 mb-2">
        <h2 className="text-xl font-semibold vb-rotulo-seccion">
          {titulo}
        </h2>
        {notas?.trim() && (
          <button
            type="button"
            className="vb-nota-enlace underline decoration-dotted underline-offset-2 shrink-0"
            onClick={() => abrirNota(titulo, notas)}
          >
            📝 Ver nota
          </button>
        )}
      </div>
      {conContenido.map((c, i) => (
        <div key={i} className={i > 0 ? 'mt-3' : ''}>
          {c.rotulo && (
            <h3 className="vb-eyebrow vb-rotulo-campo mb-0.5">
              {c.rotulo}
            </h3>
          )}
          <p className="vb-texto-cuerpo whitespace-pre-wrap leading-relaxed">
            {renderTextoConNotas(c.texto, abrirNota, `sec-${titulo}-${i}`)}
          </p>
        </div>
      ))}
    </section>
  );
}

/** Recorre puntos y subpuntos (cualquier nivel) y los agrega como paradas,
 * en el mismo orden en que se leen. */
function recolectarPuntos(lista, nivel, paradas) {
  const rol = nivel === 0 ? 'punto0' : nivel === 1 ? 'punto1' : 'punto2';
  lista.forEach((p, i) => {
    paradas.push({ id: p.id, etiqueta: p.titulo || `Punto ${marcador(nivel, i)}`, rol });
    if (Array.isArray(p.subpuntos) && p.subpuntos.length > 0) {
      recolectarPuntos(p.subpuntos, nivel + 1, paradas);
    }
  });
}

const VerBosquejo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentBosquejo, loadBosquejo, isLoading, error } = useBosquejoStore();
  const [fallo, setFallo] = useState(null);
  const [nota, setNota] = useState(null);
  const [activo, setActivo] = useState(null);
  const [maxVisto, setMaxVisto] = useState(-1);

  const refsPuntos = useRef(new Map());
  const registrarRef = useCallback((idParada, el) => {
    if (el) refsPuntos.current.set(idParada, el);
    else refsPuntos.current.delete(idParada);
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

  // Paradas del listón de progreso: TODO el mensaje en orden de lectura —
  // Introducción, cada punto y subpunto (cualquier nivel), Aplicación, Conclusión.
  const paradas = useMemo(() => {
    const lista = [];
    if (tieneTextoVisible(intro.gancho) || tieneTextoVisible(intro.conexion) || intro.notas?.trim()) {
      lista.push({ id: 'intro', etiqueta: 'Introducción', rol: 'intro' });
    }
    recolectarPuntos(puntos, 0, lista);
    if (tieneTextoVisible(aplic.texto) || aplic.notas?.trim()) {
      lista.push({ id: 'aplicacion', etiqueta: 'Aplicación', rol: 'aplicacion' });
    }
    if (tieneTextoVisible(concl.resumen) || tieneTextoVisible(concl.llamado) || concl.notas?.trim()) {
      lista.push({ id: 'conclusion', etiqueta: 'Conclusión', rol: 'conclusion' });
    }
    return lista;
  }, [currentBosquejo]);

  // Estado de cada parada respecto a dónde vas leyendo — se usa tanto en
  // el listón como para atenuar/resaltar el texto mismo.
  const indicePorId = useMemo(
    () => new Map(paradas.map((p, i) => [p.id, i])),
    [paradas]
  );
  const estadoDe = useCallback(
    (idParada) => {
      if (paradas.length < 2) return 'normal';
      const idx = indicePorId.get(idParada);
      if (idx === undefined) return 'normal';
      if (idParada === activo) return 'activo';
      if (idx <= maxVisto) return 'visitado';
      return 'normal';
    },
    [paradas, indicePorId, activo, maxVisto]
  );

  useEffect(() => {
    if (paradas.length === 0) return;
    if (!activo) setActivo(paradas[0].id);

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
  }, [paradas]);

  // Recuerda hasta dónde has llegado — si te devuelves a repasar algo,
  // lo ya cubierto se queda marcado (no retrocede).
  useEffect(() => {
    if (!activo) return;
    const idx = paradas.findIndex((p) => p.id === activo);
    if (idx > maxVisto) setMaxVisto(idx);
  }, [activo, paradas]);

  const saltarAParada = (idParada) => {
    const el = refsPuntos.current.get(idParada);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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

  return (
    <div className="vb-premium min-h-screen">
      <Header />

      <div className="max-w-3xl mx-auto p-4 sm:p-6" style={paradas.length > 1 ? { paddingBottom: '84px' } : undefined}>
        <div className="mb-6 flex items-center justify-between gap-3">
          <Link
            to="/bosquejos"
            className="inline-flex items-center vb-link-volver transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-1" />
            Volver
          </Link>
          <Link
            to={`/bosquejos/${id}/editar`}
            className="inline-flex items-center px-4 py-2 vb-btn-editar rounded-lg transition-colors"
          >
            <PencilIcon className="w-5 h-5 mr-2" />
            Editar
          </Link>
        </div>

        <article className="vb-tarjeta">
          <h1 className="vb-titulo font-serif font-bold">
            {currentBosquejo.titulo || 'Bosquejo'}
          </h1>

          {(currentBosquejo.tema?.trim() || currentBosquejo.proposito?.trim()) && (
            <p className="vb-eyebrow mb-2">
              {currentBosquejo.tema?.trim() && <span>{currentBosquejo.tema}</span>}
              {currentBosquejo.tema?.trim() && currentBosquejo.proposito?.trim() && <span> · </span>}
              {currentBosquejo.proposito?.trim() && <span>{currentBosquejo.proposito}</span>}
            </p>
          )}

          {currentBosquejo.cita && (
            <p className="vb-cita mb-6">
              <span className="mr-1">📖</span>
              <VersiculoLink cita={currentBosquejo.cita} />
            </p>
          )}

          <SeccionCampos
            id="intro"
            rol="intro"
            titulo="Introducción"
            campos={[
              { rotulo: 'Gancho', texto: intro.gancho },
              { rotulo: 'Conexión', texto: intro.conexion },
            ]}
            notas={intro.notas}
            abrirNota={(titulo, texto) => setNota({ titulo, texto })}
            registrarRef={registrarRef}
            estadoDe={estadoDe}
          />

          {puntos.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-semibold vb-rotulo-seccion mb-2">
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
                  estadoDe={estadoDe}
                />
              ))}
            </section>
          )}

          <SeccionCampos
            id="aplicacion"
            rol="aplicacion"
            titulo="Aplicación"
            campos={[{ rotulo: null, texto: aplic.texto }]}
            notas={aplic.notas}
            abrirNota={(titulo, texto) => setNota({ titulo, texto })}
            registrarRef={registrarRef}
            estadoDe={estadoDe}
          />

          <SeccionCampos
            id="conclusion"
            rol="conclusion"
            titulo="Conclusión"
            campos={[
              { rotulo: 'Resumen', texto: concl.resumen },
              { rotulo: 'Llamado', texto: concl.llamado },
            ]}
            notas={concl.notas}
            abrirNota={(titulo, texto) => setNota({ titulo, texto })}
            registrarRef={registrarRef}
            estadoDe={estadoDe}
          />

          <footer className="vb-pie mt-10 pt-6 flex flex-wrap gap-2 justify-between">
            <span>Creado: {new Date(currentBosquejo.createdAt).toLocaleDateString('es-CO')}</span>
            <span>Actualizado: {new Date(currentBosquejo.updatedAt).toLocaleDateString('es-CO')}</span>
          </footer>
        </article>
      </div>

      {paradas.length > 1 && (
        <Cinta paradas={paradas} activo={activo} maxVisto={maxVisto} onSaltar={saltarAParada} />
      )}

      <AnimatePresence>
        {nota && (
          <ModalNota
            titulo={nota.titulo}
            texto={nota.texto}
            onCerrar={() => setNota(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default VerBosquejo;
