const { env } = require('process');

const target = 'http://localhost:5268';

const PROXY_CONFIG = [
  {
    context: [
      "/WeatherForecast",
      "/_configuration",
      "/.well-known",
      "/Identity",
      "/connect",
      "/ApplyDatabaseMigrations",
      "/_framework"
   ],
    proxyTimeout: 10000,
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  }
]


module.exports = PROXY_CONFIG

module.exports = PROXY_CONFIG;
