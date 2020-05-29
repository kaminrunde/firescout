import {Tree} from './createCommandTree'

export default function createFileContent (tree:Tree):string {
  return `
    /// <reference types="cypress" />

    ${tree.map(node => `
      interface ${node.typesaveContext} extends Cypress.Chainable<Element> {
        ${node.triggers.map(trigger => `
          /** 
           * ${node.docs?.triggers.bullets.find(row => row.name === trigger.name)?.value || ''}
           * @name ${trigger.name}
           * @file ${trigger.file}
           */
          handle(name:'${trigger.name}', index?:number|string): Cypress.Chainable<Element>
        `).join('\n')}

        ${node.states.map(state => `
          /** 
           * ${node.docs?.states.bullets.find(row => row.name === state.name)?.value || ''}
           * @name ${state.name}
           * @file ${state.file}
           */
          hasFlag(name:'${state.name}', index?:number|string): Cypress.Chainable<Element>

          /** 
           * ${node.docs?.states.bullets.find(row => row.name === state.name)?.value || ''}
           * @name ${state.name}
           * @file ${state.file}
           */
          notHasFlag(name:'${state.name}', index?:number|string): Cypress.Chainable<Element>
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
        function component (name:'${node.context}', index?:number):${node.typesaveContext}
      `).join('\n')}
    }
  `.split('\n').slice(1).map(s => s.trim()).join('\n')
}