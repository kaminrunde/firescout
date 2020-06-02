var {transformSync} = require('@babel/core')
var plugin = require('.')

const code = `
import * as React from 'react'

export default function Wishlist () {
  let loggedIn = false
  let hits = []

  if(!loggedIn) return (
    <div className="foo" data-cy-ctx='organisms/Wishlist'>
      <span data-cy-state='login-required'></span>
      <p>You need to login</p>
    </div>
  )

  if(hits.length === 0) return (
    <div data-cy-ctx='organisms/Wishlist'>
      {loggedIn && <span data-cy-state='empty'></span>}
      <p>no products found</p>
    </div>
  )

  return (
    <div data-cy-ctx='organisms/Wishlist'>
      {loggedIn && <span data-cy-state='filled'/>}
      <p>products found</p>
      <button data-cy-handle='subscribe'>subscribe</button>
    </div>
  )
}
`

const output = transformSync(code, {
  presets: ["@babel/preset-react"],
  plugins: [plugin],
});

if(output){
  console.log(output.code); // 'const x = 1;'
}
else console.log('null')
