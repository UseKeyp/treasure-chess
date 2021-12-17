const custom = require('./webpack.config.js')

module.exports = {
  typescript: { reactDocgen: false },
  /**
   * This line adds all of Storybook's essential addons.
   *
   * @see {@link https://storybook.js.org/addons/tag/essentials}
   */
  // addons: ['@storybook/addon-essentials'],
}
