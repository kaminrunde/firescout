/// <reference types="cypress" />
/// <reference path="../support/firescout-types.ts" />

context('Actions', () => {
  it('test', () => {
    cy.component('organisms/Wishlist')
      .collection('ColorFilter')
      .hasState('selected')
      .handle('clear-button')
      .click()
  })
})
