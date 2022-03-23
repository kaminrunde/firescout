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
exports.mount = void 0;
function mount(El, ctx) {
    var component = ctx.render(El);
    return wrap([{
            container: component.container,
            type: 'root',
            parent: null,
            index: 0
        }], ctx);
}
exports.mount = mount;
function wrap(elements, ctx) {
    var _this = this;
    return {
        context: function (name) {
            var targets = [];
            var _loop_1 = function (el) {
                targets.push.apply(targets, Array.from(el.container.querySelectorAll("[data-cy-ctx=\"" + name + "\"]"))
                    .map(function (container, index) { return ({ container: container, parent: el, type: 'context', index: index }); }));
            };
            for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
                var el = elements_1[_i];
                _loop_1(el);
            }
            if (targets.length === 0) {
                throw new Error("could not find context \"" + name + "\"");
            }
            return wrap(targets, ctx);
        },
        handle: function (name) {
            var targets = [];
            var _loop_2 = function (el) {
                targets.push.apply(targets, Array.from(el.container.querySelectorAll("[data-cy-handle=\"" + name + "\"]"))
                    .map(function (container, index) { return ({ container: container, parent: el, type: 'handle', index: index }); }));
            };
            for (var _i = 0, elements_2 = elements; _i < elements_2.length; _i++) {
                var el = elements_2[_i];
                _loop_2(el);
            }
            if (targets.length === 0) {
                throw new Error("could not find handle \"" + name + "\"");
            }
            return wrap(targets, ctx);
        },
        collection: function (name) {
            var targets = [];
            var _loop_3 = function (el) {
                targets.push.apply(targets, Array.from(el.container.querySelectorAll("[data-cy-collection=\"" + name + "\"]"))
                    .map(function (container, index) { return ({ container: container, parent: el, type: 'collection', index: index }); }));
            };
            for (var _i = 0, elements_3 = elements; _i < elements_3.length; _i++) {
                var el = elements_3[_i];
                _loop_3(el);
            }
            if (targets.length === 0) {
                throw new Error("could not find collection \"" + name + "\"");
            }
            return wrap(targets, ctx);
        },
        shouldHaveState: function (name) {
            var target = null;
            for (var _i = 0, elements_4 = elements; _i < elements_4.length; _i++) {
                var el = elements_4[_i];
                var hit = el.container.querySelector("[data-cy-state=\"" + name + "\"]");
                if (!hit)
                    continue;
                target = hit;
                break;
            }
            if (!target)
                throw new Error("expected to find state \"" + name + "\".");
        },
        shouldNotHaveState: function (name) {
            var target = null;
            for (var _i = 0, elements_5 = elements; _i < elements_5.length; _i++) {
                var el = elements_5[_i];
                var hit = el.container.querySelector("[data-cy-state=\"" + name + "\"]");
                if (!hit)
                    continue;
                target = hit;
                break;
            }
            if (target)
                throw new Error("expected not to find state \"" + name + "\".");
        },
        // utils
        nth: function (n) {
            if (!elements[n])
                throw new Error("\"nth(" + n + ")\" does not work on a list of length " + elements.length);
            return wrap([elements[n]], ctx);
        },
        wait: function (ms) {
            return ctx.act(function () { return new Promise(function (r) { return setTimeout(r, ms); }); });
        },
        unwrap: function () {
            if (elements.length > 1) {
                throw new Error("found multiple elements to unwrap.");
            }
            return elements[0].container;
        },
        // events
        click: function (w) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (elements.length > 1) {
                    throw new Error("found multiple elements to click. Please use nth() to select one");
                }
                ctx.fireEvent.click(elements[0].container);
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
                            throw new Error("found multiple elements to simulate event. Please use nth() to select one");
                        }
                        return [4 /*yield*/, cb(elements[0].container)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, wrap(elements, ctx)];
                }
            });
        }); }
    };
}
