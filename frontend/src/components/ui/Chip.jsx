/**
 * Chip de filtro reutilizable — uniforme, tap-friendly y simétrico.
 * Todos los chips tienen la misma altura (34px, cómodo para el dedo) y
 * forma de píldora, así una fila que envuelve queda pareja en móvil y PC.
 */
export default function Chip({ activo = false, color = 'var(--gold)', onClick, children }) {
  const esHex = typeof color === 'string' && color.startsWith('#');
  const bgActivo = esHex ? `${color}22` : 'var(--gold-glow)';

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontFamily: 'var(--mono)',
        fontSize: 11,
        lineHeight: 1,
        minHeight: 34,
        padding: '0 14px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        borderRadius: 999,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        border: `1px solid ${activo ? color : 'var(--border2)'}`,
        background: activo ? bgActivo : 'transparent',
        color: activo ? color : 'var(--text-muted)',
        transition: 'all .15s',
      }}
    >
      {children}
    </button>
  );
}