import * as React from 'react'

export default function Wishlist () {
  let loggedIn = false
  let hits = []

  if(!loggedIn) return (
    <div data-cy-ctx='Wishlist'>
      <span data-cy-status='login-required'></span>
      <p>You need to login</p>
    </div>
  )

  if(hits.length === 0) return (
    <div data-cy-ctx='Wishlist'>
      <span data-cy-status='empty'></span>
      <p>no products found</p>
    </div>
  )

  return (
    <div data-cy-ctx='Wishlist'>
      <span data-cy-status='filled'></span>
      <p>products found</p>
      <button data-cy-trigger='subscribe'>subscribe</button>
    </div>
  )
}