import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { wedding } from '../src/data/wedding.ts'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))
const run = promisify(execFile)
const session = `wedding-share-${process.pid}`
const browser = (...args) => run('agent-browser', ['--session', session, ...args], { timeout: 30000 })
const types = { '.html': 'text/html', '.ttf': 'font/ttf', '.webp': 'image/webp' }
const previewContent = {
  names: `${wedding.couple.first} & ${wedding.couple.second}`,
  date: wedding.date.label,
  city: wedding.city,
}
const escapeHtml = value => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character])

// Only the template and its local font/artwork assets are exposed, on loopback.
const server = createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname
  const template = pathname === '/preview'
  const asset = /^\/(fonts|images)\/[a-z0-9-]+\.(ttf|webp)$/.test(pathname)
  if (!template && !asset) {
    response.writeHead(404).end()
    return
  }
  try {
    const path = template ? join(projectRoot, 'scripts/share-preview.html') : join(projectRoot, 'public', pathname)
    const extension = template ? '.html' : pathname.slice(pathname.lastIndexOf('.'))
    const content = await readFile(path)
    const body = template
      ? content.toString().replace(/\{\{(\w+)\}\}/g, (_, key) => escapeHtml(previewContent[key]))
      : content
    response.writeHead(200, { 'Content-Type': types[extension] }).end(body)
  } catch {
    response.writeHead(404).end()
  }
})

await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
try {
  const url = `http://127.0.0.1:${server.address().port}/preview`
  await browser('set', 'viewport', '1200', '630')
  await browser('open', url)
  await browser('wait', '--load', 'networkidle')
  await browser('eval', '(async () => { await document.fonts.ready; await Promise.all([...document.images].map(image => image.decode())); return "ready"; })()')
  await browser('screenshot', join(projectRoot, 'public/images/share-preview-v2.png'))
  console.log('Created public/images/share-preview-v2.png (1200 × 630).')
} finally {
  await browser('close').catch(() => {})
  server.closeAllConnections()
  await new Promise(resolve => server.close(resolve))
}
