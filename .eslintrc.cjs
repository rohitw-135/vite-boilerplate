module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:import/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended'
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier', 'import'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    },
    settings: {
        'import/resolver': {
            typescript: {}
        },
        react: {
            version: 'detect'
        }
    }
};
