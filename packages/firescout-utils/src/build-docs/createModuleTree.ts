import { RawItem as ModuleItem } from './searchWithNode'
import * as utils from './utils'

export type ModuleTree = {
  context: string
  typesaveContext: string
  commands: {
    name: string
    file: string
    folder: string
    typesaveId: string
    fixtures: Fixture[]
  }[]
  variables: {
    name: string
    file: string
    folder: string
    typesaveId: string
    fixtures: Fixture[]
  }[]
}

type Fixture = {
  module: string
  name: string
  variation: string
  description: string
  file: string
  folder: string
}

export default function createModuleTree(
  moduleItems: ModuleItem[],
  fixtureItems: ModuleItem[],
  variableItems: ModuleItem[]
): ModuleTree[] {
  let dict: Record<string, ModuleTree> = {}
  const fixtures = fixtureItems.map((item) => createFixture(item))
  let fixtureDict: Record<string, Fixture[]> = {}
  for (let f of fixtures) {
    let id = `${f.module}.${f.name}`
    if (!fixtureDict[id]) fixtureDict[id] = []
    fixtureDict[id].push(f)
  }

  for (let item of moduleItems) {
    let [context, name] = item.payload.split('.')
    if (!dict[context])
      dict[context] = {
        context,
        commands: [],
        variables: [],
        typesaveContext: utils.getTypesaveId(context),
      }
    dict[context].commands.push({
      name: name,
      file: item.file,
      folder: item.folder,
      typesaveId: utils.getTypesaveId(context + name),
      fixtures: fixtureDict[item.payload] || [],
    })
  }

  for (let item of variableItems) {
    let [context, name] = item.payload.split('.')
    if (!dict[context])
      dict[context] = {
        context,
        commands: [],
        variables: [],
        typesaveContext: utils.getTypesaveId(context),
      }
    dict[context].variables.push({
      name: name,
      file: item.file,
      folder: item.folder,
      typesaveId: utils.getTypesaveId(context + name),
      fixtures: fixtureDict[item.payload] || [],
    })
  }

  return Object.values(dict)
}

function createFixture(item: ModuleItem): Fixture {
  const moduleMatch = item.payload.match(/@module (.*)/)
  const nameMatch = item.payload.match(/@name (.*)/)
  const variationMatch = item.payload.match(/@variation (.*)/)
  return {
    description: item.payload.replace(
      '*/',
      `* @file [${item.file}](${process.cwd() + item.file})\n */`
    ),
    file: item.file,
    folder: item.folder,
    variation: variationMatch ? variationMatch[1] : '',
    name: nameMatch ? nameMatch[1] : '',
    module: moduleMatch ? moduleMatch[1] : '',
  }
}
