"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils = __importStar(require("./utils"));
var createCommandTree_1 = __importDefault(require("./createCommandTree"));
var createFileContent_1 = __importDefault(require("./createFileContent"));
var parseInput_1 = __importDefault(require("./parseInput"));
var fs_1 = __importDefault(require("fs"));
var config_1 = __importDefault(require("./config"));
var DOCS_CMD = "grep -rl \"<!-- firescout-docs -->\" " + config_1.default.widgetFolder;
var HANDLES_CMD = "grep -HREo \"data-cy-(state|ctx|trigger)=(\\\"|').*(\\\"|')\" " + config_1.default.widgetFolder;
Promise.all([
    utils.executeCmd(DOCS_CMD),
    utils.executeCmd(HANDLES_CMD),
])
    .then(parseInput_1.default)
    .then(createCommandTree_1.default)
    .then(createFileContent_1.default)
    // .then(r => JSON.stringify(r,null,2))
    .then(function (file) { return fs_1.default.writeFileSync(config_1.default.outPath, file, 'utf8'); })
    .catch(console.log);
