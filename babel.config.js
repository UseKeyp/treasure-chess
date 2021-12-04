const path = require('path')
const { getPaths } = require('@redwoodjs/internal')

module.exports = {
  presets: ['@redwoodjs/core/config/babel-preset'],
  plugins: ['@babel/plugin-transform-modules-commonjs'],
  // plugins: [
  //   [
  //     require.resolve('babel-plugin-module-resolver'),
  //     {
  //       alias: {
  //         '@common': path.join(getPaths().base, 'packages'),
  //       },
  //     },
  //   ],
  // ],
}
