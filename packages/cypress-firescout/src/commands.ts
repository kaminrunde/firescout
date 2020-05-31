/// <reference types="cypress" />


Cypress.Commands.add("component", {prevSubject:'optional'}, (subject, name, index) => {
  let cmd
  if(subject) cmd = cy.get(`${subject.selector} [data-cy-ctx="${name}"]`)
  else if (typeof index === 'string') cmd = cy.contains(`[data-cy-ctx="${name}"]`, index)
  else cmd = cy.get(`[data-cy-ctx="${name}"]`)

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

Cypress.Commands.add("hasState", {prevSubject:'optional'}, (subject, name) => {
  return cy.get(subject).should('contain.html', `data-cy-state="${name}"`)
})

Cypress.Commands.add("notHasState", {prevSubject:'optional'}, (subject, name) => {
  return cy.get(subject).should('not.contain.html', `data-cy-state="${name}"`)
})

// Cypress.Commands.add('module', name => {
//   return cy.wrap(name, {log:false})
// })

// Cypress.Commands.add('mock', {prevSubject:true}, (subject,name,response='default',as) => {
//   const id = `${subject}.${name}`
//   const cb = win => {
//     let fixture = response
//     if(!win.cymocks) win.cymocks = {}
//     if(typeof response === 'string'){
//       fixture = require(`../fixtures/${subject}/${name}${response !== 'default' ? ('.'+response) : ''}.ts`).default
//     }
//     win.cymocks[id] = cy.stub().as(as || id).resolves(fixture)
//   }
//   cy.window({log:false}).then(cb)
//   Cypress.on('window:before:load', cb)
//   Cypress.on('test:after:run', () => {
//     Cypress.off('window:before:load', cb)
//   })
//   return cy.wrap(subject, {log:false})
// })

// Cypress.SelectorPlayground.defaults({
//   onElement: ($el) => {
//     let list = []
//     let $parent = $el
//     let max = 500
//     while(max--){
//       if($parent.tagName === 'body') break
//       let id = $parent.attr('data-cy-ctx')
//       let handle = $parent.attr('data-cy-handle')
//       if(handle) list.push({type:'handle', el:$parent, payload:handle})
//       if(id) list.push({type:'id', el:$parent, payload:id})
//       $parent = $parent.parent()
//     }

//     list = list.reverse()

//     for(let i=0; i<list.length; i++){
//       let current = list[i]
//       let next = list[i+1]
//       if(!next) continue
//       let name = `data-cy-${next.type}` 
//       let value = next.el.attr(name)
//       let items = current.el.find(`[${name}="${value}"]`)
//       if(items.length > 1){
//         next.index = items.index(next.el)
//       }
//     }

//     const selector = list.map(row => {
//         if(row.type === 'id'){
//           if(typeof row.index === 'number'){
//             return `.widget('${row.payload}', ${row.index})`
//           }
//           else return `.widget('${row.payload}')`
//         }
//         if(row.type === 'handle'){
//           if(typeof row.index === 'number'){
//             return `.handle('${row.payload}', ${row.index})`
//           }
//           else return `.handle('${row.payload}')`
//         }
//       })
//       .join('')

//     return 'cy' + selector
//   }
// })