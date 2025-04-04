/// <reference types="cypress" />

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

Cypress.Commands.add('context', { prevSubject: 'optional' }, (subject: any, name, index) => {
  let cmd
  if (subject) cmd = cy.get(`${subject.selector} [data-cy-ctx="${name}"]`)
  else if (typeof index === 'string') cmd = cy.contains(`[data-cy-ctx="${name}"]`, index)
  else cmd = cy.get(`[data-cy-ctx="${name}"]`)

  if (typeof index === 'number') {
    cmd = cmd.eq(index)
  }
  return cmd
})

Cypress.Commands.add('collection', { prevSubject: 'optional' }, (subject: any, name, index) => {
  let cmd
  if (subject) cmd = cy.get(`${subject.selector} [data-cy-collection="${name}"]`)
  else if (typeof index === 'string') cmd = cy.contains(`[data-cy-collection="${name}"]`, index)
  else cmd = cy.get(`[data-cy-collection="${name}"]`)

  if (typeof index === 'number') {
    cmd = cmd.eq(index)
  }
  return cmd
})

Cypress.Commands.add('handle', { prevSubject: 'optional' }, (subject: any, name, index) => {
  let cmd
  if (subject.attr('data-cy-handle') === name) return cy.get(subject.selector)
  else if (subject) cmd = subject.find(`[data-cy-handle="${name}"]`)
  else if (typeof index === 'string') cmd = cy.contains(`[data-cy-handle="${name}"]`, index)
  else cmd = cy.get(`[data-cy-handle="${name}"]`)

  if (typeof index === 'number') {
    cmd = cmd.eq(index)
  }

  return cmd
})

Cypress.Commands.add(
  'shouldHaveState',
  { prevSubject: 'optional' },
  (subject: any, name, implementations: string) => {
    const imps = implementations ? implementations.split(',') : null
    cy.get(subject).should(($el) => {
      const ctx = $el.attr('data-cy-ctx') || $el.attr('data-cy-collection')

      if (imps)
        for (let imp of imps) {
          if ($el.attr('data-cy-state') === `${name}:${imp}`) {
            expect($el, ctx).to.have.attr('data-cy-state', `${name}:${imp}`)
          } else {
            expect($el, ctx).to.include.html(`data-cy-state="${name}:${imp}"`)
          }
        }
      else {
        if ($el.attr('data-cy-state') === name) {
          expect($el, ctx).to.have.attr('data-cy-state', name)
        } else {
          expect($el, ctx).to.include.html(`data-cy-state="${name}"`)
        }
      }
    })
    return cy.get(subject)
  }
)

Cypress.Commands.add('shouldNotHaveState', { prevSubject: 'optional' }, (subject: any, name) => {
  cy.get(subject).should(($el) => {
    const html = Cypress.$('<div>').append($el.clone()).html()
    const ctx = $el.attr('data-cy-ctx') || $el.attr('data-cy-collection')
    const regex = new RegExp(`data-cy-state="${name}[^"]*"`, 'g')
    const matches = html.match(regex)

    if (!matches) {
      if ($el.attr('data-cy-state') === name) {
        expect($el, ctx).not.to.have.attr('data-cy-state', name)
      } else {
        expect($el, ctx).not.to.include.html(`data-cy-state="${name}"`)
      }
    } else {
      if ($el.attr('data-cy-state') === matches[0]) {
        expect($el, ctx).not.to.have.attr('data-cy-state', matches[0])
      } else {
        expect($el, ctx).not.to.include.html(matches[0])
      }
    }
  })
  return cy.get(subject)
})

Cypress.Commands.add('module', (module) => {
  return cy.wrap(module, { log: false })
})

Cypress.Commands.add('fn', { prevSubject: true }, (module, name) => {
  return cy.wrap([module, name], { log: false })
})

Cypress.Commands.add('variable', { prevSubject: true }, (module, name) => {
  return cy.wrap([module, name], { log: false })
})

//@ts-ignore
Cypress.Commands.add('set', { prevSubject: true }, ([module, name], data) => {
  const cb = (win: any) => {
    const id = `${module}.${name}`
    if (!win.firescoutVars) win.firescoutVars = {}
    win.firescoutVars[id] = data
  }
  cy.window({ log: false }).then(cb)
  Cypress.on('window:before:load', cb)
  Cypress.on('test:after:run', () => {
    Cypress.off('window:before:load', cb)
  })
  return cy.wrap([module, name], { log: false })
})

//@ts-ignore
Cypress.Commands.add('load', { prevSubject: true }, ([module, name], variation) => {
  let get: any = () => null
  if (Cypress.env('firescoutTsFixtures')) {
    let path =
      variation === 'default'
        ? `firescout/${module}/${name}.ts`
        : `firescout/${module}/${name}.${variation}.ts`
    if (variation) {
      cy.fixture(path).then((file) => {
        const content = file.split('\n').join(' ')
        const match = content.match(/\/\*fs-start\*\/(.*)\/\*fs-end\*\//)
        if (!match)
          throw new Error(
            `firescout mocks need to have content /*fs-start*/.../*fs-end*/. Please check fixtures/firescout/${module}/${name}.${variation}.ts`
          )
        const fn = new Function(`return ${match[1]}`)
        const json = fn()
        get = () => json
      })
    }
  } else {
    let path =
      variation === 'default'
        ? `firescout/${module}/${name}`
        : `firescout/${module}/${name}.${variation}`
    if (variation) {
      cy.fixture(path).then((file) => {
        get = () => file
      })
    }
  }
  const cb = (win: any) => {
    const id = `${module}.${name}`
    if (!win.firescoutVars) win.firescoutVars = {}
    win.firescoutVars[id] = get()
  }
  cy.window({ log: false }).then(cb)
  Cypress.on('window:before:load', cb)
  Cypress.on('test:after:run', () => {
    Cypress.off('window:before:load', cb)
  })
  return cy.wrap([module, name], { log: false })
})

//@ts-ignore
Cypress.Commands.add(
  'mock',
  { prevSubject: true },
  ([module, name], variation, rootOpt: any = {}) => {
    let get: any = () => null
    let getOptions: any = () => ({})
    if (Cypress.env('firescoutTsFixtures')) {
      let path =
        variation === 'default'
          ? `firescout/${module}/${name}.ts`
          : `firescout/${module}/${name}.${variation}.ts`
      if (variation) {
        cy.fixture(path).then((file) => {
          const content = file.split('\n').join(' ')
          const match = content.match(/\/\*fs-start\*\/(.*)\/\*fs-end\*\//)
          const sync = !!content.match(/\* @sync/)
          const throws = !!content.match(/\* @throws/)
          if (!match)
            throw new Error(
              `firescout mocks need to have content /*fs-start*/.../*fs-end*/. Please check fixtures/firescout/${module}/${name}.${variation}.ts`
            )
          const fn = new Function(`return ${match[1]}`)
          const json = fn()
          const hasOptions = typeof json === 'object' && json && Boolean(json.__firescoutOptions)
          let options = { sync, throws }
          if (hasOptions) {
            options = {
              sync: Boolean(json.__firescoutOptions.sync),
              throws: Boolean(json.__firescoutOptions.throws),
            }
          }
          get = rootOpt.timeout
            ? () => new Promise((resolve) => setTimeout(() => resolve(json), rootOpt.timeout))
            : () => json
          getOptions = () => options
        })
      }
    } else {
      let path =
        variation === 'default'
          ? `firescout/${module}/${name}`
          : `firescout/${module}/${name}.${variation}`
      if (variation) {
        cy.fixture(path).then((file) => {
          const hasOptions = typeof file === 'object' && file && Boolean(file.__firescoutOptions)
          const result = hasOptions ? file.value : file
          if (hasOptions) {
            getOptions = () => ({
              sync: Boolean(file.__firescoutOptions.sync),
              throws: Boolean(file.__firescoutOptions.throws),
            })
          }
          get = rootOpt.timeout
            ? () => new Promise((resolve) => setTimeout(() => resolve(result), rootOpt.timeout))
            : () => result
        })
      }
    }
    const cb = (win: any) => {
      const id = `${module}.${name}`
      if (!win.cymocks) win.cymocks = {}
      const options = getOptions()
      let result = get()
      if (rootOpt.transform) result = rootOpt.transform(result)
      win.cymocks[id] = {
        type: 'mock',
        cb: options.sync
          ? cy.stub().as(id).returns(result)
          : options.throws || rootOpt.throws
          ? cy.stub().as(id).rejects(result)
          : cy.stub().as(id).resolves(result),
        options,
      }
    }
    cy.window({ log: false }).then(cb)
    Cypress.on('window:before:load', cb)
    Cypress.on('test:after:run', () => {
      Cypress.off('window:before:load', cb)
    })
    return cy.wrap([module, name], { log: false })
  }
)

//@ts-ignore
Cypress.Commands.add('doesReturn', { prevSubject: true }, ([module, name], data, opt: any = {}) => {
  const get = opt.timeout
    ? () => new Promise((resolve) => setTimeout(() => resolve(data), opt.timeout))
    : () => data
  const cb = (win: any) => {
    const id = `${module}.${name}`
    if (!win.cymocks) win.cymocks = {}
    const result = get()
    win.cymocks[id] = {
      type: 'mock',
      cb: opt.sync
        ? cy.stub().as(id).returns(result)
        : opt.throws
        ? cy.stub().as(id).rejects(result)
        : cy.stub().as(id).resolves(result),
      options: {},
    }
  }
  cy.window({ log: false }).then(cb)
  Cypress.on('window:before:load', cb)
  Cypress.on('test:after:run', () => {
    Cypress.off('window:before:load', cb)
  })
  return cy.wrap([module, name], { log: false })
})

//@ts-ignore
Cypress.Commands.add('createStub', { prevSubject: true }, ([module, name]) => {
  const cb = (win: any) => {
    const id = `${module}.${name}`
    if (!win.cymocks) win.cymocks = {}
    win.cymocks[id] = {
      type: 'stub',
      cb: cy.stub().as(id),
      options: {},
    }
  }
  cy.window({ log: false }).then(cb)
  Cypress.on('window:before:load', cb)
  Cypress.on('test:after:run', () => {
    Cypress.off('window:before:load', cb)
  })
  return cy.wrap([module, name], { log: false })
})
