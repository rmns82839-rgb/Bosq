import { useEffect, useState } from 'react'
import { getPatronesBiblicos } from '../lib/db.js'
import { VersiculoLink } from '../lib/bibliaLink'
import BotonPreguntarIA from '../components/common/BotonPreguntarIA'

const CATEGORIAS = {
  estructura: { color: '#60A5FA', icon: '🔷', label: 'Estructura literaria' },
  formula:    { color: '#C9A84C', icon: '🔁', label: 'Fórmulas recurrentes' },
  ciclo:      { color: '#34D399', icon: '🌀', label: 'Ciclos y series' },
  pacto:      { color: '#A78BFA', icon: '🤝', label: 'Pactos' },
  tipologia:  { color: '#E07070', icon: '✝️', label: 'Tipologías' },
}

const SUGERIDAS = ['Jehová', 'amor', 'gracia', 'gloria', 'sangre', 'pecado', 'salvación', 'vida', 'ángel', 'profeta', 'rey', 'pueblo']

export default function Patrones() {
  const [patrones, setPatrones] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtroCat, setFiltroCat] = useState('todos')
  const [palabra, setPalabra] = useState('')

  useEffect(() => {
    getPatronesBiblicos().then(d => { setPatrones(d); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const filtrados = filtroCat === 'todos' ? patrones : patrones.filter(p => p.categoria === filtroCat)
  const contar = (cat) => patrones.filter(p => p.categoria === cat).length

  const analizarPalabra = (termino) => {
    const t = (termino || '').trim()
    if (!t) return
    const pregunta =
      `Analiza el uso de la palabra "${t}" en la Biblia. Dame: ` +
      `1) cuántas veces aparece aproximadamente y en qué libros se concentra, ` +
      `2) el término original en hebreo y/o griego con su significado, ` +
      `3) los pasajes más significativos donde aparece, ` +
      `4) cómo evoluciona su uso entre el Antiguo y el Nuevo Testamento.`
    window.open(`https://www.perplexity.ai/search?q=${encodeURIComponent(pregunta)}`, '_blank')
  }

  return (
    <main style={{ flex: 1, padding: '28px 32px 100px', maxWidth: 900, minWidth: 0 }}>

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--crimson)', fontSize: 36, color: 'var(--gold)', fontWeight: 300, marginBottom: 6 }}>
          Patrones Bíblicos
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Las estructuras, fórmulas y repeticiones con las que está construida la Escritura — y un analizador de palabras
        </p>
      </div>

      {/* Analizador de palabras */}
      <div style={{
        background: 'rgba(201,168,76,0.06)',
        borderTop: '1px solid rgba(201,168,76,0.18)',
        borderRight: '1px solid rgba(201,168,76,0.18)',
        borderBottom: '1px solid rgba(201,168,76,0.18)',
        borderLeft: '3px solid var(--gold)',
        borderRadius: 'var(--radius)', padding: '16px', marginBottom: 24,
      }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
          🔍 Analizar una palabra
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          <input
            style={{ flex: 1, minWidth: 180, background: 'var(--surface2)', border: '1px solid var(--border2)', color: 'var(--text)', fontFamily: 'var(--sans)', fontSize: 13, padding: '8px 14px', borderRadius: 'var(--radius)', outline: 'none' }}
            placeholder="Escribe una palabra…"
            value={palabra}
            onChange={e => setPalabra(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') analizarPalabra(palabra) }}
          />
          <button
            onClick={() => analizarPalabra(palabra)}
            disabled={!palabra.trim()}
            style={{
              fontFamily: 'var(--mono)', fontSize: 10, padding: '8px 18px', borderRadius: 4,
              border: '1px solid var(--gold)', background: 'var(--gold-glow)', color: 'var(--gold)',
              cursor: palabra.trim() ? 'pointer' : 'not-allowed', opacity: palabra.trim() ? 1 : 0.4,
            }}
          >
            Analizar
          </button>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>SUGERIDAS:</span>
          {SUGERIDAS.map(s => (
            <button key={s} onClick={() => { setPalabra(s); analizarPalabra(s) }} style={{
              fontFamily: 'var(--mono)', fontSize: 9, padding: '3px 10px', borderRadius: 12,
              border: '1px solid var(--border2)', background: 'none', color: 'var(--text-muted)', cursor: 'pointer',
            }}>{s}</button>
          ))}
        </div>
      </div>

      {/* Filtros de categoría */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        <button onClick={() => setFiltroCat('todos')} style={{
          fontFamily: 'var(--mono)', fontSize: 10, padding: '6px 14px', borderRadius: 4,
          border: `1px solid ${filtroCat === 'todos' ? 'var(--gold)' : 'var(--border2)'}`,
          background: filtroCat === 'todos' ? 'var(--gold-glow)' : 'none',
          color: filtroCat === 'todos' ? 'var(--gold)' : 'var(--text-muted)', cursor: 'pointer',
        }}>Todos ({patrones.length})</button>
        {Object.entries(CATEGORIAS).map(([key, info]) => (
          contar(key) > 0 && (
            <button key={key} onClick={() => setFiltroCat(key)} style={{
              fontFamily: 'var(--mono)', fontSize: 10, padding: '6px 12px', borderRadius: 4,
              border: `1px solid ${filtroCat === key ? info.color : 'var(--border2)'}`,
              background: filtroCat === key ? `${info.color}18` : 'none',
              color: filtroCat === key ? info.color : 'var(--text-muted)', cursor: 'pointer',
            }}>{info.icon} {info.label} ({contar(key)})</button>
          )
        ))}
      </div>

      {loading && <div className="loading"><div className="loading-dot"/><div className="loading-dot"/><div className="loading-dot"/></div>}

      {!loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtrados.map((p) => {
            const info = CATEGORIAS[p.categoria] || { color: 'var(--gold)', icon: '•', label: p.categoria }
            return (
              <div key={p.id} style={{
                background: 'var(--surface)',
                borderTop: `1px solid ${info.color}20`, borderRight: `1px solid ${info.color}20`,
                borderBottom: `1px solid ${info.color}20`, borderLeft: `3px solid ${info.color}`,
                borderRadius: 'var(--radius)', padding: '14px 16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 15 }}>{info.icon}</span>
                  <span style={{ fontFamily: 'var(--crimson)', fontSize: 16, color: 'var(--text)' }}>{p.nombre}</span>
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: 8, color: info.color,
                    background: `${info.color}15`, border: `1px solid ${info.color}30`,
                    borderRadius: 3, padding: '2px 8px',
                  }}>{info.label}</span>
                </div>

                {p.descripcion && (
                  <p style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 10px' }}>
                    {p.descripcion}
                  </p>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  {p.cita && <VersiculoLink cita={p.cita} />}
                  <BotonPreguntarIA tipo="patron" datos={p} color={info.color} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
