import { useEffect, useState } from 'react'
import { getNumeros } from '../lib/db.js'
import { VersiculoLink } from '../lib/bibliaLink'
import BotonPreguntarIA from '../components/common/BotonPreguntarIA'

const CATEGORIA_COLOR = {
  divino: '#C9A84C', humano: '#FB923C', gobierno: '#818CF8',
  prueba: '#F87171', escatológico: '#F87171', creación: '#34D399',
  legal: '#60A5FA', gracia: '#A78BFA', nuevo_comienzo: '#7EB8D4', profético: '#FB923C',
}

export default function Numerologia() {
  const [numeros, setNumeros] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtroCat, setFiltroCat] = useState('todos')

  useEffect(() => {
    getNumeros().then(d => { setNumeros(d); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const categorias = [...new Set(numeros.map(n => n.categoria).filter(Boolean))]
  const filtrados = filtroCat === 'todos' ? numeros : numeros.filter(n => n.categoria === filtroCat)

  return (
    <main style={{ flex: 1, padding: '28px 32px 100px', maxWidth: 900, minWidth: 0 }}>

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--crimson)', fontSize: 36, color: 'var(--gold)', fontWeight: 300, marginBottom: 6 }}>
          Numerología Bíblica
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Números con significado teológico — toca "Preguntar a la IA" para el contexto completo de cada uno
        </p>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        <button onClick={() => setFiltroCat('todos')} style={{
          fontFamily: 'var(--mono)', fontSize: 10, padding: '6px 14px', borderRadius: 4,
          border: `1px solid ${filtroCat === 'todos' ? 'var(--gold)' : 'var(--border2)'}`,
          background: filtroCat === 'todos' ? 'var(--gold-glow)' : 'none',
          color: filtroCat === 'todos' ? 'var(--gold)' : 'var(--text-muted)', cursor: 'pointer',
        }}>Todos ({numeros.length})</button>
        {categorias.map(c => {
          const color = CATEGORIA_COLOR[c] || 'var(--text-muted)'
          const count = numeros.filter(n => n.categoria === c).length
          return (
            <button key={c} onClick={() => setFiltroCat(c)} style={{
              fontFamily: 'var(--mono)', fontSize: 10, padding: '6px 12px', borderRadius: 4,
              border: `1px solid ${filtroCat === c ? color : 'var(--border2)'}`,
              background: filtroCat === c ? `${color}18` : 'none',
              color: filtroCat === c ? color : 'var(--text-muted)', cursor: 'pointer',
            }}>{c} ({count})</button>
          )
        })}
      </div>

      {loading && <div className="loading"><div className="loading-dot"/><div className="loading-dot"/><div className="loading-dot"/></div>}

      {!loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtrados.map((n) => {
            const color = CATEGORIA_COLOR[n.categoria] || '#C9A84C'
            return (
              <div key={n.id} style={{
                background: 'var(--surface)',
                borderTop: `1px solid ${color}20`, borderRight: `1px solid ${color}20`,
                borderBottom: `1px solid ${color}20`, borderLeft: `3px solid ${color}`,
                borderRadius: 'var(--radius)', padding: '16px',
                display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap',
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 8, flexShrink: 0,
                  background: `${color}12`, border: `2px solid ${color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: 'var(--crimson)', fontSize: n.numero > 999 ? 14 : 28, color, lineHeight: 1 }}>
                    {n.numero.toLocaleString('es-CO')}
                  </span>
                </div>

                <div style={{ flex: 1, minWidth: 160 }}>
                  <div style={{ fontFamily: 'var(--crimson)', fontSize: 16, color: 'var(--text)', marginBottom: 4 }}>
                    {n.significado}
                  </div>
                  {n.cita && (
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-muted)' }}>
                      <VersiculoLink cita={n.cita} />
                    </div>
                  )}
                </div>

                <BotonPreguntarIA tipo="numero" datos={n} color={color} />
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
