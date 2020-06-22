import * as React from 'react'

export default function Wishlist (): JSX.Element {
  const loggedIn = false
  const hits = []

  if(!loggedIn) return (
    <div data-cy-ctx='organisms/Wishlist'>
      <span data-cy-state='login-required'></span>
      <p>You need to login</p>
    </div>
  )

  if(hits.length === 0) return (
    <div data-cy-ctx='organisms/Wishlist'>
      <span data-cy-state='empty'></span>
      <p>no products found</p>
    </div>
  )

  return (
    <div data-cy-ctx='organisms/Wishlist'>
      <span data-cy-state='filled'></span>
      <p>products found</p>
      <button data-cy-handle='subscribe'>subscribe</button>
    </div>
  )
}