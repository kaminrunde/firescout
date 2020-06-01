"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createCommandTree_1 = __importDefault(require("./createCommandTree"));
var config_1 = __importDefault(require("./config"));
var searchWithNode_1 = __importDefault(require("./searchWithNode"));
var searchWithGrep_1 = __importDefault(require("./searchWithGrep"));
var search = config_1.default.useGrep
    ? searchWithGrep_1.default
    : searchWithNode_1.default;
search()
    .then(createCommandTree_1.default)
    .then(function (r) { return console.log(JSON.stringify(r, null, 2)); });
// .then(createFileContent)
// .then(file => fs.writeFileSync(config.outPath, file, 'utf8'))
// .catch(console.log)
