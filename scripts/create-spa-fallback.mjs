import { mkdir, readFile, writeFile } from 'node:fs/promises'

const configuredBase = process.env.PORTFOLIO_BASE || '/'
const basePath = configuredBase === '/'
  ? '/'
  : `/${configuredBase.replace(/^\/+|\/+$/g, '')}/`
const distIndexUrl = new URL('../dist/index.html', import.meta.url)
const indexDocument = await readFile(distIndexUrl, 'utf8')
const projectSlugs = ['yijiajia', 'ai-english', 'changan', 'yangyuanqing']

for (const slug of projectSlugs) {
  const routeDirectory = new URL(`../dist/projects/${slug}/`, import.meta.url)
  await mkdir(routeDirectory, { recursive: true })
  await writeFile(new URL('index.html', routeDirectory), indexDocument)
}

const redirectDocument = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>正在打开作品集</title>
  </head>
  <body>
    <script>
      const target = window.location.pathname + window.location.search + window.location.hash
      window.location.replace(${JSON.stringify(basePath)} + '?route=' + encodeURIComponent(target))
    </script>
  </body>
</html>
`

await writeFile(new URL('../dist/404.html', import.meta.url), redirectDocument)
