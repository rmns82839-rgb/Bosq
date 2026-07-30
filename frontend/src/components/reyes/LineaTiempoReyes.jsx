import { useState } from 'react'
import { VersiculoLink } from '../../lib/bibliaLink'
import BotonPreguntarIA from '../common/BotonPreguntarIA'

const CE = { bueno: '#10B981', malo: '#EF4444', mixto: '#F59E0B' }
const IE = { bueno: '👑', malo: '⚔️', mixto: '📜' }

const INICIO_EJE = 1050
const FIN_EJE = 586
const PX_POR_ANIO = 3.8
const ALTURA_TOTAL = (INICIO_EJE - FIN_EJE) * PX_POR_ANIO

// Todo bloque y toda marca se posicionan con ESTAS dos funciones, siempre
// relativas al mismo origen (1050 a.C.) — ningún contenedor hijo debe
// aplicar un desplazamiento propio, o los dos ejes se desincronizan.
const topPx = (inicioAc) => (INICIO_EJE - inicioAc) * PX_POR_ANIO
const altoPx = (inicioAc, finAc) => Math.max(32, (inicioAc - finAc) * PX_POR_ANIO)

const marcasCada = (paso) => {
  const marcas = []
  for (let anio = INICIO_EJE; anio >= FIN_EJE; anio -= paso) marcas.push(anio)
  return marcas
}

/** Asigna "carriles" a reinados que se traslapan (co-reinados), para que
 * se dibujen lado a lado en vez de taparse uno al otro. */
function asignarCarriles(reyes) {
  const ordenados = [...reyes].sort((a, b) => b.inicioAc - a.inicioAc)
  const finDeCadaCarril = []
  const conCarril = []

  for (const rey of ordenados) {
    let carril = finDeCadaCarril.findIndex((fin) => fin >= rey.inicioAc)
    if (carril === -1) {
      carril = finDeCadaCarril.length
      finDeCadaCarril.push(rey.finAc)
    } else {
      finDeCadaCarril[carril] = rey.finAc
    }
    conCarril.push({ ...rey, carril })
  }
  return { reyes: conCarril, totalCarriles: Math.max(1, finDeCadaCarril.length) }
}

function BloqueRey({ rey, izquierda, ancho, capa, seleccionado, onSeleccionar }) {
  const [hover, setHover] = useState(false)
  const ec = CE[rey.evaluacion] || '#F59E0B'
  const alto = altoPx(rey.inicioAc, rey.finAc)
  const abierto = seleccionado?.id === rey.id
  const destacado = hover || abierto

  return (
    <div
      onClick={() => onSeleccionar(abierto ? null : rey)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={`${rey.nombre} (${rey.inicioAc}–${rey.finAc} a.C.)`}
      style={{
        position: 'absolute',
        top: topPx(rey.inicioAc),
        left: `${izquierda}%`,
        width: `${ancho}%`,
        minHeight: alto,
        background: `linear-gradient(135deg, ${ec}${destacado ? '45' : '30'}, ${ec}10)`,
        backdropFilter: 'blur(4px)',
        borderTop: `2px solid ${ec}${destacado ? 'd0' : '80'}`,
        borderRight: `2px solid ${ec}${destacado ? 'd0' : '80'}`,
        borderBottom: `2px solid ${ec}${destacado ? 'd0' : '80'}`,
        borderLeft: `4px solid ${ec}`,
        borderRadius: 8,
        cursor: 'pointer',
        overflow: 'hidden',
        padding: '4px 8px',
        boxSizing: 'border-box',
        // Capas más altas (reyes co-reinando corridos a la derecha) van
        // por encima, para que su zona de toque quede siempre accesible.
        zIndex: (capa || 0) * 2 + (destacado ? 1 : 0) + 1,
        boxShadow: destacado
          ? `0 0 24px ${ec}70, inset 0 0 16px ${ec}30`
          : `0 4px 12px rgba(0,0,0,0.25), inset 0 1px 0 ${ec}40`,
        transition: 'box-shadow 0.2s, border-color 0.2s, background 0.2s',
        transform: destacado ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: '100%' }}>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 8.5, fontWeight: 500, color: '#fff',
          textShadow: '0 1px 4px rgba(0,0,0,0.5)', whiteSpace: 'nowrap',
          overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '16px',
        }}>
          {rey.nombre}
        </span>
        {alto > 30 && (
          <span style={{
            fontFamily: 'var(--mono)', fontSize: 7, color: 'rgba(255,255,255,0.7)',
            whiteSpace: 'nowrap', marginLeft: 'auto', textShadow: '0 1px 2px rgba(0,0,0,0.3)',
          }}>
            {rey.inicioAc}–{rey.finAc}
          </span>
        )}
      </div>
    </div>
  )
}

function ReglaAnios() {
  return (
    <div style={{
      position: 'relative', width: 60, flexShrink: 0, height: ALTURA_TOTAL,
      background: 'linear-gradient(to right, rgba(0,0,0,0.3), transparent)',
      borderRadius: '8px 0 0 8px',
    }}>
      {marcasCada(25).map((anio) => {
        const principal = anio % 50 === 0
        return (
          <div key={anio} style={{ position: 'absolute', top: topPx(anio) - 8, right: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
            {principal && <div style={{ width: 12, height: 1, background: 'rgba(255,255,255,0.2)' }} />}
            <span style={{
              fontFamily: 'var(--mono)', fontSize: principal ? 9 : 7,
              color: principal ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)',
              fontWeight: principal ? 600 : 400,
            }}>
              {anio}
            </span>
          </div>
        )
      })}
      <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 2, background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0.1), rgba(255,255,255,0.3))' }} />
    </div>
  )
}

function LineasGuia() {
  return marcasCada(25).map((anio) => {
    const principal = anio % 50 === 0
    return (
      <div key={anio} style={{
        position: 'absolute', top: topPx(anio), left: 0, right: 0,
        height: principal ? 2 : 1,
        background: principal
          ? 'linear-gradient(to right, rgba(255,215,0,0.2), rgba(255,215,0,0.1), rgba(255,215,0,0.2))'
          : 'rgba(255,255,255,0.05)',
        opacity: principal ? 0.6 : 0.3,
      }} />
    )
  })
}

/** Una columna de reino. Ocupa TODO el eje (0 a ALTURA_TOTAL) sin
 * desplazamiento propio — cada BloqueRey ya sabe dónde ir gracias a
 * topPx(), que usa el mismo origen (1050 a.C.) en toda la línea de
 * tiempo. Ningún wrapper debe "ayudar" corriendo el origen, o los
 * reyes terminan mal ubicados frente a la regla y entre columnas. */
function ColumnaReino({ reyes, colorEtiqueta, titulo }) {
  const { reyes: conCarril, totalCarriles } = asignarCarriles(reyes)
  if (reyes.length === 0) return null

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={{
        position: 'sticky', top: 0, zIndex: 20, padding: '4px 8px',
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', borderRadius: 6,
        marginBottom: 4, textAlign: 'center', border: `1px solid ${colorEtiqueta}40`,
        width: 'fit-content', marginInline: 'auto',
      }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 8, color: colorEtiqueta, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
          {titulo}
        </span>
      </div>
      {conCarril.map((rey) => {
        // En vez de dividir el ancho entre carriles (bloques angostos,
        // difíciles de tocar en el celular), cada carril se ESCALONA:
        // se corre un poco a la derecha pero conserva casi todo su ancho.
        // Los reyes que se traslapan se ven como una escalera, no como
        // columnas apretadas — y siempre queda una zona amplia para tocar.
        const corrimiento = rey.carril * 10 // % que se corre cada carril extra
        return (
          <BloqueRey
            key={rey.id}
            rey={rey}
            izquierda={corrimiento}
            ancho={98 - corrimiento}
            capa={rey.carril}
            seleccionado={rey.__sel}
            onSeleccionar={rey.__onSel}
          />
        )
      })}
    </div>
  )
}

export default function LineaTiempoReyes({ reyes }) {
  const [seleccionado, setSeleccionado] = useState(null)

  const unidos = reyes.filter((r) => r.reino === 'Israel unido')
  const juda = reyes.filter((r) => r.reino === 'Judá')
  const israel = reyes.filter((r) => r.reino === 'Israel')

  const conSel = (lista) => lista.map((r) => ({ ...r, __sel: seleccionado, __onSel: setSeleccionado }))

  return (
    <div style={{
      background: 'linear-gradient(145deg, rgba(15,15,25,0.95), rgba(5,5,15,0.98))',
      borderRadius: 16, padding: 24,
      paddingBottom: seleccionado ? 110 : 24,
      border: '1px solid rgba(255,255,255,0.06)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 8 }}>
        <div>
          <span style={{ fontFamily: 'var(--crimson)', fontSize: 20, color: '#fff', letterSpacing: '0.06em', fontWeight: 700 }}>
            📜 Línea de Tiempo Real
          </span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'rgba(255,255,255,0.4)', marginLeft: 12 }}>
            1050 – 586 a.C.
          </span>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 9, fontFamily: 'var(--mono)', color: 'rgba(255,255,255,0.5)' }}>
          <span><span style={{ color: CE.bueno }}>●</span> Bueno</span>
          <span><span style={{ color: CE.mixto }}>●</span> Mixto</span>
          <span><span style={{ color: CE.malo }}>●</span> Malo</span>
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ width: 60, flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: 9, color: '#F59E0B', letterSpacing: '0.08em',
            textTransform: 'uppercase', fontWeight: 600, background: 'rgba(245,158,11,0.1)',
            padding: '4px 16px', borderRadius: 20, border: '1px solid rgba(245,158,11,0.2)',
          }}>
            ✦ Reino Unido
          </span>
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        <ReglaAnios />

        <div style={{ position: 'relative', flex: 1, height: ALTURA_TOTAL, borderRadius: '0 8px 8px 0' }}>
          <LineasGuia />

          {/* Reino Unido: 1050 a 930 a.C. — mismo origen que la regla, sin desplazamiento propio */}
          <div style={{ position: 'absolute', top: 0, left: '5%', width: '90%', height: topPx(930) }}>
            <ColumnaReino reyes={conSel(unidos)} colorEtiqueta="#F59E0B" titulo="Reino Unido" />
          </div>

          <div style={{ position: 'absolute', top: topPx(930), left: '5%', right: '5%', height: 2, background: 'linear-gradient(to right, transparent, rgba(255,215,0,0.3), transparent)' }} />

          {/*
            Judá e Israel: NO llevan top propio. Cada BloqueRey ya sabe su
            posición real vía topPx(inicioAc) sobre el eje completo — estos
            dos divs solo reparten el ANCHO (izquierda/derecha), nunca el
            alto, para no desincronizar el eje.
          */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '49%' }}>
            <ColumnaReino reyes={conSel(juda)} colorEtiqueta="#60A5FA" titulo="Judá (Sur)" />
          </div>
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '51%', width: '49%' }}>
            <ColumnaReino reyes={conSel(israel)} colorEtiqueta="#34D399" titulo="Israel (Norte)" />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', marginTop: 8 }}>
        <div style={{ width: 60, flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', fontSize: 8, fontFamily: 'var(--mono)', color: 'rgba(255,255,255,0.4)' }}>
          <span style={{ color: '#60A5FA' }}>◀ Judá</span>
          <span style={{ color: '#34D399' }}>Israel ▶</span>
        </div>
      </div>

      {seleccionado && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
          background: 'linear-gradient(145deg, rgba(15,15,25,0.98), rgba(5,5,15,0.99))',
          backdropFilter: 'blur(16px)', borderTop: `1px solid ${CE[seleccionado.evaluacion] || '#F59E0B'}50`,
          padding: '16px 20px', boxShadow: `0 -8px 32px rgba(0,0,0,0.5), inset 0 1px 0 ${CE[seleccionado.evaluacion] || '#F59E0B'}30`,
        }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--crimson)', fontSize: 20, color: '#fff', fontWeight: 700 }}>{seleccionado.nombre}</span>
              {seleccionado.evaluacion && <span style={{ fontSize: 16 }}>{IE[seleccionado.evaluacion]}</span>}
              <span style={{
                fontFamily: 'var(--mono)', fontSize: 9, color: 'rgba(255,255,255,0.5)', padding: '2px 12px',
                background: 'rgba(255,255,255,0.05)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)',
              }}>
                {seleccionado.reino} · {seleccionado.inicioAc}–{seleccionado.finAc} a.C.
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
              <BotonPreguntarIA tipo="rey" datos={seleccionado} color={CE[seleccionado.evaluacion]} etiqueta="🔍 Contexto histórico" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
