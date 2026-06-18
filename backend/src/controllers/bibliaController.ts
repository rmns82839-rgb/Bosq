import { Request, Response } from 'express';
import axios from 'axios';

// Mapa de nombres en español a abreviaturas para getbible.net
const librosMap: Record<string, string> = {
  'genesis': 'gen', 'génesis': 'gen', 'exodo': 'exo', 'éxodo': 'exo',
  'levitico': 'lev', 'levítico': 'lev', 'numeros': 'num', 'números': 'num',
  'deuteronomio': 'deu', 'josue': 'jos', 'josué': 'jos', 'jueces': 'jdg',
  'rut': 'rut', '1 samuel': '1sa', '2 samuel': '2sa', '1 reyes': '1ki',
  '2 reyes': '2ki', '1 cronicas': '1ch', '1 crónicas': '1ch',
  '2 cronicas': '2ch', '2 crónicas': '2ch', 'esdras': 'ezr',
  'nehemias': 'neh', 'nehemías': 'neh', 'ester': 'est', 'éster': 'est',
  'job': 'job', 'salmos': 'psa', 'salmo': 'psa', 'proverbios': 'pro',
  'eclesiastes': 'ecc', 'ecclesiastés': 'ecc', 'cantares': 'sng',
  'isaias': 'isa', 'isaías': 'isa', 'jeremias': 'jer', 'jeremías': 'jer',
  'lamentaciones': 'lam', 'ezequiel': 'ezk', 'daniel': 'dan',
  'oseas': 'hos', 'joel': 'jol', 'amos': 'amo', 'amós': 'amo',
  'abdias': 'oba', 'abdías': 'oba', 'jonas': 'jon', 'jonás': 'jon',
  'miqueas': 'mic', 'nahum': 'nam', 'nahúm': 'nam', 'habacuc': 'hab',
  'sofonias': 'zep', 'sofonías': 'zep', 'hageo': 'hag',
  'zacarias': 'zec', 'zacarías': 'zec', 'malaquias': 'mal', 'malaquías': 'mal',
  'mateo': 'mat', 'marcos': 'mrk', 'lucas': 'luk', 'juan': 'jhn',
  'hechos': 'act', 'romanos': 'rom', '1 corintios': '1co', '2 corintios': '2co',
  'galatas': 'gal', 'gálatas': 'gal', 'efesios': 'eph', 'filipenses': 'php',
  'colosenses': 'col', '1 tesalonicenses': '1th', '2 tesalonicenses': '2th',
  '1 timoteo': '1ti', '2 timoteo': '2ti', 'tito': 'tit', 'filemon': 'phm',
  'filemón': 'phm', 'hebreos': 'heb', 'santiago': 'jas', '1 pedro': '1pe',
  '2 pedro': '2pe', '1 juan': '1jn', '2 juan': '2jn', '3 juan': '3jn',
  'judas': 'jud', 'apocalipsis': 'rev'
};

function parsearReferencia(referencia: string) {
  // Ej: "Juan 3:16" → libro="juan", cap=3, ver=16
  const match = referencia.match(/^(.+?)\s+(\d+)(?::(\d+))?(?:-(\d+))?$/i);
  if (!match) return null;
  const libroNombre = match[1].toLowerCase().trim();
  const capitulo = parseInt(match[2]);
  const versiculoInicio = match[3] ? parseInt(match[3]) : null;
  const versiculoFin = match[4] ? parseInt(match[4]) : null;
  const libroAbrev = librosMap[libroNombre];
  if (!libroAbrev) return null;
  return { libroAbrev, libroNombre: match[1], capitulo, versiculoInicio, versiculoFin };
}

export const buscarVersiculo = async (req: Request, res: Response) => {
  try {
    const referencia = decodeURIComponent((req.params as any)[0]);
    console.log('Referencia recibida:', referencia);
    const parsed = parsearReferencia(referencia);
    console.log('Parsed:', parsed);

    if (!parsed) {
      return res.status(400).json({ error: 'Formato inválido. Usa: "Juan 3:16" o "Salmos 23"' });
    }

    const { libroAbrev, libroNombre, capitulo, versiculoInicio, versiculoFin } = parsed;
    const url = `https://bible-api.com/${libroAbrev}%20${capitulo}${versiculoInicio ? ':' + versiculoInicio : ''}${versiculoFin ? '-' + versiculoFin : ''}`;
    const response = await axios.get(url, { timeout: 10000 });
    const data = response.data;

    let texto = '';
    let refTexto = '';

    if (versiculoInicio) {
      const fin = versiculoFin || versiculoInicio;
      const versos = [];
      for (let v = versiculoInicio; v <= fin; v++) {
        const versiculo = data.verses?.find((vv: any) => vv.verse === v);
        if (versiculo) versos.push(`${v} ${versiculo.text.trim()}`);
      }
      texto = versos.join(' ');
      refTexto = versiculoFin
        ? `${libroNombre} ${capitulo}:${versiculoInicio}-${versiculoFin}`
        : `${libroNombre} ${capitulo}:${versiculoInicio}`;
    } else {
      // Capítulo completo
      texto = data.verses?.map((v: any) => `${v.verse} ${v.text.trim()}`).join(' ') || '';
      refTexto = `${libroNombre} ${capitulo}`;
    }

    res.json({ text: texto, reference: refTexto });
  } catch (error: any) {
    console.error('Bible API error:', error.message);
    res.status(404).json({ error: 'Versículo no encontrado. Verifica el formato: "Juan 3:16"' });
  }
};

export const versiculoAleatorio = async (req: Request, res: Response) => {
  try {
    const versiculos = [
      { libro: 'jhn', cap: 3, ver: 16, ref: 'Juan 3:16' },
      { libro: 'psa', cap: 23, ver: 1, ref: 'Salmos 23:1' },
      { libro: 'php', cap: 4, ver: 13, ref: 'Filipenses 4:13' },
      { libro: 'rom', cap: 8, ver: 28, ref: 'Romanos 8:28' },
      { libro: 'jer', cap: 29, ver: 11, ref: 'Jeremías 29:11' },
      { libro: 'pro', cap: 3, ver: 5, ref: 'Proverbios 3:5' },
      { libro: 'mat', cap: 6, ver: 33, ref: 'Mateo 6:33' },
      { libro: 'isa', cap: 40, ver: 31, ref: 'Isaías 40:31' },
    ];
    const random = versiculos[Math.floor(Math.random() * versiculos.length)];
    const url = `https://bible-api.com/${random.libro}%20${random.cap}:${random.ver}`;
    const response = await axios.get(url, { timeout: 10000 });
    res.json({ text: response.data.text?.trim() || '', reference: random.ref });
  } catch (error: any) {
    res.status(500).json({ error: 'Error al obtener versículo aleatorio' });
  }
};