import { Tree } from '@kaminrunde/firescout-utils/lib/build-docs/createCommandTree'
import { Docs } from '@kaminrunde/firescout-utils/lib/build-docs/createDocs'
import { ModuleTree } from '@kaminrunde/firescout-utils/lib/build-docs/createModuleTree'

export default function createFileContent(tree: Tree[], docs: Docs, modules: ModuleTree[]) {
  return `declare module '@kaminrunde/react-firescout' {

type Func = (...args: any) => any

${modules
  .map(
    (node) =>
      `${node.commands
        .map(
          (cmd) => `interface ${cmd.typesaveId} {
  mock<Wrapper extends Func>(name: 'default', wrapper?: Wrapper): Promise<ReturnType<Wrapper>>
  stub<Wrapper extends Func>(wrapper?: Wrapper): Promise<ReturnType<Wrapper>>
}`
        )
        .join('')}
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
  .join('')}}`
  )
  .join('\n')}



${modules
  .map((node) => `export function getModule (name: '${node.context}'):${node.typesaveContext}`)
  .join('\n')}

interface Interactable<Root> {
  unwrap():Element
  nth(n:number):Root
  click(timeout?:number):Promise<void>
  type(timeout?:number):Promise<void>
  simulate(cb:(el:Element) => Promise<void> | void):Promise<void>
}

${tree
  .map(
    (node) => `
${node.collections
  .map(
    (colNode) => `interface ${
      node.typesaveContext + colNode.typesaveContext
    } extends Interactable<${node.typesaveContext + colNode.typesaveContext}> {
${colNode.handles
  .map(
    (handle) => ` /** 
* ${
      docs[node.context]?.collections[colNode.context]?.handles.bullets.find(
        (row) => row.name === handle.name
      )?.value || ''
    }
* @name ${handle.name}
* @file [${handle.file}](${process.cwd() + handle.file})
*/
handle(name:'${handle.name}', index?:number|string): Interactable<${
      node.typesaveContext + colNode.typesaveContext
    }>`
  )
  .join('\n')}

${colNode.states
  .map(
    (state) => `  /** 
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
  shouldNotHaveState(name:'${state.name}'): ${node.typesaveContext + colNode.typesaveContext}`
  )
  .join('\n')}
}
`
  )
  .join('\n')}

interface ${node.typesaveContext} extends Interactable<${node.typesaveContext}> {
${node.collections
  .map(
    (colNode) => `  /**
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
    }`
  )
  .join('\n')}
${node.handles
  .map(
    (handle) => `/** 
* ${docs[node.context]?.handles.bullets.find((row) => row.name === handle.name)?.value || ''}
* @name ${handle.name}
* @file [${handle.file}](${process.cwd() + handle.file})
*/
handle(name:'${handle.name}', index?:number|string): Interactable<${node.typesaveContext}>
`
  )
  .join('\n')}

${node.states.map(
  (state) => `  /** 
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
          .join('')}`
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
)}
}
`
  )
  .join('')}

interface Mount {
  wait(ms:number):Promise<void>
  unwrap():Element

${tree
  .map(
    (node) => ` /**
  * ${docs[node.context]?.description || '...'}  * @name ${node.context}
  * @file [${node.folder}](${process.cwd() + node.file})
  * @docs_file ${
    docs[node.context]
      ? `[${docs[node.context].file}](${process.cwd() + docs[node.context].file})`
      : '-'
  }
  */
  context (name:'${node.context}'):${node.typesaveContext}
`
  )
  .join('\n')}

export function mount(el:any, config:any): Mount
export function clearMocks(): void


  }`
}
