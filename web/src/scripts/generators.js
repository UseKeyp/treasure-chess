const { writeFileSync } = require('fs')

const { toPascalCase } = require('./utils')

const generateIconComponentStory = (icons, { dir }) => {
  const indexContent = [
    "import React from 'react';",
    "import Icon from './Icon';",
    "import Wrapper from './Wrapper'",
    '',
    'export const generated = props => {',
    'return <Wrapper>',
    icons
      .map((icon) => `<Icon {...props} name="${icon}" size={100} />`)
      .join('\n'),
    '</Wrapper> }',
    '',
    "export default { title: 'Components/Icon' }",
  ].join('\n')

  writeFileSync(`${dir}/Icon.stories.js`, indexContent)
  /* eslint-disable-next-line no-console */
  console.log('Icon component story created! ✅')
}

const generateWebIconMap = (icons, { dir }) => {
  const iconMapContent = [
    icons
      .map(
        (icon) =>
          `import { ReactComponent as ${toPascalCase(
            icon
          )} } from './${icon}.svg';`
      )
      .join('\n'),
    '',
    'export default {',
    icons.map((icon) => `"${icon}": ${toPascalCase(icon)}, `).join('\n'),
    '};',
  ].join('\n')

  writeFileSync(`${dir}/icon-map.js`, iconMapContent)
  /* eslint-disable-next-line no-console */
  console.log('Web Icon Map created! ✅')
}

// eslint-disable-next-line no-undef
module.exports = {
  generateIconComponentStory,
  generateWebIconMap,
}
