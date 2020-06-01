"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createCommandTree_1 = __importDefault(require("./createCommandTree"));
var createFileContent_1 = __importDefault(require("./createFileContent"));
var config_1 = __importDefault(require("./config"));
var searchWithNode_1 = __importDefault(require("./searchWithNode"));
var searchWithGrep_1 = __importDefault(require("./searchWithGrep"));
var createCommandHierarchie_1 = __importDefault(require("./createCommandHierarchie"));
var createDocs_1 = __importDefault(require("./createDocs"));
var search = config_1.default.useGrep
    ? searchWithGrep_1.default
    : searchWithNode_1.default;
search()
    .then(createCommandHierarchie_1.default)
    .then(function (_a) {
    var tree = _a.tree, mdItems = _a.mdItems;
    return ({
        tree: createCommandTree_1.default(tree),
        docs: createDocs_1.default(mdItems)
    });
})
    .then(function (_a) {
    var tree = _a.tree, docs = _a.docs;
    return createFileContent_1.default(tree, docs);
})
    .then(console.log)
    // .then(r => console.log(JSON.stringify(r,null,2)))
    // .then(file => fs.writeFileSync(config.outPath, file, 'utf8'))
    .catch(console.log);
