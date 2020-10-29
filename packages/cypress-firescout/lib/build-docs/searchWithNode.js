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
var config_1 = __importDefault(require("./config"));
var utils = __importStar(require("./utils"));
function findInFiles() {
    return __awaiter(this, void 0, void 0, function () {
        var config, files, extensionsRegex, srcFiles, fixtureFiles, allFiles, rawItems, matches, _loop_1, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = config_1.default();
                    return [4 /*yield*/, findAllFiles(__spreadArrays(config.widgetFolders, [config.fixturesFolder]))];
                case 1:
                    files = _a.sent();
                    extensionsRegex = config.extensions
                        .split('|').concat('md').map(function (s) { return "." + s + "$"; }).join('|');
                    srcFiles = files.filter(function (f) { return f.name.match(new RegExp(extensionsRegex)); });
                    fixtureFiles = files.filter(function (f) { return f.path.includes(config.fixturesFolder); });
                    allFiles = __spreadArrays(srcFiles, fixtureFiles);
                    rawItems = [];
                    return [4 /*yield*/, Promise.all(__spreadArrays(srcFiles.map(function (f) { return getSrcMatch(f.path); }), fixtureFiles.map(function (f) { return getFixtureMatch(f.path); })))];
                case 2:
                    matches = _a.sent();
                    _loop_1 = function (i) {
                        if (matches[i]) {
                            var m = matches[i];
                            m.forEach(function (row) {
                                rawItems.push({
                                    type: row.type,
                                    payload: row.payload,
                                    file: utils.normalizeFilePath(allFiles[i].path),
                                    folder: utils.getFileFolder(allFiles[i].path)
                                });
                            });
                        }
                    };
                    for (i = 0; i < allFiles.length; i++) {
                        _loop_1(i);
                    }
                    return [2 /*return*/, rawItems];
            }
        });
    });
}
exports.default = findInFiles;
function findAllFiles(paths) {
    return __awaiter(this, void 0, void 0, function () {
        var allFiles, files, dirs, _i, allFiles_1, row, _a, row_1, file, subFiles;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all(paths.map(function (path) { return utils.readDir(path); }))];
                case 1:
                    allFiles = _b.sent();
                    files = [];
                    dirs = [];
                    for (_i = 0, allFiles_1 = allFiles; _i < allFiles_1.length; _i++) {
                        row = allFiles_1[_i];
                        for (_a = 0, row_1 = row; _a < row_1.length; _a++) {
                            file = row_1[_a];
                            if (file.isDir)
                                dirs.push(file);
                            else
                                files.push(file);
                        }
                    }
                    if (!dirs.length) return [3 /*break*/, 3];
                    return [4 /*yield*/, findAllFiles(dirs.map(function (f) { return f.path; }))];
                case 2:
                    subFiles = _b.sent();
                    files.push.apply(files, subFiles);
                    _b.label = 3;
                case 3: return [2 /*return*/, files];
            }
        });
    });
}
function getSrcMatch(path) {
    return __awaiter(this, void 0, void 0, function () {
        var result, regex, match, allMatches, cRegexString, cRegexCond, moduleRegex, moduleCommentRegex, variableRegex, variableCommentRegex, cMatchesString, cMatchesCond, moduleMatches, moduleCommentMatches, variableMatches, variableCommentMatches, regex_1, matches, sMatchesRegex, _i, cMatchesCond_1, s, type, matches_2, _a, matches_1, match, payload, regex_2, matches, regex_3, matches, regex_4, matches, regex_5, matches, regex_6, matches;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, utils.readFile(path)];
                case 1:
                    result = _b.sent();
                    if (path.endsWith('.md')) {
                        regex = new RegExp("<!-- firescout-(component|collection) -->");
                        match = null;
                        if (match = result.match(regex))
                            return [2 /*return*/, [{
                                        type: match[1] === 'component' ? 'component-doc' : 'collection-doc',
                                        payload: result
                                    }]];
                        else
                            return [2 /*return*/, null];
                    }
                    allMatches = [];
                    cRegexString = new RegExp("data-cy-(state|ctx|handle|collection)[^=\"' ]* ?=(\"|')[^(\"|')]*.", 'g');
                    cRegexCond = new RegExp("data-cy-(state|ctx|handle|collection)[^=\"' ]*= ?[^\"'][^}]*}", 'g');
                    moduleRegex = new RegExp("firescoutMockFn ?(<.*>)? *\\([ \r\n]*(\"|').*(\"|')", 'g');
                    moduleCommentRegex = new RegExp("@firescoutMockFn ([^ ]*)", 'g');
                    variableRegex = new RegExp("firescoutMockVar *:? *(<.*>)? *\\([ \r\n]*(\"|').*(\"|')", 'g');
                    variableCommentRegex = new RegExp("@firescoutMockVar ([^ ]*)", 'g');
                    cMatchesString = result.match(cRegexString);
                    cMatchesCond = result.match(cRegexCond);
                    moduleMatches = result.match(moduleRegex);
                    moduleCommentMatches = result.match(moduleCommentRegex);
                    variableMatches = result.match(variableRegex);
                    variableCommentMatches = result.match(variableCommentRegex);
                    if (cMatchesString) {
                        cMatchesString = Array.from(new Set(cMatchesString.filter(Boolean)));
                        regex_1 = new RegExp("data-cy-(state|ctx|handle|collection)[^=\"' ]* ?=(\"|')(.*)(\"|')");
                        matches = cMatchesString.map(function (s) { return s.match(regex_1); });
                        allMatches.push.apply(allMatches, matches.map(function (match) { return ({
                            type: match[1],
                            payload: match[3]
                        }); }));
                    }
                    if (cMatchesCond) {
                        cMatchesCond = Array.from(new Set(cMatchesCond.filter(Boolean)));
                        sMatchesRegex = new RegExp("[\"'][^\"']*[\"']", "g") // matches static strings
                        ;
                        for (_i = 0, cMatchesCond_1 = cMatchesCond; _i < cMatchesCond_1.length; _i++) {
                            s = cMatchesCond_1[_i];
                            type = (s.match(/data-cy-(state|ctx|handle|collection)/) || [])[1];
                            matches_2 = s.replace(/[\s]*/g, '').match(sMatchesRegex);
                            if (!matches_2)
                                continue;
                            for (_a = 0, matches_1 = matches_2; _a < matches_1.length; _a++) {
                                match = matches_1[_a];
                                payload = match.replace(/["']/g, '');
                                if (payload.startsWith('data-cy-'))
                                    continue;
                                allMatches.push({
                                    type: type,
                                    payload: payload
                                });
                            }
                        }
                        regex_2 = new RegExp("data-cy-(state|ctx|handle|collection)[^=\"' ]* ?=(\"|')(.*)(\"|')");
                        matches = cMatchesCond.map(function (s) { return s.match(regex_2); }).filter(function (a) { return a && a[0]; });
                        allMatches.push.apply(allMatches, matches.map(function (match) { return ({
                            type: match[1],
                            payload: match[3]
                        }); }));
                    }
                    if (moduleMatches) {
                        regex_3 = new RegExp("firescoutMockFn ?(<.*>)? *\\([ \r\n]*(\"|')(.*)(\"|')");
                        matches = moduleMatches.map(function (s) { return s.match(regex_3); });
                        allMatches.push.apply(allMatches, matches.map(function (match) { return ({
                            type: 'module-fn',
                            payload: match[3]
                        }); }));
                    }
                    if (moduleCommentMatches) {
                        regex_4 = new RegExp("@firescoutMockFn ([^ ]*)");
                        matches = moduleCommentMatches.map(function (s) { return s.match(regex_4); });
                        allMatches.push.apply(allMatches, matches.map(function (match) { return ({
                            type: 'module-fn',
                            payload: match[1]
                        }); }));
                    }
                    if (variableCommentMatches) {
                        regex_5 = new RegExp("@firescoutMockVar ([^ ]*)");
                        matches = variableCommentMatches.map(function (s) { return s.match(regex_5); });
                        allMatches.push.apply(allMatches, matches.map(function (match) { return ({
                            type: 'module-var',
                            payload: match[1]
                        }); }));
                    }
                    if (variableMatches) {
                        regex_6 = new RegExp("firescoutMockVar *:? *(<.*>)? *\\([ \r\n]*(\"|')([^'\"]*)(\"|')");
                        matches = variableMatches.map(function (s) { return s.match(regex_6); });
                        allMatches.push.apply(allMatches, matches.map(function (match) { return ({
                            type: 'module-var',
                            payload: match[3]
                        }); }));
                    }
                    return [2 /*return*/, allMatches.length ? allMatches : null];
            }
        });
    });
}
function getFixtureMatch(path) {
    return __awaiter(this, void 0, void 0, function () {
        var config, content, result, match, relPath, _a, module, fileName, _b, name, variation;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    config = config_1.default();
                    if (!path.endsWith('.ts'))
                        return [2 /*return*/, null];
                    return [4 /*yield*/, utils.readFile(path)];
                case 1:
                    content = _c.sent();
                    result = '/**\n * ...\n */';
                    match = content.match(/\/\*\*(.|\n)*/);
                    if (match)
                        result = match[0].split('*/')[0] + '*/';
                    relPath = path.replace(config.fixturesFolder + '/', '');
                    if (relPath.split('/').length !== 2)
                        return [2 /*return*/, null];
                    _a = relPath.split('/'), module = _a[0], fileName = _a[1];
                    _b = fileName.split('.'), name = _b[0], variation = _b[1];
                    if (variation === 'ts')
                        variation = 'default';
                    result = result.replace('*/', "* @module " + module + "\n * @name " + name + "\n * @variation " + variation + "\n */");
                    return [2 /*return*/, [{
                                type: 'fixture',
                                payload: result
                            }]];
            }
        });
    });
}
