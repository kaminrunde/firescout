var {getProp} = require('jsx-ast-utils')

module.exports = function removeFirescoutPlugin() {
  return {
    visitor: {
      JSXOpeningElement({node}) {
        const ctx = getProp(node.attributes, 'data-cy-ctx')
        const handle = getProp(node.attributes, 'data-cy-handle')
        const state = getProp(node.attributes, 'data-cy-state')
        const collection = getProp(node.attributes, 'data-cy-collection')

        // remove data-cy attributes
        if(ctx || handle || state || collection) {
          node.attributes = node.attributes.filter(node => {
            if(node === ctx 
            || node === handle
            || node === state
            || node === collection) return false
            return true
          })
        }
      },
    },
  };
}