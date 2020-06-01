import config from './config'
import * as utils from './utils'


export type RawItem = {
  type: 'ctx' | 'handle' | 'state' | 'component-doc' | 'collection-doc' | 'collection' | 'module-fn',
  payload: string,
  file: string,
  folder: string
}

type Match = {
  type: 'ctx' | 'handle' | 'state' | 'component-doc' | 'collection-doc' | 'collection' | 'module-fn',
  payload: string,
}

export default async function findInFiles ():Promise<RawItem[]> {
  let files = await findAllFiles([config.widgetFolder])
  const extensionsRegex = config.extensions
    .split('|').concat('md').map(s => `.${s}$`).join('|')
  files = files.filter(f => f.name.match(new RegExp(extensionsRegex)))
  const matches = await Promise.all(files.map(f => getMatch(f.path)))
  let rawItems:RawItem[] = []

  for (let i=0; i<files.length; i++) {
    if(matches[i]) {
      let m = matches[i] as Match[]
      m.forEach(row => {
        rawItems.push({
          type: row.type,
          payload: row.payload,
          file: utils.normalizeFilePath(files[i].path),
          folder: utils.getFileFolder(files[i].path)
        })
      })
    }
  }
  return rawItems
}

async function findAllFiles (paths:string[]):Promise<utils.File[]> {
  const allFiles = await Promise.all(paths.map(path => utils.readDir(path)))
  let files:utils.File[] = []
  let dirs:utils.File[] = []

  for(let row of allFiles) for(let file of row) {
    if(file.isDir) dirs.push(file)
    else files.push(file)
  }

  if(dirs.length) {
    let subFiles = await findAllFiles(dirs.map(f => f.path))
    files.push(...subFiles)
  }

  return files
}

async function getMatch(path:string):Promise<Match[]|null> {
  const result = await utils.readFile(path)
  if(path.endsWith('.md')) {
    const regex = new RegExp("<!-- firescout-(component|collection) -->")
    let match = null
    if(match=result.match(regex)) return [{
      type: match[1] === 'component' ? 'component-doc' : 'collection-doc',
      payload: result
    }]
    else return null
  }
  let allMatches:Match[] = []

  const cRegex = new RegExp("data-cy-(state|ctx|handle|collection)=(\"|')(.*)(\"|')", 'g')
  const moduleRegex = new RegExp("firescoutMockFn(<.*>)? *\\((\"|').*(\"|')", 'g')
  let cMatches = result.match(cRegex)
  const moduleMatches = result.match(moduleRegex)
  if(cMatches) {
    cMatches = Array.from(new Set(cMatches.filter(Boolean)))
    const regex = new RegExp("data-cy-(state|ctx|handle|collection)=(\"|')(.*)(\"|')")
    let matches:any = cMatches.map(s => s.match(regex))
    allMatches.push(...matches.map((match:any) => ({
      type: match[1] as 'ctx' | 'handle' | 'state' | 'collection',
      payload: match[3]
    })))
  }
  if(moduleMatches) {
    const regex = new RegExp("firescoutMockFn(<.*>)? *\\((\"|')(.*)(\"|')")
    let matches:any = moduleMatches.map(s => s.match(regex))
    allMatches.push(...matches.map((match:any) => ({
      type: 'module-fn',
      payload: match[3]
    })))
  }
  
  return allMatches.length ? allMatches : null
}