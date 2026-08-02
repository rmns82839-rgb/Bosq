import { useEffect, useState, useMemo } from 'react'
import { getEspirituSanto } from '../services/bibliaService'
import { VersiculoLink } from '../lib/bibliaLink'
import BotonPreguntarIA from '../components/common/BotonPreguntarIA'
import Chip from '../components/ui/Chip'
import FiltrosDesplegable from '../components/ui/FiltrosDesplegable'

const SECCIONES = [
  { key: 'nombre',    label: 'Nombres',    icon: '🕊️', color: '#C9A84C', desc: 'Cómo lo nombra la Escritura' },
  { key: 'persona',   label: 'Es Persona', icon: '👤', color: '#7EB8D4', desc: 'Evidencias de que es una Persona, no una fuerza' },
  { key: 'deidad',    label: 'Su deidad',  icon: '✦',  color: '#E0B0FF', desc: 'Evidencias de que es Dios' },
  { key: 'simbolo',   label: 'Símbolos',   icon: '🔥', color: '#FB923C', desc: 'Las imágenes con que se le representa' },
  { key: 'obra',      label: 'Su obra',    icon: '⚡', color: '#34D399', desc: 'Lo que hace en el mundo y en el creyente' },
  { key: 'don',       label: 'Dones',      icon: '✨', color: '#60A5FA', desc: 'Los dones que reparte' },
  { key: 'fruto',     label: 'Fruto',      icon: '🍇', color: '#A78BFA', desc: 'Gálatas 5:22-23' },
  { key: 'pecado',    label: 'Pecados',    icon: '⚠️', color: '#F87171', desc: 'Los pecados contra el Espíritu' },
  { key: 'por_libro', label: 'Por libro',  icon: '📖', color: '#6AAF7E', desc: 'Cómo aparece en cada libro de la Biblia' },
]

export default function Neumatologia() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('nombre')
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    getEspirituSanto().then(d => { setItems(d); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const seccion = SECCIONES.find(s => s.key === tab)
  const contar = (key) => items.filter(i => i.categoria === key).length

  const filtrados = useMemo(() => items.filter(i => {
    if (i.categoria !== tab) return false
    if (!busqueda) return true
    const t = busqueda.toLowerCase()
    return i.titulo?.toLowerCase().includes(t) || i.descripcion?.toLowerCase().includes(t)
  }), [items, tab, busqueda])

  const esPorLibro = tab === 'por_libro'

  return (
    <main style={{ flex: 1, padding: 'clamp(16px, 4vw, 28px) clamp(14px, 4vw, 32px) 100px', maxWidth: 900, minWidth: 0 }}>

      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontFamily: 'var(--crimson)', fontSize: 'clamp(26px, 6vw, 36px)', color: 'var(--gold)', fontWeight: 300, marginBottom: 6 }}>
          El Espíritu Santo
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Estudio completo: quién es, cómo lo nombra la Biblia, sus símbolos, su obra, sus dones,
          su fruto, y cómo aparece libro por libro — toca "Preguntar a la IA" en cualquiera para profundizar
        </p>
      </div>

      {/* Secciones dentro del desplegable */}
      <FiltrosDesplegable label="Secciones" activos={seccion?.label}>
        {SECCIONES.map(s => (
          <Chip key={s.key} activo={tab === s.key} color={s.color} onClick={() => { setTab(s.key); setBusqueda('') }}>
            {s.icon} {s.label} ({contar(s.key)})
          </Chip>
        ))}
      </FiltrosDesplegable>

      {/* Descripción de la sección */}
      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: seccion?.color, letterSpacing: '0.04em', marginBottom: 10 }}>
        {seccion?.desc}
      </div>

      {/* Buscador en su fila */}
      <input
        style={{ width: '100%', maxWidth: 320, boxSizing: 'border-box', background: 'var(--surface2)', border: '1px solid var(--border2)', color: 'var(--text)', fontFamily: 'var(--sans)', fontSize: 12, padding: '9px 12px', borderRadius: 'var(--radius)', outline: 'none', marginBottom: 18 }}
        placeholder="Buscar en esta sección..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
      />

      {/* Nota honesta en el recorrido libro por libro */}
      {esPorLibro && !loading && (
        <div style={{
          background: 'rgba(106,175,126,0.07)',
          borderTop: '1px solid rgba(106,175,126,0.2)', borderRight: '1px solid rgba(106,175,126,0.2)',
          borderBottom: '1px solid rgba(106,175,126,0.2)', borderLeft: '3px solid #6AAF7E',
          borderRadius: 'var(--radius)', padding: '12px 16px', marginBottom: 16,
        }}>
          <p style={{ fontSize: 12, color: '#6AAF7E', lineHeight: 1.6, margin: 0 }}>
            <strong>Nota:</strong> aquí solo aparecen los libros con mención <em>explícita</em> del Espíritu.
            A diferencia de "Jesús en cada libro" (que es tipológico y recorre los 66), no se fuerza una
            referencia donde el texto no la tiene: hay libros que sencillamente no lo mencionan.
          </p>
        </div>
      )}

      {loading && <div className="loading"><div className="loading-dot"/><div className="loading-dot"/><div className="loading-dot"/></div>}

      {!loading && filtrados.length === 0 && (
        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-muted)' }}>
          No hay resultados en esta sección.
        </p>
      )}

      {!loading && filtrados.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtrados.map((item) => (
            <div key={item.id} style={{
              background: 'var(--surface)',
              borderTop: `1px solid ${seccion.color}20`, borderRight: `1px solid ${seccion.color}20`,
              borderBottom: `1px solid ${seccion.color}20`, borderLeft: `3px solid ${seccion.color}`,
              borderRadius: 'var(--radius)', padding: '13px 16px',
              display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
            }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontFamily: 'var(--crimson)', fontSize: 15.5, color: 'var(--text)', lineHeight: 1.35 }}>
                  {item.titulo}
                </div>
                {item.descripcion && !esPorLibro && (
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.55, margin: '3px 0 0' }}>
                    {item.descripcion}
                  </p>
                )}
                {item.cita && (
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-muted)', marginTop: 4 }}>
                    <VersiculoLink cita={item.cita} />
                  </div>
                )}
              </div>

              <BotonPreguntarIA
                tipo={esPorLibro ? 'espiritu_libro' : 'espiritu'}
                datos={item}
                color={seccion.color}
              />
            </div>
          ))}
        </div>
      )}
    </main>
  )
}