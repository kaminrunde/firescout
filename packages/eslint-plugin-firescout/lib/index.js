/**
 * @fileoverview Adds hints for usage with cypress-firescout
 * @author Manuel Jung
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");



// import processors
module.exports.processors = {

    // add your processors here
};

module.exports.config = {
    recommended: {
        rules: {
            'on-click-needs-handle': 1
        }
    }
}

