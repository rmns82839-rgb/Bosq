import { useEffect, useState } from 'react'
import {
  getNombresEspiritu,
  getObrasEspiritu,
  getSimbolosEspiritu,
  getDonesEspiritu,
  getFrutoEspiritu,
  getEspirituPorLibro,
} from '../lib/db.js'
import { VersiculoLink } from '../lib/bibliaLink'
import BotonPreguntarIA from '../components/common/BotonPreguntarIA'

const TABS = [
  { key: 'nombre', label: 'Nombres', icon: '🕊️', color: '#C9A84C', fetch: getNombresEspiritu },
  { key: 'obra', label: 'Obras', icon: '⚡', color: '#34D399', fetch: getObrasEspiritu },
  { key: 'simbolo', label: 'Símbolos', icon: '🔥', color: '#FB923C', fetch: getSimbolosEspiritu },
  { key: 'don', label: 'Dones', icon: '✨', color: '#60A5FA', fetch: getDonesEspiritu },
  { key: 'fruto', label: 'Fruto', icon: '🍇', color: '#A78BFA', fetch: getFrutoEspiritu },
  { key: 'por_libro', label: 'Por libro', icon: '📖', color: '#7EB8D4', fetch: getEspirituPorLibro },
]

export default function Neumatologia() {
  const [tab, setTab] = useState('nombre')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const tabActual = TABS.find(t => t.key === tab)

  useEffect(() => {
    setLoading(true)
    tabActual.fetch().then(d => { setItems(d); setLoading(false) }).catch(() => setLoading(false))
  }, [tab])

  return (
    <main style={{ flex: 1, padding: '28px 32px 100px', maxWidth: 900, minWidth: 0 }}>

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--crimson)', fontSize: 36, color: 'var(--gold)', fontWeight: 300, marginBottom: 6 }}>
          El Espíritu Santo
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Nombres, obras, símbolos, dones y fruto del Espíritu — toca "Preguntar a la IA" para el contexto completo
        </p>
      </div>

      <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: 'var(--surface2)', padding: 4, borderRadius: 8, flexWrap: 'wrap' }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            flex: 1, minWidth: 100,
            fontFamily: 'var(--mono)', fontSize: 10,
            padding: '10px 12px', borderRadius: 6, border: 'none',
            background: tab === t.key ? t.color : 'none',
            color: tab === t.key ? 'var(--bg)' : 'var(--text-muted)',
            cursor: 'pointer', fontWeight: tab === t.key ? 700 : 400,
          }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {loading && <div className="loading"><div className="loading-dot"/><div className="loading-dot"/><div className="loading-dot"/></div>}

      {!loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((item) => (
            <div key={item.id} style={{
              background: 'var(--surface)',
              borderTop: `1px solid ${tabActual.color}20`, borderRight: `1px solid ${tabActual.color}20`,
              borderBottom: `1px solid ${tabActual.color}20`, borderLeft: `3px solid ${tabActual.color}`,
              borderRadius: 'var(--radius)', padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
            }}>
              <div style={{ flex: 1, minWidth: 180 }}>
                <div style={{ fontFamily: 'var(--crimson)', fontSize: 16, color: 'var(--text)', marginBottom: 4 }}>
                  {item.titulo}
                </div>
                {item.cita && (
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-muted)' }}>
                    <VersiculoLink cita={item.cita} />
                  </div>
                )}
                {item.descripcion && (
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5, margin: '4px 0 0' }}>
                    {item.descripcion}
                  </p>
                )}
              </div>

              <BotonPreguntarIA
                tipo="espiritu"
                datos={{ ...item, categoria: tabActual.key }}
                color={tabActual.color}
              />
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
