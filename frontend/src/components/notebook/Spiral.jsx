import React from 'react';

const Spiral = () => {
  // 15 anillos
  const rings = Array.from({ length: 15 }, (_, i) => i);

  return (
    <div className="spiral-container">
      {rings.map((i) => (
        <div key={i} className="ring"></div>
      ))}
    </div>
  );
};

export default Spiral;