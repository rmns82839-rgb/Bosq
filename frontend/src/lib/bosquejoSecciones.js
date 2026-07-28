/**
 * Introducción, Aplicación y Conclusión ahora tienen varios campos
 * (Gancho/Conexión, Texto, Resumen/Llamado) más una nota — pero en la
 * base de datos siguen siendo una sola columna de texto, para no
 * requerir una migración. Aquí van y vienen como JSON dentro de esa
 * misma columna.
 *
 * Compatible con bosquejos viejos: si el valor guardado es texto
 * plano (no JSON), se envuelve en el primer campo de la sección.
 */
export function decodificarSeccion(valor, campoLegado) {
  if (!valor) return {};
  if (typeof valor === 'object') return valor;
  try {
    const parsed = JSON.parse(valor);
    if (parsed && typeof parsed === 'object') return parsed;
  } catch {
    /* no era JSON — es un bosquejo viejo con texto plano */
  }
  return { [campoLegado]: valor };
}

export function codificarSeccion(obj) {
  return JSON.stringify(obj || {});
}
