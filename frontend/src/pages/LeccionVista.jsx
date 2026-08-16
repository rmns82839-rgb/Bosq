import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/common/Header'
import { VersiculoLink } from '../lib/bibliaLink'
import CursoSeccion from '../components/curso/CursoSeccion'
import CuatroEscuelas from '../components/curso/CuatroEscuelas'
import { getLeccion, getProgresoCurso, completarLeccion } from '../services/cursoService'
import ExamenLeccion from '../components/curso/ExamenLeccion'

export default function LeccionVista() {
  const { id } = useParams()
  const [leccion, setLeccion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [completada, setCompletada] = useState(false)
  const [guardando, setGuardando] = useState(false)

  useEffect(() => {
    let vivo = true
    setLoading(true)
    getLeccion(id).then(async (lec) => {
      if (!vivo) return
      setLeccion(lec)
      setLoading(false)
      if (lec?.curso?.slug) {
        const prog = await getProgresoCurso(lec.curso.slug)
        const yo = prog?.progresos?.find(p => p.leccionId === id)
        if (vivo && yo?.estado === 'completada') setCompletada(true)
      }
    })
    return () => { vivo = false }
  }, [id])

  const marcar = async () => {
    setGuardando(true)
    try { await completarLeccion(id); setCompletada(true) } catch (e) { console.error(e) }
    setGuardando(false)
  }

  const wrap = { minHeight: '100vh', background: 'linear-gradient(to bottom, #0a0a0a, #0f0f1a, #1a1a2e)' }

  if (loading) {
    return <div style={wrap}><Header /><div className="loading" style={{ marginTop: 40 }}><div className="loading-dot"/><div className="loading-dot"/><div className="loading-dot"/></div></div>
  }
  if (!leccion) {
    return <div style={wrap}><Header /><p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginTop: 40 }}>No se encontró la lección.</p></div>
  }

  const { curso, versiculosMemoria = [], interpretaciones = [], simbolos = [], tipologias = [], profecias = [], ciudades = [], preguntas = [] } = leccion

  return (
    <div style={wrap}>
      <Header />
      <main style={{ maxWidth: 780, margin: '0 auto', padding: 'clamp(16px, 4vw, 28px) clamp(14px, 4vw, 28px) 100px' }}>

        <Link to={`/curso/${curso?.slug || ''}`} style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
          ← {curso?.nombre || 'Curso'}
        </Link>

        <div style={{ margin: '14px 0 22px' }}>
          {leccion.semana && (
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--gold)', letterSpacing: '0.08em' }}>SEMANA {leccion.semana}</span>
          )}
          <h1 style={{ fontFamily: 'var(--crimson)', fontSize: 'clamp(26px, 6vw, 38px)', color: '#fff', fontWeight: 300, lineHeight: 1.15, margin: '4px 0 6px' }}>
            {leccion.titulo}
          </h1>
          {leccion.tema && <p style={{ fontSize: 14, color: 'var(--gold)', fontStyle: 'italic', margin: '0 0 4px' }}>{leccion.tema}</p>}
          {leccion.pasajeBase && (
            <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>📖 {leccion.pasajeBase}</p>
          )}
        </div>

        <CursoSeccion titulo="Estudio" icono="📖" defaultAbierto>
          {leccion.introduccion && <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, margin: '0 0 14px' }}>{leccion.introduccion}</p>}
          {leccion.contextoHistorico && (
            <div style={{ marginBottom: 14 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--gold)', letterSpacing: '0.06em', display: 'block', marginBottom: 4 }}>CONTEXTO HISTÓRICO</span>
              <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, margin: 0 }}>{leccion.contextoHistorico}</p>
            </div>
          )}
          {versiculosMemoria.length > 0 && (
            <div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--gold)', letterSpacing: '0.06em', display: 'block', marginBottom: 8 }}>✦ PARA MEMORIZAR</span>
              {versiculosMemoria.map(v => (
                <div key={v.id} style={{ borderLeft: '3px solid var(--gold)', paddingLeft: 12, marginBottom: 10 }}>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', fontStyle: 'italic', lineHeight: 1.6, margin: '0 0 3px' }}>"{v.texto}"</p>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--gold)' }}><VersiculoLink cita={v.cita} /></span>
                </div>
              ))}
            </div>
          )}
        </CursoSeccion>

        {interpretaciones.length > 0 && (
          <CursoSeccion titulo="Interpretación · Las 4 escuelas" icono="🔍">
            <CuatroEscuelas interpretaciones={interpretaciones} tema={leccion.titulo} />
          </CursoSeccion>
        )}

        {(simbolos.length + tipologias.length + profecias.length + ciudades.length) > 0 && (
          <CursoSeccion titulo="Símbolos, tipos y profecías" icono="🕎">
            {simbolos.length > 0 && (
              <Bloque titulo="Símbolos">
                {simbolos.map(s => <SimboloItem key={s.id} simbolo={s} />)}
              </Bloque>
            )}
            {tipologias.length > 0 && (
              <Bloque titulo="Cristo en el texto (tipologías)">
                {tipologias.map(t => <Item key={t.id} nombre={t.elemento} texto={t.cristoEnEl} pie={t.cita} color="#E0B0FF" />)}
              </Bloque>
            )}
            {profecias.length > 0 && (
              <Bloque titulo="Profecías">
                {profecias.map(p => <Item key={p.id} nombre={p.tema} texto={p.estado === 'cumplida' ? '✅ Cumplida' : '⏳ Por cumplir'} pie={[p.citaBase, p.citaCumplimiento].filter(Boolean).join(' → ')} />)}
              </Bloque>
            )}
            {ciudades.length > 0 && (
              <Bloque titulo="Ciudades">
                {ciudades.map(c => <Item key={c.id} nombre={c.nombreBiblico} texto={c.nota} pie={[c.ubicacion, c.equivalenteActual].filter(Boolean).join(' · ')} color="#7EB8D4" />)}
              </Bloque>
            )}
          </CursoSeccion>
        )}

        <CursoSeccion titulo={`Examen${preguntas.length ? ` (${preguntas.length} preguntas)` : ''}`} icono="📝">
          <ExamenLeccion
            leccionId={id}
            preguntas={preguntas}
            onRepasar={() => { document.querySelector('main')?.scrollTo?.({ top: 0, behavior: 'smooth' }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          />
        </CursoSeccion>

        <div style={{ marginTop: 20, textAlign: 'center' }}>
          {completada ? (
            <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: '#34D399', padding: '12px' }}>✓ Lección completada</div>
          ) : (
            <button
              type="button"
              onClick={marcar}
              disabled={guardando}
              style={{
                fontFamily: 'var(--mono)', fontSize: 13, padding: '12px 28px', borderRadius: 999, cursor: 'pointer',
                border: '1px solid var(--gold)', background: 'var(--gold)', color: '#1a1a1a', fontWeight: 600,
                opacity: guardando ? 0.6 : 1,
              }}
            >
              {guardando ? 'Guardando…' : '✓ Marcar lección como completada'}
            </button>
          )}
        </div>
      </main>
    </div>
  )
}

function Bloque({ titulo, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--gold)', letterSpacing: '0.06em', display: 'block', marginBottom: 8 }}>{titulo.toUpperCase()}</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</div>
    </div>
  )
}

function Item({ nombre, texto, pie, color = 'var(--gold)' }) {
  return (
    <div style={{ borderRadius: 10, padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderLeft: `3px solid ${color}` }}>
      <div style={{ fontFamily: 'var(--crimson)', fontSize: 15, color: color, marginBottom: 2 }}>{nombre}</div>
      {texto && <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)', lineHeight: 1.55, margin: '0 0 3px' }}>{texto}</p>}
      {pie && <span style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color: 'rgba(255,255,255,0.4)' }}>{pie}</span>}
    </div>
  )
}

function SimboloItem({ simbolo }) {
  const s = simbolo;
  const preguntarIA = () => {
    const q = `Trasfondo histórico y cultural del símbolo "${s.nombre}" en el mundo bíblico y antiguo ` +
      `(${s.referencias || 'Apocalipsis'}): qué significaba en su época, costumbres, y cómo ilumina su sentido. ` +
      `Con base en fuentes históricas reconocidas.`;
    window.open(`https://www.perplexity.ai/search?q=${encodeURIComponent(q)}`, '_blank', 'noopener');
  };

  return (
    <div style={{ borderRadius: 10, padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderLeft: '3px solid var(--gold)' }}>
      <div style={{ fontFamily: 'var(--crimson)', fontSize: 15, color: 'var(--gold)', marginBottom: 2 }}>{s.nombre}</div>
      {s.significado && <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)', lineHeight: 1.55, margin: '0 0 3px' }}>{s.significado}</p>}
      {s.referencias && <span style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color: 'rgba(255,255,255,0.4)' }}>{s.referencias}</span>}

      {s.trasfondoCultural && (
        <div style={{ marginTop: 10, borderRadius: 8, padding: '10px 12px', background: 'rgba(180,130,60,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: '#D4A94C', letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>🏛️ EN EL MUNDO ANTIGUO</span>
          <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.78)', lineHeight: 1.6, margin: 0 }}>{s.trasfondoCultural}</p>
        </div>
      )}

      <button
        type="button"
        onClick={preguntarIA}
        style={{
          marginTop: 8, fontFamily: 'var(--mono)', fontSize: 10, padding: '5px 12px', borderRadius: 999,
          cursor: 'pointer', border: '1px solid rgba(201,168,76,0.4)', background: 'transparent', color: 'var(--gold)',
        }}
      >
        🔎 Profundizar con IA ↗
      </button>
    </div>
  );
}