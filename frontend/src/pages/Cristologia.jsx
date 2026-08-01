import { useEffect, useState } from 'react'
import { getTitulosMesias } from '../services/bibliaService'
import { VersiculoLink } from '../lib/bibliaLink'
import BotonPreguntarIA from '../components/common/BotonPreguntarIA'

const CATEGORIAS = {
  divino:     { color: '#C9A84C', icon: '✦', label: 'Naturaleza Divina' },
  profético:  { color: '#FB923C', icon: '📜', label: 'Títulos Proféticos' },
  real:       { color: '#60A5FA', icon: '👑', label: 'Títulos Reales' },
  sacerdotal: { color: '#A78BFA', icon: '🕊️', label: 'Títulos Sacerdotales' },
  redentor:   { color: '#34D399', icon: '✝️', label: 'Títulos Redentores' },
  sacrificial:{ color: '#E07070', icon: '🐑', label: 'Títulos Sacrificiales' },
  pastoral:   { color: '#6AAF7E', icon: '🐑', label: 'Títulos de Pastor' },
  sustento:   { color: '#7EB8D4', icon: '🍞', label: 'Sustento' },
  salvífico:  { color: '#34D399', icon: '✝️', label: 'Salvíficos' },
}

export default function Cristologia() {
  const [titulos, setTitulos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtrocat, setFiltrocat] = useState('todos')
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    getTitulosMesias().then(d => { setTitulos(d); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const filtrados = titulos.filter(t => {
    const matchCat = filtrocat === 'todos' || t.categoria === filtrocat
    const matchBusq = !busqueda || t.titulo.toLowerCase().includes(busqueda.toLowerCase())
    return matchCat && matchBusq
  })

  const contarCat = (cat) => titulos.filter(t => t.categoria === cat).length

  return (
    <main style={{ flex: 1, padding: '28px 32px 100px', maxWidth: 900, minWidth: 0 }}>

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--crimson)', fontSize: 36, color: 'var(--gold)', fontWeight: 300, marginBottom: 6 }}>
          Cristología Bíblica
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Nombres y títulos de Jesucristo en la Biblia — toca "Preguntar a la IA" en cualquiera para su contexto completo
        </p>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        <input
          style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', color: 'var(--text)', fontFamily: 'var(--sans)', fontSize: 13, padding: '8px 14px', borderRadius: 'var(--radius)', outline: 'none', minWidth: 180 }}
          placeholder="Buscar título..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
        <button onClick={() => setFiltrocat('todos')} style={{
          fontFamily: 'var(--mono)', fontSize: 10, padding: '6px 14px', borderRadius: 4,
          border: `1px solid ${filtrocat === 'todos' ? 'var(--gold)' : 'var(--border2)'}`,
          background: filtrocat === 'todos' ? 'var(--gold-glow)' : 'none',
          color: filtrocat === 'todos' ? 'var(--gold)' : 'var(--text-muted)', cursor: 'pointer',
        }}>Todos ({titulos.length})</button>
        {Object.entries(CATEGORIAS).map(([key, info]) => (
          contarCat(key) > 0 && (
            <button key={key} onClick={() => setFiltrocat(key)} style={{
              fontFamily: 'var(--mono)', fontSize: 10, padding: '6px 12px', borderRadius: 4,
              border: `1px solid ${filtrocat === key ? info.color : 'var(--border2)'}`,
              background: filtrocat === key ? `${info.color}18` : 'none',
              color: filtrocat === key ? info.color : 'var(--text-muted)', cursor: 'pointer',
            }}>{info.icon} {info.label} ({contarCat(key)})</button>
          )
        ))}
      </div>

      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', marginBottom: 16 }}>
        {loading ? 'Cargando...' : `${filtrados.length} títulos y nombres`}
      </div>

      {loading && <div className="loading"><div className="loading-dot"/><div className="loading-dot"/><div className="loading-dot"/></div>}

      {!loading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
          {filtrados.map((t) => {
            const info = CATEGORIAS[t.categoria] || { color: 'var(--gold)', icon: '✦', label: t.categoria }
            return (
              <div key={t.id} style={{
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
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--crimson)', fontSize: 17, color: info.color, lineHeight: 1.2, marginBottom: 4 }}>
                      {t.titulo}
                    </div>
                    {t.cita && (
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-muted)' }}>
                        <VersiculoLink cita={t.cita} />
                      </div>
                    )}
                  </div>
                </div>

                {t.descripcion && (
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 10px', fontStyle: 'italic' }}>
                    {t.descripcion}
                  </p>
                )}

                <BotonPreguntarIA tipo="titulo" datos={t} color={info.color} />
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
