// Bundles the engine + UI into one self-contained HTML file.
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const DIRS = ['core', 'commands', 'data', 'missions', 'drills', 'quiz'];

function engineSources() {
  const out = [];
  for (const d of DIRS) {
    const dir = path.join(SRC, d);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js')).sort()) out.push(path.join(dir, f));
  }
  return out;
}
const files = engineSources();
const engine = files.map((f) => '/* ' + path.relative(SRC, f).split(path.sep).join('/') + ' */\n' + fs.readFileSync(f, 'utf8')).join('\n');
const app = fs.readFileSync(path.join(SRC, 'ui', 'app.js'), 'utf8');
let html = fs.readFileSync(path.join(SRC, 'ui', 'index.html'), 'utf8');
html = html.replace('/*__ENGINE__*/', () => engine).replace('/*__APP__*/', () => app);
fs.mkdirSync(path.join(ROOT, 'dist'), { recursive: true });
const out = path.join(ROOT, 'dist', 'linux-lab.html');
fs.writeFileSync(out, html);
// Also written to the repo root as index.html, which is what GitHub Pages serves.
fs.writeFileSync(path.join(ROOT, 'index.html'), html);
console.log('built ' + out + '  (' + (fs.statSync(out).size / 1024).toFixed(0) + ' KB, ' + files.length + ' engine files)');
console.log('       ' + path.join(ROOT, 'index.html') + '  (same file, for GitHub Pages)');
