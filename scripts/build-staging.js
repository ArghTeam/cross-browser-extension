const tasks = require('./tasks');

tasks.replaceWebpack();
console.log('[Copy assets]');
console.log('-'.repeat(80));
tasks.copyAssets('build-staging');

console.log('[Webpack Build]');
console.log('-'.repeat(80));
exec('webpack --config webpack/staging.config.js --progress --profile --colors');
