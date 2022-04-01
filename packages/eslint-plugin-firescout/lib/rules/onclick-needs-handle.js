/**
 * @fileoverview each jsx element with a onClick needs a data-cy-handle
 * @author Manuel Jung
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'each jsx element with a onClick needs a data-cy-handle',
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
      JSXOpeningElement(node) {
        var hasOnClick = false
        var hasHandle = false
        var hasCtx = false
        var hasColl = false
        for (var innerNode of node.attributes) {
          if (innerNode && innerNode.name && innerNode.name.name) {
            if (innerNode.name.name === 'onClick') hasOnClick = true
            if (innerNode.name.name.includes('data-cy-handle')) hasHandle = true
            if (innerNode.name.name.includes('data-cy-ctx')) hasCtx = true
            if (innerNode.name.name.includes('data-cy-collection')) hasColl = true
          }
        }
        if (hasOnClick && !hasHandle && !hasCtx && !hasColl) {
          context.report({
            node: node,
            message: 'clickable elements need a data-cy-handle attribute',
          })
        }
      },
    }
  },
}
