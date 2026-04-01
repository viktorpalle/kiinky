import { deflateSync } from 'zlib';
import { writeFileSync } from 'fs';

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c;
  }
  return table;
})();

function crc32(buf) {
  let crc = 0xffffffff;
  for (const byte of buf) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const t = Buffer.from(type, 'ascii');
  const len = Buffer.allocUnsafe(4);
  len.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.allocUnsafe(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crcBuf]);
}

function createPNG(size) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.allocUnsafe(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;  // 8-bit
  ihdr[9] = 2;  // RGB
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  // Draw the icon: dark bg + purple circle + lips hint
  const rawData = Buffer.allocUnsafe(size * (1 + size * 3));

  for (let y = 0; y < size; y++) {
    rawData[y * (1 + size * 3)] = 0; // filter byte: None
    for (let x = 0; x < size; x++) {
      const offset = y * (1 + size * 3) + 1 + x * 3;
      const cx = x / size - 0.5;
      const cy = y / size - 0.5;
      const dist = Math.sqrt(cx * cx + cy * cy);
      const cornerRadius = 0.22;
      const maxCornerDist = Math.sqrt(2) * 0.5 - cornerRadius;

      // Rounded square mask
      const rx = Math.abs(cx) - (0.5 - cornerRadius);
      const ry = Math.abs(cy) - (0.5 - cornerRadius);
      const inRounded = rx <= 0 || ry <= 0 || Math.sqrt(Math.max(rx,0)**2 + Math.max(ry,0)**2) <= cornerRadius;

      if (!inRounded) {
        rawData[offset] = 0; rawData[offset+1] = 0; rawData[offset+2] = 0;
        continue;
      }

      // Background: #0D0D1A
      let r = 13, g = 13, b = 26;

      // Gradient circle glow
      const glowFactor = Math.max(0, 1 - dist * 2.5);
      r = Math.round(r + glowFactor * (123 - 13));
      g = Math.round(g + glowFactor * (47 - 13));
      b = Math.round(b + glowFactor * (190 - 26));

      // Lips region (y from 40% to 65% of icon)
      const ny = y / size;
      const nx = x / size;
      if (ny > 0.36 && ny < 0.68 && nx > 0.18 && nx < 0.82) {
        // Upper lip zone
        if (ny < 0.5) {
          const tx = (nx - 0.5);
          const centerDip = 0.42 + Math.abs(tx) * 0.1;
          const lEdge = 0.38 + Math.pow(Math.abs(tx + 0.18), 0.7) * 0.06;
          if (ny > lEdge && ny < 0.5) {
            const t = (ny - lEdge) / (0.5 - lEdge);
            r = Math.round(r * (1-t) + 255 * t);
            g = Math.round(g * (1-t) + 51 * t);
            b = Math.round(b * (1-t) + 102 * t);
          }
        }
        // Lower lip zone
        if (ny >= 0.5 && ny < 0.65) {
          const tx = Math.abs(nx - 0.5);
          const bottom = 0.62 - tx * tx * 1.5;
          if (ny < bottom) {
            const t = Math.min(1, (bottom - ny) / 0.12);
            r = Math.round(r * (1-t) + 157 * t);
            g = Math.round(g * (1-t) + 78 * t);
            b = Math.round(b * (1-t) + 221 * t);
          }
        }
      }

      rawData[offset] = Math.min(255, r);
      rawData[offset+1] = Math.min(255, g);
      rawData[offset+2] = Math.min(255, b);
    }
  }

  const compressed = deflateSync(rawData);
  return Buffer.concat([signature, pngChunk('IHDR', ihdr), pngChunk('IDAT', compressed), pngChunk('IEND', Buffer.alloc(0))]);
}

writeFileSync('public/icon-192.png', createPNG(192));
writeFileSync('public/icon-512.png', createPNG(512));
console.log('Icons generated: public/icon-192.png, public/icon-512.png');
