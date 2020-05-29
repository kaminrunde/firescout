import fs from 'fs'

type Config = {
  widgetFolder: string,
  outPath: string
}

const configRaw = fs.readFileSync(process.cwd()+'/firescout.json', 'utf8')
const config:Config = JSON.parse(configRaw)

config.widgetFolder = `${process.cwd()}/${config.widgetFolder}`
config.outPath = `${process.cwd()}/${config.outPath}`

export default config