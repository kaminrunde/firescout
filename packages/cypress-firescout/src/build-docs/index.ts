import * as utils from './utils'
import createCommandTree from './createCommandTree'
import createFileContent from './createFileContent'
import parseSystemInput from './parseSystemInput'
import fs from 'fs'
import config from './config'
import findInFiles from './findInFiles'

const DOCS_CMD = `grep -rl "<!-- firescout-docs -->" ${config.widgetFolder}`
const HANDLES_CMD = `grep -HREo "data-cy-(state|ctx|trigger)=(\\"|').*(\\"|')" ${config.widgetFolder}`

let doParsing = config.useGrep
  ? () => Promise.all([
      utils.executeCmd(DOCS_CMD), 
      utils.executeCmd(HANDLES_CMD)
    ]).then(parseSystemInput)
  : () => findInFiles()

doParsing()
.then(createCommandTree)
.then(createFileContent)
.then(file => fs.writeFileSync(config.outPath, file, 'utf8'))
.catch(console.log)