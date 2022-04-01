export declare type Config = {
  widgetFolders: string[]
  outPath: string
  extensions: string
  fixturesFolder: string
  tsFixtures: boolean
}
export default function getConfig(): Config
