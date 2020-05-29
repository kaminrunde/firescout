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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils = __importStar(require("./utils"));
var createCommandTree_1 = __importDefault(require("./createCommandTree"));
var createFileContent_1 = __importDefault(require("./createFileContent"));
var fs_1 = __importDefault(require("fs"));
var configRaw = fs_1.default.readFileSync(process.cwd() + '/firescout.json', 'utf8');
var config = JSON.parse(configRaw);
var DOCS_CMD = "grep -rl \"<!-- firescout-docs -->\" " + process.cwd() + "/" + config.widgetFolder;
var HANDLES_CMD = "grep -HREo \"data-cy-(state|ctx|trigger)=(\\\"|').*(\\\"|')\" " + process.cwd() + "/" + config.widgetFolder;
Promise.all([
    utils.executeCmd(DOCS_CMD),
    utils.executeCmd(HANDLES_CMD),
])
    // format
    .then(function (a) { return a.map(function (s) {
    var list = s.split('\n').filter(Boolean);
    return Array.from(new Set(list));
}); })
    .then(function (_a) {
    var docs = _a[0], handles = _a[1];
    var rawDocItems = docs.map(function (doc) { return ({
        file: utils.parseFile(doc),
        type: 'component-doc',
        payload: fs_1.default.readFileSync(doc, 'utf8')
    }); });
    var rawHandleItems = handles.map(function (handle) { return ({
        file: utils.parseFile(handle.split(':')[0]),
        // @ts-ignore
        type: handle.match(/data-cy-(state|ctx|trigger)/)[1],
        // @ts-ignore
        payload: handle.match(/data-cy-(state|ctx|trigger)=("|')(.*)("|')/)[3]
    }); });
    return __spreadArrays(rawDocItems, rawHandleItems);
})
    .then(createCommandTree_1.default)
    .then(createFileContent_1.default)
    // .then(r => JSON.stringify(r,null,2))
    .then(console.log)
    .catch(console.log);
