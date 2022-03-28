import createCommandTree from "./createCommandTree";
import fs from "fs";
import searchWithNode from "./searchWithNode";
import createCommandHierarchie from "./createCommandHierarchie";
import createDocs from "./createDocs";
import createModuleTree from "./createModuleTree";
import { validate } from "./reporter";
export { default as getConfig } from "./config";

export function getStructure() {
  return searchWithNode()
    .then(createCommandHierarchie)
    .then(({ tree, mdItems, moduleItems, fixtureItems, variableItems }) => ({
      tree: createCommandTree(tree),
      docs: createDocs(mdItems),
      modules: createModuleTree(moduleItems, fixtureItems, variableItems),
    }))
    .then(validate);
}

if (process.env.NODE_ENV !== "test") {
  getStructure();
}
