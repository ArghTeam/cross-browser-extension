const path = require('path');
const webpack = require('webpack');
const postCSSConfig = require('./postcss.config');
const CommonsPlugin =  require('webpack/lib/optimize/CommonsChunkPlugin')
const customPath = path.join(__dirname, './customPublicPath');

module.exports = {
  entry: {
    app: [customPath, path.join(__dirname, '../chrome/extension/app')],
    background: [customPath, path.join(__dirname, '../chrome/extension/background')],
    content: [customPath, path.join(__dirname, '../chrome/extension/content')]
  },
  output: {
    path: path.join(__dirname, '../build-staging/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  postcss() {
    return postCSSConfig;
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.dev$/),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        COOKIE_NAME: JSON.stringify('healthtagit.sid'),
        LANDING_URL: JSON.stringify('https://healthtagit.dev.argh.team'),
        BASE_URL: JSON.stringify('https://healthtagit.dev.argh.team'),
        LOGIN_URL: JSON.stringify('/login'),
        APP_URL: JSON.stringify('/'),
      }
    }),
    new CommonsPlugin("commons.bundle.js", ["app", "content"]),
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['react-optimize']
      }
    }, {
      test: /\.css$/,
      loaders: [
        'style',
        'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss'
      ]
    }]
  }
};
