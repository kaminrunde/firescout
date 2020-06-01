import createCommandTree from './createCommandTree'
import createFileContent from './createFileContent'
import fs from 'fs'
import config from './config'
import searchWithNode from './searchWithNode'
import searchWithGrep from './searchWithGrep'
import createCommandHierarchie from './createCommandHierarchie'


let search = config.useGrep
  ? searchWithGrep
  : searchWithNode

search()
.then(createCommandHierarchie)
.then(createCommandTree)
.then(createFileContent)
.then(console.log)
// .then(r => console.log(JSON.stringify(r,null,2)))
// .then(file => fs.writeFileSync(config.outPath, file, 'utf8'))
.catch(console.log)