import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, join, extname } from 'node:path';

// Build first. The standalone artifact bundles the same React app and image assets.
const destination = resolve(process.argv[2] || 'dist/portafolio.html');
const dist = resolve('dist');
const mime = { '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
const uri = path => `data:${mime[extname(path)]};base64,${readFileSync(path).toString('base64')}`;
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]);
let html = readFileSync(join(dist, 'index.html'), 'utf8');
const scriptPath = html.match(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/)?.[1];
const cssPath = html.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/)?.[1];
if (!scriptPath || !cssPath) throw new Error('Expected one bundled Vite entry and stylesheet. Run npm run build first.');
let script = readFileSync(join(dist, scriptPath.slice(1)), 'utf8');
for (const path of walk(join(dist, 'project_preview')).concat(walk(join(dist, 'images')))) {
  if (!mime[extname(path)]) continue;
  const publicPath = '/' + path.slice(dist.length + 1);
  script = script.replaceAll(publicPath, uri(path));
}
html = html.replace(/<script type="module"[^>]*src="[^"]+"[^>]*><\/script>/, () => `<script type="module">${script.replaceAll('</script', '<\\/script')}</script>`);
html = html.replace(/<link rel="stylesheet"[^>]*href="[^"]+"[^>]*>/, () => `<style>${readFileSync(join(dist, cssPath.slice(1)), 'utf8')}</style>`);
html = html.replace(/<!-- Google tag.*?<\/script>\s*<script>.*?<\/script>/s, '');
if (existsSync(join(dist, 'thumbnail.png'))) html = html.replace('href="/thumbnail.png"', `href="${uri(join(dist, 'thumbnail.png'))}"`);
writeFileSync(destination, html);
console.log(`Standalone HTML: ${destination}`);
