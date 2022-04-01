declare namespace Cypress {
  interface Chainable {
    context: string
    collection: string
    handle: string
    shouldHaveState: string
    shouldNotHaveState: string
    module: string
    fn: string
    variable: string
    set: string
    load: string
    mock: string
    doesReturn: string
    createStub: string
  }
}
