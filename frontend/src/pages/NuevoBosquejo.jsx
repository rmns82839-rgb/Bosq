import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useBosquejoStore } from '../stores/bosquejoStore';
import BosquejoEditor from '../components/bosquejos/BosquejoEditor';
import { codificarSeccion } from '../lib/bosquejoSecciones';

const NuevoBosquejo = () => {
  const navigate = useNavigate();
  const { createBosquejo } = useBosquejoStore();
  const [guardando, setGuardando] = useState(false);

  const [datos, setDatos] = useState({
    titulo: '',
    cita: '',
    tema: '',
    proposito: '',
    introduccion: { gancho: '', conexion: '', notas: '' },
    puntos: [],
    aplicacion: { texto: '', notas: '' },
    conclusion: { resumen: '', llamado: '', notas: '' },
  });

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
      const resultado = await createBosquejo(payload);
      toast.success('Bosquejo guardado');
      navigate(`/bosquejos/${resultado.id}`);
    } catch {
      toast.error('No se pudo guardar. Revisa tu conexión e inténtalo de nuevo.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <BosquejoEditor
      titulo="Nuevo bosquejo"
      datos={datos}
      onChange={setDatos}
      onGuardar={handleGuardar}
      onCancelar={() => navigate('/bosquejos')}
      guardando={guardando}
    />
  );
};

export default NuevoBosquejo;
