"use strict";
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
var utils_1 = require("./utils");
var createCommandTree_1 = __importDefault(require("./createCommandTree"));
var fs_1 = __importDefault(require("fs"));
var configRaw = fs_1.default.readFileSync(process.cwd() + '/firescout.json', 'utf8');
var config = JSON.parse(configRaw);
var DOCS_CMD = "grep -rl \"<!-- firescout-docs -->\" " + process.cwd() + "/" + config.widgetFolder;
var HANDLES_CMD = "grep -HREo \"data-cy-(state|ctx|trigger)=(\\\"|').*(\\\"|')\" " + process.cwd() + "/" + config.widgetFolder;
Promise.all([
    utils_1.executeCmd(DOCS_CMD),
    utils_1.executeCmd(HANDLES_CMD),
])
    // format
    .then(function (a) { return a.map(function (s) {
    var list = s.split('\n').filter(Boolean);
    return Array.from(new Set(list));
}); })
    .then(function (_a) {
    var docs = _a[0], handles = _a[1];
    var rawDocItems = docs.map(function (doc) { return ({
        file: doc,
        type: 'component-doc',
        payload: fs_1.default.readFileSync(doc, 'utf8')
    }); });
    var rawHandleItems = handles.map(function (handle) { return ({
        file: handle.split(':')[0],
        // @ts-ignore
        type: handle.match(/data-cy-(state|ctx|trigger)/)[1],
        // @ts-ignore
        payload: handle.match(/data-cy-(state|ctx|trigger)=("|')(.*)("|')/)[3]
    }); });
    return __spreadArrays(rawDocItems, rawHandleItems);
})
    .then(createCommandTree_1.default)
    .then(console.log)
    .catch(console.log);
