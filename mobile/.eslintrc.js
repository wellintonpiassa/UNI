module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-curly-brace-presence': [
          'error',
          { props: 'never', children: 'never' },
        ],
        'import/namespace': 'off',
        'import/no-unresolved': 'error',
        'import/no-unused-modules': ['error', { unusedExports: true }],
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'type',
              'sibling',
              'index',
              'object',
            ],
            'newlines-between': 'always',
            alphabetize: { order: 'asc', caseInsensitive: true },
            pathGroups: [
              {
                pattern: '*.png',
                group: 'object',
                patternOptions: { dot: true, nocomment: true, matchBase: true },
              },
            ],
          },
        ],
        'no-console': 'error',
        'react/jsx-sort-props': [
          'error',
          { callbacksLast: true, shorthandLast: true },
        ],
      },
    },
  ],
};
