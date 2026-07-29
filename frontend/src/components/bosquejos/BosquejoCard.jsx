import React from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { decodificarSeccion } from '../../lib/bosquejoSecciones';
import { VersiculoLink } from '../../lib/bibliaLink';

const BosquejoCard = ({ bosquejo, onDelete }) => {
  if (!bosquejo) return null;

  const puntosCount = Array.isArray(bosquejo.puntos) ? bosquejo.puntos.length : 0;

  // La Introducción se guarda como JSON ({ gancho, conexion, notas }) desde
  // que el editor la separó en campos — decodificarla aquí evita mostrar
  // el JSON crudo en la vista previa.
  const intro = decodificarSeccion(bosquejo.introduccion, 'gancho');
  const previa = intro.gancho || intro.conexion || '';

  return (
    <div className="premium-card-bosquejo overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="premium-card-titulo text-lg sm:text-xl font-semibold truncate">
              {bosquejo.titulo || 'Sin título'}
            </h3>
            {bosquejo.cita && (
              <p className="premium-card-cita text-sm mt-1">
                <VersiculoLink cita={bosquejo.cita} />
              </p>
            )}
          </div>
          <div className="flex space-x-1 shrink-0">
            <Link
              to={`/bosquejos/${bosquejo.id}`}
              className="premium-card-icono p-2 transition-colors"
              title="Ver"
            >
              <EyeIcon className="w-5 h-5" />
            </Link>
            <Link
              to={`/bosquejos/${bosquejo.id}/editar`}
              className="premium-card-icono p-2 transition-colors"
              title="Editar"
            >
              <PencilIcon className="w-5 h-5" />
            </Link>
            <button
              onClick={() => onDelete(bosquejo.id)}
              className="premium-card-icono premium-card-icono-borrar p-2 transition-colors"
              title="Eliminar"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {previa && (
          <p className="premium-texto-muted mt-2 text-sm line-clamp-2">
            {previa}
          </p>
        )}

        <div className="premium-card-pie mt-4 pt-3 flex items-center justify-between">
          <span>{puntosCount} {puntosCount === 1 ? 'punto' : 'puntos'}</span>
          <span>
            {new Date(bosquejo.updatedAt).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BosquejoCard;
