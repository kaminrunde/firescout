import getConfig from './config'
import * as utils from './utils'


export type RawItem = {
  type: 'ctx' | 'handle' | 'state' | 'component-doc' | 'collection-doc' | 'collection' | 'module-fn' | 'fixture',
  payload: string,
  file: string,
  folder: string
}

type Match = {
  type: 'ctx' | 'handle' | 'state' | 'component-doc' | 'collection-doc' | 'collection' | 'module-fn' | 'fixture',
  payload: string,
}

export default async function findInFiles ():Promise<RawItem[]> {
  const config = getConfig()
  let files = await findAllFiles([...config.widgetFolders, config.fixturesFolder])
  const extensionsRegex = config.extensions
    .split('|').concat('md').map(s => `.${s}$`).join('|')
  const srcFiles = files.filter(f => f.name.match(new RegExp(extensionsRegex)))
  const fixtureFiles = files.filter(f => f.path.includes(config.fixturesFolder))
  const allFiles = [...srcFiles, ...fixtureFiles]
  let rawItems:RawItem[] = []
  
  // find matches
  const matches = await Promise.all([
    ...srcFiles.map(f => getSrcMatch(f.path)),
    ...fixtureFiles.map(f => getFixtureMatch(f.path))
  ])
  for (let i=0; i<allFiles.length; i++) {
    if(matches[i]) {
      let m = matches[i] as Match[]
      m.forEach(row => {
        rawItems.push({
          type: row.type,
          payload: row.payload,
          file: utils.normalizeFilePath(allFiles[i].path),
          folder: utils.getFileFolder(allFiles[i].path)
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

async function getSrcMatch(path:string):Promise<Match[]|null> {
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

async function getFixtureMatch (path:string):Promise<Match[]|null> {
  const config = getConfig()
  if(!path.endsWith('.ts')) return null
  const content = await utils.readFile(path)
  let result = '/**\n * ...\n */'
  let match = content.match(/\/\*\*(.|\n)*/)
  if(match) result = match[0].split('*/')[0] + '*/'
  
  const relPath = path.replace(config.fixturesFolder+'/', '')
  if(relPath.split('/').length !== 2) return null
  let [module, fileName] = relPath.split('/')
  let [name, variation] = fileName.split('.')
  if(variation === 'ts') variation = 'default'
  
  result = result.replace('*/', `* @module ${module}\n * @name ${name}\n * @variation ${variation}\n */`)
  
  return [{
    type: 'fixture',
    payload: result
  }]
}