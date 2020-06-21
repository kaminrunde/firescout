"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firescout = void 0;
var config_1 = __importDefault(require("./config"));
var searchWithNode_1 = __importDefault(require("./searchWithNode"));
var searchWithGrep_1 = __importDefault(require("./searchWithGrep"));
function firescout() {
    var config = config_1.default();
    var search = config.useGrep ? searchWithGrep_1.default : searchWithNode_1.default;
    return search()
        .then(console.log);
    // .then(createCommandHierarchie)
    // .then(({tree, mdItems, moduleItems, fixtureItems}) => ({
    //   tree: createCommandTree(tree),
    //   docs: createDocs(mdItems),
    //   modules: createModuleTree(moduleItems, fixtureItems)
    // }))
    // .then(validate)
    // .then(({tree, docs, modules}) => createFileContent(tree, docs, modules))
    // .then(file => fs.writeFileSync(config.outPath, file, 'utf8'))
    // .catch(console.log)
}
exports.firescout = firescout;
if (process.env.NODE_ENV !== 'test') {
    firescout();
}
