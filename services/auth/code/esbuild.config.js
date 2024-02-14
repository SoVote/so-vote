require('esbuild').buildSync({
  entryPoints: ['src/api.ts'],
  bundle: true,
  platform: 'node',
  jsx: 'automatic',
  loader: { '.ts': 'tsx' },
  target: ['node18'],
  outfile: 'dist/api.js',
})