// next.config.js
module.exports = {
  images: {
    domains: ['app.chaskiq.io'],
  },
  i18n: {
    locales: ['en', 'fr', 'es'],
    defaultLocale: 'en',
  },
  env: {
		SITE: process.env.SITE,
    HOST: process.env.HOST
  },
}