module.exports = function rule (context) {
  return {
    JSXOpeningElement(node) {
      const hasOnClick = node.attributes.find(node => node.name.name === 'onClick')
      const hasHandle = node.attributes.find(node => node.name.name === 'data-cy-handle')
      
      if(hasOnClick && !hasHandle) {
      	context.report({
        	node:node,
          	message: 'clickable elements need a data-cy-handle attribute'
        })
      }
    }
  }
}