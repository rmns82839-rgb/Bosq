import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBosquejoStore } from '../stores/bosquejoStore';
import NotebookLayout from '../components/notebook/NotebookLayout';
import CustomizationModal from '../components/notebook/CustomizationModal';
import { toast } from 'react-hot-toast';

const NuevoBosquejo = () => {
  const navigate = useNavigate();
  const { createBosquejo, setCurrentBosquejo } = useBosquejoStore();
  const [bosquejoData, setBosquejoData] = useState({
    titulo: '',
    cita: '',
    introduccion: '',
    puntos: [{ titulo: '', descripcion: '', versos: '' }],
    aplicacion: '',
    conclusion: '',
  });

  useEffect(() => {
    setCurrentBosquejo(bosquejoData);
  }, []);

  const handleSave = async () => {
    try {
      const result = await createBosquejo(bosquejoData);
      toast.success('Bosquejo creado exitosamente');
      navigate(`/bosquejos/${result.id}`);
    } catch (error) {
      toast.error('Error al guardar el bosquejo');
    }
  };

  // Renderizar contenido de cada página
  const renderPageContent = ({ pageId, pageComponent, pageIndex, isActive }) => {
    const updateField = (field, value) => {
      setBosquejoData(prev => ({ ...prev, [field]: value }));
    };

    const updatePunto = (idx, field, value) => {
      const newPuntos = [...bosquejoData.puntos];
      if (!newPuntos[idx]) newPuntos[idx] = { titulo: '', descripcion: '', versos: '' };
      newPuntos[idx][field] = value;
      setBosquejoData(prev => ({ ...prev, puntos: newPuntos }));
    };

    const addPunto = () => {
      const actualizado = {
        ...bosquejoData,
        puntos: [...bosquejoData.puntos, { titulo: '', descripcion: '', versos: '' }]
      };
      setBosquejoData(actualizado);
      setTimeout(() => setCurrentBosquejo(actualizado), 0);
    };

    const removePunto = (idx) => {
      if (bosquejoData.puntos.length <= 1) {
        toast.error('Debe haber al menos un punto');
        return;
      }
      const newPuntos = bosquejoData.puntos.filter((_, i) => i !== idx);
      setBosquejoData(prev => ({ ...prev, puntos: newPuntos }));
    };

    // Si no es la página activa, no renderizar contenido (por rendimiento)
    if (!isActive) return null;

    switch (pageComponent) {
      case 'titulo':
        return (
          <>
            <div className="page-title">📌 Título</div>
            <div className="page-content">
              <label>🔖 Título del Bosquejo</label>
              <textarea
                id="titulo"
                placeholder="Ej: La Gracia que Transforma"
                rows="2"
                value={bosquejoData.titulo}
                onChange={(e) => updateField('titulo', e.target.value)}
                style={{ flex: '0 0 auto', minHeight: '50px' }}
              />
              <label>📖 Cita Bíblica Principal</label>
              <input
                type="text"
                placeholder="Ej: Efesios 2:8-9"
                value={bosquejoData.cita}
                onChange={(e) => updateField('cita', e.target.value)}
              />
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '4px' }}>
                Versículo clave que guiará tu bosquejo.
              </p>
              <div style={{ flex: 1 }}></div>
            </div>
          </>
        );
      case 'introduccion':
        return (
          <>
            <div className="page-title">✍️ Introducción</div>
            <div className="page-content">
              <label>Contexto y gancho inicial</label>
              <textarea
                placeholder="Escribe la introducción..."
                value={bosquejoData.introduccion}
                onChange={(e) => updateField('introduccion', e.target.value)}
              />
            </div>
          </>
        );
      case 'punto':
        const idx = pageIndex;
        const punto = bosquejoData.puntos[idx] || { titulo: '', descripcion: '', versos: '' };
        const esUltimoPunto = idx === bosquejoData.puntos.length - 1;
        return (
          <>
            <div className="page-title">📚 Punto {idx+1}</div>
            <div className="page-content punto-page">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label>🔹 Título del punto</label>
                <button className="btn-remove-punto" onClick={() => removePunto(idx)} title="Eliminar este punto">✕</button>
              </div>
              <input
                type="text"
                className="punto-titulo"
                value={punto.titulo}
                onChange={(e) => updatePunto(idx, 'titulo', e.target.value)}
                placeholder="Ej: La Gracia es un regalo"
              />
              <label>📝 Descripción / Explicación</label>
              <textarea
                className="punto-desc"
                value={punto.descripcion}
                onChange={(e) => updatePunto(idx, 'descripcion', e.target.value)}
                placeholder="Desarrolla esta idea..."
              />
              <label>📌 Versículos de apoyo</label>
              <input
                type="text"
                className="punto-versos"
                value={punto.versos}
                onChange={(e) => updatePunto(idx, 'versos', e.target.value)}
                placeholder="Ej: Juan 1:16, Romanos 3:24"
              />
              {esUltimoPunto && (
                <button
                  type="button"
                  onClick={() => addPunto()}
                  style={{
                    marginTop: '16px',
                    padding: '10px 16px',
                    background: '#8e44ad',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 500,
                    alignSelf: 'flex-start',
                  }}
                >
                  + Agregar otro punto
                </button>
              )}
            </div>
          </>
        );
      case 'aplicacion':
        return (
          <>
            <div className="page-title">⚡ Aplicación</div>
            <div className="page-content">
              <label>¿Cómo llevar esto a la práctica?</label>
              <textarea
                placeholder="Pasos concretos, preguntas de reflexión..."
                value={bosquejoData.aplicacion}
                onChange={(e) => updateField('aplicacion', e.target.value)}
              />
            </div>
          </>
        );
      case 'conclusion':
        return (
          <>
            <div className="page-title">🎯 Conclusión</div>
            <div className="page-content">
              <label>Resumen final y llamado</label>
              <textarea
                placeholder="Cierra con fuerza..."
                value={bosquejoData.conclusion}
                onChange={(e) => updateField('conclusion', e.target.value)}
              />
            </div>
          </>
        );
      case 'final':
        return (
          <>
            <div className="page-title">✅ Bosquejo Completado</div>
            <div className="page-content" style={{ overflow: 'hidden', flex: 1 }}>
              <div style={{ flex: 1, overflowY: 'auto', paddingRight: '5px' }}>
                <div id="finalDocument" className="final-document">
                  <h1>{bosquejoData.titulo || 'Bosquejo Bíblico'}</h1>
                  {bosquejoData.cita && <div className="cita">📖 {bosquejoData.cita}</div>}
                  {bosquejoData.introduccion && (
                    <>
                      <div className="seccion seccion-intro">✍️ Introducción</div>
                      <div className="texto-normal">{bosquejoData.introduccion}</div>
                    </>
                  )}
                  {bosquejoData.puntos.length > 0 && (
                    <>
                      <div className="seccion">📚 Desarrollo</div>
                      {bosquejoData.puntos.map((p, i) => (
                        <div className="punto" key={i}>
                          <div className="punto-tit">{i+1}. {p.titulo || '(Sin título)'}</div>
                          {p.descripcion && <div className="punto-desc">{p.descripcion}</div>}
                          {p.versos && <div className="punto-versos">📌 {p.versos}</div>}
                        </div>
                      ))}
                    </>
                  )}
                  {bosquejoData.aplicacion && (
                    <>
                      <div className="seccion seccion-aplicacion">⚡ Aplicación</div>
                      <div className="texto-normal">{bosquejoData.aplicacion}</div>
                    </>
                  )}
                  {bosquejoData.conclusion && (
                    <>
                      <div className="seccion seccion-conclusion">🎯 Conclusión</div>
                      <div className="texto-normal">{bosquejoData.conclusion}</div>
                    </>
                  )}
                </div>
              </div>
              <div className="actions">
                <button className="pdf" onClick={() => window.print()}>📄 Exportar PDF</button>
                <button onClick={() => {
                  const blob = new Blob([document.getElementById('finalDocument').textContent.trim()], { type: 'text/plain;charset=utf-8' });
                  const link = document.createElement('a');
                  link.href = URL.createObjectURL(blob);
                  link.download = `bosquejo_${bosquejoData.titulo || 'sin_titulo'}.txt`;
                  link.click();
                }}>📄 .txt</button>
                <button onClick={() => {
                  const blob = new Blob([JSON.stringify(bosquejoData, null, 2)], { type: 'application/json;charset=utf-8' });
                  const link = document.createElement('a');
                  link.href = URL.createObjectURL(blob);
                  link.download = `bosquejo_${bosquejoData.titulo || 'sin_titulo'}.json`;
                  link.click();
                }}>📦 .json</button>
                <button className="danger" onClick={() => {
                  if (confirm('¿Borrar todo el bosquejo?')) {
                    setBosquejoData({
                      titulo: '',
                      cita: '',
                      introduccion: '',
                      puntos: [{ titulo: '', descripcion: '', versos: '' }],
                      aplicacion: '',
                      conclusion: '',
                    });
                    toast.success('Bosquejo limpiado');
                  }
                }}>🗑️ Limpiar</button>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <NotebookLayout 
        renderPage={renderPageContent}
        onSave={handleSave}
      />
      <CustomizationModal />
    </div>
  );
};

export default NuevoBosquejo;