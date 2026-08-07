import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/common/Header'
import { getCursos } from '../services/cursoService'

export default function CursoDashboard() {
  const [cursos, setCursos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCursos().then(d => { setCursos(Array.isArray(d) ? d : []); setLoading(false) })
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0a0a0a, #0f0f1a, #1a1a2e)' }}>
      <Header />

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(16px, 4vw, 32px) clamp(14px, 4vw, 32px) 100px' }}>
        <div style={{ marginBottom: 28 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', marginBottom: 12,
            borderRadius: 999, background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)',
            color: 'var(--gold)', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em',
          }}>✦ CURSO DE TEOLOGÍA</span>
          <h1 style={{ fontFamily: 'var(--crimson)', fontSize: 'clamp(28px, 7vw, 44px)', color: '#fff', fontWeight: 300, lineHeight: 1.1, marginBottom: 8 }}>
            Estudia la Palabra a fondo
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: 560 }}>
            Cursos libro por libro: contexto, escuelas de interpretación, tipologías de Cristo,
            profecías, símbolos y evaluación por lección.
          </p>
        </div>

        {loading && <div className="loading"><div className="loading-dot"/><div className="loading-dot"/><div className="loading-dot"/></div>}

        {!loading && cursos.length === 0 && (
          <div style={{
            padding: '32px', textAlign: 'center', borderRadius: 'var(--radius)',
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.55)', fontSize: 14,
          }}>
            Aún no hay cursos disponibles. Pronto comenzaremos con <strong style={{ color: 'var(--gold)' }}>Apocalipsis</strong>.
          </div>
        )}

        {!loading && cursos.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 16 }}>
            {cursos.map((c) => (
              <Link
                key={c.id}
                to={`/curso/${c.slug}`}
                style={{
                  display: 'block', textDecoration: 'none', padding: '20px',
                  borderRadius: 16, background: 'linear-gradient(135deg, rgba(26,26,46,0.6), rgba(22,33,62,0.4))',
                  border: '1px solid rgba(255,255,255,0.1)', transition: 'border-color .2s',
                }}
              >
                <div style={{ fontFamily: 'var(--crimson)', fontSize: 24, color: 'var(--gold)', marginBottom: 6 }}>
                  {c.nombre}
                </div>
                {c.descripcion && (
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.55, margin: '0 0 12px' }}>
                    {c.descripcion}
                  </p>
                )}
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                  {c._count?.lecciones ?? 0} {(c._count?.lecciones ?? 0) === 1 ? 'lección' : 'lecciones'} · comenzar ↗
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}