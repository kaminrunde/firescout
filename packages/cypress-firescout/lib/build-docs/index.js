"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createCommandTree_1 = __importDefault(require("./createCommandTree"));
var createFileContent_1 = __importDefault(require("./createFileContent"));
var fs_1 = __importDefault(require("fs"));
var config_1 = __importDefault(require("./config"));
var searchWithNode_1 = __importDefault(require("./searchWithNode"));
var searchWithGrep_1 = __importDefault(require("./searchWithGrep"));
var search = config_1.default.useGrep
    ? searchWithGrep_1.default
    : searchWithNode_1.default;
search()
    .then(createCommandTree_1.default)
    .then(createFileContent_1.default)
    .then(function (file) { return fs_1.default.writeFileSync(config_1.default.outPath, file, 'utf8'); })
    .catch(console.log);
