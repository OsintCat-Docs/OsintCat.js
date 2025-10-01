import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  outDir: 'dist',
  target: 'es2020',
  esbuildOptions(options) {
    options.banner = {
      js: `/**
* OsintCat.js - Official OsintCat API Client
* @version 1.1.2
* @license MIT
* @see https://www.osintcat.net
*/`,
    };
  },
  cjsInterop: true,
  platform: 'node',
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.mjs'
    };
  }
});
