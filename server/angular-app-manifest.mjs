
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/site-avocat/',
  locale: "fr",
  routes: undefined,
  entryPointToBrowserMapping: {
  "src/app/article-page/article-page.ts": [
    "chunk-MX4T6REI.js",
    "chunk-GCDGEDAG.js",
    "chunk-UDAWW7SC.js"
  ],
  "src/app/not-found/not-found.ts": [
    "chunk-SDKYZQ22.js"
  ],
  "node_modules/@angular/animations/fesm2022/browser.mjs": [
    "chunk-U5LXIEIU.js"
  ],
  "src/app/home/home.ts": [
    "chunk-KKU6XWBR.js",
    "chunk-LMYG2FYR.js",
    "chunk-6KJIF4PQ.js",
    "chunk-UDAWW7SC.js"
  ],
  "src/app/prestations/prestations.ts": [
    "chunk-7BHXIX6G.js",
    "chunk-LMYG2FYR.js",
    "chunk-6KJIF4PQ.js",
    "chunk-UDAWW7SC.js"
  ],
  "src/app/about/about.ts": [
    "chunk-WPTYF7XS.js",
    "chunk-6KJIF4PQ.js",
    "chunk-UDAWW7SC.js"
  ],
  "src/app/contact/contact.ts": [
    "chunk-45IF64M6.js",
    "chunk-6KJIF4PQ.js",
    "chunk-UDAWW7SC.js"
  ],
  "src/app/legal/legal.ts": [
    "chunk-UKHOJHZM.js",
    "chunk-UDAWW7SC.js"
  ],
  "src/app/privacy/privacy.ts": [
    "chunk-R2ABHC4H.js",
    "chunk-UDAWW7SC.js"
  ],
  "src/app/blog/blog.ts": [
    "chunk-SKCEHMYJ.js",
    "chunk-GCDGEDAG.js",
    "chunk-6KJIF4PQ.js",
    "chunk-UDAWW7SC.js"
  ]
},
  assets: {
    'index.csr.html': {size: 4989, hash: '9c9a9304bee7eff8f9995de5b6c7e87e14294a6ccd4a8e724a4f848d5bb67f89', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 4079, hash: '554ba349e0b8fabdf9cd455fb931b7af9f96ff21a9473d81655746811c644811', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-5OVNWNVX.css': {size: 547226, hash: '+VwTnZzPMh0', text: () => import('./assets-chunks/styles-5OVNWNVX_css.mjs').then(m => m.default)}
  },
};
