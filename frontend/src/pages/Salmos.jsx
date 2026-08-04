import { useEffect, useState } from 'react'
import { getSalmos } from '../data/salmos'
import { VersiculoLink } from '../lib/bibliaLink'
import Chip from '../components/ui/Chip'
import FiltrosDesplegable from '../components/ui/FiltrosDesplegable'

const EVOCA = {
  agradecimiento: { label: 'Agradecimiento', color: '#C9A84C', icon: '🙏' },
  oracion:        { label: 'Oración',        color: '#60A5FA', icon: '🕊️' },
  alabanza:       { label: 'Alabanza',       color: '#FBBF24', icon: '🎵' },
  confianza:      { label: 'Confianza / Refugio', color: '#34D399', icon: '🛡️' },
  perdon:         { label: 'Arrepentimiento / Perdón', color: '#A78BFA', icon: '💧' },
  adoracion:      { label: 'Adoración',      color: '#E07070', icon: '✨' },
}

const SERVICIOS = {
  oracion:      { label: 'Oración (martes)',        icon: '🕯️' },
  ensenanza:    { label: 'Enseñanza (jueves)',      icon: '📖' },
  alabanza:     { label: 'Alabanza (sábado)',       icon: '🎶' },
  escuela:      { label: 'Escuela dominical',       icon: '📚' },
  evangelistico:{ label: 'Evangelístico',           icon: '✝️' },
  misionero:    { label: 'Misionero',               icon: '🌍' },
}

function estudiarSpurgeon(numero) {
  const pregunta =
    `Comentario de Charles Spurgeon en "El Tesoro de David" sobre el Salmo ${numero}: ` +
    `idea central, autor y contexto histórico, versículos destacados con su explicación, ` +
    `y aplicación para predicar. Incluye también, si es relevante, notas de otros expositores clásicos.`
  window.open(`https://www.perplexity.ai/search?q=${encodeURIComponent(pregunta)}`, '_blank', 'noopener')
}

export default function Salmos() {
  const [salmos, setSalmos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtroEvoca, setFiltroEvoca] = useState('todos')
  const [filtroServicio, setFiltroServicio] = useState('todos')
  const [soloMesianicos, setSoloMesianicos] = useState(false)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    getSalmos().then(d => { setSalmos(d); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const filtrados = salmos.filter(s => {
    const mE = filtroEvoca === 'todos' || s.evoca === filtroEvoca
    const mS = filtroServicio === 'todos' || (Array.isArray(s.servicios) && s.servicios.includes(filtroServicio))
    const mM = !soloMesianicos || !!s.mesianico
    const mB = !busqueda ||
      String(s.numero).includes(busqueda) ||
      s.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      s.autor.toLowerCase().includes(busqueda.toLowerCase()) ||
      s.ideaCentral.toLowerCase().includes(busqueda.toLowerCase())
    return mE && mS && mM && mB
  })

  const contarMesianicos = salmos.filter(s => s.mesianico).length

  const contarEvoca = (k) => salmos.filter(s => s.evoca === k).length
  const contarServicio = (k) => salmos.filter(s => s.servicios?.includes(k)).length

  const activosTexto = [
    soloMesianicos ? 'Mesiánicos' : null,
    filtroEvoca !== 'todos' ? EVOCA[filtroEvoca]?.label : null,
    filtroServicio !== 'todos' ? SERVICIOS[filtroServicio]?.label : null,
  ].filter(Boolean).join(' · ')

  return (
    <main style={{ flex: 1, padding: 'clamp(16px, 4vw, 28px) clamp(14px, 4vw, 32px) 100px', maxWidth: 900, minWidth: 0 }}>

      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontFamily: 'var(--crimson)', fontSize: 'clamp(26px, 6vw, 36px)', color: 'var(--gold)', fontWeight: 300, marginBottom: 6 }}>
          Salmos para Predicar
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Salmos seleccionados para devocionales y cultos — con autor, contexto, versículo clave e idea central.
          Toca "Tesoro de David" en cualquiera para el comentario de Spurgeon y otros expositores.
        </p>
      </div>

      <input
        style={{ width: '100%', maxWidth: 320, boxSizing: 'border-box', background: 'var(--surface2)', border: '1px solid var(--border2)', color: 'var(--text)', fontFamily: 'var(--sans)', fontSize: 13, padding: '10px 14px', borderRadius: 'var(--radius)', outline: 'none', marginBottom: 12 }}
        placeholder="Buscar salmo, autor o tema..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
      />

      <FiltrosDesplegable label="Filtros" activos={activosTexto}>
        {contarMesianicos > 0 && (
          <>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--text-muted)', letterSpacing: '0.08em', width: '100%' }}>CRISTO EN LOS SALMOS</span>
            <Chip activo={soloMesianicos} color="#E0B0FF" onClick={() => setSoloMesianicos(v => !v)}>
              ✝️ Solo mesiánicos ({contarMesianicos})
            </Chip>
          </>
        )}
        <span style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--text-muted)', letterSpacing: '0.08em', width: '100%', marginTop: 6 }}>QUÉ EVOCA</span>
        <Chip activo={filtroEvoca === 'todos'} onClick={() => setFiltroEvoca('todos')}>
          Todos ({salmos.length})
        </Chip>
        {Object.entries(EVOCA).map(([k, info]) => (
          contarEvoca(k) > 0 && (
            <Chip key={k} activo={filtroEvoca === k} color={info.color} onClick={() => setFiltroEvoca(k)}>
              {info.icon} {info.label} ({contarEvoca(k)})
            </Chip>
          )
        ))}

        <span style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--text-muted)', letterSpacing: '0.08em', width: '100%', marginTop: 6 }}>PARA QUÉ CULTO</span>
        <Chip activo={filtroServicio === 'todos'} onClick={() => setFiltroServicio('todos')}>
          Cualquiera
        </Chip>
        {Object.entries(SERVICIOS).map(([k, info]) => (
          contarServicio(k) > 0 && (
            <Chip key={k} activo={filtroServicio === k} color="#7EB8D4" onClick={() => setFiltroServicio(k)}>
              {info.icon} {info.label} ({contarServicio(k)})
            </Chip>
          )
        ))}
      </FiltrosDesplegable>

      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', marginBottom: 16 }}>
        {loading ? 'Cargando...' : `${filtrados.length} salmos`}
      </div>

      {loading && <div className="loading"><div className="loading-dot"/><div className="loading-dot"/><div className="loading-dot"/></div>}

      {!loading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 12 }}>
          {filtrados.map((s) => {
            const info = EVOCA[s.evoca] || { color: 'var(--gold)', icon: '•', label: s.evoca }
            return (
              <div key={s.id} style={{
                background: 'var(--surface)',
                borderTop: `3px solid ${info.color}`,
                borderRight: `1px solid ${info.color}25`,
                borderBottom: `1px solid ${info.color}25`,
                borderLeft: `1px solid ${info.color}25`,
                borderRadius: 'var(--radius)', padding: '16px',
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--crimson)', fontSize: 22, color: info.color, lineHeight: 1 }}>
                    Salmo {s.numero}
                  </span>
                  <span style={{ fontFamily: 'var(--crimson)', fontSize: 15, color: 'var(--text)', fontStyle: 'italic' }}>
                    {s.nombre}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: 8, color: info.color,
                    background: `${info.color}15`, border: `1px solid ${info.color}30`,
                    borderRadius: 3, padding: '2px 8px',
                  }}>{info.icon} {info.label}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-muted)' }}>
                    ✍️ {s.autor}
                  </span>
                </div>

                <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>
                  {s.contexto}
                </p>

                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: info.color }}>
                  🔑 <VersiculoLink cita={s.versiculoClave}>{s.versiculoClave}</VersiculoLink>
                </div>

                <div style={{
                  background: `${info.color}0d`, borderLeft: `3px solid ${info.color}`,
                  borderRadius: 6, padding: '8px 10px',
                }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 8, color: info.color, letterSpacing: '0.06em', display: 'block', marginBottom: 3 }}>IDEA CENTRAL</span>
                  <p style={{ fontSize: 12.5, color: 'var(--text)', lineHeight: 1.5, margin: 0 }}>{s.ideaCentral}</p>
                </div>

                {s.mesianico && (
                  <div style={{
                    background: 'rgba(224,176,255,0.08)', borderLeft: '3px solid #E0B0FF',
                    borderRadius: 6, padding: '8px 10px',
                  }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 8, color: '#C77DFF', letterSpacing: '0.06em', display: 'block', marginBottom: 3 }}>✝️ CUMPLIMIENTO EN CRISTO</span>
                    <p style={{ fontSize: 12.5, color: 'var(--text)', lineHeight: 1.5, margin: 0 }}>{s.mesianico}</p>
                  </div>
                )}

                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {(s.servicios || []).map(sv => (
                    <span key={sv} style={{
                      fontFamily: 'var(--mono)', fontSize: 8, color: '#7EB8D4',
                      background: '#7EB8D415', border: '1px solid #7EB8D430',
                      borderRadius: 3, padding: '2px 7px',
                    }}>
                      {SERVICIOS[sv]?.icon} {SERVICIOS[sv]?.label || sv}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => estudiarSpurgeon(s.numero)}
                  style={{
                    marginTop: 2, alignSelf: 'flex-start',
                    fontFamily: 'var(--mono)', fontSize: 10, cursor: 'pointer',
                    padding: '7px 14px', borderRadius: 999,
                    border: `1px solid ${info.color}`, background: `${info.color}12`, color: info.color,
                  }}
                >
                  📖 Tesoro de David (Spurgeon) ↗
                </button>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}