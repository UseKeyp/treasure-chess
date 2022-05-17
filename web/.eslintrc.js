module.exports = {
  // now t() becomes global, this rule stop the warning
  // in every single global variable being used in the rect component tree
  rules: {
    'no-undef': ['off'],
  },
}
