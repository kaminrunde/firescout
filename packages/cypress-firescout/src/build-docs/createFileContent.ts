import {Tree} from './createCommandTree'
import {Docs} from './createDocs'

export default function createFileContent (tree:Tree[], docs:Docs[]):string {
  return `
    /// <reference types="cypress" />

    ${tree.map(node => `
      interface ${node.typesaveContext} extends Cypress.Chainable<Element> {
        ${node.handles.map(handle => `
          /** 
           * ${node.docs?.handles.bullets.find(row => row.name === handle.name)?.value || ''}
           * @name ${handle.name}
           * @file ${handle.file}
           */
          handle(name:'${handle.name}', index?:number|string): Cypress.Chainable<Element>
        `).join('\n')}

        ${node.states.map(state => `
          /** 
           * ${node.docs?.states.bullets.find(row => row.name === state.name)?.value || ''}
           * @name ${state.name}
           * @file ${state.file}
           */
          hasState(name:'${state.name}', index?:number|string): Cypress.Chainable<Element>

          /** 
           * ${node.docs?.states.bullets.find(row => row.name === state.name)?.value || ''}
           * @name ${state.name}
           * @file ${state.file}
           */
          notHasState(name:'${state.name}', index?:number|string): Cypress.Chainable<Element>
        `).join('\n')}
      }
    `)}

    declare namespace Firescout {
      ${tree.map(node => `
        /** 
         * ${node.docs?.description || '...'} 
         * @name ${node.context}
         * @file ${node.file}
         * @docs_file ${node.docsFile || '-'}
         */
        function component (name:'${node.context}', index?:number|string):${node.typesaveContext}
      `).join('\n')}
    }
  `.split('\n').slice(1).map(s => s.trim()).join('\n')
}