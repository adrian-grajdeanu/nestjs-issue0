import { build } from 'esbuild';
import { esbuildDecorators } from '@anatine/esbuild-decorators';

build({
  "plugins": [
    esbuildDecorators({
      tsconfig: './tsconfig.json',
      cwd: process.cwd(),
    })
  ],
  "entryPoints": [
    "lib/cc.ts"
  ],
  "external": [
    "@nestjs/microservices",
    "@nestjs/websockets",
    "class-transformer/storage"
  ],
  "minify": true,
  "bundle": true,
  "target": "node14",
  "platform": "node",
  "mainFields": [
    "module",
    "main"
  ],
  "outfile": "dist/c.js"
})
.catch((e) => {
  console.error('Failed to bundle');
  console.error(e);
  process.exit(1);
});