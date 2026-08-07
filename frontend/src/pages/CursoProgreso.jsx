import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/common/Header'
import { getCurso, getProgresoCurso } from '../services/cursoService'

export default function CursoProgreso() {
  const { slug } = useParams()
  const [curso, setCurso] = useState(null)
  const [prog, setProg] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let vivo = true
    Promise.all([getCurso(slug), getProgresoCurso(slug)]).then(([c, p]) => {
      if (!vivo) return
      setCurso(c); setProg(p); setLoading(false)
    })
    return () => { vivo = false }
  }, [slug])

  const wrap = { minHeight: '100vh', background: 'linear-gradient(to bottom, #0a0a0a, #0f0f1a, #1a1a2e)' }

  if (loading) {
    return <div style={wrap}><Header /><div className="loading" style={{ marginTop: 40 }}><div className="loading-dot"/><div className="loading-dot"/><div className="loading-dot"/></div></div>
  }

  const lecciones = curso?.lecciones || []
  const total = lecciones.length || (prog?.totalLecciones ?? 0)
  const progresos = prog?.progresos || []
  const intentos = prog?.intentos || []

  const completadas = progresos.filter(p => p.estado === 'completada')
  const completadasSet = new Set(completadas.map(p => p.leccionId))
  const aprobadasSet = new Set(intentos.filter(i => i.aprobado).map(i => i.leccionId))

  const pct = total > 0 ? Math.round((completadasSet.size / total) * 100) : 0
  const examenesAprobados = aprobadasSet.size
  const mejorPorLeccion = {}
  intentos.forEach(i => { mejorPorLeccion[i.leccionId] = Math.max(mejorPorLeccion[i.leccionId] || 0, i.puntaje) })
  const notas = Object.values(mejorPorLeccion)
  const promedio = notas.length ? Math.round(notas.reduce((a, b) => a + b, 0) / notas.length) : null

  return (
    <div style={wrap}>
      <Header />
      <main style={{ maxWidth: 820, margin: '0 auto', padding: 'clamp(16px, 4vw, 28px) clamp(14px, 4vw, 28px) 100px' }}>
        <Link to={`/curso/${slug}`} style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
          ← {curso?.nombre || 'Curso'}
        </Link>

        <h1 style={{ fontFamily: 'var(--crimson)', fontSize: 'clamp(26px, 6vw, 38px)', color: '#fff', fontWeight: 300, margin: '14px 0 18px' }}>
          Tu progreso
        </h1>

        <div style={{ borderRadius: 16, padding: '20px', marginBottom: 16, background: 'linear-gradient(135deg, rgba(26,26,46,0.6), rgba(22,33,62,0.4))', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em' }}>AVANCE DEL CURSO</span>
            <span style={{ fontFamily: 'var(--crimson)', fontSize: 28, color: 'var(--gold)' }}>{pct}%</span>
          </div>
          <div style={{ height: 10, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, borderRadius: 999, background: 'linear-gradient(90deg, #C9A84C, #F6E27A)', transition: 'width .5s ease' }} />
          </div>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.45)', margin: '8px 0 0' }}>
            {completadasSet.size} de {total} lecciones completadas
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: 12, marginBottom: 24 }}>
          <Metrica valor={completadasSet.size} etiqueta="Lecciones completadas" color="#34D399" />
          <Metrica valor={examenesAprobados} etiqueta="Exámenes aprobados" color="#C9A84C" />
          <Metrica valor={promedio !== null ? `${promedio}%` : '—'} etiqueta="Promedio de notas" color="#60A5FA" />
        </div>

        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', display: 'block', marginBottom: 10 }}>DETALLE POR LECCIÓN</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {lecciones.map(l => {
            const hecha = completadasSet.has(l.id)
            const aprob = aprobadasSet.has(l.id)
            const nota = mejorPorLeccion[l.id]
            return (
              <Link key={l.id} to={`/curso/leccion/${l.id}`} style={{
                display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none',
                padding: '12px 14px', borderRadius: 12,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <span style={{ fontSize: 18 }}>{hecha ? '✅' : '⚪'}</span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontFamily: 'var(--crimson)', fontSize: 15, color: '#fff' }}>
                    {l.orden}. {l.titulo}
                  </span>
                  <span style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                    {hecha ? 'Completada' : 'Pendiente'}
                    {nota !== undefined ? ` · examen: ${nota}%${aprob ? ' ✓' : ''}` : ' · sin examen'}
                  </span>
                </span>
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 16 }}>›</span>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}

function Metrica({ valor, etiqueta, color }) {
  return (
    <div style={{ borderRadius: 14, padding: '16px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${color}30`, textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--crimson)', fontSize: 30, color, lineHeight: 1 }}>{valor}</div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color: 'rgba(255,255,255,0.5)', marginTop: 6, letterSpacing: '0.03em' }}>{etiqueta}</div>
    </div>
  )
}