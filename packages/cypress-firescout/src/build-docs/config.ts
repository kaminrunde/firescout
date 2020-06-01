import fs from 'fs'

type Config = {
  widgetFolders: string[],
  outPath: string,
  extensions: string,
  useGrep: boolean
}

const configRaw = fs.readFileSync(process.cwd()+'/firescout.json', 'utf8')
const config:Config = JSON.parse(configRaw)

config.widgetFolders = config.widgetFolders.map(s => `${process.cwd()}/${s}`)
config.outPath = `${process.cwd()}/${config.outPath}`

export default config