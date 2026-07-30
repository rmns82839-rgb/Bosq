import React from 'react'

/**
 * Botón "Preguntar a la IA" — mismo patrón que ya usas en RutaLab Pro
 * (Guía de exámenes): sin API key, sin backend. Arma una pregunta completa
 * y detallada con los datos del ítem, y abre Perplexity en una pestaña
 * nueva con esa pregunta ya escrita en la URL. Perplexity responde solo.
 */
const PREGUNTAS = {
  angel: (d) =>
    `Explícame en profundidad todo lo relevante sobre "${d.nombre}" en la Biblia` +
    `${d.tipo ? ` (tipo: ${d.tipo})` : ''}. Dame: 1) pasajes donde aparece, ` +
    `2) su función y naturaleza, 3) el contexto histórico y cultural de la época, ` +
    `4) su significado teológico. Cita de referencia: ${d.cita || 'no especificada'}.`,

  titulo: (d) =>
    `Explícame en profundidad el título mesiánico "${d.titulo}"` +
    `${d.categoria ? ` (categoría: ${d.categoria})` : ''}. Dame: 1) dónde aparece ` +
    `en la Biblia, 2) su significado en el idioma original, 3) el contexto ` +
    `histórico y cultural, 4) cómo se relaciona con la identidad de Jesucristo. ` +
    `Cita de referencia: ${d.cita || 'no especificada'}.`,

  numero: (d) =>
    `Explícame en profundidad el significado bíblico del número ${d.numero} ` +
    `(${d.significado}). Dame: 1) otras apariciones relevantes en la Escritura, ` +
    `2) el contexto histórico-cultural del simbolismo numérico hebreo, ` +
    `3) ejemplos concretos con referencias. Cita de referencia: ${d.cita || 'no especificada'}.`,

  rey: (d) =>
    `Explícame en profundidad todo el contexto sobre el rey "${d.nombre}" de ` +
    `${d.reino}${d.inicioAc ? ` (reinó aprox. ${d.inicioAc}-${d.finAc || '?'} a.C.)` : ''}` +
    `${d.evaluacion ? `, evaluación bíblica: ${d.evaluacion}` : ''}. Dame: ` +
    `1) eventos clave de su reinado, 2) profetas contemporáneos, 3) sus logros ` +
    `y fracasos, 4) el contexto histórico-político de la región en esa época. ` +
    `Cita de referencia: ${d.cita || 'no especificada'}.`,

  profecia: (d) =>
    `Explícame en profundidad la profecía mesiánica sobre "${d.tema}". Dame: ` +
    `1) el texto profético (${d.citaProfecia}) y su contexto histórico original, ` +
    `2) su cumplimiento en Cristo${d.citaCumplimiento ? ` (${d.citaCumplimiento})` : ' (si lo tiene)'}, ` +
    `3) el contexto del Nuevo Testamento en ese cumplimiento.`,

  juicio: (d) =>
    `Explícame en profundidad el juicio de Jehová sobre "${d.sobre}" ` +
    `(estado: ${d.estado}). Dame: 1) el contexto histórico y la razón del juicio, ` +
    `2) cómo se desarrolló o se espera que se desarrolle, 3) su significado ` +
    `teológico. Cita: ${d.cita}.`,

  palabra: (d) =>
    `Explícame en profundidad esta palabra o enseñanza de Jesús (tipo: ${d.tipo}, ` +
    `cita: ${d.cita}). Dame: 1) el contexto en que la dijo, 2) a quién iba ` +
    `dirigida, 3) su aplicación teológica.${d.resumen ? ` Resumen: ${d.resumen}.` : ''}`,

  espiritu: (d) =>
    `Explícame en profundidad este aspecto del Espíritu Santo: "${d.titulo}" ` +
    `(categoría: ${d.categoria}). Dame: 1) contexto bíblico, 2) referencias ` +
    `relacionadas, 3) su relevancia teológica y práctica. Cita: ${d.cita || 'no especificada'}.`,

  jesus_libro: (d) =>
    `En la tradición devocional de "Cristo en cada libro de la Biblia", el libro de ` +
    `"${d.libro}" se asocia con el título "${d.titulo}" (cita representativa: ` +
    `${d.cita || 'no especificada'}). Explícame en profundidad por qué se hace esta ` +
    `asociación: 1) el argumento o tema central del libro, 2) cómo ese título o imagen ` +
    `de Cristo se conecta con el contenido del libro, 3) otros pasajes del mismo libro ` +
    `que refuercen esa conexión, 4) una aclaración honesta de si es una tipología ` +
    `ampliamente reconocida o una asociación más tradicional/homilética.`,

  patron: (d) =>
    `En el estudio de la Biblia se identifica el patrón "${d.nombre}" ` +
    `(categoría: ${d.categoria}). Explícamelo en profundidad: 1) en qué consiste ` +
    `exactamente el patrón, 2) dónde más aparece en la Escritura, 3) por qué los ` +
    `autores bíblicos lo usaban, 4) qué aporta a la interpretación del texto. ` +
    `Ejemplo de referencia: ${d.cita || 'no especificada'}.`,

  palabra_frecuencia: (d) =>
    `Analiza el uso de la palabra "${d.palabra}" en la Biblia. Dame: ` +
    `1) cuántas veces aparece aproximadamente y en qué libros se concentra, ` +
    `2) el término original en hebreo y/o griego con su significado, ` +
    `3) los pasajes más significativos donde aparece, ` +
    `4) cómo evoluciona su uso entre el Antiguo y el Nuevo Testamento.`,

  espiritu_libro: (d) =>
    `Explícame en profundidad cómo se presenta el Espíritu Santo en el libro de ` +
    `"${d.descripcion}" de la Biblia. Referencia principal: ${d.cita}. Dame: ` +
    `1) el contexto de ese pasaje, 2) todas las demás menciones del Espíritu en ` +
    `ese mismo libro, 3) qué aspecto particular de su persona u obra se destaca ` +
    `allí, 4) cómo encaja con la enseñanza del resto de la Escritura sobre él.`,
}

export default function BotonPreguntarIA({ tipo, datos, etiqueta = '🤖 Preguntar a la IA', color }) {
  const construirPregunta = PREGUNTAS[tipo]

  const abrirConsulta = (e) => {
    e.stopPropagation()
    if (!construirPregunta) return
    const pregunta = construirPregunta(datos || {})
    window.open(`https://www.perplexity.ai/search?q=${encodeURIComponent(pregunta)}`, '_blank')
  }

  return (
    <button
      type="button"
      onClick={abrirConsulta}
      style={{
        fontFamily: 'var(--mono)',
        fontSize: 9,
        padding: '4px 10px',
        borderRadius: 4,
        border: `1px solid ${color || 'var(--gold)'}40`,
        background: 'none',
        color: color || 'var(--gold)',
        cursor: 'pointer',
        letterSpacing: '0.04em',
      }}
    >
      {etiqueta}
    </button>
  )
}
