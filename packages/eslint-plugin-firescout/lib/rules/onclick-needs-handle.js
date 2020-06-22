/**
 * @fileoverview each jsx element with a onClick needs a data-cy-handle
 * @author Manuel Jung
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "each jsx element with a onClick needs a data-cy-handle",
            category: "Fill me in",
            recommended: true
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {

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
};
