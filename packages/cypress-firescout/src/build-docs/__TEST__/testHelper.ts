import {Config} from '../config'
import {Tree} from '../createCommandTree'
import {Docs} from '../createDocs'
import {ModuleTree} from '../createModuleTree'

type Result = {
  tree:Tree[], 
  docs:Docs,
  modules:ModuleTree[],
  content: string,
  warnings: [string,string][]
}

export async function createOutput (
  files:{[path:string]:string},
  configExt?:Partial<Config>,
  mdIndent:number=8
):Promise<Result>{
  let tree:any, docs:any, modules:any, content:any, warnings:any=[];
  const config = require('../config')
  config.default = () => ({
    widgetFolders: ['widgets'],
    outPath: 'out',
    extensions: 'ts',
    useGrep: false,
    fixturesFolder: 'fixtures',
  })
  const utils = require('../utils')
  utils.readDir = (path:string) => {
    const cwd = process.cwd()
    path = path.replace(cwd, '')
    let allFolders = new Map<string,string>()
    let allFiles = new Map<string,string>()
    const fileNames = Object.keys(files)
      .filter(s => s.startsWith(path))
      // .map(s => s.replace(path+'/', ''))

    for(let path of fileNames) {
      let fullSection = ''
      for(let section of path.split('/')) {
        fullSection += '/' + section
        if(section.includes('.')) allFiles.set(path, section)
        else allFolders.set(fullSection, section)
      }
    }
    utils.readFile = (path:string) => {
      let content = files[path]
      if(path.includes('.md')) {
        content = content
          .split('\n')
          .map(s => s.slice(mdIndent))
          .join('\n')
      }
      return Promise.resolve(content)
    }
    
    let result:any = []

    for(let [path,name] of Array.from(allFolders)) {
      result.push({ name, path, isFile: false, isDir: true })
    }

    for(let [path,name] of Array.from(allFiles)) {
      result.push({ name, path, isFile: true, isDir: false })
    }

    return Promise.resolve(result)
  }

  const createFileContent = require('../createFileContent')
  const createFileContentDefault = createFileContent.default
  createFileContent.default = (_tree:any, _docs:any, _modules:any) => {
    tree = _tree
    docs = _docs
    modules = _modules
    const _content = createFileContentDefault(_tree,_docs,_modules)
    content = _content
    return _content
  }

  const reporter = require('../reporter')
  const consoleLog = global.console.log
  var colors = require('colors')
  global.console = {
    log: (key:string, ...rest:any) => {
      if(reporter.codes[key]) warnings.push([key, rest[0]])
      else consoleLog(key,...rest)
    }
  } as any

  const index = require('../index')
  
  colors.disable()
  await index.firescout()
  colors.enable()
  return {tree,docs,modules,content,warnings}
}