import api from './api';

// ============================================================
// Servicio del Curso de Teología Sistemática.
// Cada función mapea 1:1 a un endpoint de backend/src/routes/cursoRoutes.ts.
// Las lecturas devuelven [] o null si fallan, para no romper la UI.
// ============================================================

// --- Catálogo de cursos publicados ---
export async function getCursos() {
  try {
    const { data } = await api.get('/curso/cursos');
    return data;
  } catch (error) {
    console.error('Error cargando cursos:', error);
    return [];
  }
}

// --- Un curso + su índice de lecciones (por slug) ---
export async function getCurso(slug) {
  try {
    const { data } = await api.get(`/curso/cursos/${slug}`);
    return data;
  } catch (error) {
    console.error('Error cargando curso:', error);
    return null;
  }
}

// --- Una lección completa (contenido + examen sin respuestas) ---
export async function getLeccion(id) {
  try {
    const { data } = await api.get(`/curso/lecciones/${id}`);
    return data;
  } catch (error) {
    console.error('Error cargando lección:', error);
    return null;
  }
}

// --- Progreso del usuario en un curso ---
export async function getProgresoCurso(slug) {
  try {
    const { data } = await api.get(`/curso/cursos/${slug}/progreso`);
    return data;
  } catch (error) {
    console.error('Error cargando progreso:', error);
    return { progresos: [], intentos: [], totalLecciones: 0 };
  }
}

// --- Marcar lección como completada ---
export async function completarLeccion(id) {
  const { data } = await api.post(`/curso/lecciones/${id}/completar`);
  return data;
}

// --- Estado del examen (intentos usados, aprobado, mejor puntaje) ---
export async function getEstadoExamen(leccionId) {
  try {
    const { data } = await api.get(`/curso/lecciones/${leccionId}/examen/estado`);
    return data;
  } catch (error) {
    console.error('Error cargando estado del examen:', error);
    return { intentosUsados: 0, intentosRestantes: 3, aprobado: false, mejorPuntaje: 0, intentos: [] };
  }
}

// --- Enviar el examen (respuestas = { preguntaId: opcionId }) ---
export async function enviarExamen(leccionId, respuestas) {
  const { data } = await api.post(`/curso/lecciones/${leccionId}/examen`, { respuestas });
  return data;
}