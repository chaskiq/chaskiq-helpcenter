// next.config.js
module.exports = {
  images: {
    domains: ['app.chaskiq.io', domainToOption(process.env.HOST)],
  },
  i18n: {
    locales: ['en', 'fr', 'es'],
    defaultLocale: process.env.DEFAULT_LOCALE || 'en',
  },
  env: {
		SITE: process.env.SITE,
    HOST: process.env.HOST,
    DEFAULT_LOCALE: process.env.DEFAULT_LOCALE
  },
}

function domainToOption(domain){
  return domain.replace("https://", "")
  .replace("http", "")
}