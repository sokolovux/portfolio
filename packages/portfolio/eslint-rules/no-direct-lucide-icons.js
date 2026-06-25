export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow direct Lucide icon JSX; render via the shared Icon wrapper',
    },
    messages: {
      direct:
        'Use <Icon icon={{{name}}} /> instead of <{{name}} />. Import icons from lucide-react by name only.',
    },
  },
  create(context) {
    const lucideImports = new Set()

    return {
      ImportDeclaration(node) {
        if (node.source.value !== 'lucide-react') {
          return
        }

        node.specifiers.forEach((specifier) => {
          if (specifier.type === 'ImportSpecifier') {
            lucideImports.add(specifier.local.name)
          }
        })
      },
      JSXOpeningElement(node) {
        if (node.name.type !== 'JSXIdentifier') {
          return
        }

        const { name } = node.name

        if (name === 'Icon' || !lucideImports.has(name)) {
          return
        }

        context.report({
          node,
          messageId: 'direct',
          data: { name },
        })
      },
    }
  },
}
