import createCommandTree from './createCommandTree'
import createFileContent from './createFileContent'
import fs from 'fs'
import config from './config'
import searchWithNode from './searchWithNode'
import searchWithGrep from './searchWithGrep'


let search = config.useGrep
  ? searchWithGrep
  : searchWithNode

search()
// .then(r => console.log(JSON.stringify(r, null, 2)))
.then(createCommandTree)
.then(createFileContent)
.then(file => fs.writeFileSync(config.outPath, file, 'utf8'))
.catch(console.log)