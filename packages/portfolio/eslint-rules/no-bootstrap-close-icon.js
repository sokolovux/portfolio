export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow Bootstrap btn-close; use Lucide X via Icon on btn btn-link',
    },
    messages: {
      btnClose:
        'Do not use Bootstrap btn-close. Use Lucide X through Icon on a btn btn-link with aria-label.',
    },
  },
  create(context) {
    function checkClassValue(node, value) {
      if (typeof value === 'string' && /\bbtn-close\b/.test(value)) {
        context.report({ node, messageId: 'btnClose' })
      }
    }

    return {
      JSXAttribute(node) {
        if (node.name.name !== 'className' || !node.value) {
          return
        }

        if (node.value.type === 'Literal') {
          checkClassValue(node, node.value.value)
          return
        }

        if (node.value.type === 'JSXExpressionContainer' && node.value.expression.type === 'Literal') {
          checkClassValue(node, node.value.expression.value)
        }
      },
    }
  },
}
