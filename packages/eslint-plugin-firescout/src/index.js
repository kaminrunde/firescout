// /**
//  * @fileoverview Rule to warn on required firescout handles
//  * @author Manuel Jung
//  */

// "use strict";

// //------------------------------------------------------------------------------
// // Rule Definition
// //------------------------------------------------------------------------------

const rules = {
  'onclick-needs-handle':{
      meta: {
          type: "suggestion",

          docs: {
              description: "warn on required firescout handles",
              category: "Possible Errors",
              recommended: true,
              url: ""
          },
          fixable: "code",
          schema: [] // no options
      },
      create: require('./rule')
  }
}

// module.exports = {
//   rules: rules
// }

module.exports.rules = rules