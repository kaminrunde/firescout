/// <reference path="../support/firescout.d.ts" />

context('index-page', () => {
  
  it('can open modal', () => {
    cy.visit('http://localhost:8000')

    cy.context('pages/Index')
      .handle('modal')
      .click()
  })
})
