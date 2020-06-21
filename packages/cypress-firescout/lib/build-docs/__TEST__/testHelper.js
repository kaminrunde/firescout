"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOutput = exports.setup = void 0;
var index_1 = require("../index");
// let utils:any
function setup() {
    // const config = require('../config')
    // config.default = () => ({
    //   widgetFolders: ['widgets'],
    //   outPath: 'out',
    //   extensions: 'ts',
    //   useGrep: false,
    //   fixturesFolder: 'fixtures',
    // })
}
exports.setup = setup;
function createOutput(files, configExt, mdIndent) {
    if (mdIndent === void 0) { mdIndent = 8; }
    return __awaiter(this, void 0, void 0, function () {
        var tree, docs, modules, content, config, utils;
        return __generator(this, function (_a) {
            config = require('../config');
            config.default = function () { return ({
                widgetFolders: ['widgets'],
                outPath: 'out',
                extensions: 'ts',
                useGrep: false,
                fixturesFolder: 'fixtures',
            }); };
            utils = require('../utils');
            utils.readDir = function (path) {
                var cwd = process.cwd();
                path = path.replace(cwd, '');
                var allFolders = new Map();
                var allFiles = new Map();
                var fileNames = Object.keys(files)
                    .filter(function (s) { return s.startsWith(path); });
                // .map(s => s.replace(path+'/', ''))
                for (var _i = 0, fileNames_1 = fileNames; _i < fileNames_1.length; _i++) {
                    var path_1 = fileNames_1[_i];
                    var fullSection = '';
                    for (var _a = 0, _b = path_1.split('/'); _a < _b.length; _a++) {
                        var section = _b[_a];
                        fullSection += '/' + section;
                        if (section.includes('.'))
                            allFiles.set(path_1, section);
                        else
                            allFolders.set(fullSection, section);
                    }
                }
                utils.readFile = function (path) {
                    var content = files[path];
                    if (path.includes('.md')) {
                        content = content
                            .split('\n')
                            .map(function (s) { return s.slice(mdIndent); })
                            .join('\n');
                    }
                    return Promise.resolve(content);
                };
                var result = [];
                for (var _c = 0, _d = Array.from(allFolders); _c < _d.length; _c++) {
                    var _e = _d[_c], path_2 = _e[0], name_1 = _e[1];
                    result.push({ name: name_1, path: path_2, isFile: false, isDir: true });
                }
                for (var _f = 0, _g = Array.from(allFiles); _f < _g.length; _f++) {
                    var _h = _g[_f], path_3 = _h[0], name_2 = _h[1];
                    result.push({ name: name_2, path: path_3, isFile: true, isDir: false });
                }
                return Promise.resolve(result);
            };
            index_1.firescout();
            return [2 /*return*/];
        });
    });
}
exports.createOutput = createOutput;
