import React, { useState, useEffect } from 'react';

const CustomizationModal = () => {
  const [preferences, setPreferences] = useState({
    theme: 'clasico',
    font: 'Lora',
    bg: 'rayado',
    darkMode: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem('prefs_bosquejo');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPreferences(prev => ({ ...prev, ...parsed }));
      } catch (e) {}
    }
  }, []);

  const applyPreferences = (newPrefs) => {
    // Aplicar tema
    const root = document.documentElement;
    const theme = newPrefs.theme;
    let p, d, l;
    switch(theme) {
      case 'clasico': p='#8e44ad'; d='#5e2b74'; l='#a052c2'; break;
      case 'azul': p='#2980b9'; d='#1a5276'; l='#5dade2'; break;
      case 'verde': p='#27ae60'; d='#1e8449'; l='#58d68d'; break;
      case 'calido': p='#e67e22'; d='#b9770e'; l='#f0b27a'; break;
      case 'oscuro': p='#bb86fc'; d='#7f4dc4'; l='#d4b8fc'; break;
      default: break;
    }
    if (p) {
      root.style.setProperty('--primary-color', p);
      root.style.setProperty('--primary-dark', d);
      root.style.setProperty('--primary-light', l);
      root.style.setProperty('--input-focus', p);
    }

    // Aplicar fuente
    let font = newPrefs.font;
    let fontFamily = font;
    if (font === 'Lora') fontFamily = "'Lora', serif";
    else if (font === 'Caveat') fontFamily = "'Caveat', cursive";
    else if (font === 'Georgia') fontFamily = "'Georgia', serif";
    root.style.setProperty('--font-family', fontFamily);
    root.style.setProperty('--font-family-title', font === 'Caveat' ? fontFamily : "'Caveat', cursive");

    // Aplicar fondo
    const bg = newPrefs.bg;
    let img, sz, pos;
    switch(bg) {
      case 'rayado':
        img = 'linear-gradient(rgba(200,0,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(200,0,0,0.12) 1px, transparent 1px)';
        sz = '100% 28px, 55px 100%';
        pos = '0 0, 30px 0';
        break;
      case 'blanco': img = 'none'; sz = 'auto'; pos = '0 0'; break;
      case 'vintage':
        img = 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23d5cdc0\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")';
        sz = '60px 60px';
        pos = '0 0';
        break;
      case 'cuadricula':
        img = 'linear-gradient(rgba(200,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(200,0,0,0.08) 1px, transparent 1px)';
        sz = '30px 30px, 30px 30px';
        pos = '0 0, 0 0';
        break;
      default: break;
    }
    if (img) {
      root.style.setProperty('--notebook-bg-image', img);
      root.style.setProperty('--notebook-bg-size', sz);
      root.style.setProperty('--notebook-bg-position', pos);
    }

    // Modo oscuro
    if (newPrefs.darkMode) {
      document.body.classList.add('dark-mode');
      document.getElementById('darkModeBtn').textContent = '☀️';
    } else {
      document.body.classList.remove('dark-mode');
      document.getElementById('darkModeBtn').textContent = '🌙';
    }

    localStorage.setItem('prefs_bosquejo', JSON.stringify(newPrefs));
    setPreferences(newPrefs);
  };

  const handleChange = (key, value) => {
    const newPrefs = { ...preferences, [key]: value };
    applyPreferences(newPrefs);
  };

  const toggleDarkMode = () => {
    handleChange('darkMode', !preferences.darkMode);
  };

  return (
    <div className="modal-overlay" id="modalOverlay">
      <div className="modal">
        <h2>🎨 Personalizar</h2>
        <div className="grupo">
          <label>Tema de color</label>
          <select
            value={preferences.theme}
            onChange={(e) => handleChange('theme', e.target.value)}
          >
            <option value="clasico">Clásico (morado)</option>
            <option value="azul">Azul</option>
            <option value="verde">Verde</option>
            <option value="calido">Cálido</option>
            <option value="oscuro">Oscuro (modo oscuro)</option>
          </select>
        </div>
        <div className="grupo">
          <label>Fuente</label>
          <select
            value={preferences.font}
            onChange={(e) => handleChange('font', e.target.value)}
          >
            <option value="Lora">Lora (serif)</option>
            <option value="sans-serif">Sans-serif</option>
            <option value="Caveat">Caveat (manuscrita)</option>
            <option value="Georgia">Georgia</option>
          </select>
        </div>
        <div className="grupo">
          <label>Fondo del cuaderno</label>
          <select
            value={preferences.bg}
            onChange={(e) => handleChange('bg', e.target.value)}
          >
            <option value="rayado">Papel rayado</option>
            <option value="blanco">Blanco</option>
            <option value="vintage">Vintage</option>
            <option value="cuadricula">Cuadrícula</option>
          </select>
        </div>
        <button className="cerrar-modal" onClick={() => document.getElementById('modalOverlay')?.classList.remove('open')}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default CustomizationModal;