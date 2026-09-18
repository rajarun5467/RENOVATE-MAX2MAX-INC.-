import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imageManifestPlugin } from './scripts/generate-image-manifest.js';

export default defineConfig({
  plugins: [react(), imageManifestPlugin()],
});
