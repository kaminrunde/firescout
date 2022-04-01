/**
 * @fileoverview each jsx element with a onClick needs a data-cy-handle
 * @author Manuel Jung
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/jsx-expression-needs-state'),
  RuleTester = require('eslint').RuleTester

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
})

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester()
ruleTester.run('jsx-expression-needs-state', rule, {
  valid: [
    {
      code: "var foo = <div>{foo && <div data-cy-state='foo'/>}</div>",
    },
    {
      code: "var foo = <div>{foo && <div data-cy-state-foo='foo'/>}</div>",
    },
    {
      code: "var foo = <div>{foo && <div {...p} data-cy-state-foo='foo'/>}</div>",
    },
    {
      code: `var foo = (
          <div>
            {foo ? <div data-cy-state='visible'/> : <div/>}
          </div>
        )
      `,
    },
    {
      code: `var foo = (
          <div>
            {foo ? <div/> : <div data-cy-state='visible'/>}
          </div>
        )
      `,
    },
  ],

  invalid: [
    {
      code: 'var foo = <div>{foo && <div/>}</div>',
      errors: [
        {
          message: 'jsx logical expression needs data-cy-state',
          type: 'JSXOpeningElement',
        },
      ],
    },
    {
      code: 'var foo = <div>{foo && <div/>}</div>',
      errors: [
        {
          message: 'jsx logical expression needs data-cy-state',
          type: 'JSXOpeningElement',
        },
      ],
    },
    {
      code: 'var foo = <div>{foo ? <div/> : <div/>}</div>',
      errors: [
        {
          message: 'jsx conditional expression needs data-cy-state',
          type: 'JSXOpeningElement',
        },
      ],
    },
  ],
})
