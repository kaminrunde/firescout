import config from './config'
import * as utils from './utils'


export type RawItem = {
  type: 'ctx' | 'handle' | 'state' | 'component-doc',
  payload: string,
  file: string,
}

type Match = {
  type: 'ctx' | 'handle' | 'state' | 'component-doc',
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
          file: files[i].path.replace(process.cwd(), ''),
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
    const regex = new RegExp("<!-- firescout-docs -->")
    if(result.match(regex)) return [{
      type: 'component-doc',
      payload: result
    }]
    else return null
  }

  const regex = new RegExp("data-cy-(state|ctx|handle)=(\"|')(.*)(\"|')", 'g')
  let rawMatches = result.match(regex)
  if(rawMatches) {
    rawMatches = Array.from(new Set(rawMatches.filter(Boolean)))
    const regex = new RegExp("data-cy-(state|ctx|handle)=(\"|')(.*)(\"|')")
    let matches = rawMatches.map(s => s.match(regex))
    return matches.map(match => ({
      // @ts-ignore
      type: match[1] as 'ctx' | 'handle' | 'state',
      // @ts-ignore
      payload: match[3]
    }))
  }
  
  return null
}