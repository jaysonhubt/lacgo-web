// scripts/prerender.js
import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

const routes = ['/', '/about', '/help-center', '/terms-of-use', '/privacy-policy']
const distDir = path.resolve('./dist')
const prerenderDir = path.join(distDir)
const baseUrl = 'http://localhost:3000'
const mdiCdnCss = 'https://cdn.jsdelivr.net/npm/@mdi/font@7.x/css/materialdesignicons.min.css'

async function prerender() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  for (const route of routes) {
    const url = `${baseUrl}${route}`
    console.log('Prerendering', url)
    await page.goto(url, { waitUntil: 'networkidle0' })

    // Inject <base href="./"> để assets local dùng relative path
    await page.evaluate(() => {
      const base = document.createElement('base')
      base.setAttribute('href', './')
      document.head.prepend(base)
    })

    // Thay CSS Vuetify/MDI bằng CDN
    await page.evaluate((mdiCdnCss) => {
      const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      links.forEach(link => {
        if (link.href.includes('@mdi/font') || link.href.includes('materialdesignicons')) {
          link.href = mdiCdnCss
        }
      })
      const styles = Array.from(document.querySelectorAll('style'))
      styles.forEach(style => {
        if (style.innerHTML.includes('@font-face') && style.innerHTML.includes('Material Design Icons')) {
          style.innerHTML = `@import url("${mdiCdnCss}");`
        }
      })
    }, mdiCdnCss)

    let html = await page.content()

    // Replace toàn bộ src="/..." của ảnh thành src="./..."
    html = html.replace(/src="\/(.*?)"/g, 'src="./$1"')

    // Tạo folder riêng cho route
    const folderPath = path.join(distDir, route === '/' ? 'index' : route.slice(1))
    fs.mkdirSync(folderPath, { recursive: true })

    const filePath = path.join(folderPath + '-ssg.html')
    fs.writeFileSync(filePath, html)
    console.log('Saved prerendered page:', filePath)
  }

  await browser.close()
  console.log('Prerendering completed!')
}

prerender().catch(err => {
  console.error(err)
  process.exit(1)
})
