import fs from "fs";

export type Config = {
  widgetFolders: string[];
  outPath: string;
  extensions: string;
  fixturesFolder: string;
  tsFixtures: boolean;
};
let config: Config | null = null;

export default function getConfig(): Config {
  if (!config) {
    const configRaw = fs.readFileSync(
      process.cwd() + "/firescout.json",
      "utf8"
    );
    config = JSON.parse(configRaw) as Config;

    config.widgetFolders = config.widgetFolders.map(
      (s) => `${process.cwd()}/${s}`
    );
    config.outPath = `${process.cwd()}/${config.outPath}`;
    config.fixturesFolder = `${process.cwd()}/${config.fixturesFolder}`;
  }
  return config;
}
