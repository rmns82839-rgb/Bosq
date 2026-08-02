import { useState } from 'react'

/**
 * Contenedor desplegable para los chips de filtro — "Filtros ▾".
 * Viene cerrado por defecto en el celular para ganar espacio; abierto en PC.
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
          fontFamily: 'var(--mono)', fontSize: 11, minHeight: 34, padding: '0 14px',
          borderRadius: 999, cursor: 'pointer',
          border: '1px solid var(--border2)', background: 'var(--surface2)',
          color: 'var(--text-muted)',
        }}
      >
        <span>☰ {label}{activos ? `: ${activos}` : ''}</span>
        <span style={{ transition: 'transform .2s', transform: abierto ? 'rotate(180deg)' : 'none' }}>▾</span>
      </button>

      {abierto && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginTop: 12 }}>
          {children}
        </div>
      )}
    </div>
  )
}