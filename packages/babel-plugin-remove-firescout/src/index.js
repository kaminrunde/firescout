var {getProp} = require('jsx-ast-utils')

module.exports = function removeFirescoutPlugin() {
  return {
    name: 'remove-firescout',
    visitor: {
      JSXOpeningElement({node}) {
        const ctx = node.attributes.find(node => node && node.name && node.name.name.includes('data-cy-ctx'))
        const handle = node.attributes.find(node => node && node.name && node.name.name.includes('data-cy-handle'))
        const state = node.attributes.find(node => node && node.name && node.name.name.includes('data-cy-state'))
        const collection = node.attributes.find(node => node && node.name && node.name.name.includes('data-cy-collection'))

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