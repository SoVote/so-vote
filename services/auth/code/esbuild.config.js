require('esbuild').buildSync({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  jsx: 'automatic',
  loader: { '.ts': 'tsx' },
  target: ['node18'],
  outfile: 'dist/api.js',
})