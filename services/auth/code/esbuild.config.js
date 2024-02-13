require('esbuild').buildSync({
  entryPoints: ['src/api.ts'],
  bundle: true,
  platform: 'node',
  target: ['node18'],
  outfile: 'dist/api.js',
})