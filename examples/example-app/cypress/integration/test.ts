/// <reference types="cypress" />
/// <reference path="../support/firescout.d.ts" />

export const foo = ''

context('Actions', () => {
  it('test', () => {
    // cy.component('organisms/Wishlist')
    //   .collection('ColorFilter')
    //   .shouldHaveState('selected')
    //   .handle('clear-button')
    //   .click()

    cy.module('cart')
      .fn('fetch')
      .mock('default')
    

    // cy.module('cart').function('fetch').mockWith('default')
  })
})
