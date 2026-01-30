
export default {
  basePath: '/site-avocat',
  supportedLocales: {
  "fr": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
