/**
 * Vite plugin: generates public/images-manifest.json at build/dev time.
 * Scans frontend/public/images/ and lists every image file with size info.
 */
import fs from 'fs';
import path from 'path';

export function imageManifestPlugin() {
  const publicDir = path.resolve(process.cwd(), 'public');
  const imagesDir = path.join(publicDir, 'images');
  const outFile = path.join(publicDir, 'images-manifest.json');

  function scan() {
    const files = [];
    try {
      for (const f of fs.readdirSync(imagesDir)) {
        const full = path.join(imagesDir, f);
        const stat = fs.statSync(full);
        if (stat.isFile() && /\.(jpe?g|png|webp|gif|avif|svg)$/i.test(f)) {
          files.push({ name: f, path: `/images/${f}`, size: stat.size });
        }
      }
    } catch { /* dir not found */ }
    files.sort((a, b) => a.name.localeCompare(b.name));
    fs.writeFileSync(outFile, JSON.stringify(files, null, 2));
    return files;
  }

  return {
    name: 'image-manifest',
    buildStart() { scan(); },
    configureServer() { scan(); },
  };
}
