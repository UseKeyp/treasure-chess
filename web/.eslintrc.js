module.exports = {
  extends: ['@redwoodjs/eslint-config'],
  rules: {
    'jsx-a11y/no-onchange': 'off',
  },
  overrides: [
    {
      files: ['*.stories.js'],
      rules: {
        'no-console': ['error', { allow: ['log'] }],
      },
    },
  ],
}
