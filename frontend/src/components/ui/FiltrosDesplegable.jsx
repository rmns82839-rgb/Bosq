import { useState } from 'react'

/**
 * Contenedor desplegable para los chips de filtro — look premium.
 * Los chips van en GRID de columnas iguales (simétricos en todas las pages);
 * el texto largo envuelve y llenan su celda. Cerrado por defecto en celular.
 */
export default function FiltrosDesplegable({ label = 'Filtros', activos, children }) {
  const [abierto, setAbierto] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= 768
  )

  return (
    <div style={{ marginBottom: 20 }}>
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.02em',
          minHeight: 36, padding: '0 8px 0 14px',
          borderRadius: 999, cursor: 'pointer',
          border: `1px solid ${abierto ? 'var(--gold)' : 'var(--border2)'}`,
          background: abierto ? 'var(--gold-glow)' : 'var(--surface2)',
          color: abierto ? 'var(--gold)' : 'var(--text-muted)',
          transition: 'all .18s ease',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
          <span style={{ fontSize: 12, opacity: 0.85 }}>⁝⁝</span>
          {label}
          {activos && (
            <span style={{
              fontSize: 9.5, padding: '2px 8px', borderRadius: 999,
              background: 'var(--gold)', color: '#1a1a1a', fontWeight: 600,
              maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{activos}</span>
          )}
        </span>
        <span style={{
          display: 'inline-flex', width: 18, height: 18, alignItems: 'center', justifyContent: 'center',
          transition: 'transform .25s ease', transform: abierto ? 'rotate(180deg)' : 'none',
        }}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2.5 4L6 7.5L9.5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <div style={{
        display: 'grid',
        gridTemplateRows: abierto ? '1fr' : '0fr',
        transition: 'grid-template-rows .28s ease',
      }}>
        <div style={{ overflow: 'hidden', minHeight: 0 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 148px), 1fr))',
            gap: 8,
            alignItems: 'stretch',
            paddingTop: 12,
          }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}