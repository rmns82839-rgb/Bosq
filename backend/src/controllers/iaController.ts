import { Request, Response } from 'express';
import axios from 'axios';

/**
 * Un botón, en cada rey/ángel/título/número/profecía/juicio/palabra/aspecto
 * del Espíritu Santo, arma una pregunta ya estructurada con todo el contexto
 * disponible y se la manda a Perplexity (mismo patrón que ya usas en RutaLab
 * Pro, en la Guía de exámenes). Así no hace falta guardar en la base de
 * datos cada detalle histórico, cultural y teológico — se genera al momento.
 */
const PROMPTS: Record<string, (d: any) => string> = {
  angel: (d) =>
    `Explícame en profundidad todo lo relevante sobre "${d.nombre}" en la Biblia` +
    `${d.tipo ? ` (tipo: ${d.tipo})` : ''}. Incluye: pasajes donde aparece, su función ` +
    `y naturaleza, el contexto histórico y cultural de la época, y su significado ` +
    `teológico. Cita de referencia: ${d.cita || 'no especificada'}.`,

  titulo: (d) =>
    `Explícame en profundidad el título mesiánico "${d.titulo}"` +
    `${d.categoria ? ` (categoría: ${d.categoria})` : ''}. Incluye: dónde aparece en ` +
    `la Biblia, su significado en el idioma original, el contexto histórico y ` +
    `cultural, y cómo se relaciona con la identidad de Jesucristo. Cita de ` +
    `referencia: ${d.cita || 'no especificada'}.`,

  numero: (d) =>
    `Explícame en profundidad el significado bíblico del número ${d.numero} ` +
    `(${d.significado}). Incluye otras apariciones relevantes en la Escritura, el ` +
    `contexto histórico-cultural del simbolismo numérico hebreo, y ejemplos ` +
    `concretos con referencias. Cita de referencia: ${d.cita || 'no especificada'}.`,

  rey: (d) =>
    `Explícame en profundidad todo el contexto sobre el rey "${d.nombre}" de ` +
    `${d.reino}${d.inicioAc ? ` (reinó aprox. ${d.inicioAc}-${d.finAc || '?'} a.C.)` : ''}` +
    `${d.evaluacion ? `, evaluación bíblica: ${d.evaluacion}` : ''}. Incluye: eventos ` +
    `clave de su reinado, profetas contemporáneos, sus logros y fracasos, y el ` +
    `contexto histórico-político de la región en esa época. Cita de referencia: ` +
    `${d.cita || 'no especificada'}.`,

  profecia: (d) =>
    `Explícame en profundidad la profecía mesiánica sobre "${d.tema}". Incluye el ` +
    `texto profético (${d.citaProfecia}), su contexto histórico original, y su ` +
    `cumplimiento en Cristo${d.citaCumplimiento ? ` (${d.citaCumplimiento})` : ' (si lo tiene)'}, ` +
    `con el contexto del Nuevo Testamento.`,

  juicio: (d) =>
    `Explícame en profundidad el juicio de Jehová sobre "${d.sobre}" ` +
    `(estado: ${d.estado}). Incluye el contexto histórico, la razón del juicio, ` +
    `cómo se desarrolló o se espera que se desarrolle, y su significado ` +
    `teológico. Cita: ${d.cita}.`,

  palabra: (d) =>
    `Explícame en profundidad esta palabra o enseñanza de Jesús (tipo: ${d.tipo}, ` +
    `cita: ${d.cita}). Incluye el contexto en que la dijo, a quién iba dirigida, y ` +
    `su aplicación teológica.${d.resumen ? ` Resumen: ${d.resumen}.` : ''}`,

  espiritu: (d) =>
    `Explícame en profundidad este aspecto del Espíritu Santo: "${d.titulo}" ` +
    `(categoría: ${d.categoria}). Incluye contexto bíblico, referencias ` +
    `relacionadas, y su relevancia teológica y práctica. Cita: ${d.cita || 'no especificada'}.`,
};

export const preguntarSobre = async (req: Request, res: Response) => {
  try {
    const { tipo, datos } = req.body;
    const construirPrompt = PROMPTS[tipo];

    if (!construirPrompt) {
      return res.status(400).json({ error: `Tipo de contenido no reconocido: ${tipo}` });
    }
    if (!process.env.PERPLEXITY_API_KEY) {
      return res.status(500).json({ error: 'Falta configurar PERPLEXITY_API_KEY en el backend' });
    }

    const prompt = construirPrompt(datos || {});

    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: 'sonar',
        messages: [
          {
            role: 'system',
            content: 'Eres un asistente de estudio bíblico. Responde en español, de forma clara y bien organizada, citando referencias bíblicas concretas cuando sea posible.',
          },
          { role: 'user', content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          'content-type': 'application/json',
        },
        timeout: 30000,
      }
    );

    const texto = response.data?.choices?.[0]?.message?.content || 'No se pudo generar una respuesta.';
    res.json({ respuesta: texto });
  } catch (error: any) {
    console.error('Error consultando IA:', error.response?.data || error.message);
    res.status(500).json({ error: 'No se pudo generar la respuesta de la IA. Intenta de nuevo.' });
  }
};
