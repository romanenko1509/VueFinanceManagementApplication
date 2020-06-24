module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],

  parserOptions: {
    parser: 'babel-eslint',
  },

  rules: {
    'no-console': 'on',
    'no-debugger': 'on',
    'import/extensions': ['error', 'never', { js: 'never', vue: 'never' }],
  },

  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb'
  ]
};
