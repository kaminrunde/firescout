/// <reference path="../support/firescout.d.ts" />

context('index-page', () => {
  
  it('can open modal', () => {
    cy.visit('http://localhost:8000')

    cy.context('pages/Index')
      .shouldNotHaveState('modal-open')
      .handle('modal')
      .click()

    cy.context('pages/Index')
      .shouldHaveState('modal-open')

    cy.context('pages/Index')
      .collection('inner',1)
      .handle('inner-modal')
      .click()
  })
})
