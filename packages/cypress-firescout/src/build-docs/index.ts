import * as utils from './utils'
import createCommandTree from './createCommandTree'
import createFileContent from './createFileContent'
import parseInput from './parseInput'
import fs from 'fs'

const configRaw = fs.readFileSync(process.cwd()+'/firescout.json', 'utf8')
const config = JSON.parse(configRaw)

const DOCS_CMD = `grep -rl "<!-- firescout-docs -->" ${process.cwd()}/${config.widgetFolder}`
const HANDLES_CMD = `grep -HREo "data-cy-(state|ctx|trigger)=(\\"|').*(\\"|')" ${process.cwd()}/${config.widgetFolder}`

Promise.all([
  utils.executeCmd(DOCS_CMD),
  utils.executeCmd(HANDLES_CMD),
])

.then(parseInput)
.then(createCommandTree)
.then(createFileContent)
// .then(r => JSON.stringify(r,null,2))
.then(file => fs.writeFileSync(`${process.cwd()}/${config.outPath}`, file, 'utf8'))
.catch(console.log)