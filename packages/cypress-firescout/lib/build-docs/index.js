"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createCommandTree_1 = __importDefault(require("./createCommandTree"));
var createFileContent_1 = __importDefault(require("./createFileContent"));
var config_1 = __importDefault(require("./config"));
var findInFiles_1 = __importDefault(require("./findInFiles"));
var DOCS_CMD = "grep -rl \"<!-- firescout-docs -->\" " + config_1.default.widgetFolder;
var HANDLES_CMD = "grep -HREo \"data-cy-(state|ctx|trigger)=(\\\"|').*(\\\"|')\" " + config_1.default.widgetFolder;
findInFiles_1.default()
    // .then(console.log)
    // .catch(console.log)
    // Promise.all([
    //   utils.executeCmd(DOCS_CMD),
    //   utils.executeCmd(HANDLES_CMD),
    // ])
    // .then(parseInput)
    .then(createCommandTree_1.default)
    .then(createFileContent_1.default)
    // .then(r => JSON.stringify(r,null,2))
    .then(console.log)
    // .then(file => fs.writeFileSync(config.outPath, file, 'utf8'))
    .catch(console.log);
