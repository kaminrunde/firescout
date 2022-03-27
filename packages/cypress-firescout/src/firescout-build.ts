import fs from "fs";
import {
  getStructure,
  getConfig,
  createFileContent,
} from "@kaminrunde/firescout-utils/lib/build-docs";

const config = getConfig();

getStructure()
  .then(({ tree, docs, modules }) => createFileContent(tree, docs, modules))
  .then((file) => fs.writeFileSync(config.outPath, file, "utf8"))
  .catch(console.log);