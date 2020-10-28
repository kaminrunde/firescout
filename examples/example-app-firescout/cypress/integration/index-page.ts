// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/firescout.d.ts"/>

context('index-page', () => {
  
  it('can open modal', () => {
    cy.visit('http://localhost:8000')

    cy.module('cart')
      .fn('fetch')
      .mock()

    cy.context('components/Home')
      .shouldNotHaveState('secret-visible')
      .handle('open-secret')
      .click()

    cy.context('components/Home')
      .shouldHaveState('secret-visible', 'text-1,text-2')

    cy.context('components/Home')
      .collection('Inner',1)
      .handle('open-inner-secret')
      .click()

    cy.get('@cart.fetch').should('be.called')
  })

  it.only('can manipulate variables', () => {
    cy.module('Home').variable('test').set('TADA!!!!!')
    cy.visit('http://localhost:8000')
  })
})
