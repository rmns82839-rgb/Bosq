import { useState, useRef, useCallback, useMemo } from 'react'
import { VersiculoLink } from '../../lib/bibliaLink'
import BotonPreguntarIA from '../common/BotonPreguntarIA'

const CE = { bueno: '#10B981', malo: '#EF4444', mixto: '#F59E0B' }
const IE = { bueno: '👑', malo: '⚔️', mixto: '📜' }

const INICIO_EJE = 1050        // a.C. — extremo izquierdo
const FIN_EJE = 586            // a.C. — extremo derecho (caída de Judá)
const ANIO_DIVISION = 930      // división del reino
const ANIO_CAIDA_ISRAEL = 722  // Israel cae ante Asiria
const PX_POR_ANIO = 8
// Ancho mínimo donde cabe un nombre. Sin esto, reyes como Zimri (7 días)
// o Ocozías (1 año) quedaban en barras de 0-8px, con el nombre cortado.
const ANCHO_MIN = 76
const SEPARACION = 5           // aire entre barras del mismo carril
const ANCHO_TOTAL = (INICIO_EJE - FIN_EJE) * PX_POR_ANIO + ANCHO_MIN
const ALTURA_CARRIL = 46

// En a.C. los números DECRECEN con el tiempo: 1050 es antes que 930.
const leftPx = (anio) => (INICIO_EJE - anio) * PX_POR_ANIO
const anchoPx = (inicioAc, finAc) => Math.max(ANCHO_MIN, (inicioAc - finAc) * PX_POR_ANIO)

/** Asigna carriles comparando POSICIONES EN PÍXELES, no años.
 * Así, si dos barras cortas quedan pegadas por el ancho mínimo, se
 * apilan en carriles distintos en vez de taparse entre sí. */
function asignarCarriles(reyes) {
  const ordenados = [...reyes].sort((a, b) => b.inicioAc - a.inicioAc)
  const finPxPorCarril = []
  const conCarril = []

  for (const rey of ordenados) {
    const iniPx = leftPx(rey.inicioAc)
    const finPx = iniPx + anchoPx(rey.inicioAc, rey.finAc)
    let carril = finPxPorCarril.findIndex((fin) => fin + SEPARACION <= iniPx)
    if (carril === -1) {
      carril = finPxPorCarril.length
      finPxPorCarril.push(finPx)
    } else {
      finPxPorCarril[carril] = finPx
    }
    conCarril.push({ ...rey, carril })
  }
  return { reyes: conCarril, totalCarriles: Math.max(1, finPxPorCarril.length) }
}

/* ── Un rey: barra horizontal, ancho = años de reinado ──────────── */
function BloqueRey({ rey, visible, seleccionado, onSeleccionar }) {
  const [hover, setHover] = useState(false)
  const ec = CE[rey.evaluacion] || '#F59E0B'
  const ancho = anchoPx(rey.inicioAc, rey.finAc)
  const duracion = rey.inicioAc - rey.finAc
  const abierto = seleccionado?.id === rey.id
  const destacado = hover || abierto
  const bordeColor = `${ec}${destacado ? 'd0' : '80'}`

  return (
    <div
      onClick={() => onSeleccionar(abierto ? null : rey)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={`${rey.nombre} (${rey.inicioAc}–${rey.finAc} a.C.)`}
      style={{
        position: 'absolute',
        left: leftPx(rey.inicioAc),
        top: rey.carril * ALTURA_CARRIL + 4,
        width: ancho,
        height: ALTURA_CARRIL - 10,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-16px)',
        background: `linear-gradient(135deg, ${ec}${destacado ? '4d' : '2e'}, ${ec}0d)`,
        backdropFilter: 'blur(4px)',
        borderTop: `1px solid ${bordeColor}`,
        borderRight: `1px solid ${bordeColor}`,
        borderBottom: `1px solid ${bordeColor}`,
        borderLeft: `4px solid ${ec}`,
        borderRadius: 6,
        cursor: 'pointer',
        overflow: 'hidden',
        padding: '4px 8px',
        boxSizing: 'border-box',
        zIndex: destacado ? 20 : 2,
        boxShadow: destacado
          ? `0 0 22px ${ec}66, inset 0 0 14px ${ec}26`
          : `0 3px 10px rgba(0,0,0,0.25), inset 0 1px 0 ${ec}33`,
        transition: 'opacity 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s, background 0.2s',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', gap: 1 }}>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 600, color: '#fff',
          textShadow: '0 1px 4px rgba(0,0,0,0.6)', whiteSpace: 'nowrap',
          overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '13px',
        }}>
          {rey.nombre}
        </span>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 7, color: 'rgba(255,255,255,0.55)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '10px',
        }}>
          {ancho > 118
            ? `${rey.inicioAc}–${rey.finAc} · ${duracion} ${duracion === 1 ? 'año' : 'años'}`
            : `${rey.inicioAc}–${rey.finAc}`}
        </span>
      </div>
    </div>
  )
}

/* ── Una franja por reino ───────────────────────────────────────
   El rótulo va en su PROPIA línea, encima de las barras — antes
   flotaba sobre ellas y tapaba a los reyes del extremo izquierdo
   (Saúl) y a cualquiera que pasara por debajo al hacer scroll. */
function FilaReino({ titulo, color, reyes, revelados, seleccionado, onSeleccionar }) {
  const { reyes: conCarril, totalCarriles } = useMemo(() => asignarCarriles(reyes), [reyes])
  if (reyes.length === 0) return null

  const alturaBarras = totalCarriles * ALTURA_CARRIL + 6
  const inicioReino = Math.max(...reyes.map((r) => r.inicioAc))
  const finReino = Math.min(...reyes.map((r) => r.finAc))

  return (
    <div style={{ marginBottom: 14 }}>
      {/* Rótulo sticky: se queda pegado a la izquierda mientras deslizas,
          pero en su propia línea — no se superpone a ninguna barra. */}
      <div style={{
        position: 'sticky', left: 0, zIndex: 30,
        width: 'fit-content', marginBottom: 5,
      }}>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 8, color, letterSpacing: '0.09em',
          textTransform: 'uppercase', fontWeight: 700,
          background: `${color}1f`, padding: '4px 12px', borderRadius: 12,
          border: `1px solid ${color}4d`, whiteSpace: 'nowrap',
          backdropFilter: 'blur(6px)',
        }}>
          {titulo}
        </span>
      </div>

      <div style={{ position: 'relative', height: alturaBarras }}>
        {/* Fondo tenue del período real del reino */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0,
          left: leftPx(inicioReino),
          width: anchoPx(inicioReino, finReino),
          background: `linear-gradient(180deg, ${color}0a, transparent)`,
          borderRadius: 8,
          zIndex: 0,
        }} />

        {conCarril.map((rey) => (
          <BloqueRey
            key={rey.id}
            rey={rey}
            visible={revelados.has(rey.id)}
            seleccionado={seleccionado}
            onSeleccionar={onSeleccionar}
          />
        ))}
      </div>
    </div>
  )
}

/* ── Regla de años ──────────────────────────────────────────────── */
function ReglaAnios() {
  const marcas = []
  for (let anio = INICIO_EJE; anio >= FIN_EJE; anio -= 25) marcas.push(anio)

  return (
    <div style={{ position: 'relative', height: 26, width: ANCHO_TOTAL, marginBottom: 8 }}>
      {marcas.map((anio) => {
        const principal = anio % 50 === 0
        return (
          <div key={anio} style={{
            position: 'absolute', left: leftPx(anio), top: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            transform: 'translateX(-50%)',
          }}>
            <span style={{
              fontFamily: 'var(--mono)',
              fontSize: principal ? 9 : 7,
              color: principal ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.28)',
              fontWeight: principal ? 600 : 400,
            }}>
              {anio}
            </span>
            <div style={{
              width: 1, height: principal ? 8 : 4, marginTop: 2,
              background: principal ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
            }} />
          </div>
        )
      })}
    </div>
  )
}

/* ── Encabezado con parallax al cruzar la división ──────────────── */
function EncabezadoParallax({ fraccion }) {
  const fraccionDivision = (INICIO_EJE - ANIO_DIVISION) / (INICIO_EJE - FIN_EJE)
  const cerca = Math.min(1, Math.max(0, (fraccion - fraccionDivision + 0.06) / 0.12))
  const unido = 1 - cerca

  const estilo = (op) => ({
    position: 'absolute', top: 0, left: 0, right: 0,
    display: 'flex', justifyContent: 'center', gap: 10,
    opacity: op,
    transform: `translateY(${(1 - op) * -10}px)`,
    transition: 'opacity 0.4s cubic-bezier(0.4,0,0.2,1), transform 0.4s cubic-bezier(0.4,0,0.2,1)',
    pointerEvents: op > 0.5 ? 'auto' : 'none',
  })

  const pastilla = (texto, color) => (
    <span style={{
      fontFamily: 'var(--mono)', fontSize: 9, color, letterSpacing: '0.1em',
      textTransform: 'uppercase', fontWeight: 700,
      background: `${color}1f`, padding: '4px 16px', borderRadius: 16,
      border: `1px solid ${color}4d`, whiteSpace: 'nowrap',
    }}>
      {texto}
    </span>
  )

  return (
    <div style={{ position: 'relative', height: 28, marginBottom: 10 }}>
      <div style={estilo(unido)}>{pastilla('✦ Reino Unido', '#F59E0B')}</div>
      <div style={estilo(cerca)}>
        {pastilla('◀ Judá · Sur', '#60A5FA')}
        {pastilla('Israel · Norte ▶', '#34D399')}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════ */
export default function LineaTiempoReyes({ reyes }) {
  const [seleccionado, setSeleccionado] = useState(null)
  const [fraccion, setFraccion] = useState(0)
  const [revelados, setRevelados] = useState(() => new Set())
  const scrollRef = useRef(null)
  const rafRef = useRef(null)

  const unidos = useMemo(() => reyes.filter((r) => r.reino === 'Israel unido'), [reyes])
  const juda = useMemo(() => reyes.filter((r) => r.reino === 'Judá'), [reyes])
  const israel = useMemo(() => reyes.filter((r) => r.reino === 'Israel'), [reyes])

  const onScroll = useCallback((e) => {
    const el = e.currentTarget
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      const maxScroll = Math.max(1, el.scrollWidth - el.clientWidth)
      setFraccion(el.scrollLeft / maxScroll)

      const desde = el.scrollLeft - 120
      const hasta = el.scrollLeft + el.clientWidth + 120
      setRevelados((prev) => {
        let cambio = false
        const siguiente = new Set(prev)
        for (const rey of reyes) {
          if (siguiente.has(rey.id)) continue
          const ini = leftPx(rey.inicioAc)
          const fin = ini + anchoPx(rey.inicioAc, rey.finAc)
          if (fin >= desde && ini <= hasta) {
            siguiente.add(rey.id)
            cambio = true
          }
        }
        return cambio ? siguiente : prev
      })
    })
  }, [reyes])

  const inicializar = useCallback((el) => {
    scrollRef.current = el
    if (!el || reyes.length === 0) return
    const hasta = el.clientWidth + 120
    const iniciales = new Set()
    for (const rey of reyes) {
      if (leftPx(rey.inicioAc) <= hasta) iniciales.add(rey.id)
    }
    setRevelados(iniciales)
  }, [reyes])

  const porcentaje = Math.round(fraccion * 100)

  return (
    <>
      <div style={{
        background: 'linear-gradient(145deg, rgba(15,15,25,0.95), rgba(5,5,15,0.98))',
        borderRadius: 16, padding: '18px 16px 14px',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <span style={{ fontFamily: 'var(--crimson)', fontSize: 18, color: '#fff', fontWeight: 700, letterSpacing: '0.04em' }}>
              📜 Línea de Tiempo
            </span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'rgba(255,255,255,0.35)', marginLeft: 10 }}>
              1050 – 586 a.C.
            </span>
          </div>
          <div style={{ display: 'flex', gap: 12, fontSize: 8, fontFamily: 'var(--mono)', color: 'rgba(255,255,255,0.45)' }}>
            <span><span style={{ color: CE.bueno }}>●</span> Bueno</span>
            <span><span style={{ color: CE.mixto }}>●</span> Mixto</span>
            <span><span style={{ color: CE.malo }}>●</span> Malo</span>
          </div>
        </div>

        <EncabezadoParallax fraccion={fraccion} />

        <div
          ref={inicializar}
          onScroll={onScroll}
          style={{ overflowX: 'auto', overflowY: 'hidden', paddingBottom: 6 }}
        >
          <div style={{ minWidth: ANCHO_TOTAL, position: 'relative' }}>
            <ReglaAnios />

            <div style={{
              position: 'absolute', left: leftPx(ANIO_DIVISION), top: 26, bottom: 0,
              width: 2, background: 'linear-gradient(to bottom, rgba(255,215,0,0.5), rgba(255,215,0,0.1))',
              zIndex: 1, pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', left: leftPx(ANIO_CAIDA_ISRAEL), top: 26, bottom: 0,
              width: 1, background: 'rgba(239,68,68,0.35)', zIndex: 1, pointerEvents: 'none',
            }} />

            <FilaReino titulo="Reino Unido" color="#F59E0B" reyes={unidos} revelados={revelados} seleccionado={seleccionado} onSeleccionar={setSeleccionado} />
            <FilaReino titulo="Judá · Sur" color="#60A5FA" reyes={juda} revelados={revelados} seleccionado={seleccionado} onSeleccionar={setSeleccionado} />
            <FilaReino titulo="Israel · Norte" color="#34D399" reyes={israel} revelados={revelados} seleccionado={seleccionado} onSeleccionar={setSeleccionado} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
          <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{
              width: `${porcentaje}%`, height: '100%',
              background: 'linear-gradient(to right, #F59E0B, #60A5FA, #34D399)',
              borderRadius: 2, transition: 'width 0.1s linear',
            }} />
          </div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'rgba(255,255,255,0.35)', minWidth: 34, textAlign: 'right' }}>
            {porcentaje}%
          </span>
        </div>

        <p style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'rgba(255,255,255,0.3)', marginTop: 8, letterSpacing: '0.04em' }}>
          Desliza horizontalmente · el ancho de cada barra son sus años de reinado
        </p>
      </div>

      {seleccionado && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
          background: 'linear-gradient(145deg, rgba(15,15,25,0.98), rgba(5,5,15,0.99))',
          backdropFilter: 'blur(16px)',
          borderTop: `1px solid ${CE[seleccionado.evaluacion] || '#F59E0B'}50`,
          padding: '14px 18px',
          boxShadow: `0 -8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${CE[seleccionado.evaluacion] || '#F59E0B'}30`,
        }}>
          <div style={{ maxWidth: 820, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--crimson)', fontSize: 20, color: '#fff', fontWeight: 700 }}>
                {seleccionado.nombre}
              </span>
              {seleccionado.evaluacion && <span style={{ fontSize: 16 }}>{IE[seleccionado.evaluacion]}</span>}
              <span style={{
                fontFamily: 'var(--mono)', fontSize: 9, color: 'rgba(255,255,255,0.5)',
                padding: '2px 12px', background: 'rgba(255,255,255,0.05)',
                borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)',
              }}>
                {seleccionado.reino} · {seleccionado.inicioAc}–{seleccionado.finAc} a.C.
                {' · '}{seleccionado.inicioAc - seleccionado.finAc} años
              </span>
              <button
                type="button"
                onClick={() => setSeleccionado(null)}
                aria-label="Cerrar"
                style={{
                  marginLeft: 'auto', width: 26, height: 26, borderRadius: '50%', border: 'none',
                  background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)',
                  fontSize: 14, cursor: 'pointer', flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              {seleccionado.cita && <VersiculoLink cita={seleccionado.cita} />}
              <BotonPreguntarIA
                tipo="rey"
                datos={seleccionado}
                color={CE[seleccionado.evaluacion]}
                etiqueta="🔍 Contexto histórico"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
