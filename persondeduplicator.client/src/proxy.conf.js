const { env } = require('process');

const parseAspnetcoreUrls = (urls) => {
  if (!urls) return null;
  const parts = urls.split(';').map(u => u.trim()).filter(Boolean);
  const httpsUrl = parts.find(u => u.startsWith('https://')) || parts[0];
  return httpsUrl.replace('localhost', '127.0.0.1');
};

const target = env.ASPNETCORE_HTTPS_PORT ? `https://127.0.0.1:${env.ASPNETCORE_HTTPS_PORT}` :
  parseAspnetcoreUrls(env.ASPNETCORE_URLS) || 'https://127.0.0.1:7102';

const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
    ],
    target,
    secure: false,
    changeOrigin: true
  }
]

module.exports = PROXY_CONFIG;
