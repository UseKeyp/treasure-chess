/** @type {import('@babel/core').TransformOptions} */
// const path = require('path')
// const { getPaths } = require('@redwoodjs/internal')

module.exports = {
  extends: '../babel.config.js',
  presets: ['@redwoodjs/core/config/babel-preset'],
  // plugins: [
  //   [
  //     require.resolve('babel-plugin-module-resolver'),
  //     {
  //       alias: {
  //         '@common': path.join(getPaths().base, './packages'),
  //       },
  //     },
  //   ],
  // ],
}
