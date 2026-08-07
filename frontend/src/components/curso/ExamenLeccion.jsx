import { useEffect, useState } from 'react'
import { getEstadoExamen, enviarExamen } from '../../services/cursoService'

/**
 * Examen de la lección: selección múltiple, envío al backend, 3 intentos,
 * 70% para aprobar. Revisión FORMATIVA (opción B): al fallar, ves EN CUÁLES
 * preguntas fallaste (no la respuesta) con un empujón a repasar el material.
 */
export default function ExamenLeccion({ leccionId, preguntas = [], onRepasar }) {
  const [estado, setEstado] = useState(null)
  const [respuestas, setRespuestas] = useState({})   // { preguntaId: opcionId }
  const [resultado, setResultado] = useState(null)   // respuesta del backend tras enviar
  const [enviando, setEnviando] = useState(false)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    getEstadoExamen(leccionId).then(e => { setEstado(e); setCargando(false) })
  }, [leccionId])

  if (cargando) return <p style={txtTenue}>Cargando examen…</p>
  if (preguntas.length === 0) return <p style={txtTenue}>Esta lección aún no tiene examen.</p>

  const aprobado = estado?.aprobado
  const intentosAgotados = (estado?.intentosRestantes ?? 3) <= 0 && !aprobado
  const bloqueado = aprobado || intentosAgotados

  const todasContestadas = preguntas.every(p => respuestas[p.id])

  const marcar = (preguntaId, opcionId) => {
    if (bloqueado) return
    setRespuestas(prev => ({ ...prev, [preguntaId]: opcionId }))
  }

  const enviar = async () => {
    if (!todasContestadas || enviando) return
    setEnviando(true)
    try {
      const res = await enviarExamen(leccionId, respuestas)
      setResultado(res)
      const e = await getEstadoExamen(leccionId)
      setEstado(e)
    } catch (err) {
      console.error('Error enviando examen:', err)
    }
    setEnviando(false)
  }

  const reintentar = () => { setResultado(null); setRespuestas({}) }

  const falladas = new Set(
    (resultado?.detalle || []).filter(d => !d.acerto).map(d => d.preguntaId)
  )
  const correctaDe = (preguntaId) => {
    const d = (resultado?.detalle || []).find(x => x.preguntaId === preguntaId)
    return d?.correctaId
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
        <span style={pill(aprobado ? '#34D399' : 'var(--gold)')}>
          {aprobado
            ? `✓ Aprobado (intento ${estado?.intentosUsados ?? '?'} de 3)`
            : `${estado?.intentosRestantes ?? 3} de 3 intento(s) restante(s)`}
        </span>
        {estado?.mejorPuntaje > 0 && (
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
            Mejor: {estado.mejorPuntaje}%
          </span>
        )}
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>Aprobación: 70%</span>
      </div>

      {resultado && (
        <div style={{
          borderRadius: 12, padding: '14px 16px', marginBottom: 16,
          background: resultado.aprobado ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.08)',
          border: `1px solid ${resultado.aprobado ? 'rgba(52,211,153,0.4)' : 'rgba(248,113,113,0.35)'}`,
        }}>
          <div style={{ fontFamily: 'var(--crimson)', fontSize: 20, color: resultado.aprobado ? '#34D399' : '#F87171', marginBottom: 4 }}>
            {resultado.aprobado ? '¡Aprobaste! 🎉' : `${resultado.puntaje}% — sigue intentando`}
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', margin: '0 0 6px', lineHeight: 1.5 }}>
            Acertaste {resultado.aciertos} de {resultado.totalPreguntas} ({resultado.puntaje}%).
            {!resultado.aprobado && resultado.intentosRestantes > 0 && ` Te quedan ${resultado.intentosRestantes} intento(s).`}
          </p>
          {!resultado.aprobado && resultado.intentosRestantes > 0 && (
            <p style={{ fontSize: 12.5, color: 'var(--gold)', margin: 0, lineHeight: 1.5 }}>
              📖 Abajo verás <strong>en cuáles preguntas fallaste</strong>. Vuelve al estudio de la lección
              y repásalas — la idea no es adivinar, es aprender.
            </p>
          )}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {preguntas.map((p, i) => {
          const marcada = respuestas[p.id]
          const fallada = resultado && falladas.has(p.id)
          const acertada = resultado && !falladas.has(p.id)
          const correctaId = correctaDe(p.id)
          return (
            <div key={p.id} style={{
              borderRadius: 12, padding: '14px', background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${fallada ? 'rgba(248,113,113,0.4)' : acertada ? 'rgba(52,211,153,0.35)' : 'rgba(255,255,255,0.1)'}`,
            }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--gold)' }}>{i + 1}.</span>
                <span style={{ flex: 1, fontSize: 14, color: '#fff', lineHeight: 1.5 }}>{p.enunciado}</span>
                {resultado && <span style={{ fontSize: 14 }}>{fallada ? '❌' : '✅'}</span>}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {p.opciones.map(op => {
                  const sel = marcada === op.id
                  const esLaCorrecta = correctaId && op.id === correctaId
                  return (
                    <button
                      key={op.id}
                      type="button"
                      onClick={() => marcar(p.id, op.id)}
                      disabled={bloqueado || !!resultado}
                      style={{
                        textAlign: 'left', padding: '10px 12px', borderRadius: 9, cursor: (bloqueado || resultado) ? 'default' : 'pointer',
                        fontSize: 13, lineHeight: 1.4,
                        border: `1px solid ${esLaCorrecta ? '#34D399' : sel ? 'var(--gold)' : 'rgba(255,255,255,0.12)'}`,
                        background: esLaCorrecta ? 'rgba(52,211,153,0.12)' : sel ? 'rgba(201,168,76,0.12)' : 'transparent',
                        color: esLaCorrecta ? '#34D399' : sel ? 'var(--gold)' : 'rgba(255,255,255,0.75)',
                      }}
                    >
                      <span style={{ marginRight: 8, opacity: 0.6 }}>{sel ? '◉' : '○'}</span>
                      {op.texto}
                      {esLaCorrecta && <span style={{ float: 'right', fontSize: 11 }}>✓ correcta</span>}
                    </button>
                  )
                })}
              </div>

              {fallada && !correctaId && (
                <button
                  type="button"
                  onClick={onRepasar}
                  style={{
                    marginTop: 10, fontFamily: 'var(--mono)', fontSize: 10.5, padding: '6px 12px',
                    borderRadius: 999, cursor: 'pointer', border: '1px solid rgba(201,168,76,0.4)',
                    background: 'transparent', color: 'var(--gold)',
                  }}
                >
                  📖 Repasar en el estudio
                </button>
              )}
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: 18, textAlign: 'center' }}>
        {aprobado ? (
          <p style={{ fontFamily: 'var(--mono)', fontSize: 13, color: '#34D399' }}>✓ Ya aprobaste este examen.</p>
        ) : intentosAgotados ? (
          <p style={{ fontFamily: 'var(--mono)', fontSize: 12.5, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
            Usaste tus 3 intentos. Repasa la lección con calma — el curso continúa, esto es para aprender.
          </p>
        ) : resultado ? (
          <button type="button" onClick={reintentar} style={btnPrincipal}>
            Intentar de nuevo ({estado?.intentosRestantes} restante(s))
          </button>
        ) : (
          <button
            type="button"
            onClick={enviar}
            disabled={!todasContestadas || enviando}
            style={{ ...btnPrincipal, opacity: (!todasContestadas || enviando) ? 0.5 : 1 }}
          >
            {enviando ? 'Calificando…' : todasContestadas ? 'Enviar examen' : `Responde las ${preguntas.length} preguntas`}
          </button>
        )}
      </div>
    </div>
  )
}

const txtTenue = { fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: 0 }
const pill = (c) => ({ fontFamily: 'var(--mono)', fontSize: 10.5, padding: '4px 12px', borderRadius: 999, background: `${c}22`, border: `1px solid ${c}66`, color: c })
const btnPrincipal = { fontFamily: 'var(--mono)', fontSize: 13, padding: '11px 26px', borderRadius: 999, cursor: 'pointer', border: '1px solid var(--gold)', background: 'var(--gold)', color: '#1a1a1a', fontWeight: 600 }