/* Build: inline src/page.html + src/app.js + src/app2.js into two outputs.
   - index.html    a complete standalone document (open it, host it anywhere)
   - artifact.html the same page without the document skeleton, for publishing
                   as a Claude Artifact (the host supplies the wrapper)
   No dependencies, no bundler, no minifier. Run: node build.mjs            */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const read = f => readFileSync(join(here, f), 'utf8');

const page = read('src/page.html');
const script = '<scr' + 'ipt>\n' + read('src/app.js') + '\n' + read('src/app2.js') + '\n</scr' + 'ipt>\n';

// split the source page into head-bound bits (title, style) and markup
const title = page.match(/<title>[\s\S]*?<\/title>/)[0];
const style = page.match(/<style>[\s\S]*?<\/style>/)[0];
const markup = page.replace(title, '').replace(style, '').trim();

writeFileSync(join(here, 'artifact.html'),
  title + '\n\n' + style + '\n\n' + markup + '\n\n' + script);

writeFileSync(join(here, 'index.html'), [
  '<!doctype html>',
  '<html lang="en">',
  '<head>',
  '<meta charset="utf-8">',
  '<meta name="viewport" content="width=device-width, initial-scale=1">',
  '<meta name="description" content="Interactive risk lab for the NVIDIA GPU-backstop project finance structure.">',
  title,
  style,
  '</head>',
  '<body>',
  markup,
  script,
  '</body>',
  '</html>',
  '',
].join('\n'));

console.log('built index.html + artifact.html');
