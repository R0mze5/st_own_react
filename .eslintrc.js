module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      babelrc: false,
      configFile: false,
      // your babel options
      presets: ['@babel/preset-env'],
    },
  },
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
  ],
  overrides: [

    {
      files: ['**/*.ts'],
      env: {
        browser: true,
        es2021: true,
        node: true,
      },
      extends: [
        'airbnb-base',
        'eslint:recommended',
      ],

      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      plugins: [
        '@typescript-eslint',
      ],
      rules: {
        'import/prefer-default-export': 0,
        'import/extensions': 0,
        'no-unused-vars': 0,
        'no-param-reassign': 0,
        'no-plusplus': 0,

        'import/no-unresolved': 0,
      },
    },
  ],
};
