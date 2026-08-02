import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useBosquejoStore } from '../stores/bosquejoStore';
import BosquejoEditor from '../components/bosquejos/BosquejoEditor';
import { decodificarSeccion, codificarSeccion } from '../lib/bosquejoSecciones';

const EditarBosquejo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loadBosquejo, updateBosquejo } = useBosquejoStore();

  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [fallo, setFallo] = useState(null);

  useEffect(() => {
    if (!id || id === 'undefined' || id === 'null') {
      setFallo('Ese bosquejo no existe.');
      setCargando(false);
      return;
    }
    let vigente = true;
    loadBosquejo(id)
      .then((b) => {
        if (!vigente) return;
        if (!b) {
          setFallo('Ese bosquejo no existe.');
        } else {
          setDatos({
            titulo: b.titulo || '',
            cita: b.cita || '',
            tema: b.tema || '',
            proposito: b.proposito || '',
            introduccion: decodificarSeccion(b.introduccion, 'gancho'),
            puntos: b.puntos || [],
            aplicacion: decodificarSeccion(b.aplicacion, 'texto'),
            conclusion: decodificarSeccion(b.conclusion, 'resumen'),
          });
        }
        setCargando(false);
      })
      .catch(() => {
        if (!vigente) return;
        setFallo('No se pudo cargar el bosquejo.');
        setCargando(false);
      });
    return () => { vigente = false; };
  }, [id]);

  const handleGuardar = async () => {
    if (!datos.titulo.trim()) {
      toast.error('Ponle un título al bosquejo');
      return;
    }
    setGuardando(true);
    try {
      const payload = {
        ...datos,
        introduccion: codificarSeccion(datos.introduccion),
        aplicacion: codificarSeccion(datos.aplicacion),
        conclusion: codificarSeccion(datos.conclusion),
      };
      await updateBosquejo(id, payload);
      try { localStorage.removeItem(`bosqu_borrador_${id}`); } catch {}
      toast.success('Cambios guardados');
      navigate(`/bosquejos/${id}`);
    } catch {
      toast.error('No se pudo guardar. Revisa tu conexión e inténtalo de nuevo.');
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return (
      <div className="be-hoja be-premium" style={{ paddingTop: 80, textAlign: 'center' }}>
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500" />
      </div>
    );
  }

  if (fallo) {
    return (
      <div className="be-hoja be-premium" style={{ paddingTop: 60, textAlign: 'center' }}>
        <p style={{ marginBottom: 16 }}>{fallo}</p>
        <Link to="/bosquejos" className="be-btn be-btn-principal">
          Ver mis bosquejos
        </Link>
      </div>
    );
  }

  return (
    <BosquejoEditor
      titulo="Editar bosquejo"
      datos={datos}
      onChange={setDatos}
      onGuardar={handleGuardar}
      onCancelar={() => navigate(`/bosquejos/${id}`)}
      guardando={guardando}
      draftKey={id}
    />
  );
};

export default EditarBosquejo;
