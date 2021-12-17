const custom = require('./webpack.config.js')

module.exports = {
  typescript: { reactDocgen: false },
  /**
   * This line adds all of Storybook's essential addons.
   *
   * @see {@link https://storybook.js.org/addons/tag/essentials}
   */
  // addons: ['@storybook/addon-essentials'],
  // resolve: {
  //   fallback: {
  //     path: false,
  //   },
  // },
  webpackFinal: async (config, { configType }) => {
    config.resolve.fallback = {
      http: false,
      https: false,
      timers: false,
      os: false,
      tty: false,
      crypto: false,
      zlib: false,
      path: false,
      // path: require.resolve('path-browserify'),
    }
    return config
  },
}
