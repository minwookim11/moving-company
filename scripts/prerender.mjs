import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { render } from '../.prerender/entry-server.js'

const template = await readFile('dist/index.html', 'utf8')
const page = (path) => template.replace('<div id="root"></div>', `<div id="root">${render(path)}</div>`)
await writeFile('dist/index.html', page('/'))
await mkdir('dist/privacy', { recursive: true })
await writeFile('dist/privacy/index.html', page('/privacy')
  .replace(/<title>[^<]*<\/title>/, '<title>개인정보처리방침 | 짐까치</title>')
  .replace('<link rel="canonical" href="https://moving-company.kkkadad.workers.dev/" />', '<link rel="canonical" href="https://moving-company.kkkadad.workers.dev/privacy" />')
  .replace('<meta name="description"', '<meta name="robots" content="noindex, follow" />\n    <meta name="description"'))
await rm('.prerender', { recursive: true, force: true })
console.log('Prerendered home and privacy pages')
