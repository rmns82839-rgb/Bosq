import { useEffect, useState, useMemo } from 'react'
import { getProfecias, getJuicios, getMilagrosJesus } from '../services/bibliaService'
import { VersiculoLink } from '../lib/bibliaLink'
import BotonPreguntarIA from '../components/common/BotonPreguntarIA'

const ETAPAS_PROFECIA = {
  nacimiento:   { label: 'Linaje y nacimiento', color: '#C9A84C', icon: '⭐' },
  ministerio:   { label: 'Ministerio',          color: '#60A5FA', icon: '📜' },
  pasion:       { label: 'Pasión',              color: '#E07070', icon: '✝️' },
  resurreccion: { label: 'Resurrección',        color: '#34D399', icon: '🌅' },
}

const CAT_MILAGRO = {
  naturaleza:   { label: 'Sobre la naturaleza', color: '#60A5FA', icon: '🌊' },
  sanidad:      { label: 'Sanidades',           color: '#34D399', icon: '🤲' },
  liberacion:   { label: 'Liberaciones',        color: '#A78BFA', icon: '⛓️' },
  resurreccion: { label: 'Resurrecciones',      color: '#C9A84C', icon: '🌅' },
}

const ESTADO_JUICIO = {
  cumplido:    { label: 'Cumplido',  color: '#34D399', icon: '✅' },
  por_cumplir: { label: 'Pendiente', color: '#F87171', icon: '⏳' },
}

const TABS = [
  { key: 'profecias', icon: '🔮', label: 'Profecías Mesiánicas' },
  { key: 'milagros',  icon: '✨', label: 'Milagros de Jesús' },
  { key: 'juicios',   icon: '⚖️', label: 'Juicios de Jehová' },
]

export default function Especiales() {
  const [tab, setTab] = useState('profecias')
  const [profecias, setProfecias] = useState([])
  const [juicios, setJuicios] = useState([])
  const [milagros, setMilagros] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState('todos')

  useEffect(() => {
    setLoading(true)
    setFiltro('todos')
    const promesa =
      tab === 'profecias' ? getProfecias() :
      tab === 'milagros'  ? getMilagrosJesus() :
                            getJuicios()
    promesa.then(data => {
      if (tab === 'profecias') setProfecias(data)
      else if (tab === 'milagros') setMilagros(data)
      else setJuicios(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [tab])

  const grupos = tab === 'profecias' ? ETAPAS_PROFECIA : tab === 'milagros' ? CAT_MILAGRO : null
  const datos = tab === 'profecias' ? profecias : tab === 'milagros' ? milagros : juicios

  const contar = (key) => datos.filter(d => d.categoria === key).length
  const filtrados = useMemo(
    () => (filtro === 'todos' || !grupos ? datos : datos.filter(d => d.categoria === filtro)),
    [datos, filtro, grupos]
  )

  return (
    <main style={{ flex: 1, padding: '28px 32px 100px', maxWidth: 880, minWidth: 0 }}>

      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontFamily: 'var(--crimson)', fontSize: 36, color: 'var(--gold)', fontWeight: 300, marginBottom: 6 }}>
          Estudios Especiales
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Profecías mesiánicas, milagros de Jesús y juicios de Jehová — toca "Preguntar a la IA" para el contexto completo
        </p>
      </div>

      {/* Pestañas */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 18, background: 'var(--surface2)', padding: 4, borderRadius: 8, flexWrap: 'wrap' }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            flex: 1, minWidth: 130, fontFamily: 'var(--mono)', fontSize: 10,
            padding: '10px 14px', borderRadius: 6, border: 'none',
            background: tab === t.key ? 'var(--gold)' : 'none',
            color: tab === t.key ? 'var(--bg)' : 'var(--text-muted)',
            cursor: 'pointer', fontWeight: tab === t.key ? 700 : 400,
          }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Filtros por grupo */}
      {grupos && !loading && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
          <button onClick={() => setFiltro('todos')} style={{
            fontFamily: 'var(--mono)', fontSize: 10, padding: '6px 14px', borderRadius: 4,
            border: `1px solid ${filtro === 'todos' ? 'var(--gold)' : 'var(--border2)'}`,
            background: filtro === 'todos' ? 'var(--gold-glow)' : 'none',
            color: filtro === 'todos' ? 'var(--gold)' : 'var(--text-muted)', cursor: 'pointer',
          }}>Todos ({datos.length})</button>
          {Object.entries(grupos).map(([key, info]) => (
            contar(key) > 0 && (
              <button key={key} onClick={() => setFiltro(key)} style={{
                fontFamily: 'var(--mono)', fontSize: 10, padding: '6px 12px', borderRadius: 4,
                border: `1px solid ${filtro === key ? info.color : 'var(--border2)'}`,
                background: filtro === key ? `${info.color}18` : 'none',
                color: filtro === key ? info.color : 'var(--text-muted)', cursor: 'pointer',
              }}>{info.icon} {info.label} ({contar(key)})</button>
            )
          ))}
        </div>
      )}

      {loading && <div className="loading"><div className="loading-dot"/><div className="loading-dot"/><div className="loading-dot"/></div>}

      {/* ── PROFECÍAS ── */}
      {!loading && tab === 'profecias' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtrados.map((p, i) => {
            const info = ETAPAS_PROFECIA[p.categoria] || { color: '#FB923C', label: p.categoria, icon: '•' }
            return (
              <div key={p.id} style={{
                background: 'var(--surface)',
                borderTop: `1px solid ${info.color}20`, borderRight: `1px solid ${info.color}20`,
                borderBottom: `1px solid ${info.color}20`, borderLeft: `3px solid ${info.color}`,
                borderRadius: 'var(--radius)', padding: '13px 16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-muted)', minWidth: 20 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontFamily: 'var(--crimson)', fontSize: 15.5, color: 'var(--text)', flex: 1, minWidth: 180 }}>
                    {p.tema}
                  </span>
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: 8, color: info.color,
                    background: `${info.color}15`, border: `1px solid ${info.color}30`,
                    borderRadius: 3, padding: '2px 8px',
                  }}>{info.label}</span>
                </div>

                <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap', marginBottom: 10 }}>
                  <div style={{ fontSize: 12.5 }}>
                    <span style={{ color: 'var(--gold)', fontFamily: 'var(--mono)', fontSize: 8, display: 'block', letterSpacing: '0.08em' }}>PROFECÍA</span>
                    <VersiculoLink cita={p.citaProfecia} />
                  </div>
                  {p.citaCumplimiento && (
                    <>
                      <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>→</span>
                      <div style={{ fontSize: 12.5 }}>
                        <span style={{ color: '#34D399', fontFamily: 'var(--mono)', fontSize: 8, display: 'block', letterSpacing: '0.08em' }}>CUMPLIMIENTO</span>
                        <VersiculoLink cita={p.citaCumplimiento} />
                      </div>
                    </>
                  )}
                </div>

                <BotonPreguntarIA tipo="profecia" datos={p} color={info.color} />
              </div>
            )
          })}
        </div>
      )}

      {/* ── MILAGROS ── */}
      {!loading && tab === 'milagros' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtrados.map((m) => {
            const info = CAT_MILAGRO[m.categoria] || { color: 'var(--gold)', label: m.categoria, icon: '✨' }
            return (
              <div key={m.id} style={{
                background: 'var(--surface)',
                borderTop: `1px solid ${info.color}20`, borderRight: `1px solid ${info.color}20`,
                borderBottom: `1px solid ${info.color}20`, borderLeft: `3px solid ${info.color}`,
                borderRadius: 'var(--radius)', padding: '13px 16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 14 }}>{info.icon}</span>
                  <span style={{ fontFamily: 'var(--crimson)', fontSize: 15.5, color: 'var(--text)', flex: 1, minWidth: 180 }}>
                    {m.titulo}
                  </span>
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: 8, color: info.color,
                    background: `${info.color}15`, border: `1px solid ${info.color}30`,
                    borderRadius: 3, padding: '2px 8px',
                  }}>{info.label}</span>
                </div>

                {m.descripcion && (
                  <p style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.55, margin: '0 0 8px' }}>
                    {m.descripcion}
                  </p>
                )}

                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                  <VersiculoLink cita={m.cita} />
                  {m.paralelos && (
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-muted)' }}>
                      también en {m.paralelos}
                    </span>
                  )}
                  <BotonPreguntarIA tipo="milagro" datos={m} color={info.color} />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ── JUICIOS ── */}
      {!loading && tab === 'juicios' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {juicios.map(j => {
            const est = ESTADO_JUICIO[j.estado] || ESTADO_JUICIO.cumplido
            return (
              <div key={j.id} style={{
                background: 'var(--surface)',
                borderTop: `1px solid ${est.color}25`, borderRight: `1px solid ${est.color}25`,
                borderBottom: `1px solid ${est.color}25`, borderLeft: `3px solid ${est.color}`,
                borderRadius: 'var(--radius)', padding: '16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 16 }}>{est.icon}</span>
                  <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: est.color }}>{j.sobre}</span>
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: 8, color: est.color,
                    background: `${est.color}15`, border: `1px solid ${est.color}30`,
                    borderRadius: 3, padding: '2px 8px',
                  }}>{est.label}</span>
                </div>
                {j.descripcion && (
                  <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 10 }}>{j.descripcion}</p>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <VersiculoLink cita={j.cita} />
                  <BotonPreguntarIA tipo="juicio" datos={j} color={est.color} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
