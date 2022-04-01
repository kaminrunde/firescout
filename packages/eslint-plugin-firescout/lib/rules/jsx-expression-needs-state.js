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
      recommended: true,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ],
  },

  create: function (context) {
    return {
      JSXExpressionContainer(node) {
        if (node.expression.type === 'LogicalExpression') {
          if (node.expression.right.type !== 'JSXElement') return
          const el = node.expression.right.openingElement
          if (!hasDataCyState(el)) {
            context.report({
              node: el,
              message: 'jsx logical expression needs data-cy-state',
            })
          }
        }

        if (node.expression.type === 'ConditionalExpression') {
          const left = node.expression.consequent
          const right = node.expression.alternate

          let leftHasState = false
          let rightHasState = false
          let leftIsEl = true
          let rightIsEl = true

          if (left.type === 'JSXElement') {
            if (hasDataCyState(left.openingElement)) leftHasState = true
          } else {
            leftIsEl = false
          }

          if (right.type === 'JSXElement') {
            if (hasDataCyState(right.openingElement)) rightHasState = true
          } else {
            rightIsEl = false
          }

          if (leftIsEl || rightIsEl) {
            if (!leftHasState && !rightHasState) {
              context.report({
                node: left.openingElement,
                message: 'jsx conditional expression needs data-cy-state',
              })
            }
          }
        }
      },
    }
  },
}

function hasDataCyState(openingElement) {
  const state = openingElement.attributes.find(
    (attr) => attr && attr.name && attr.name.name.startsWith('data-cy-state')
  )
  return Boolean(state)
}
