const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: { 'buy-crypto': './src/buy-crypto.js' },
  plugins: [new CopyPlugin({ patterns: [{ from: 'static' }] })],
  mode: 'production',
  devServer: {
    static: { directory: './dist' },
    client: { overlay: false },
    port: 8765,
  },
}
