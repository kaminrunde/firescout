import createCommandTree from './createCommandTree'
import createFileContent from './createFileContent'
import fs from 'fs'
import config from './config'
import searchWithNode from './searchWithNode'
import searchWithGrep from './searchWithGrep'
import createCommandHierarchie from './createCommandHierarchie'
import createDocs from './createDocs'
import createModuleTree from './createModuleTree'


let search = config.useGrep
  ? searchWithGrep
  : searchWithNode

search()
.then(createCommandHierarchie)
.then(({tree, mdItems, moduleItems}) => ({
  tree: createCommandTree(tree),
  docs: createDocs(mdItems),
  modules: createModuleTree(moduleItems)
}))
.then(({tree, docs, modules}) => createFileContent(tree, docs, modules))
// .then(console.log)
// .then(r => console.log(JSON.stringify(r.docs,null,2)))
.then(file => fs.writeFileSync(config.outPath, file, 'utf8'))
.catch(console.log)