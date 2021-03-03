/**
 * @fileoverview each jsx element with a onClick needs a data-cy-handle
 * @author Manuel Jung
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/onclick-needs-handle'),
  RuleTester = require('eslint').RuleTester

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: { jsx: true }
  }
})

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester()
ruleTester.run('onclick-needs-handle', rule, {
  valid: [
    {
      code: "var foo = <button data-cy-handle='foo' onClick={console.log} />"
    },
    {
      code:
        "var foo = <button data-cy-handle-foo='foo' onClick={console.log} />"
    },
    {
      code: "var foo = <button data-cy-ctx='foo' onClick={console.log} />"
    },
    {
      code: "var foo = <button data-cy-collection='foo' onClick={console.log} />"
    }
  ],

  invalid: [
    {
      code: 'var foo = <button onClick={console.log} />',
      errors: [
        {
          message: 'clickable elements need a data-cy-handle attribute',
          type: 'JSXOpeningElement'
        }
      ]
    }
  ]
})
