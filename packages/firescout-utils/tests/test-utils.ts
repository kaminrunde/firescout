import {getStructure} from '../src/build-docs'
import * as reporter from '../src/build-docs/reporter'
import * as utils from '../src/build-docs/utils'
import * as config from '../src/build-docs/config'

type ExecutionResult = {
  logs: {code:keyof typeof reporter.codes, name:string, path:string}[],
  result: Awaited<ReturnType<typeof getStructure>>
}

const defaultConfig:config.Config = {
  extensions: 'ts',
  fixturesFolder: 'fixtures',
  outPath: 'out',
  tsFixtures: true,
  widgetFolders: ['src']
}

export function create (_config:Partial<config.Config> = {}) {
  _config = {...defaultConfig, ..._config}
  const files:Record<string, string> = {}
  const logs:ExecutionResult['logs'] = []

  // @ts-expect-error
  config.getConfig = () => _config

  // @ts-expect-error
  reporter.report = (code: keyof typeof reporter.codes, ctx: any) => {
    const [name, path] = reporter.codes[code](ctx)
    logs.push({code, name, path})
  }

  // @ts-expect-error
  utils.readDir = async (path:string):Promise<utils.File[]> => {
    const pathes = Object.keys(files).filter(name => name.includes(path))
    return pathes.map(_path => {
      const rest = _path.replace(path + '/', '')
      const parts = rest.split('/')
      const filename = parts[parts.length-1]
      return {
        isDir: parts[0] !== filename,
        isFile: parts[0] === filename,
        name: parts[0],
        path: path + '/' + parts[0]
      }
    })
  }

  // @ts-expect-error
  utils.readFile = async (path:string) => {
    return files[path]
  }

  // jest.mock('../src/build-docs/config', () => {
  //   const originalModule = jest.requireActual('../src/build-docs/config');
  //   const defaultConfig:config.Config = {
  //     extensions: 'ts',
  //     fixturesFolder: 'fixtures',
  //     outPath: 'out',
  //     tsFixtures: true,
  //     widgetFolders: ['src']
  //   }
  
  //   return {
  //     __esModule: true,
  //     ...originalModule,
  //     getConfig: () => defaultConfig
  //   };
  // })

  // jest.mock('../src/build-docs/reporter', () => {
  //   const originalModule = jest.requireActual('../src/build-docs/reporter');
  
  //   return {
  //     __esModule: true,
  //     ...originalModule,
  //     report: (code: keyof typeof reporter.codes, ctx: any) => {
  //       const [name, path] = originalModule.codes[code](ctx)
  //       logs.push({code, name, path})
  //     }
  //   };
  // })

  // jest.mock('../src/build-docs/utils', () => {
  //   const originalModule = jest.requireActual('../src/build-docs/utils');
  
  //   return {
  //     __esModule: true,
  //     ...originalModule,
  //     readFile: async (path:string) => {
  //       return files[path]
  //     },
  //     readDir: async (path:string):Promise<utils.File[]> => {
  //       const filenames = Object.keys(files).filter(name => name.includes(path))
  //       return filenames.map(filename => {
  //         const rest = filename.replace(path, '')
  //         const name = rest.split('/')[1]
  //         return {
  //           name: name,
  //           path: path + '/' + name,
  //           isFile: Boolean(files[path]),
  //           isDir: !files[path]
  //         }
  //       })
  //     }
  //   };
  // })

  const instance = {
    addMarkdown(path:string, def:MarkdownDef) {
      files[path] = toMarkdown(def)
      return instance
    },
    addReactComponent(path:string, def:ReactDef) {
      files[path] = toReact(def)
      return instance
    },
    addFile(path:string,content:string) {
      files[path] = content
      return instance
    },
    async execute():Promise<ExecutionResult> {
      const result = await getStructure()
      return {result, logs}
    }
  }

  return instance
}

type MarkdownDef = {
  type: 'collection' | 'component'
  name: string
  desc?: string
  handles?: {name:string, description:string}[]
  states?: {name:string, description:string}[]
  collections?: {name:string, path:string}[]
}

function toMarkdown (def:MarkdownDef) {
  let content = ''
  if(def.type === 'component') content += '<!-- firescout-component -->\n'
  if(def.type === 'collection') content += '<!-- firescout-collection -->\n'
  content += `# ${def.name}\n`
  if(def.desc) content += `${def.desc}\n`

  if(def.handles) {
    content += `## Handles\n`
    def.handles.forEach(row => content += `- **${row.name}**: ${row.description}\n`)
  }

  if(def.states) {
    content += `## States\n`
    def.states.forEach(row => content += `- **${row.name}**: ${row.description}\n`)
  }

  if(def.collections) {
    content += `## Collections\n`
    def.collections.forEach(row => content += `- [${row.name}]:(${row.path})\n`)
  }
  return content
}

type ReactComponent = [
  'ctx' | 'col' | 'handle' | 'state',
  string,
  ReactComponent[]?
]
type ReactDef = {
  jsx: ReactComponent
}

function toReact (def:ReactDef) {
  const traverse = (c:ReactComponent) => {
    let inner = c[2] ? c[2].map(traverse).join('') : ''
    let content = ''
    if(c[0] === 'ctx') content = `<div data-cy-ctx='${c[1]}'>${inner}</div>`
    if(c[0] === 'col') content = `<div data-cy-collection='${c[1]}'>${inner}</div>`
    if(c[0] === 'handle') content = `<div data-cy-handle='${c[1]}'>${inner}</div>`
    if(c[0] === 'state') content = `<div data-cy-state='${c[1]}'>${inner}</div>`
    return content
  }
  return `export default function Component () { return (${traverse(def.jsx)}) }`
}


/**
 * custom matchers
 */

declare global {
  namespace jest {
    interface Matchers<R> {
      toContainObject(expected: Object): CustomMatcherResult;
      toContainLog(code:keyof typeof reporter.codes, name?:string, path?:string): CustomMatcherResult;
    }
  }
}

expect.extend({
  toContainLog(received, code, name, path) {
    const log = {
      code: code,
      name: name || expect.anything(),
      path: path || expect.anything()
    }
    const pass = this.equals(received.logs, 
      expect.arrayContaining([
        expect.objectContaining(log)
      ])
    )
    if (pass) {
      return {
        message: () => (`expected ${this.utils.printReceived(received.logs)} not to contain log-object ${this.utils.printExpected(log)}`),
        pass: true
      }
    } else {
      return {
        message: () => (`expected ${this.utils.printReceived(received.logs)} to contain log-object ${this.utils.printExpected(log)}`),
        pass: false
      }
    }
  },
  // toContainLog(code:keyof typeof reporter.codes, name:string) {
  //   return 
  // },
  toContainObject(received, argument) {

    const pass = this.equals(received, 
      expect.arrayContaining([
        expect.objectContaining(argument)
      ])
    )

    if (pass) {
      return {
        message: () => (`expected ${this.utils.printReceived(received)} not to contain object ${this.utils.printExpected(argument)}`),
        pass: true
      }
    } else {
      return {
        message: () => (`expected ${this.utils.printReceived(received)} to contain object ${this.utils.printExpected(argument)}`),
        pass: false
      }
    }
  }
})