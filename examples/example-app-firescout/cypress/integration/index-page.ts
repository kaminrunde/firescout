// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/firescout.d.ts"/>

context('index-page', () => {
  
  it('can open modal', () => {
    cy.visit('http://localhost:8000')

    cy.module('cart')
      .fn('fetch')
      .mock('default')

    cy.context('pages/Index')
      .shouldNotHaveState('modal-open')
      .handle('handle')
      .click()

    cy.context('pages/Index')
      .shouldHaveState('modal-open')

    cy.context('pages/Index')
      .collection('inner',1)
      .handle('inner-modal')
      .click()
  })
})
