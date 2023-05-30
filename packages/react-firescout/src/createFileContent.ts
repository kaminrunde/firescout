import { Tree } from '@kaminrunde/firescout-utils/lib/build-docs/createCommandTree'
import { Docs } from '@kaminrunde/firescout-utils/lib/build-docs/createDocs'
import { ModuleTree } from '@kaminrunde/firescout-utils/lib/build-docs/createModuleTree'

export default function createFileContent(tree: Tree[], docs: Docs, modules: ModuleTree[]) {
  return `
/* eslint-disable */
declare module '@kaminrunde/react-firescout' {

type Func = (...args: any) => any
type MockConfig = {
  value?: any
  fixture?: string
  sync?: boolean
  timeout?: number
  transform?: (data: any) => any
}

interface Matchers {
  should(m:'contain.text', s:string, x?:never):void
  should(m:'not.contain.text', s:string, x?:never):void
  should(m:'have.value', s:string, x?:never):void
  should(m:'not.have.value', s:string, x?:never):void
  should(m:'have.css', key:string, val:string):void
  should(m:'not.have.css', key:string, val:string):void
  should(m:'have.length', n:number, x?:never):void
  should(m:'not.have.length', n:number, x?:never):void
  should(m:'not.exist', n?:number, x?:never):void
  should(m:'exist', n?:number, x?:never):void
}

${modules.map((node) =>
  `${node.commands.map((cmd) => 
    `interface ${cmd.typesaveId} {
    ${cmd.fixtures.map((f) =>
      `mock<Wrapper extends Func>(name:'${f.variation}', wrapper?: Wrapper): Promise<ReturnType<Wrapper>>
    `).join('\n')}
      mock<Wrapper extends Func>(config: MockConfig, wrapper?: Wrapper): Promise<ReturnType<Wrapper>>
      stub<Wrapper extends Func>(wrapper?: Wrapper): Promise<ReturnType<Wrapper>>
  }`).join('')}
  
  interface ${node.typesaveContext} {
    ${node.commands.map((cmd) => `
    /**
     * @name ${cmd.name}
     * @file [${cmd.file}](${process.cwd() + cmd.file})
     */
    fn(name:'${cmd.name}'):${cmd.typesaveId}
  `).join('')}
}`).join('\n')}

${modules.map(node => `
  interface ${node.typesaveContext} {
    ${node.variables.map(variable => `
      var(name:'${variable.name}'): {
        set(val:any):void
        ${variable.fixtures.map(fix => (
          `fixture(name:'${fix.variation}'):Promise<void>`
        )).join('\n')}
      }
    `).join('\n')}
  }
`).join('\n')}



${modules.map((node) => 
  `export function getModule (name: '${node.context}'):${node.typesaveContext}
`).join('\n')}

interface Interactable<Root> extends Matchers {
  unwrap():Element
  nth(n:number):Root
  click(timeout?:number):Promise<void>
  type(val:string, timeout?:number):Promise<void>
  simulate(cb:(el:Element) => Promise<void> | void):Promise<void>
  query: (s:string) => Interactable<unknown>
}

${tree.map((node) => recursiceCollection(node, docs)).join('')}

interface Mount {
  wait(ms:number):Promise<void>
  unwrap():Element

  ${tree
    .map((node) => ` 
    /**
    * ${docs[node.context]?.description || '...'}  * @name ${node.context}
    * @file [${node.folder}](${process.cwd() + node.file})
    * @docs_file ${
      docs[node.context]
        ? `[${docs[node.context].file}](${process.cwd() + docs[node.context].file})`
        : '-'
    }
    */
    context (name:'${node.context}', ignoreError?:boolean):${node.typesaveContext}
  `).join('\n')}
  }

  export function mount(el:any, config:any): Mount
  export function clearMocks(): void

  export type Context = ${tree.map((node) => `"${node.context}"`).join('|')}
  }`
}


function recursiceCollection (node:Tree, docs: Docs):string {
  return `${node.collections.map((colNode) => 
    `interface ${node.typesaveContext + colNode.typesaveContext} extends Interactable<${node.typesaveContext + colNode.typesaveContext}> {
      ${colNode.handles.map((handle) => 
      ` /** 
        * ${docs[node.context]?.collections[colNode.context]?.handles.bullets.find((row) => row.name === handle.name)?.value || ''}
        * @name ${handle.name}
        * @file [${handle.file}](${process.cwd() + handle.file})
        */
        handle(name:'${handle.name}', ignoreError?:boolean): Interactable<${node.typesaveContext + colNode.typesaveContext}>`
    ).join('\n')}

    ${colNode.states.map((state) => 
    `  /** 
        * ${docs[node.context]?.collections[colNode.context]?.states.bullets.find((row) => row.name === state.name)?.value || ''}
        * @name ${state.name}
        * @file [${state.file}](${process.cwd() + state.file})
        */
        shouldHaveState( name:'${state.name}' ${
          state.implementations
            ? `, implementations: '${state.implementations.map((i) => i.name).join(',')}'`
            : ''
        }): ${node.typesaveContext + colNode.typesaveContext}
          
        /** 
        * ${docs[node.context]?.collections[colNode.context]?.states.bullets.find((row) => row.name === state.name)?.value || ''}
        * @name ${state.name}
        * @file [${state.file}](${process.cwd() + state.file})
        */
        shouldNotHaveState(name:'${state.name}'): ${node.typesaveContext + colNode.typesaveContext}`
        ).join('\n')}

        ${colNode.collections.map(inner => `
          collection(name:"${inner.context}", ignoreError?:boolean):${colNode.typesaveContext + inner.typesaveContext}
        `).join('\n')}
    }`).join('\n')}

    interface ${node.typesaveContext} extends Interactable<${node.typesaveContext}> {
    ${node.collections.map((colNode) => `  /**
      * ${docs[node.context]?.collections[colNode.context]?.description || '...'}
      * @name ${colNode.context}
      * @file [${colNode.file}](${process.cwd() + colNode.file})
      * @docs_file ${docs[node.context]
            ? `[${docs[node.context].file}](${process.cwd() + docs[node.context].file})`
            : '-'}
      */
      collection(name:'${colNode.context}', ignoreError?:boolean): ${node.typesaveContext + colNode.typesaveContext}
      `).join('\n')}

    ${node.handles.map((handle) => 
      `/** 
        * ${docs[node.context]?.handles.bullets.find((row) => row.name === handle.name)?.value || ''}
        * @name ${handle.name}
        * @file [${handle.file}](${process.cwd() + handle.file})
        */
        handle(name:'${handle.name}', ignoreError?:boolean): Interactable<${node.typesaveContext}>
    `).join('\n')}

    ${node.states.map((state) => 
    `  /** 
        * ${docs[node.context]?.states.bullets.find((row) => row.name === state.name)?.value || ''}
        * @name ${state.name}
        * @file [${state.file}](${process.cwd() + state.file}) ${!state.implementations ? '' : `
        * @implementations ${state.implementations.map((imp) => `
        * - ${imp.name} [(${imp.file})](${process.cwd() + imp.file}): ${
                docs[node.context]?.states.bullets
                  .find((row) => row.name === state.name)
                  ?.bullets?.find((row) => row.name === imp.name)?.value
              }`
        ).join('')}`
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
    )}}
    ${node.collections.map(node => recursiceCollection(node, docs)).join('\n')}
    `
}