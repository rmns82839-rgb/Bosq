import { useState } from 'react'

const ESCUELAS = {
  preterista:   { label: 'Preterista', color: '#60A5FA', desc: 'Ya se cumplió en el pasado (siglo I).' },
  historicista: { label: 'Historicista', color: '#A78BFA', desc: 'Se cumple a lo largo de la historia de la Iglesia.' },
  futurista:    { label: 'Futurista', color: '#C9A84C', desc: 'Se cumplirá en el futuro (fin de los tiempos).' },
  idealista:    { label: 'Idealista', color: '#34D399', desc: 'Simboliza verdades atemporales, no eventos.' },
}

/** Las 4 escuelas de interpretación. La postura propia va destacada.
 *  Botón para profundizar con IA (Perplexity). */
export default function CuatroEscuelas({ interpretaciones, tema }) {
  const [activa, setActiva] = useState(() => {
    const propia = interpretaciones.find(i => i.esPosturaPropia)
    return propia?.escuela || interpretaciones[0]?.escuela || null
  })
  if (!interpretaciones || interpretaciones.length === 0) return null

  const sel = interpretaciones.find(i => i.escuela === activa)
  const info = ESCUELAS[activa] || { label: activa, color: 'var(--gold)', desc: '' }

  const preguntarIA = () => {
    const q = `Explica la interpretación ${info.label} de ${tema || 'este pasaje de Apocalipsis'}, ` +
      `comparándola con las otras escuelas (preterista, historicista, futurista, idealista), ` +
      `con base bíblica y desde una perspectiva evangélica.`
    window.open(`https://www.perplexity.ai/search?q=${encodeURIComponent(q)}`, '_blank', 'noopener')
  }

  return (
    <div>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: '0 0 12px', lineHeight: 1.5 }}>
        Cada escuela lee la profecía distinto. La ✦ es la postura de esta enseñanza; las demás se presentan con respeto.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 130px), 1fr))', gap: 6, marginBottom: 14 }}>
        {interpretaciones.map((it) => {
          const ie = ESCUELAS[it.escuela] || { label: it.escuela, color: 'var(--gold)' }
          const on = it.escuela === activa
          return (
            <button
              key={it.id || it.escuela}
              type="button"
              onClick={() => setActiva(it.escuela)}
              style={{
                fontFamily: 'var(--mono)', fontSize: 11, padding: '8px 10px', borderRadius: 10, cursor: 'pointer',
                minHeight: 38, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                border: `1px solid ${on ? ie.color : 'rgba(255,255,255,0.12)'}`,
                background: on ? `${ie.color}22` : 'transparent',
                color: on ? ie.color : 'rgba(255,255,255,0.55)',
              }}
            >
              {it.esPosturaPropia ? '✦ ' : ''}{ie.label}
            </button>
          )
        })}
      </div>

      {sel && (
        <div style={{
          borderRadius: 12, padding: '14px 16px',
          background: `${info.color}0d`, borderLeft: `3px solid ${info.color}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--crimson)', fontSize: 17, color: info.color }}>{info.label}</span>
            {sel.esPosturaPropia && (
              <span style={{ fontFamily: 'var(--mono)', fontSize: 8, padding: '2px 8px', borderRadius: 999, background: info.color, color: '#1a1a1a', fontWeight: 700 }}>
                NUESTRA POSTURA
              </span>
            )}
          </div>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color: 'rgba(255,255,255,0.4)', margin: '0 0 8px', letterSpacing: '0.03em' }}>{info.desc}</p>
          <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.65, margin: '0 0 12px' }}>{sel.contenido}</p>
          <button
            type="button"
            onClick={preguntarIA}
            style={{
              fontFamily: 'var(--mono)', fontSize: 10.5, padding: '7px 14px', borderRadius: 999, cursor: 'pointer',
              border: `1px solid ${info.color}55`, background: 'transparent', color: info.color,
            }}
          >
            🔎 Profundizar con IA ↗
          </button>
        </div>
      )}
    </div>
  )
}