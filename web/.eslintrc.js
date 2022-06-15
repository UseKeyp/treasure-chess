module.exports = {
  globals: {
    t: 'readonly',
    Trans: 'readonly',
  },
  rules: {
    'react/jsx-no-undef': ['error', { allowGlobals: true }],
    'react/no-unescaped-entities': 0,
  },
}
