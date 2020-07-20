/* eslint-disable @typescript-eslint/no-var-requires, no-param-reassign */

const path = require('path');
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const PrerenderSPAPlugin = require('prerender-spa-plugin');

const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

const basePath = process.env.NODE_ENV === 'production'
  ? '/en/ultimate-guide-covid19-travel-restrictions-reopening/' : '';
const buildDir = 'dist';

const sitemapPaths = require('./src/utils/sitemapPaths');
const { countries } = require('./src/constants/countries.js');

const routes = countries.map((c) => `${basePath}${c.slug}.html`);
routes.push(`${basePath}about.html`, `${basePath}subscribe.html`, `${basePath}404.html`, basePath);

const productionPlugins = [
  new PrerenderSPAPlugin({
    staticDir: path.join(__dirname, buildDir),
    indexPath: path.join(__dirname, `${buildDir}${basePath}index.html`),
    routes,
    postProcess(renderedRoute) {
      // Ignore any redirects.
      renderedRoute.route = renderedRoute.originalRoute;
      // Remove /index.html from the output path if the dir name ends with a .html file extension.
      // For example: /dist/dir/special.html/index.html -> /dist/dir/special.html
      if (renderedRoute.route.endsWith('.html')) {
        renderedRoute.outputPath = path.join(__dirname, buildDir, renderedRoute.route);
      }

      return renderedRoute;
    },
    minify: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      decodeEntities: true,
      keepClosingSlash: true,
      sortAttributes: true,
    },
    renderer: new Renderer({
      maxConcurrentRoutes: 10,
      renderAfterDocumentEvent: 'render-completed',
    }),
  }),
  new SitemapPlugin(`https://www.tourhero.com${basePath}`, sitemapPaths.entriesFromRoutes(routes), {
    filename: 'sitemap.xml',
    lastmod: true,
    changefreq: 'daily',
    priority: '0.8',
  }),
];

module.exports = {
  publicPath: basePath,
  outputDir: `${buildDir}${basePath}`,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(...productionPlugins);
    }
  },
  pwa: {
    appleMobileWebAppStatusBarStyle: 'black',
    appleMobileWebAppCapable: 'yes',
    assetsVersion: Date.now(),
    iconPaths: {
      favicon32: 'img/favicon.png',
      favicon16: null,
      appleTouchIcon: 'img/favicon.png',
      maskIcon: null,
      msTileImage: null
    },
    msTileColor: '#ffffff',
    themeColor: '#1c355e',
    name: 'Travel Reopening',
    workboxOptions: {
      skipWaiting: true
    }
  },
};
