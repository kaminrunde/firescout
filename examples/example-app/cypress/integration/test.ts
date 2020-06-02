/// <reference types="cypress" />
/// <reference path="../support/firescout-types.ts" />

context('Actions', () => {
  it('test', () => {
    // cy.module('cart')
    //   .fn('fetch')
    //   .mock('default')

    cy.visit('localhost:3000')
    cy.component('organisms/Wishlist')
    //   .collection('ColorFilter')
    //   .shouldHaveState('selected')
    //   .handle('clear-button')
    //   .click()

    // cy.module('cart')
    //   .fn('fetch')
    //   .mock('default')
    

    // cy.module('cart').function('fetch').mockWith('default')
  })
})
