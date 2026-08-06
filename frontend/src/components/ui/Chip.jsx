/**
 * Chip de filtro reutilizable — uniforme y tap-friendly. En un grid se
 * estira para llenar su celda (columnas parejas); en una fila flex queda
 * del ancho de su contenido. El texto largo envuelve y las alturas se
 * emparejan por fila.
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
        lineHeight: 1.25,
        minHeight: 34,
        padding: '5px 12px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        borderRadius: 999,
        cursor: 'pointer',
        whiteSpace: 'normal',
        textAlign: 'center',
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