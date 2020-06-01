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
    folder: string
  }[]
}

export default function createModuleTree (items:ModuleItem[]):ModuleTree[] {
  let dict:Record<string,ModuleTree> = {}

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
      folder: item.folder
    })
  }

  return Object.values(dict)
}