/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />

context('Actions', () => {
  it('test', () => {
    cy.component('organisms/Wishlist')
      .collection('ColorFilter')
      .handle('clear-button')
      .click()
  })
})
