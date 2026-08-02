import { useEffect, useState } from 'react'
import { getTitulosMesias } from '../services/bibliaService'
import { VersiculoLink } from '../lib/bibliaLink'
import BotonPreguntarIA from '../components/common/BotonPreguntarIA'
import Chip from '../components/ui/Chip'
import FiltrosDesplegable from '../components/ui/FiltrosDesplegable'

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
    <main style={{ flex: 1, padding: 'clamp(16px, 4vw, 28px) clamp(14px, 4vw, 32px) 100px', maxWidth: 900, minWidth: 0 }}>

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--crimson)', fontSize: 'clamp(26px, 6vw, 36px)', color: 'var(--gold)', fontWeight: 300, marginBottom: 6 }}>
          Cristología Bíblica
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Nombres y títulos de Jesucristo en la Biblia — toca "Preguntar a la IA" en cualquiera para su contexto completo
        </p>
      </div>

      <input
        style={{ width: '100%', maxWidth: 320, boxSizing: 'border-box', background: 'var(--surface2)', border: '1px solid var(--border2)', color: 'var(--text)', fontFamily: 'var(--sans)', fontSize: 13, padding: '10px 14px', borderRadius: 'var(--radius)', outline: 'none', marginBottom: 12 }}
        placeholder="Buscar título..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
      />

      <FiltrosDesplegable activos={filtrocat === 'todos' ? '' : (CATEGORIAS[filtrocat]?.label || filtrocat)}>
        <Chip activo={filtrocat === 'todos'} onClick={() => setFiltrocat('todos')}>
          Todos ({titulos.length})
        </Chip>
        {Object.entries(CATEGORIAS).map(([key, info]) => (
          contarCat(key) > 0 && (
            <Chip key={key} activo={filtrocat === key} color={info.color} onClick={() => setFiltrocat(key)}>
              {info.icon} {info.label} ({contarCat(key)})
            </Chip>
          )
        ))}
      </FiltrosDesplegable>

      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', marginBottom: 16 }}>
        {loading ? 'Cargando...' : `${filtrados.length} títulos y nombres`}
      </div>

      {loading && <div className="loading"><div className="loading-dot"/><div className="loading-dot"/><div className="loading-dot"/></div>}

      {!loading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: 12 }}>
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
                  <div style={{ flex: 1, minWidth: 0 }}>
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