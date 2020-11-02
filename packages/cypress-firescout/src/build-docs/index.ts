import createCommandTree from './createCommandTree'
import createFileContent from './createFileContent'
import fs from 'fs'
import getConfig from './config'
import searchWithNode from './searchWithNode'
import createCommandHierarchie from './createCommandHierarchie'
import createDocs from './createDocs'
import createModuleTree from './createModuleTree'
import {validate} from './reporter'



export function firescout() {
  const config = getConfig()

  return searchWithNode()
    .then(createCommandHierarchie)
    .then(({tree, mdItems, moduleItems, fixtureItems, variableItems}) => ({
      tree: createCommandTree(tree),
      docs: createDocs(mdItems),
      modules: createModuleTree(moduleItems, fixtureItems, variableItems)
    }))
    .then(validate)
    .then(({tree, docs, modules}) => createFileContent(tree, docs, modules))
    .then(file => fs.writeFileSync(config.outPath, file, 'utf8'))
    .catch(console.log)
}

if(process.env.NODE_ENV !== 'test') {
  firescout()
}