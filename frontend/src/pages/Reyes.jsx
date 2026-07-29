import { useEffect, useState } from 'react'
import { getReyes } from '../lib/db.js'
import { VersiculoLink } from '../lib/bibliaLink'
import BotonPreguntarIA from '../components/common/BotonPreguntarIA'
import LineaTiempoReyes from '../components/reyes/LineaTiempoReyes'

const C = { 'Israel unido': '#C9A84C', 'Judá': '#60A5FA', 'Israel': '#34D399' }
const CE = { bueno: '#34D399', malo: '#F87171', mixto: '#FBBF24' }
const IE = { bueno: '✅', malo: '❌', mixto: '⚠️' }

export default function Reyes() {
  const [reyes, setReyes] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtroReino, setFiltroReino] = useState('todos')
  const [vista, setVista] = useState('lista')

  useEffect(() => {
    getReyes().then(d => { setReyes(d); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const reinos = [...new Set(reyes.map(r => r.reino))]
  const filtrados = filtroReino === 'todos' ? reyes : reyes.filter(r => r.reino === filtroReino)

  return (
    <main style={{ flex: 1, padding: '28px 32px 100px', maxWidth: 900, minWidth: 0 }}>

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--crimson)', fontSize: 36, color: 'var(--gold)', fontWeight: 300, marginBottom: 6 }}>
          Reyes de Israel y Judá
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Lista de reyes con su evaluación bíblica — toca "Preguntar a la IA" para eventos, profetas contemporáneos, logros y fracasos de cada uno
        </p>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <button onClick={() => setVista('lista')} style={{
          fontFamily: 'var(--mono)', fontSize: 10, padding: '6px 14px', borderRadius: 4,
          border: `1px solid ${vista === 'lista' ? 'var(--gold)' : 'var(--border2)'}`,
          background: vista === 'lista' ? 'var(--gold-glow)' : 'none',
          color: vista === 'lista' ? 'var(--gold)' : 'var(--text-muted)', cursor: 'pointer',
        }}>📋 Lista</button>
        <button onClick={() => setVista('tiempo')} style={{
          fontFamily: 'var(--mono)', fontSize: 10, padding: '6px 14px', borderRadius: 4,
          border: `1px solid ${vista === 'tiempo' ? 'var(--gold)' : 'var(--border2)'}`,
          background: vista === 'tiempo' ? 'var(--gold-glow)' : 'none',
          color: vista === 'tiempo' ? 'var(--gold)' : 'var(--text-muted)', cursor: 'pointer',
        }}>📊 Línea de tiempo</button>
      </div>

      {vista === 'lista' && (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        <button onClick={() => setFiltroReino('todos')} style={{
          fontFamily: 'var(--mono)', fontSize: 10, padding: '6px 14px', borderRadius: 4,
          border: `1px solid ${filtroReino === 'todos' ? 'var(--gold)' : 'var(--border2)'}`,
          background: filtroReino === 'todos' ? 'var(--gold-glow)' : 'none',
          color: filtroReino === 'todos' ? 'var(--gold)' : 'var(--text-muted)', cursor: 'pointer',
        }}>Todos ({reyes.length})</button>
        {reinos.map(r => (
          <button key={r} onClick={() => setFiltroReino(r)} style={{
            fontFamily: 'var(--mono)', fontSize: 10, padding: '6px 12px', borderRadius: 4,
            border: `1px solid ${filtroReino === r ? C[r] || 'var(--gold)' : 'var(--border2)'}`,
            background: filtroReino === r ? `${C[r] || 'var(--gold)'}18` : 'none',
            color: filtroReino === r ? C[r] || 'var(--gold)' : 'var(--text-muted)', cursor: 'pointer',
          }}>{r} ({reyes.filter(x => x.reino === r).length})</button>
        ))}
      </div>
      )}

      {loading && <div className="loading"><div className="loading-dot"/><div className="loading-dot"/><div className="loading-dot"/></div>}

      {!loading && vista === 'tiempo' && (
        <LineaTiempoReyes reyes={reyes} />
      )}

      {!loading && vista === 'lista' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtrados.map((rey) => {
            const color = C[rey.reino] || 'var(--gold)'
            const ec = CE[rey.evaluacion] || color
            return (
              <div key={rey.id} style={{
                background: 'var(--surface)',
                borderTop: `1px solid ${ec}30`, borderRight: `1px solid ${ec}30`,
                borderBottom: `1px solid ${ec}30`, borderLeft: `3px solid ${ec}`,
                borderRadius: 6, padding: '14px 16px',
                display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
              }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--crimson)', fontSize: 17, color: 'var(--text)', fontWeight: 500 }}>{rey.nombre}</span>
                    {rey.evaluacion && <span style={{ fontSize: 13 }}>{IE[rey.evaluacion]}</span>}
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 8, color, background: `${color}15`, border: `1px solid ${color}30`, borderRadius: 3, padding: '2px 6px' }}>
                      {rey.reino}
                    </span>
                  </div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-muted)', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {rey.inicioAc && <span>📅 {rey.inicioAc}–{rey.finAc} a.C.</span>}
                    {rey.cita && <VersiculoLink cita={rey.cita} />}
                  </div>
                </div>

                <BotonPreguntarIA tipo="rey" datos={rey} color={color} etiqueta="🔎 Contexto e historia" />
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
