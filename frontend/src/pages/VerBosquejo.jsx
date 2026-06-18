import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useBosquejoStore } from '../stores/bosquejoStore';
import Header from '../components/common/Header';
import { PencilIcon, TrashIcon, ArrowLeftIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const VerBosquejo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const exportarPDF = () => {
    const b = currentBosquejo;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const margin = 15;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const maxWidth = pageWidth - margin * 2;
    let y = 20;

    const addText = (rawText, size, bold, color) => {
      let text = (rawText || '').toString();
      pdf.setFontSize(size);
      pdf.setFont('helvetica', bold ? 'bold' : 'normal');
      text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\x00-\x7F]/g, '-');
      pdf.setTextColor(color || '#000000');
      const lines = pdf.splitTextToSize(text, maxWidth);
      lines.forEach(line => {
        if (y > 270) { pdf.addPage(); y = 20; }
        pdf.text(line, margin, y);
        y += size * 0.5;
      });
      y += 3;
    };

    // Título
    addText(b.titulo, 20, true, '#6b21a8');
    if (b.cita) addText(b.cita, 13, false, '#7e22ce');
    y += 4;

    if (b.introduccion) {
      addText('Introducción', 13, true);
      addText(b.introduccion, 11, false);
      y += 2;
    }

    if (Array.isArray(b.puntos) && b.puntos.length > 0) {
      addText('Desarrollo', 13, true);
      b.puntos.forEach((p, i) => {
        addText(`${i + 1}. ${p.titulo}`, 12, true);
        if (p.desarrollo) addText(p.desarrollo, 11, false);
        if (p.versos) addText(`📖 ${p.versos}`, 10, false, '#7e22ce');
        y += 2;
      });
    }

    if (b.aplicacion) {
      addText('Aplicación', 13, true);
      addText(b.aplicacion, 11, false);
      y += 2;
    }

    if (b.conclusion) {
      addText('Conclusión', 13, true);
      addText(b.conclusion, 11, false);
    }

    pdf.save(`${b.titulo}.pdf`);
  };
  const { currentBosquejo, isLoading, loadBosquejo, deleteBosquejo } = useBosquejoStore();

  useEffect(() => { loadBosquejo(id); }, [id]);

  const handleDelete = async () => {
    if (window.confirm('¿Eliminar este bosquejo?')) {
      await deleteBosquejo(id);
      navigate('/bosquejos');
    }
  };

  if (isLoading || !currentBosquejo) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  const b = currentBosquejo;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
          <Link to="/bosquejos" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600">
            <ArrowLeftIcon className="w-5 h-5 mr-1" /> Volver
          </Link>
          <div className="flex space-x-2">
            <Link to={`/bosquejos/${id}/editar`} className="inline-flex items-center justify-center flex-1 sm:flex-none px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
              <PencilIcon className="w-4 h-4 mr-1" /> Editar
            </Link>
            <button onClick={handleDelete} className="inline-flex items-center justify-center flex-1 sm:flex-none px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm">
              <TrashIcon className="w-4 h-4 mr-1" /> Eliminar
            </button>
            <button onClick={exportarPDF} className="inline-flex items-center justify-center flex-1 sm:flex-none px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm">
              <DocumentArrowDownIcon className="w-4 h-4 mr-1" /> PDF
            </button>
          </div>
        </div>

        <div id="bosquejo-contenido" className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white">{b.titulo}</h1>
          {b.cita && <p className="text-lg text-primary-600 dark:text-primary-400 font-medium mt-2 italic">{b.cita}</p>}

          {b.introduccion && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Introducción</h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{b.introduccion}</p>
            </div>
          )}

          {Array.isArray(b.puntos) && b.puntos.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Desarrollo</h2>
              {b.puntos.map((punto, i) => (
                <div key={i} className="mb-4 pl-4 border-l-4 border-primary-400">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">{i + 1}. {punto.titulo}</h3>
                  {punto.desarrollo && <p className="mt-1 text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{punto.desarrollo}</p>}
                  {punto.versos && <p className="mt-1 text-sm text-primary-600 dark:text-primary-400 italic">📖 {punto.versos}</p>}
                </div>
              ))}
            </div>
          )}

          {b.aplicacion && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Aplicación</h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{b.aplicacion}</p>
            </div>
          )}

          {b.conclusion && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Conclusión</h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{b.conclusion}</p>
            </div>
          )}

          <p className="mt-8 text-xs text-gray-400 dark:text-gray-500 text-right">
            Actualizado: {new Date(b.updatedAt).toLocaleString('es-ES')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerBosquejo;
