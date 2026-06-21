import React, { useState, useEffect, useCallback } from 'react';
import Spiral from './Spiral';
import Page from './Page';
import { useBosquejoStore } from '../../stores/bosquejoStore';

const NotebookLayout = ({ renderPage, onSave, onPuntoAgregado }) => {
  const { currentBosquejo } = useBosquejoStore();
  const [pages, setPages] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [exitDirection, setExitDirection] = useState(null);

  const cantidadPuntosAnterior = React.useRef(0);

  useEffect(() => {
    if (!currentBosquejo) return;
    const newPages = [];
    newPages.push({ id: 'titulo', label: 'Título', component: 'titulo' });
    newPages.push({ id: 'introduccion', label: 'Introducción', component: 'introduccion' });
    const cantidadPuntos = (currentBosquejo.puntos && currentBosquejo.puntos.length) || 0;
    if (currentBosquejo.puntos && currentBosquejo.puntos.length > 0) {
      currentBosquejo.puntos.forEach((_, idx) => {
        newPages.push({ id: `punto_${idx}`, label: `Punto ${idx+1}`, component: 'punto', index: idx });
      });
    }
    newPages.push({ id: 'aplicacion', label: 'Aplicación', component: 'aplicacion' });
    newPages.push({ id: 'conclusion', label: 'Conclusión', component: 'conclusion' });
    newPages.push({ id: 'final', label: 'Bosquejo Completado', component: 'final' });

    const seAgregoUnPunto = cantidadPuntos > cantidadPuntosAnterior.current;
    setPages(newPages);

    if (seAgregoUnPunto && cantidadPuntosAnterior.current > 0) {
      const indiceNuevoPunto = newPages.findIndex(p => p.id === `punto_${cantidadPuntos - 1}`);
      setCurrentPageIndex(indiceNuevoPunto);
    } else if (cantidadPuntosAnterior.current === 0) {
      setCurrentPageIndex(0);
    }

    cantidadPuntosAnterior.current = cantidadPuntos;
  }, [currentBosquejo]);

  const goToPage = useCallback((index, direction) => {
    if (isTransitioning) return;
    if (index < 0 || index >= pages.length) return;
    setIsTransitioning(true);
    setExitDirection(direction);
    setTimeout(() => {
      setCurrentPageIndex(index);
      setExitDirection(null);
      setIsTransitioning(false);
    }, 700);
  }, [isTransitioning, pages.length]);

  const goPrev = () => {
    if (currentPageIndex > 0) goToPage(currentPageIndex - 1, 'right');
  };

  const goNext = () => {
    if (currentPageIndex < pages.length - 1) goToPage(currentPageIndex + 1, 'left');
  };

  if (!currentBosquejo || pages.length === 0) {
    return <div className="text-center py-12">Cargando bosquejo...</div>;
  }

  return (
    <div className="notebook-wrapper">
      <Spiral />
      <div className="notebook">
        <div className="pages-container">
          {pages.map((page, idx) => {
            const isActive = idx === currentPageIndex;
            const isExiting = idx === currentPageIndex && isTransitioning;
            return (
              <Page
                key={page.id}
                isActive={isActive}
                isExiting={isExiting}
                exitDirection={exitDirection}
                className={page.component === 'final' ? 'page-final' : ''}
              >
                {renderPage({
                  pageId: page.id,
                  pageComponent: page.component,
                  pageIndex: page.index,
                  isActive,
                })}
              </Page>
            );
          })}
        </div>
        <div className="nav-buttons">
          <button className="btn-nav" onClick={goPrev} disabled={currentPageIndex === 0}>
            ⬅ Anterior
          </button>
          <button className="btn-config" id="configBtn" onClick={() => document.getElementById('modalOverlay')?.classList.toggle('open')}>
            ⚙️
          </button>
          <button className="btn-config" id="darkModeBtn" onClick={() => document.body.classList.toggle('dark-mode')}>
            🌙
          </button>
          <span className="progress-text">
            Página {currentPageIndex+1} de {pages.length}
          </span>
          <button className="btn-nav primary" onClick={goNext} disabled={currentPageIndex === pages.length - 1}>
            Siguiente ➡
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotebookLayout;