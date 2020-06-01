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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("./config"));
var utils = __importStar(require("./utils"));
function findInFiles() {
    return __awaiter(this, void 0, void 0, function () {
        var files, extensionsRegex, matches, rawItems, _loop_1, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findAllFiles([config_1.default.widgetFolder])];
                case 1:
                    files = _a.sent();
                    extensionsRegex = config_1.default.extensions
                        .split('|').concat('md').map(function (s) { return "." + s + "$"; }).join('|');
                    files = files.filter(function (f) { return f.name.match(new RegExp(extensionsRegex)); });
                    return [4 /*yield*/, Promise.all(files.map(function (f) { return getMatch(f.path); }))];
                case 2:
                    matches = _a.sent();
                    rawItems = [];
                    _loop_1 = function (i) {
                        if (matches[i]) {
                            var m = matches[i];
                            m.forEach(function (row) {
                                rawItems.push({
                                    type: row.type,
                                    payload: row.payload,
                                    file: utils.normalizeFilePath(files[i].path),
                                    folder: utils.getFileFolder(files[i].path)
                                });
                            });
                        }
                    };
                    for (i = 0; i < files.length; i++) {
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
function getMatch(path) {
    return __awaiter(this, void 0, void 0, function () {
        var result, regex_1, match, regex, rawMatches, regex_2, matches;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils.readFile(path)];
                case 1:
                    result = _a.sent();
                    if (path.endsWith('.md')) {
                        regex_1 = new RegExp("<!-- firescout-(component|collection) -->");
                        match = null;
                        if (match = result.match(regex_1))
                            return [2 /*return*/, [{
                                        type: match[1] === 'component' ? 'component-doc' : 'collection-doc',
                                        payload: result
                                    }]];
                        else
                            return [2 /*return*/, null];
                    }
                    regex = new RegExp("data-cy-(state|ctx|handle)=(\"|')(.*)(\"|')", 'g');
                    rawMatches = result.match(regex);
                    if (rawMatches) {
                        rawMatches = Array.from(new Set(rawMatches.filter(Boolean)));
                        regex_2 = new RegExp("data-cy-(state|ctx|handle)=(\"|')(.*)(\"|')");
                        matches = rawMatches.map(function (s) { return s.match(regex_2); });
                        return [2 /*return*/, matches.map(function (match) { return ({
                                // @ts-ignore
                                type: match[1],
                                // @ts-ignore
                                payload: match[3]
                            }); })];
                    }
                    return [2 /*return*/, null];
            }
        });
    });
}
