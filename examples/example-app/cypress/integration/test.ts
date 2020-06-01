/// <reference types="cypress" />
/// <reference path="../support/firescout-types.ts" />

context('Actions', () => {
  it('test', () => {
    cy.component('organisms/Wishlist')
      .collection('ColorFilter')
      .shouldHaveState('selected')
      .handle('clear-button')
      .click()

    cy.module('cart')
      .fn('fetch')
    

    // cy.module('cart').function('fetch').mockWith('default')
  })
})
