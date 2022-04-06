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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearMocks = exports.getModule = exports.mount = void 0;
var utils = __importStar(require("./utils"));
var build_docs_1 = require("@kaminrunde/firescout-utils/lib/build-docs");
var matchers = __importStar(require("./matchers"));
function mount(El, ctx) {
    var component = ctx.render(El);
    return wrap([
        {
            container: component.container,
            // type: 'root',
            parent: null,
            index: 0,
        },
    ], ctx);
}
exports.mount = mount;
function getModule(moduleName) {
    var mock_path = build_docs_1.getConfig().fixturesFolder;
    // const mock_path = "/Users/manueljung/Documents/relax/firescout/examples/jest-example/firescout-mocks"
    return {
        var: function (varName) { return ({
            set: function (val) {
                var _a;
                window.firescoutVars = __assign(__assign({}, window.firescoutVars), (_a = {}, _a[moduleName + '.' + varName] = val, _a));
            },
            fixture: function (name) {
                return __awaiter(this, void 0, void 0, function () {
                    var path, val;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                path = mock_path + '/' + moduleName + '/' + varName;
                                if (name && name !== 'default')
                                    path += '.' + name;
                                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("" + path)); })];
                            case 1:
                                val = (_b.sent()).default;
                                window.firescoutVars = __assign(__assign({}, window.firescoutVars), (_a = {}, _a[moduleName + '.' + varName] = val, _a));
                                return [2 /*return*/];
                        }
                    });
                });
            }
        }); },
        fn: function (fnName) { return ({
            stub: function (wrapper) {
                if (!window.cymocks)
                    window.cymocks = {};
                // @ts-expect-error
                if (!wrapper)
                    wrapper = function (cb) { return cb(); };
                // @ts-expect-error
                var cb = wrapper(function () { return null; });
                window.cymocks[moduleName + '.' + fnName] = {
                    cb: cb,
                    type: 'stub',
                };
            },
            mock: function (config, wrapper) {
                return __awaiter(this, void 0, void 0, function () {
                    var c, value, path, cb;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                c = !config || typeof config === 'string' ? { fixture: config } : config;
                                value = c.value;
                                if (!!value) return [3 /*break*/, 2];
                                path = mock_path + '/' + moduleName + '/' + fnName;
                                if (c.fixture && c.fixture !== 'default')
                                    path += '.' + c.fixture;
                                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("" + path)); })];
                            case 1:
                                value = (_a.sent()).default;
                                _a.label = 2;
                            case 2:
                                if (c.transform)
                                    value = c.transform(value);
                                if (typeof value === 'undefined') {
                                    utils.bubbleError(1, 'either mock data resolved undefined or you forgot to resolve value in "transform"');
                                }
                                if (value.__sync)
                                    c.sync = true;
                                if (!window.cymocks)
                                    window.cymocks = {};
                                // @ts-expect-error
                                if (!wrapper)
                                    wrapper = function (cb) { return function () { return cb(); }; };
                                cb = wrapper(c.sync
                                    ? function () { return value; }
                                    : function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!c.timeout) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, c.timeout); })];
                                                case 1:
                                                    _a.sent();
                                                    _a.label = 2;
                                                case 2: return [2 /*return*/, value];
                                            }
                                        });
                                    }); });
                                window.cymocks[moduleName + '.' + fnName] = {
                                    cb: cb,
                                    type: 'mock',
                                };
                                return [2 /*return*/, cb];
                        }
                    });
                });
            },
        }); },
    };
}
exports.getModule = getModule;
function clearMocks() {
    delete window.cymocks;
    delete window.firescoutVars;
}
exports.clearMocks = clearMocks;
function wrap(elements, ctx) {
    var _this = this;
    return {
        context: function (name) {
            var targets = utils.query("[data-cy-ctx=\"" + name + "\"]", elements);
            if (targets.length === 0) {
                utils.bubbleError(2, "could not find context \"" + name + "\"");
            }
            return wrap(targets, ctx);
        },
        handle: function (name) {
            var targets = utils.query("[data-cy-handle=\"" + name + "\"]", elements);
            if (targets.length === 0) {
                utils.bubbleError(2, "could not find handle \"" + name + "\"");
            }
            return wrap(targets, ctx);
        },
        collection: function (name) {
            var targets = utils.query("[data-cy-collection=\"" + name + "\"]", elements);
            if (targets.length === 0) {
                utils.bubbleError(2, "could not find collection \"" + name + "\"");
            }
            return wrap(targets, ctx);
        },
        shouldHaveState: function (name, implementations) {
            if (elements.length > 1) {
                utils.bubbleError(2, "found multiple elements to test. please select with \"nth(n)\"");
            }
            var imps = implementations ? implementations.split(',') : null;
            var container = elements[0].container;
            var query = function (s) { return [container, container.querySelector(s)].filter(function (el) { return el === null || el === void 0 ? void 0 : el.matches(s); })[0]; };
            if (imps) {
                for (var _i = 0, imps_1 = imps; _i < imps_1.length; _i++) {
                    var key = imps_1[_i];
                    var hit = query("[data-cy-state=\"" + name + ":" + key + "\"]");
                    if (!hit)
                        utils.bubbleError(2, "expected to find state \"" + name + ":" + key + "\".");
                }
            }
            else {
                var hit = query("[data-cy-state=\"" + name + "\"]");
                if (!hit)
                    utils.bubbleError(2, "expected to find state \"" + name + "\".");
            }
            return wrap(elements, ctx);
        },
        shouldNotHaveState: function (name) {
            if (elements.length > 1) {
                utils.bubbleError(2, "found multiple elements to test. please select with \"nth(n)\"");
            }
            var container = elements[0].container;
            var query = function (s) { return __spreadArrays([container], Array.from(container.querySelectorAll(s))).filter(function (el) { return el === null || el === void 0 ? void 0 : el.matches(s); }); };
            var hits = query("[data-cy-state]");
            for (var _i = 0, hits_1 = hits; _i < hits_1.length; _i++) {
                var hit = hits_1[_i];
                var state = hit.attributes['data-cy-state'].value;
                if (state === name || state.startsWith(name + ':')) {
                    utils.bubbleError(2, "expected not to find state \"" + state + "\".");
                }
            }
            return wrap(elements, ctx);
        },
        // utils
        nth: function (n) {
            if (!elements[n]) {
                utils.bubbleError(2, "\"nth(" + n + ")\" does not work on a list of length " + elements.length);
            }
            return wrap([elements[n]], ctx);
        },
        wait: function (ms) {
            return ctx.act(function () { return new Promise(function (r) { return setTimeout(r, ms); }); });
        },
        unwrap: function () {
            if (elements.length > 1) {
                utils.bubbleError(2, "found multiple elements to unwrap. please select with \"nth(n)\"");
            }
            return elements[0].container;
        },
        // events
        click: function (w) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (elements.length > 1) {
                    utils.bubbleError(2, "found multiple elements to click. Please use nth() to select one");
                }
                ctx.fireEvent.click(elements[0].container);
                if (typeof w !== 'undefined') {
                    if (typeof w === 'number')
                        return [2 /*return*/, ctx.act(function () { return new Promise(function (r) { return setTimeout(r, w); }); })];
                }
                return [2 /*return*/, wrap(elements, ctx)];
            });
        }); },
        type: function (value, w) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (elements.length > 1) {
                    utils.bubbleError(2, "found multiple elements to click. Please use nth() to select one");
                }
                ctx.fireEvent.change(elements[0].container, { target: { value: value } });
                if (typeof w !== 'undefined') {
                    if (typeof w === 'number')
                        return [2 /*return*/, ctx.act(function () { return new Promise(function (r) { return setTimeout(r, w); }); })];
                }
                return [2 /*return*/, wrap(elements, ctx)];
            });
        }); },
        simulate: function (cb) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (elements.length > 1) {
                            utils.bubbleError(2, "found multiple elements to simulate event. Please use nth(n) to select one");
                        }
                        return [4 /*yield*/, cb(elements[0].container)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, wrap(elements, ctx)];
                }
            });
        }); },
        // MATCHERS
        should: function (m, val) {
            if (elements.length > 1) {
                utils.bubbleError(2, "found multiple elements to test. Please use nth(n) to select one");
            }
            var node = elements[0].container;
            switch (m) {
                case 'contain.text': {
                    var e = matchers.containText(node, val, false);
                    if (e)
                        utils.bubbleError(2, e);
                    break;
                }
                case 'not.contain.text': {
                    var e = matchers.containText(node, val, true);
                    if (e)
                        utils.bubbleError(2, e);
                    break;
                }
                case 'have.value': {
                    var e = matchers.haveValue(node, val, false);
                    if (e)
                        utils.bubbleError(2, e);
                    break;
                }
                case 'not.have.value': {
                    var e = matchers.haveValue(node, val, true);
                    if (e)
                        utils.bubbleError(2, e);
                    break;
                }
                default: utils.bubbleError(2, 'unknown matcher');
            }
        }
    };
}
