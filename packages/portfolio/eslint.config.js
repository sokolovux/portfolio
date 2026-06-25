import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import noBootstrapCloseIcon from './eslint-rules/no-bootstrap-close-icon.js'
import noDirectLucideIcons from './eslint-rules/no-direct-lucide-icons.js'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      portfolio: {
        rules: {
          'no-direct-lucide-icons': noDirectLucideIcons,
          'no-bootstrap-close-icon': noBootstrapCloseIcon,
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'portfolio/no-direct-lucide-icons': 'error',
      'portfolio/no-bootstrap-close-icon': 'error',
    },
  },
]
