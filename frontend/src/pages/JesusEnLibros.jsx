import { useEffect, useState } from 'react'
import { getJesusEnLibros } from '../services/bibliaService'
import { VersiculoLink } from '../lib/bibliaLink'
import BotonPreguntarIA from '../components/common/BotonPreguntarIA'
import Chip from '../components/ui/Chip'
import FiltrosDesplegable from '../components/ui/FiltrosDesplegable'

const COLOR_TESTAMENTO = { antiguo: '#C9A84C', nuevo: '#E07070' }

export default function JesusEnLibros() {
  const [libros, setLibros] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState('todos')
  const [busqueda, setBusqueda] = useState('')
  const [abiertoId, setAbiertoId] = useState(null)

  useEffect(() => {
    getJesusEnLibros().then(d => { setLibros(d); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const filtrados = libros.filter(l => {
    const matchTest = filtro === 'todos' || l.testamento === filtro
    const matchBusq = !busqueda || l.libro.toLowerCase().includes(busqueda.toLowerCase()) ||
                       l.titulo.toLowerCase().includes(busqueda.toLowerCase())
    return matchTest && matchBusq
  })

  const etiquetaFiltro = filtro === 'antiguo' ? 'Antiguo' : filtro === 'nuevo' ? 'Nuevo' : ''

  return (
    <main style={{ flex: 1, padding: 'clamp(16px, 4vw, 28px) clamp(14px, 4vw, 32px) 100px', maxWidth: 900, minWidth: 0 }}>

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--crimson)', fontSize: 'clamp(26px, 6vw, 36px)', color: 'var(--gold)', fontWeight: 300, marginBottom: 6 }}>
          Jesús en Cada Libro
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Una tradición devocional de siglos: cómo se anticipa o se revela a Cristo en cada uno de los 66 libros —
          no es que cada versículo lo diga literalmente, es un recorrido tradicional. Toca "Preguntar a la IA" para el porqué de cada título.
        </p>
      </div>

      <input
        style={{ width: '100%', maxWidth: 320, boxSizing: 'border-box', background: 'var(--surface2)', border: '1px solid var(--border2)', color: 'var(--text)', fontFamily: 'var(--sans)', fontSize: 13, padding: '10px 14px', borderRadius: 'var(--radius)', outline: 'none', marginBottom: 12 }}
        placeholder="Buscar libro o título..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
      />

      <FiltrosDesplegable activos={etiquetaFiltro}>
        <Chip activo={filtro === 'todos'} onClick={() => setFiltro('todos')}>
          Todos ({libros.length})
        </Chip>
        <Chip activo={filtro === 'antiguo'} color={COLOR_TESTAMENTO.antiguo} onClick={() => setFiltro('antiguo')}>
          Antiguo Testamento ({libros.filter(l => l.testamento === 'antiguo').length})
        </Chip>
        <Chip activo={filtro === 'nuevo'} color={COLOR_TESTAMENTO.nuevo} onClick={() => setFiltro('nuevo')}>
          Nuevo Testamento ({libros.filter(l => l.testamento === 'nuevo').length})
        </Chip>
      </FiltrosDesplegable>

      {loading && <div className="loading"><div className="loading-dot"/><div className="loading-dot"/><div className="loading-dot"/></div>}

      {!loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {filtrados.map((l) => {
            const color = COLOR_TESTAMENTO[l.testamento] || 'var(--gold)'
            const adicionales = Array.isArray(l.referenciasAdicionales) ? l.referenciasAdicionales : []
            const abierto = abiertoId === l.id
            return (
              <div key={l.id} style={{
                background: 'var(--surface)',
                borderTop: `1px solid ${color}20`, borderRight: `1px solid ${color}20`,
                borderBottom: `1px solid ${color}20`, borderLeft: `3px solid ${color}`,
                borderRadius: 6, padding: '10px 14px',
              }}>
                <div
                  onClick={() => adicionales.length > 0 && setAbiertoId(abierto ? null : l.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
                    cursor: adicionales.length > 0 ? 'pointer' : 'default',
                  }}
                >
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-muted)', minWidth: 22, textAlign: 'right' }}>
                    {l.orden}
                  </span>
                  <div style={{ flex: 1, minWidth: 220 }}>
                    <span style={{ fontFamily: 'var(--crimson)', fontSize: 15, color: 'var(--text)', marginRight: 8 }}>
                      {l.libro}
                    </span>
                    <span style={{ fontSize: 13, color, fontStyle: 'italic' }}>
                      {l.titulo}
                    </span>
                    {l.cita && (
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-muted)', marginTop: 2 }}>
                        <VersiculoLink cita={l.cita} />
                      </div>
                    )}
                  </div>
                  {adicionales.length > 0 && (
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-muted)' }}>
                      {abierto ? '▾ ocultar' : `▸ +${adicionales.length} más`}
                    </span>
                  )}
                  <BotonPreguntarIA
                    tipo="jesus_libro"
                    datos={l}
                    color={color}
                    etiqueta="🔎 Por qué"
                  />
                </div>

                {abierto && adicionales.length > 0 && (
                  <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${color}20`, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {adicionales.map((ref, i) => (
                      <div key={i} style={{ fontSize: 12, color: 'var(--text-muted)', paddingLeft: 34 }}>
                        <VersiculoLink cita={ref.cita} className="mr-2" />
                        {ref.nota && <span> — {ref.nota}</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}