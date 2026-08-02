import { useEffect, useState } from 'react'
import { getElementosTabernaculo, getFigurasIglesia } from '../services/bibliaService'
import { VersiculoLink } from '../lib/bibliaLink'
import BotonPreguntarIA from '../components/common/BotonPreguntarIA'
import Chip from '../components/ui/Chip'
import FiltrosDesplegable from '../components/ui/FiltrosDesplegable'

const SECCIONES = {
  atrio:           { label: 'Atrio',           color: '#A8823C', icon: '🔥' },
  lugar_santo:     { label: 'Lugar Santo',     color: '#C9A84C', icon: '🕎' },
  lugar_santisimo: { label: 'Lugar Santísimo', color: '#8B5CF6', icon: '✦' },
  estructura:      { label: 'Estructura',      color: '#6B4A3A', icon: '🏕️' },
  sacerdocio:      { label: 'Sacerdocio',      color: '#60A5FA', icon: '👳' },
}

const COLOR_FIGURA = '#5B8C6E'

export default function Tabernaculo() {
  const [vista, setVista] = useState('tabernaculo')
  const [elementos, setElementos] = useState([])
  const [figuras, setFiguras] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtroSeccion, setFiltroSeccion] = useState('todas')
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    Promise.all([getElementosTabernaculo(), getFigurasIglesia()])
      .then(([els, figs]) => { setElementos(els); setFiguras(figs); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const secciones = [...new Set(elementos.map(e => e.seccion).filter(Boolean))]

  const elementosFiltrados = elementos.filter(e => {
    const matchSeccion = filtroSeccion === 'todas' || e.seccion === filtroSeccion
    const matchBusq = !busqueda ||
      e.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.tipologiaCristo?.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
    return matchSeccion && matchBusq
  })

  const figurasFiltradas = figuras.filter(f =>
    !busqueda ||
    f.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    f.cristoEnLaFigura?.toLowerCase().includes(busqueda.toLowerCase()) ||
    f.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <main style={{ flex: 1, padding: 'clamp(16px, 4vw, 28px) clamp(14px, 4vw, 32px) 100px', maxWidth: 900, minWidth: 0 }}>

      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontFamily: 'var(--crimson)', fontSize: 'clamp(26px, 6vw, 36px)', color: 'var(--gold)', fontWeight: 300, marginBottom: 6 }}>
          Tabernáculo y la Iglesia
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Cada elemento del tabernáculo y cada figura de la Iglesia apuntan a Cristo — toca "Preguntar a la IA" para el estudio completo
        </p>
      </div>

      {/* Toggle de vista (navegación principal, visible) */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 14 }}>
        <Chip activo={vista === 'tabernaculo'} onClick={() => { setVista('tabernaculo'); setBusqueda('') }}>
          🏕️ Tabernáculo ({elementos.length})
        </Chip>
        <Chip activo={vista === 'figuras'} onClick={() => { setVista('figuras'); setBusqueda(''); setFiltroSeccion('todas') }}>
          🕊️ Figuras de la Iglesia ({figuras.length})
        </Chip>
      </div>

      {/* Buscador en su fila */}
      <input
        style={{ width: '100%', maxWidth: 320, boxSizing: 'border-box', background: 'var(--surface2)', border: '1px solid var(--border2)', color: 'var(--text)', fontFamily: 'var(--sans)', fontSize: 13, padding: '10px 14px', borderRadius: 'var(--radius)', outline: 'none', marginBottom: 12 }}
        placeholder={vista === 'tabernaculo' ? 'Buscar elemento...' : 'Buscar figura...'}
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
      />

      {/* Filtro de sección en el desplegable (solo en la vista tabernáculo) */}
      {vista === 'tabernaculo' && (
        <FiltrosDesplegable activos={filtroSeccion === 'todas' ? '' : (SECCIONES[filtroSeccion]?.label || filtroSeccion)}>
          <Chip activo={filtroSeccion === 'todas'} onClick={() => setFiltroSeccion('todas')}>
            Todas ({elementos.length})
          </Chip>
          {secciones.map(s => {
            const info = SECCIONES[s] || { label: s, color: 'var(--text-muted)', icon: '•' }
            const count = elementos.filter(e => e.seccion === s).length
            return (
              <Chip key={s} activo={filtroSeccion === s} color={info.color} onClick={() => setFiltroSeccion(s)}>
                {info.icon} {info.label} ({count})
              </Chip>
            )
          })}
        </FiltrosDesplegable>
      )}

      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', marginBottom: 16 }}>
        {loading ? 'Cargando...' : vista === 'tabernaculo'
          ? `${elementosFiltrados.length} elementos`
          : `${figurasFiltradas.length} figuras`}
      </div>

      {loading && <div className="loading"><div className="loading-dot"/><div className="loading-dot"/><div className="loading-dot"/></div>}

      {!loading && vista === 'tabernaculo' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: 12 }}>
          {elementosFiltrados.map((e) => {
            const info = SECCIONES[e.seccion] || { label: e.seccion, color: 'var(--gold)', icon: '•' }
            return (
              <div key={e.id} style={{
                background: 'var(--surface)',
                borderTop: `3px solid ${info.color}`,
                borderRight: `1px solid ${info.color}25`,
                borderBottom: `1px solid ${info.color}25`,
                borderLeft: `1px solid ${info.color}25`,
                borderRadius: 'var(--radius)', padding: '16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 20 }}>{info.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--crimson)', fontSize: 17, color: info.color, lineHeight: 1.2, marginBottom: 4 }}>
                      {e.nombre}
                    </div>
                    <span style={{
                      fontFamily: 'var(--mono)', fontSize: 8, color: info.color,
                      background: `${info.color}15`, border: `1px solid ${info.color}30`,
                      borderRadius: 3, padding: '2px 8px', display: 'inline-block',
                    }}>{info.label}</span>
                    {e.cita && (
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-muted)', marginTop: 6 }}>
                        <VersiculoLink cita={e.cita} />
                      </div>
                    )}
                  </div>
                </div>

                {e.tipologiaCristo && (
                  <p style={{ fontSize: 12, color: info.color, lineHeight: 1.5, margin: '0 0 8px' }}>
                    ✝ Cristo: {e.tipologiaCristo}
                  </p>
                )}
                {e.descripcion && (
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 10px' }}>
                    {e.descripcion}
                  </p>
                )}

                <BotonPreguntarIA tipo="tabernaculo" datos={e} color={info.color} />
              </div>
            )
          })}
        </div>
      )}

      {!loading && vista === 'figuras' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: 12 }}>
          {figurasFiltradas.map((f) => (
            <div key={f.id} style={{
              background: 'var(--surface)',
              borderTop: `3px solid ${COLOR_FIGURA}`,
              borderRight: `1px solid ${COLOR_FIGURA}25`,
              borderBottom: `1px solid ${COLOR_FIGURA}25`,
              borderLeft: `1px solid ${COLOR_FIGURA}25`,
              borderRadius: 'var(--radius)', padding: '16px',
            }}>
              <div style={{ fontFamily: 'var(--crimson)', fontSize: 17, color: COLOR_FIGURA, lineHeight: 1.2, marginBottom: 4 }}>
                {f.nombre}
              </div>
              {f.cita && (
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-muted)', marginBottom: 8 }}>
                  <VersiculoLink cita={f.cita} />
                </div>
              )}
              {f.cristoEnLaFigura && (
                <p style={{ fontSize: 12, color: COLOR_FIGURA, lineHeight: 1.5, margin: '0 0 8px' }}>
                  ✝ Cristo: {f.cristoEnLaFigura}
                </p>
              )}
              {f.descripcion && (
                <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 10px' }}>
                  {f.descripcion}
                </p>
              )}
              <BotonPreguntarIA tipo="figura_iglesia" datos={f} color={COLOR_FIGURA} />
            </div>
          ))}
        </div>
      )}
    </main>
  )
}