const tasks = require('./tasks');
const createWebpackServer = require('webpack-httpolyglot-server');
const devConfig = require('../webpack/dev.config');
const host = 'argh.local';
const port = 4000;


tasks.replaceWebpack();
console.log('[Copy assets]');
console.log('-'.repeat(80));
tasks.copyAssets('dev');

console.log('[Webpack Dev]');
console.log('-'.repeat(80));
console.log('If you\'re developing Inject page,');
console.log(`please allow https://${host}:${port} connections in Google Chrome,`);
console.log('and load unpacked extensions with `./dev` folder. (see https://developer.chrome.com/extensions/getstarted#unpacked)\n');
createWebpackServer(devConfig, {
  host: host,
  port: port
});
