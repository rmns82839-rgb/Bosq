import { useEffect, useState } from 'react'
import { getAngeles } from '../services/bibliaService'
import { VersiculoLink } from '../lib/bibliaLink'
import BotonPreguntarIA from '../components/common/BotonPreguntarIA'
import Chip from '../components/ui/Chip'

const TIPOS = {
  'arcángel':           { color: '#C9A84C', icon: '⚔️' },
  'mensajero':          { color: '#60A5FA', icon: '📜' },
  'guardián':           { color: '#A78BFA', icon: '🛡️' },
  'adorador':           { color: '#FBBF24', icon: '🔥' },
  'teofanía':           { color: '#E0B0FF', icon: '✦' },
  'ejecutor de juicio': { color: '#F87171', icon: '⚖️' },
  'protector':          { color: '#34D399', icon: '🛡️' },
  'liberador':          { color: '#6AAF7E', icon: '🗝️' },
  'ser celestial':      { color: '#7EB8D4', icon: '👁️' },
  'servicial':          { color: '#9DB56F', icon: '🕊️' },
  'caído':              { color: '#EF4444', icon: '🌑' },
}

export default function Angelologia() {
  const [angeles, setAngeles] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtroTipo, setFiltroTipo] = useState('todos')
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    getAngeles().then(d => { setAngeles(d); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const tipos = [...new Set(angeles.map(a => a.tipo).filter(Boolean))]

  const filtrados = angeles.filter(a => {
    const matchTipo = filtroTipo === 'todos' || a.tipo === filtroTipo
    const matchBusq = !busqueda ||
      a.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
    return matchTipo && matchBusq
  })

  return (
    <main style={{ flex: 1, padding: 'clamp(16px, 4vw, 28px) clamp(14px, 4vw, 32px) 100px', maxWidth: 900, minWidth: 0 }}>

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--crimson)', fontSize: 'clamp(26px, 6vw, 36px)', color: 'var(--gold)', fontWeight: 300, marginBottom: 6 }}>
          Angelología Bíblica
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Ángeles y seres celestiales en la Escritura — toca "Preguntar a la IA" para su contexto completo
        </p>
      </div>

      {/* Buscador: fila propia, ancho completo en móvil */}
      <input
        style={{ width: '100%', maxWidth: 320, boxSizing: 'border-box', background: 'var(--surface2)', border: '1px solid var(--border2)', color: 'var(--text)', fontFamily: 'var(--sans)', fontSize: 13, padding: '10px 14px', borderRadius: 'var(--radius)', outline: 'none', marginBottom: 12 }}
        placeholder="Buscar ángel..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
      />

      {/* Chips: fila que envuelve pareja */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
        <Chip activo={filtroTipo === 'todos'} onClick={() => setFiltroTipo('todos')}>
          Todos ({angeles.length})
        </Chip>
        {tipos.map(t => {
          const info = TIPOS[t] || { color: 'var(--text-muted)', icon: '•' }
          const count = angeles.filter(a => a.tipo === t).length
          return (
            <Chip key={t} activo={filtroTipo === t} color={info.color} onClick={() => setFiltroTipo(t)}>
              {info.icon} {t} ({count})
            </Chip>
          )
        })}
      </div>

      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', marginBottom: 16 }}>
        {loading ? 'Cargando...' : `${filtrados.length} seres celestiales`}
      </div>

      {loading && <div className="loading"><div className="loading-dot"/><div className="loading-dot"/><div className="loading-dot"/></div>}

      {!loading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: 12 }}>
          {filtrados.map((a) => {
            const info = TIPOS[a.tipo] || { color: 'var(--gold)', icon: '👼' }
            return (
              <div key={a.id} style={{
                background: 'var(--surface)',
                borderTop: `3px solid ${info.color}`,
                borderRight: `1px solid ${info.color}25`,
                borderBottom: `1px solid ${info.color}25`,
                borderLeft: `1px solid ${info.color}25`,
                borderRadius: 'var(--radius)',
                padding: '16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 20 }}>{info.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--crimson)', fontSize: 17, color: info.color, lineHeight: 1.2, marginBottom: 4 }}>
                      {a.nombre}
                    </div>
                    {a.tipo && (
                      <span style={{
                        fontFamily: 'var(--mono)', fontSize: 8, color: info.color,
                        background: `${info.color}15`, border: `1px solid ${info.color}30`,
                        borderRadius: 3, padding: '2px 8px', display: 'inline-block',
                      }}>
                        {a.tipo}
                      </span>
                    )}
                    {a.cita && (
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-muted)', marginTop: 6 }}>
                        <VersiculoLink cita={a.cita} />
                      </div>
                    )}
                  </div>
                </div>

                {a.descripcion && (
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 10px' }}>
                    {a.descripcion}
                  </p>
                )}

                <BotonPreguntarIA tipo="angel" datos={a} color={info.color} />
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}