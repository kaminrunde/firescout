/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />

context('Actions', () => {
  it('test', () => {
    cy.component('organisms/Wishlist')
      .collection('ColorFilter')
      .hasState('selected')
      .handle('clear-button')
      .click()
  })
})
