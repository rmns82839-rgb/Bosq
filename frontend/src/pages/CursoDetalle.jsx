import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/common/Header'
import { getCurso } from '../services/cursoService'

export default function CursoDetalle() {
  const { slug } = useParams()
  const [curso, setCurso] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurso(slug).then(d => { setCurso(d); setLoading(false) })
  }, [slug])

  const lecciones = curso?.lecciones || []

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0a0a0a, #0f0f1a, #1a1a2e)' }}>
      <Header />

      <main style={{ maxWidth: 820, margin: '0 auto', padding: 'clamp(16px, 4vw, 32px) clamp(14px, 4vw, 32px) 100px' }}>
        <Link to="/curso" style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
          ← Cursos
        </Link>

        {loading && <div className="loading" style={{ marginTop: 20 }}><div className="loading-dot"/><div className="loading-dot"/><div className="loading-dot"/></div>}

        {!loading && !curso && (
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: 20 }}>No se encontró el curso.</p>
        )}

        {!loading && curso && (
          <>
            <div style={{ margin: '16px 0 28px' }}>
              <h1 style={{ fontFamily: 'var(--crimson)', fontSize: 'clamp(28px, 7vw, 42px)', color: 'var(--gold)', fontWeight: 300, marginBottom: 8 }}>
                {curso.nombre}
              </h1>
              {curso.autor && (
                <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 8 }}>
                  ✍️ {curso.autor}{curso.fechaEscritura ? ` · ${curso.fechaEscritura}` : ''}
                </p>
              )}
              {curso.descripcion && (
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{curso.descripcion}</p>
              )}
            </div>

            {lecciones.length === 0 && (
              <div style={{
                padding: '28px', textAlign: 'center', borderRadius: 'var(--radius)',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.55)', fontSize: 14,
              }}>
                Este curso todavía no tiene lecciones cargadas.
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {lecciones.map((l) => (
                <Link
                  key={l.id}
                  to={`/curso/leccion/${l.id}`}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none',
                    padding: '16px 18px', borderRadius: 12,
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <span style={{
                    flexShrink: 0, width: 40, height: 40, borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)',
                    fontFamily: 'var(--crimson)', fontSize: 18, color: 'var(--gold)',
                  }}>{l.orden}</span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontFamily: 'var(--crimson)', fontSize: 17, color: '#fff', lineHeight: 1.25 }}>
                      {l.titulo}
                    </span>
                    <span style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 10.5, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>
                      {l.semana ? `Semana ${l.semana}` : null}
                      {l.semana && l.pasajeBase ? ' · ' : ''}
                      {l.pasajeBase || ''}
                    </span>
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 18 }}>›</span>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}