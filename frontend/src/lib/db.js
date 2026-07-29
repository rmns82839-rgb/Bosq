import api from '../services/api';

// ─── LIBROS ──────────────────────────────────────────────────
export async function getLibros() {
  try {
    const response = await api.get('/biblia/libros');
    return response.data;
  } catch (error) {
    console.error('Error fetching libros:', error);
    return [];
  }
}

export async function getLibro(id) {
  try {
    const response = await api.get(`/biblia/libros/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching libro:', error);
    return null;
  }
}

export async function getCapitulos(libroId) {
  try {
    const response = await api.get(`/biblia/capitulos/${libroId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching capitulos:', error);
    return [];
  }
}

export async function getVersiculos(capituloId) {
  try {
    const response = await api.get(`/biblia/versiculos/${capituloId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching versiculos:', error);
    return [];
  }
}

export async function buscarVersiculos(termino, libroId = null, limite = 50) {
  try {
    const params = new URLSearchParams({ termino, limite });
    if (libroId) params.append('libroId', libroId);
    const response = await api.get(`/biblia/buscar?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error searching versiculos:', error);
    return [];
  }
}

export async function contarPalabra(palabra) {
  try {
    const response = await api.get(`/biblia/frecuencia/${palabra}`);
    return response.data;
  } catch (error) {
    console.error('Error counting palabra:', error);
    return [];
  }
}

export async function getEstadisticasGlobales() {
  try {
    const response = await api.get('/biblia/estadisticas');
    return response.data;
  } catch (error) {
    console.error('Error fetching estadisticas:', error);
    return null;
  }
}

export async function getEspecialesPorCapitulo(capituloId) {
  try {
    const response = await api.get(`/biblia/especiales/${capituloId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching especiales:', error);
    return [];
  }
}

export async function getContadorEspeciales(capituloId) {
  try {
    const response = await api.get(`/biblia/contador-especiales/${capituloId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching contador especiales:', error);
    return { palabras_jesus: 0, profecias_mesianicas: 0, juicios_cumplidos: 0, juicios_por_cumplir: 0 };
  }
}

// ─── PATRONES ──────────────────────────────────────────────────
export async function getFrecuenciaPalabra(palabra) {
  try {
    const response = await api.get(`/biblia/frecuencia/${palabra}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching frecuencia:', error);
    return [];
  }
}

export async function getTopPalabrasLibro(libroId, limite = 30) {
  try {
    const response = await api.get(`/biblia/top-palabras/libro/${libroId}?limite=${limite}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top palabras libro:', error);
    return [];
  }
}

export async function getTopPalabrasTestamento(testamento, limite = 40) {
  try {
    const response = await api.get(`/biblia/top-palabras/testamento/${testamento}?limite=${limite}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top palabras testamento:', error);
    return [];
  }
}

export async function getPalabraEnLibros(palabra) {
  try {
    const response = await api.get(`/biblia/palabra-libros/${palabra}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching palabra en libros:', error);
    return [];
  }
}

// ─── ANGELOLOGÍA ──────────────────────────────────────────────
export async function getAngeles() {
  try {
    const response = await api.get('/biblia/angeles');
    return response.data;
  } catch (error) {
    console.error('Error fetching angeles:', error);
    return [];
  }
}

// ─── CRISTOLOGÍA ──────────────────────────────────────────────
export async function getTitulos() {
  try {
    const response = await api.get('/biblia/titulos-mesias');
    return response.data;
  } catch (error) {
    console.error('Error fetching titulos mesias:', error);
    return [];
  }
}

// Cristologia.jsx importa esta función con el nombre largo.
// Es la misma: un solo nombre real, dos formas de pedirla.
export { getTitulos as getTitulosMesias };

// ─── NUMEROLOGÍA ──────────────────────────────────────────────
export async function getNumeros() {
  try {
    const response = await api.get('/biblia/numeros-biblicos');
    return response.data;
  } catch (error) {
    console.error('Error fetching numeros biblicos:', error);
    return [];
  }
}

// ─── NEUMATOLOGÍA ─────────────────────────────────────────────
export async function getNombresEspiritu() {
  try {
    const response = await api.get('/biblia/nombres-espiritu');
    return response.data;
  } catch (error) {
    console.error('Error fetching nombres espiritu:', error);
    return [];
  }
}

export async function getObrasEspiritu() {
  try {
    const response = await api.get('/biblia/obras-espiritu');
    return response.data;
  } catch (error) {
    console.error('Error fetching obras espiritu:', error);
    return [];
  }
}

export async function getSimbolosEspiritu() {
  try {
    const response = await api.get('/biblia/simbolos-espiritu');
    return response.data;
  } catch (error) {
    console.error('Error fetching simbolos espiritu:', error);
    return [];
  }
}

export async function getDonesEspiritu() {
  try {
    const response = await api.get('/biblia/dones-espiritu');
    return response.data;
  } catch (error) {
    console.error('Error fetching dones espiritu:', error);
    return [];
  }
}

export async function getFrutoEspiritu() {
  try {
    const response = await api.get('/biblia/fruto-espiritu');
    return response.data;
  } catch (error) {
    console.error('Error fetching fruto espiritu:', error);
    return [];
  }
}

export async function getEspirituPorLibro() {
  try {
    const response = await api.get('/biblia/espiritu-por-libro');
    return response.data;
  } catch (error) {
    console.error('Error fetching espiritu por libro:', error);
    return [];
  }
}

// ─── ESTUDIOS ESPECIALES ──────────────────────────────────────
export async function getProfecias() {
  try {
    const response = await api.get('/biblia/profecias');
    return response.data;
  } catch (error) {
    console.error('Error fetching profecias:', error);
    return [];
  }
}

export async function getJuicios() {
  try {
    const response = await api.get('/biblia/juicios');
    return response.data;
  } catch (error) {
    console.error('Error fetching juicios:', error);
    return [];
  }
}

export async function getPalabrasJesus() {
  try {
    const response = await api.get('/biblia/palabras-jesus');
    return response.data;
  } catch (error) {
    console.error('Error fetching palabras jesus:', error);
    return [];
  }
}

// ─── REYES ──────────────────────────────────────────────────────
export async function getReyes() {
  try {
    const response = await api.get('/biblia/reyes');
    return response.data;
  } catch (error) {
    console.error('Error fetching reyes:', error);
    return [];
  }
}
// Agregar esta funciÃ³n a frontend/src/lib/db.js
// (junto a getReyes, getAngeles, etc. â€” mismo patrÃ³n, mismo `api`)

export async function getJesusEnLibros() {
  try {
    const response = await api.get('/biblia/jesus-en-libros');
    return response.data;
  } catch (error) {
    console.error('Error fetching jesus en libros:', error);
    return [];
  }
}
