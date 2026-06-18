const { createCanvas } = require('canvas');
const fs = require('fs');

function generateIcon(size, filename) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#8e44ad';
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, size * 0.2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  const crossW = size * 0.15;
  const crossH = size * 0.6;
  const cx = size / 2;
  const cy = size / 2;
  ctx.fillRect(cx - crossW / 2, cy - crossH / 2, crossW, crossH);
  ctx.fillRect(cx - crossH * 0.38, cy - crossH * 0.15, crossH * 0.76, crossW);
  fs.writeFileSync(filename, canvas.toBuffer('image/png'));
  console.log('Generated ' + filename);
}

generateIcon(192, 'public/pwa-192x192.png');
generateIcon(512, 'public/pwa-512x512.png');
generateIcon(180, 'public/apple-touch-icon.png');
generateIcon(32, 'public/favicon.ico');