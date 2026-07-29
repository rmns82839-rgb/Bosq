import { useEffect, useState } from 'react'
import { getProfecias, getJuicios, getPalabrasJesus } from '../lib/db.js'
import { VersiculoLink } from '../lib/bibliaLink'
import BotonPreguntarIA from '../components/common/BotonPreguntarIA'

const ESTADO_JUICIO = {
  cumplido:     { label: 'Cumplido',  color: '#34D399', icon: '✅' },
  por_cumplir:  { label: 'Pendiente', color: '#F87171', icon: '⏳' },
}

export default function Especiales() {
  const [tab, setTab] = useState('profecias')
  const [profecias, setProfecias] = useState([])
  const [juicios, setJuicios] = useState([])
  const [palabras, setPalabras] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const promesa = tab === 'profecias' ? getProfecias() : tab === 'juicios' ? getJuicios() : getPalabrasJesus()
    promesa.then(data => {
      if (tab === 'profecias') setProfecias(data)
      else if (tab === 'juicios') setJuicios(data)
      else setPalabras(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [tab])

  return (
    <main style={{ flex: 1, padding: '28px 32px 100px', maxWidth: 860, minWidth: 0 }}>

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--crimson)', fontSize: 36, color: 'var(--gold)', fontWeight: 300, marginBottom: 6 }}>
          Estudios Especiales
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Profecías mesiánicas, juicios de Jehová y palabras de Jesús — toca "Preguntar a la IA" para el contexto completo
        </p>
      </div>

      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--surface2)', padding: 4, borderRadius: 8, flexWrap: 'wrap' }}>
        {[
          { key: 'profecias', icon: '🟠', label: 'Profecías Mesiánicas' },
          { key: 'juicios',   icon: '⚖️', label: 'Juicios de Jehová' },
          { key: 'jesus',     icon: '🔴', label: 'Palabras de Jesús' },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            flex: 1, minWidth: 140, fontFamily: 'var(--mono)', fontSize: 10,
            padding: '10px 14px', borderRadius: 6, border: 'none',
            background: tab === t.key ? 'var(--gold)' : 'none',
            color: tab === t.key ? 'var(--bg)' : 'var(--text-muted)',
            cursor: 'pointer', fontWeight: tab === t.key ? 700 : 400,
          }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {loading && <div className="loading"><div className="loading-dot"/><div className="loading-dot"/><div className="loading-dot"/></div>}

      {!loading && tab === 'profecias' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {profecias.map(p => (
            <div key={p.id} style={{
              background: 'var(--surface)',
              borderTop: '1px solid rgba(251,146,60,0.2)', borderRight: '1px solid rgba(251,146,60,0.2)',
              borderBottom: '1px solid rgba(251,146,60,0.2)', borderLeft: '3px solid #FB923C',
              borderRadius: 'var(--radius)', padding: '14px 16px',
            }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: '#FB923C', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
                {p.tema}
              </div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', marginBottom: 10 }}>
                <div style={{ fontSize: 13 }}>
                  <span style={{ color: 'var(--gold)', fontFamily: 'var(--mono)', fontSize: 9 }}>PROFECÍA: </span>
                  <VersiculoLink cita={p.citaProfecia} />
                </div>
                {p.citaCumplimiento && (
                  <div style={{ fontSize: 13 }}>
                    <span style={{ color: '#34D399', fontFamily: 'var(--mono)', fontSize: 9 }}>CUMPLIMIENTO: </span>
                    <VersiculoLink cita={p.citaCumplimiento} />
                  </div>
                )}
              </div>
              <BotonPreguntarIA tipo="profecia" datos={p} color="#FB923C" />
            </div>
          ))}
        </div>
      )}

      {!loading && tab === 'juicios' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {juicios.map(j => {
            const est = ESTADO_JUICIO[j.estado] || ESTADO_JUICIO.cumplido
            return (
              <div key={j.id} style={{
                background: 'var(--surface)',
                borderTop: `1px solid ${est.color}25`, borderRight: `1px solid ${est.color}25`,
                borderBottom: `1px solid ${est.color}25`, borderLeft: `3px solid ${est.color}`,
                borderRadius: 'var(--radius)', padding: '16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 16 }}>{est.icon}</span>
                  <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: est.color }}>{j.sobre}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 8, color: est.color, background: `${est.color}15`, border: `1px solid ${est.color}30`, borderRadius: 3, padding: '2px 8px' }}>
                    {est.label}
                  </span>
                </div>
                {j.descripcion && (
                  <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 10 }}>{j.descripcion}</p>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <VersiculoLink cita={j.cita} />
                  <BotonPreguntarIA tipo="juicio" datos={j} color={est.color} />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {!loading && tab === 'jesus' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {palabras.map((p) => (
            <div key={p.id} style={{
              background: 'var(--surface)',
              borderTop: '1px solid rgba(224,112,112,0.2)', borderRight: '1px solid rgba(224,112,112,0.2)',
              borderBottom: '1px solid rgba(224,112,112,0.2)', borderLeft: '3px solid #E07070',
              borderRadius: 'var(--radius)', padding: '12px 14px',
              display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
            }}>
              <div style={{ flex: 1, minWidth: 180 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 8, color: '#E07070', background: 'rgba(224,112,112,0.15)', border: '1px solid rgba(224,112,112,0.3)', borderRadius: 3, padding: '1px 6px' }}>
                    {p.tipo}
                  </span>
                  <VersiculoLink cita={p.cita} />
                </div>
                {p.resumen && (
                  <p style={{ fontFamily: 'var(--crimson)', fontSize: 14, color: 'var(--text)', lineHeight: 1.6, margin: 0 }}>
                    {p.resumen}
                  </p>
                )}
              </div>
              <BotonPreguntarIA tipo="palabra" datos={p} color="#E07070" />
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
