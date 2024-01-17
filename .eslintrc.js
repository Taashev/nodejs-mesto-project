module.exports = {
  env: {
    browser: false,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'eslint-config-prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'eslint-plugin-prettier'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.js', '.json'],
      },
    },
    'import/extensions': ['.js', '.ts'],
  },
  rules: {
    'prettier/prettier': 'error',
    // проверка повторных объявлений переменных (отключаем при использовании tsc)
    'no-redeclare': 'off',
    // правила для имен с висячими символами
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    // правила на инкримент ++
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    // вызывов iife (function() {})()
    'wrap-iife': ['error', 'inside'],
    // разрешить / запретить анонимные функции
    'func-names': ['error'],
    // скобок вокруг функций arrow: () => 'hello';
    'arrow-body-style': ['error', 'always'],
    // использовать export default если в файле используется всего 1 export
    'import/prefer-default-export': ['off'],
    // использования export default
    'import/no-default-export': 'error',
    // правила на расширения в пути при импорте 'index.js' || 'index'
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
  },
};
