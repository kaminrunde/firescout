import {Config} from '../config'
import {firescout} from '../index'

// let utils:any

export function setup(){
  // const config = require('../config')
  // config.default = () => ({
  //   widgetFolders: ['widgets'],
  //   outPath: 'out',
  //   extensions: 'ts',
  //   useGrep: false,
  //   fixturesFolder: 'fixtures',
  // })
}

export async function createOutput (
  files:{[path:string]:string},
  configExt?:Partial<Config>,
  mdIndent:number=8
){
  let tree:any, docs:any, modules:any, content:any;
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
  
  firescout()
}