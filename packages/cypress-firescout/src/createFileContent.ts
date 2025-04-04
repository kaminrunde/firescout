import { Tree } from '@kaminrunde/firescout-utils/lib/build-docs/createCommandTree'
import { Docs } from '@kaminrunde/firescout-utils/lib/build-docs/createDocs'
import { ModuleTree } from '@kaminrunde/firescout-utils/lib/build-docs/createModuleTree'

export default function createFileContent(tree: Tree[], docs: Docs, modules: ModuleTree[]): string {
  return `
/// <reference types="cypress" />

type MockFnOptions = {
timeout?: number,
throws?:boolean,
transform?: (val:any) => any,
ts?: boolean,
sync?: boolean
}

type MockVarOptions = {
transform?: (val:any) => any
}

${modules
  .map(
    (node) => `
${node.commands
  .map(
    (cmd) => `
interface ${cmd.typesaveId} {
${cmd.fixtures.map(
  (f) => `
${f.description}
mock(name:'${f.variation}', opt?:Omit<MockFnOptions,'sync'>):${node.typesaveContext}
`
)}

createStub():void

doesReturn(val:any, opt?:Omit<MockFnOptions,'transform'|'ts'>):void
}
`
  )
  .join('\n')}

${node.variables
  .map(
    (cmd) => `
interface ${cmd.typesaveId} {
${cmd.fixtures.map(
  (f) => `
${f.description}
load(name:'${f.variation}', opt?:MockVarOptions):${node.typesaveContext}
`
)}

set(val:any):void
}
`
  )
  .join('\n')}

interface ${node.typesaveContext} {
${node.commands
  .map(
    (cmd) => `
/**
 * @name ${cmd.name}
 * @file [${cmd.file}](${process.cwd() + cmd.file})
 */
fn(name:'${cmd.name}'):${cmd.typesaveId}
`
  )
  .join('\n')}
}

interface ${node.typesaveContext} {
${node.variables
  .map(
    (cmd) => `
/**
 * @name ${cmd.name}
 * @file [${cmd.file}](${process.cwd() + cmd.file})
 */
variable(name:'${cmd.name}'):${cmd.typesaveId}
`
  )
  .join('\n')}
}
`
  )
  .join('\n')}

${tree
  .map(
    (node) => `
${node.collections
  .map(
    (colNode) => `
interface ${node.typesaveContext + colNode.typesaveContext} extends Cypress.Chainable<Element> {
${colNode.handles
  .map(
    (handle) => `
/** 
 * ${
   docs[node.context]?.collections[colNode.context]?.handles.bullets.find(
     (row) => row.name === handle.name
   )?.value || ''
 }
* @name ${handle.name}
* @file [${handle.file}](${process.cwd() + handle.file})
*/
handle(name:'${handle.name}', index?:number|string): Cypress.Chainable<Element>
`
  )
  .join('\n')}

${colNode.states
  .map(
    (state) => `
/** 
 * ${
   docs[node.context]?.collections[colNode.context]?.states.bullets.find(
     (row) => row.name === state.name
   )?.value || ''
 }
* @name ${state.name}
* @file [${state.file}](${process.cwd() + state.file})
*/
shouldHaveState( name:'${state.name}' ${
      state.implementations
        ? `, implementations: '${state.implementations.map((i) => i.name).join(',')}'`
        : ''
    }): ${node.typesaveContext + colNode.typesaveContext}

/** 
 * ${
   docs[node.context]?.collections[colNode.context]?.states.bullets.find(
     (row) => row.name === state.name
   )?.value || ''
 }
* @name ${state.name}
* @file [${state.file}](${process.cwd() + state.file})
*/
shouldNotHaveState(name:'${state.name}'): ${node.typesaveContext + colNode.typesaveContext}
`
  )
  .join('\n')}
}
`
  )
  .join('\n')}

interface ${node.typesaveContext} extends Cypress.Chainable<Element> {
${node.collections
  .map(
    (colNode) => `
/**
 * ${docs[node.context]?.collections[colNode.context]?.description || '...'}
 * @name ${colNode.context}
 * @file [${colNode.file}](${process.cwd() + colNode.file})
 * @docs_file ${
   docs[node.context]
     ? `[${docs[node.context].file}](${process.cwd() + docs[node.context].file})`
     : '-'
 }
*/
collection(name:'${colNode.context}', index?:number|string): ${
      node.typesaveContext + colNode.typesaveContext
    }
`
  )
  .join('\n')}

${node.handles
  .map(
    (handle) => `
/** 
 * ${docs[node.context]?.handles.bullets.find((row) => row.name === handle.name)?.value || ''}
* @name ${handle.name}
* @file [${handle.file}](${process.cwd() + handle.file})
*/
handle(name:'${handle.name}', index?:number|string): Cypress.Chainable<Element>
`
  )
  .join('\n')}

${node.states
  .map(
    (state) => `
/** 
 * ${docs[node.context]?.states.bullets.find((row) => row.name === state.name)?.value || ''}
* @name ${state.name}
* @file [${state.file}](${process.cwd() + state.file}) ${
      !state.implementations
        ? ''
        : `
* @implementations ${state.implementations
            .map(
              (imp) => `
* - ${imp.name} [(${imp.file})](${process.cwd() + imp.file}): ${
                docs[node.context]?.states.bullets
                  .find((row) => row.name === state.name)
                  ?.bullets?.find((row) => row.name === imp.name)?.value
              }`
            )
            .join('\n')}`
    }
*/
shouldHaveState( name:'${state.name}' ${
      state.implementations
        ? `, implementations: '${state.implementations.map((i) => i.name).join(',')}'`
        : ''
    }): ${node.typesaveContext}

/** 
 * ${docs[node.context]?.states.bullets.find((row) => row.name === state.name)?.value || ''}
* @name ${state.name}
* @file [${state.file}](${process.cwd() + state.file})
*/
shouldNotHaveState(name:'${state.name}'): ${node.typesaveContext}
`
  )
  .join('\n')}
}
`
  )
  .join('\n')}

declare namespace Firescout {
${tree
  .map(
    (node) => `
/**
 * ${docs[node.context]?.description || '...'} 
 * @name ${node.context}
 * @file [${node.folder}](${process.cwd() + node.file})
 * @docs_file ${
   docs[node.context]
     ? `[${docs[node.context].file}](${process.cwd() + docs[node.context].file})`
     : '-'
 }
*/
function context (name:'${node.context}', index?:number|string):${node.typesaveContext}
`
  )
  .join('\n')}

${modules
  .map(
    (node) => `
function module (name: '${node.context}'):${node.typesaveContext}
`
  )
  .join('\n')}
}

declare namespace Cypress {
interface Chainable {
context: typeof Firescout.context;
module: typeof Firescout.module;
}
}
  `
    .split('\n')
    .slice(1)
    .map((s) => s.trim())
    .join('\n')
}
