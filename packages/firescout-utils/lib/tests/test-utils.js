"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
var build_docs_1 = require("../src/build-docs");
var reporter = __importStar(require("../src/build-docs/reporter"));
var utils = __importStar(require("../src/build-docs/utils"));
var config = __importStar(require("../src/build-docs/config"));
var defaultConfig = {
    extensions: 'ts',
    fixturesFolder: 'fixtures',
    outPath: 'out',
    tsFixtures: true,
    widgetFolders: ['src']
};
function create(_config) {
    var _this = this;
    if (_config === void 0) { _config = {}; }
    _config = __assign(__assign({}, defaultConfig), _config);
    var files = {};
    var logs = [];
    // @ts-expect-error
    config.getConfig = function () { return _config; };
    // @ts-expect-error
    reporter.report = function (code, ctx) {
        var _a = reporter.codes[code](ctx), name = _a[0], path = _a[1];
        logs.push({ code: code, name: name, path: path });
    };
    // @ts-expect-error
    utils.readDir = function (path) { return __awaiter(_this, void 0, void 0, function () {
        var pathes;
        return __generator(this, function (_a) {
            pathes = Object.keys(files).filter(function (name) { return name.includes(path); });
            return [2 /*return*/, pathes.map(function (_path) {
                    var rest = _path.replace(path + '/', '');
                    var parts = rest.split('/');
                    var filename = parts[parts.length - 1];
                    return {
                        isDir: parts[0] !== filename,
                        isFile: parts[0] === filename,
                        name: parts[0],
                        path: path + '/' + parts[0]
                    };
                })];
        });
    }); };
    // @ts-expect-error
    utils.readFile = function (path) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, files[path]];
        });
    }); };
    var instance = {
        getFile: function (path) { return files[path]; },
        addMarkdown: function (path, def) {
            files[path] = toMarkdown(def);
            return instance;
        },
        addReactComponent: function (path, def) {
            files[path] = toReact(def);
            return instance;
        },
        addFile: function (path, content) {
            files[path] = content;
            return instance;
        },
        execute: function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, build_docs_1.getStructure()];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, {
                                    result: result,
                                    logs: logs,
                                    getComponent: function (context) {
                                        var c = result.tree.find(function (row) { return row.context === context; });
                                        if (!c)
                                            throw new Error("cannot find context \"" + context + "\" (getComponent)");
                                        return c;
                                    }
                                }];
                    }
                });
            });
        }
    };
    return instance;
}
exports.create = create;
function toMarkdown(def) {
    var content = '';
    if (def.type === 'component')
        content += '<!-- firescout-component -->\n';
    if (def.type === 'collection')
        content += '<!-- firescout-collection -->\n';
    content += "# " + def.name + "\n";
    if (def.desc)
        content += def.desc + "\n";
    if (def.handles) {
        content += "\n## Handles\n\n";
        def.handles.forEach(function (row) { return content += "- **" + row.name + "**: " + row.description + "\n"; });
    }
    if (def.states) {
        content += "\n## States\n\n";
        def.states.forEach(function (row) { return content += "- **" + row.name + "**: " + row.description + "\n"; });
    }
    if (def.collections) {
        content += "\n## Collections\n\n";
        def.collections.forEach(function (row) { return content += "- [" + row.name + "](" + row.path + ")\n"; });
    }
    return content;
}
function toReact(def) {
    var traverse = function (c) {
        var inner = c[2] ? c[2].map(traverse).join('') : '';
        var content = '';
        if (c[0] === 'ctx')
            content = "<div data-cy-ctx='" + c[1] + "'>" + inner + "</div>";
        if (c[0] === 'col')
            content = "<div data-cy-collection='" + c[1] + "'>" + inner + "</div>";
        if (c[0] === 'handle')
            content = "<div data-cy-handle='" + c[1] + "'>" + inner + "</div>";
        if (c[0] === 'state')
            content = "<div data-cy-state='" + c[1] + "'>" + inner + "</div>";
        return content;
    };
    return "export default function Component () { return (" + traverse(def.jsx) + ") }";
}
expect.extend({
    toContainLog: function (received, code, name, path) {
        var _this = this;
        var log = {
            code: code,
            name: name || expect.anything(),
            path: path || expect.anything()
        };
        var pass = this.equals(received.logs, expect.arrayContaining([
            expect.objectContaining(log)
        ]));
        if (pass) {
            return {
                message: function () { return ("expected " + _this.utils.printReceived(received.logs) + " not to contain log-object " + _this.utils.printExpected(log)); },
                pass: true
            };
        }
        else {
            return {
                message: function () { return ("expected " + _this.utils.printReceived(received.logs) + " to contain log-object " + _this.utils.printExpected(log)); },
                pass: false
            };
        }
    },
    // toContainLog(code:keyof typeof reporter.codes, name:string) {
    //   return 
    // },
    toContainObject: function (received, argument) {
        var _this = this;
        var pass = this.equals(received, expect.arrayContaining([
            expect.objectContaining(argument)
        ]));
        if (pass) {
            return {
                message: function () { return ("expected " + _this.utils.printReceived(received) + " not to contain object " + _this.utils.printExpected(argument)); },
                pass: true
            };
        }
        else {
            return {
                message: function () { return ("expected " + _this.utils.printReceived(received) + " to contain object " + _this.utils.printExpected(argument)); },
                pass: false
            };
        }
    }
});
