/// <reference types="cypress" />


Cypress.Commands.add("context", {prevSubject:'optional'}, (subject, name, index) => {
  let cmd
  if(subject) cmd = cy.get(`${subject.selector} [data-cy-ctx="${name}"]`)
  else if (typeof index === 'string') cmd = cy.contains(`[data-cy-ctx="${name}"]`, index)
  else cmd = cy.get(`[data-cy-ctx="${name}"]`)

  if(typeof index === 'number'){
    cmd = cmd.eq(index)
  }
  return cmd
})

Cypress.Commands.add("collection", {prevSubject:'optional'}, (subject, name, index) => {
  let cmd
  if(subject) cmd = cy.get(`${subject.selector} [data-cy-collection="${name}"]`)
  else if (typeof index === 'string') cmd = cy.contains(`[data-cy-collection="${name}"]`, index)
  else cmd = cy.get(`[data-cy-collection="${name}"]`)

  if(typeof index === 'number'){
    cmd = cmd.eq(index)
  }
  return cmd
})

Cypress.Commands.add("handle", {prevSubject:'optional'}, (subject, name, index) => {
  let cmd
  if(subject.attr('data-cy-handle') === name) return cy.get(subject.selector)
  else if(subject) cmd = subject.find(`[data-cy-handle="${name}"]`)
  else if (typeof index === 'string') cmd = cy.contains(`[data-cy-handle="${name}"]`, index)
  else cmd = cy.get(`[data-cy-handle="${name}"]`)

  if(typeof index === 'number'){
    cmd = cmd.eq(index)
  }

  return cmd
})

Cypress.Commands.add("shouldHaveState", {prevSubject:'optional'}, (subject, name) => {
  cy.get(subject).then($el => {
    const html = Cypress.$('<div>').append($el.clone()).html()
      const ctx = $el.attr('data-cy-ctx')

      expect(html).to.include(`data-cy-state="${name}"`,
        `"${ctx}" should have state "${name}"`)
  })
  return cy.get(subject)
})

Cypress.Commands.add("shouldNotHaveState", {prevSubject:'optional'}, (subject, name) => {
  cy.get(subject).then($el => {
    const html = Cypress.$('<div>').append($el.clone()).html()
      const ctx = $el.attr('data-cy-ctx')

      expect(html).not.to.include(`data-cy-state="${name}"`,
        `"${ctx}" should not have state "${name}"`)
  })
  return cy.get(subject)
})

Cypress.Commands.add('module', module => {
  return cy.wrap(module, {log:false})
})

Cypress.Commands.add('fn', {prevSubject:true}, (module, name) => {
  return cy.wrap([module,name], {log:false})
})

Cypress.Commands.add('mock', {prevSubject:true}, ([module,name], variation) => {
  let get:any = ()=>null
  let path = variation === 'default'
    ? `firescout/${module}/${name}.ts`
    : `firescout/${module}/${name}.${variation}.ts`
  cy.fixture(path).then(file => {
    const match = file.split('\n').join(' ').match(/\/\*fs-start\*\/(.*)\/\*fs-end\*\//)
    if(!match) throw new Error(`firescout mocks need to have content /*fs-start*/.../*fs-end*/. Please check fixtures/firescout/${module}/${name}.${variation}.ts`)
    const fn = new Function(`return ${match[1]}`)
    get = () => fn()
  })
  const cb = (win:any) => {
    const id = `${module}.${name}`
    if(!win.cymocks) win.cymocks = {}
    win.cymocks[id] = cy.stub().as(id).resolves(get())
  }
  cy.window({log:false}).then(cb)
  Cypress.on('window:before:load', cb)
  Cypress.on('test:after:run', () => {
    Cypress.off('window:before:load', cb)
  })
  return cy.wrap([module,name], {log:false})
})
