import {RawItem as GrepRawItem} from './searchWithGrep'
import {RawItem as NodeRawItem} from './searchWithNode'
import * as utils from './utils'


type ModuleItem = GrepRawItem | NodeRawItem

export type ModuleTree = {
  context: string,
  typesaveContext: string,
  commands: {
    name: string,
    file: string,
    folder: string,
    typesaveId: string,
    fixtures: Fixture[]
  }[]
}

type Fixture = {
  module: string,
  name: string,
  variation: string,
  description: string,
  file: string,
  folder: string
}

export default function createModuleTree (items:ModuleItem[], fixtureItems:ModuleItem[]):ModuleTree[] {
  let dict:Record<string,ModuleTree> = {}
  const fixtures = fixtureItems.map(item => createFixture(item))
  let fixtureDict:Record<string,Fixture[]> = {}
  for(let f of fixtures) {
    let id = `${f.module}.${f.name}`
    if(!fixtureDict[id]) fixtureDict[id] = []
    fixtureDict[id].push(f)
  }

  for(let item of items) {
    let [context, name] = item.payload.split('.')
    if(!dict[context]) dict[context] = {
      context, 
      commands:[],
      typesaveContext: utils.getTypesaveId(context)
    }
    dict[context].commands.push({
      name: name,
      file: item.file,
      folder: item.folder,
      typesaveId: utils.getTypesaveId(context+name),
      fixtures: fixtureDict[item.payload] || []
    })
  }

  return Object.values(dict)
}

function createFixture(item:ModuleItem):Fixture {
  const moduleMatch = item.payload.match(/@module (.*)/)
  const nameMatch = item.payload.match(/@name (.*)/)
  const variationMatch = item.payload.match(/@variation (.*)/)
  return {
    description: item.payload
      .replace('*/', `* @file ${item.file}\n */`),
    file: item.file,
    folder: item.folder,
    variation: variationMatch ? variationMatch[1] : '',
    name: nameMatch ? nameMatch[1] : '',
    module: moduleMatch ? moduleMatch[1] : ''
  }
}