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
var fs_1 = __importDefault(require("fs"));
var config_1 = __importDefault(require("./config"));
var DOCS_CMD = "grep -rl \"<!-- firescout-(component|collection) -->\" " + config_1.default.widgetFolders;
var HANDLES_CMD = "grep -HREo \"data-cy-(state|ctx|handle|collection)=(\\\"|').*(\\\"|')\" " + config_1.default.widgetFolders;
function searchWithGrep() {
    return Promise.all([
        utils.executeCmd(DOCS_CMD),
        utils.executeCmd(HANDLES_CMD)
    ]).then(parseInput);
}
exports.default = searchWithGrep;
function parseInput(input) {
    var _a = input.map(function (s) {
        var list = s.split('\n').filter(Boolean);
        return Array.from(new Set(list));
    }), docs = _a[0], handles = _a[1];
    var rawDocItems = docs.map(function (doc) { return ({
        file: utils.normalizeFilePath(doc),
        type: doc.match(/firescout-component/) ? 'component-doc' : 'collection-doc',
        payload: fs_1.default.readFileSync(doc, 'utf8'),
        folder: utils.getFileFolder(doc)
    }); });
    var rawHandleItems = handles.map(function (handle) { return ({
        file: utils.normalizeFilePath(handle.split(':')[0]),
        // @ts-ignore
        type: handle.match(/data-cy-(state|ctx|handle|collection)/)[1],
        // @ts-ignore
        payload: handle.match(/data-cy-(state|ctx|handle|collection)=("|')(.*)("|')/)[3]
    }); });
    return __spreadArrays(rawDocItems, rawHandleItems);
}
