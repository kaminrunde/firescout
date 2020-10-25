/**
 * @fileoverview each jsx expression that conditionally renders a jsx element needs a data-cy-state
 * @author Manuel Jung
 */
'use strict'

const traverse = require('eslint-traverse')

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description:
        'each jsx expression that conditionally renders a jsx element needs a data-cy-state',
      category: 'Fill me in',
      recommended: true
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create: function (context) {
    return {
      JSXExpressionContainer (node) {
        if (node.expression.type === 'LogicalExpression') {
          if (node.expression.right.type !== 'JSXElement') return
          const el = node.expression.right.openingElement
          const state = el.attributes.find(attr =>
            attr.name.name.startsWith('data-cy-state')
          )

          if (!state)
            context.report({
              node: el,
              message: 'jsx logical expression needs data-cy-state'
            })
        }
        // const isConditional =
        //   node.expression.type === 'LogicalExpression' ||
        //   node.expression.type === 'ConditionalExpression'

        // if (!isCondition) return
        // if (node.expression.right.type !== 'JSXElement') return

        // const el =

        // if (isConditional) {

        // let stateFound = false
        // traverse(context, node, path => {
        //     if(path.node.type === 'JSXOpeningElement')
        // })
        // context.report({
        //     node:node,
        //     message: 'clickable elements need a data-cy-handle attribute'
        // })
        // }
      }
    }
  }
}
