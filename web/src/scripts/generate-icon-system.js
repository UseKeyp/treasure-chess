/* eslint-disable no-undef */
const { readdirSync } = require('fs')
const path = require('path')

const {
  generateWebIconMap,
  generateIconComponentStory,
} = require('./generators')
const { isSVG, removeExtension } = require('./utils')

const ICON_SOURCE_FOLDER = path.join(__dirname, '../assets/icons')
const ICON_OUTPUT_FOLDER = path.join(__dirname, '../components/Icon')

const icons = readdirSync(ICON_SOURCE_FOLDER).filter(isSVG).map(removeExtension)

try {
  generateIconComponentStory(icons, { dir: ICON_OUTPUT_FOLDER })
  generateWebIconMap(icons, { dir: ICON_SOURCE_FOLDER })
} catch (e) {
  /* eslint-disable-next-line no-console */
  console.error(e)
}
