import api from './api';

// ============================================================
// Servicio de datos de la Biblioteca de Estudio Biblico.
// Cada funcion mapea 1:1 a un endpoint REAL del backend
// (backend/src/routes/bibliaRoutes.ts).
// Si la peticion falla, devuelve [] para que la UI no se rompa.
// ============================================================

async function getLista(endpoint, etiqueta) {
  try {
    const { data } = await api.get(endpoint);
    return data;
  } catch (error) {
    console.error(`Error cargando ${etiqueta}:`, error);
    return [];
  }
}

// --- Angelologia ---
export const getAngeles = () => getLista('/biblia/angeles', 'angeles');

// --- Cristologia ---
export const getTitulosMesias = () => getLista('/biblia/titulos-mesias', 'titulos del Mesias');

// --- Numerologia ---
export const getNumeros = () => getLista('/biblia/numeros-biblicos', 'numeros biblicos');

// --- Reyes ---
export const getReyes = () => getLista('/biblia/reyes', 'reyes');

// --- Neumatologia (todo el modulo del Espiritu Santo en una llamada) ---
export const getEspirituSanto = () => getLista('/biblia/espiritu-santo', 'Espiritu Santo');

// --- Jesus en cada libro ---
export const getJesusEnLibros = () => getLista('/biblia/jesus-en-libros', 'Jesus en los libros');

// --- Patrones biblicos ---
export const getPatronesBiblicos = () => getLista('/biblia/patrones-biblicos', 'patrones biblicos');

// --- Estudios especiales ---
export const getProfecias = () => getLista('/biblia/profecias', 'profecias');
export const getJuicios = () => getLista('/biblia/juicios', 'juicios');
export const getMilagrosJesus = () => getLista('/biblia/milagros-jesus', 'milagros de Jesus');

// --- Tabernaculo / Templo ---
export const getElementosTabernaculo = () => getLista('/biblia/tabernaculo', 'elementos del tabernaculo');
export const getFigurasIglesia = () => getLista('/biblia/figuras-iglesia', 'figuras de la Iglesia');