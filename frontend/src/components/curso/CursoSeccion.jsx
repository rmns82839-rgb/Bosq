import { useState } from 'react'

/** Sección colapsable (acordeón) para la vista de lección. */
export default function CursoSeccion({ titulo, icono, defaultAbierto = false, children }) {
  const [abierto, setAbierto] = useState(defaultAbierto)
  return (
    <div style={{ borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', marginBottom: 12 }}>
      <button
        type="button"
        onClick={() => setAbierto(v => !v)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px',
          background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 18 }}>{icono}</span>
        <span style={{ flex: 1, fontFamily: 'var(--crimson)', fontSize: 17, color: '#fff' }}>{titulo}</span>
        <span style={{ transition: 'transform .25s', transform: abierto ? 'rotate(180deg)' : 'none', color: 'var(--gold)' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4L6 7.5L9.5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </button>
      <div style={{ display: 'grid', gridTemplateRows: abierto ? '1fr' : '0fr', transition: 'grid-template-rows .28s ease' }}>
        <div style={{ overflow: 'hidden', minHeight: 0 }}>
          <div style={{ padding: '0 16px 16px' }}>{children}</div>
        </div>
      </div>
    </div>
  )
}