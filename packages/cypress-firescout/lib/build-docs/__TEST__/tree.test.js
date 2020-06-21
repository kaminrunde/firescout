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
var testHelper_1 = require("./testHelper");
var e = expect;
describe('tree', function () {
    test('all contexts should be added', function () { return __awaiter(void 0, void 0, void 0, function () {
        var files, tree;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    files = {
                        'widgets/Component1/Component1.ts': "\n        data-cy-ctx=\"c/Component1\"\n      ",
                        'widgets/Component2/Component2.ts': "\n        data-cy-ctx=\"c/Component2\"\n      ",
                    };
                    return [4 /*yield*/, testHelper_1.createOutput(files)];
                case 1:
                    tree = (_a.sent()).tree;
                    e(tree.length).toBe(2);
                    e(tree[0]).toEqual({
                        context: 'c/Component1',
                        typesaveContext: 'CComponent1',
                        file: 'widgets/Component1/Component1.ts',
                        folder: 'widgets/Component1',
                        handles: [],
                        states: [],
                        collections: []
                    });
                    e(tree[1]).toEqual({
                        context: 'c/Component2',
                        typesaveContext: 'CComponent2',
                        file: 'widgets/Component2/Component2.ts',
                        folder: 'widgets/Component2',
                        handles: [],
                        states: [],
                        collections: []
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    test('handles are added to correct context', function () { return __awaiter(void 0, void 0, void 0, function () {
        var files, tree;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    files = {
                        'widgets/Component1/Component1.ts': "\n        data-cy-ctx=\"c/Component1\"\n          data-cy-handle='handle-1'\n      ",
                        'widgets/Component2/Component2.ts': "\n        data-cy-ctx=\"c/Component2\"\n          data-cy-handle='handle-2'\n      ",
                    };
                    return [4 /*yield*/, testHelper_1.createOutput(files)];
                case 1:
                    tree = (_a.sent()).tree;
                    e(tree[0].handles).toEqual([{
                            name: 'handle-1',
                            file: 'widgets/Component1/Component1.ts'
                        }]);
                    e(tree[1].handles).toEqual([{
                            name: 'handle-2',
                            file: 'widgets/Component2/Component2.ts'
                        }]);
                    return [2 /*return*/];
            }
        });
    }); });
    test('handles do not have to be in the same file', function () { return __awaiter(void 0, void 0, void 0, function () {
        var files, tree;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    files = {
                        'widgets/Component1/Component1.ts': "\n        data-cy-ctx=\"c/Component1\"\n          data-cy-handle='handle-1'\n      ",
                        'widgets/Component1/Component2.ts': "\n        data-cy-handle='handle-2'\n      ",
                        'widgets/Component1/Component3/Component3.ts': "\n        data-cy-handle='handle-3'\n      ",
                        'widgets/Component2/Component2.ts': "\n        data-cy-handle='handle-4'\n      ",
                    };
                    return [4 /*yield*/, testHelper_1.createOutput(files)];
                case 1:
                    tree = (_a.sent()).tree;
                    e(tree[0].handles[0]).toEqual({
                        name: 'handle-1',
                        file: 'widgets/Component1/Component1.ts'
                    });
                    e(tree[0].handles[1]).toEqual({
                        name: 'handle-2',
                        file: 'widgets/Component1/Component2.ts'
                    });
                    e(tree[0].handles[2]).toEqual({
                        name: 'handle-3',
                        file: 'widgets/Component1/Component3/Component3.ts'
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    test('handle is added to collection', function () { return __awaiter(void 0, void 0, void 0, function () {
        var files, tree;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    files = {
                        'widgets/Component1/Component1.ts': "\n        data-cy-ctx=\"c/Component1\"\n      ",
                        'widgets/Component1/Inner.ts': "\n        data-cy-collection=\"Inner\"\n          data-cy-handle='handle-1'\n      ",
                    };
                    return [4 /*yield*/, testHelper_1.createOutput(files)];
                case 1:
                    tree = (_a.sent()).tree;
                    e(tree[0].handles.length).toBe(0);
                    e(tree[0].collections[0]).toBeDefined();
                    e(tree[0].collections[0].handles[0]).toEqual({
                        name: 'handle-1',
                        file: 'widgets/Component1/Inner.ts'
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    test('can have multiple nested collections', function () { return __awaiter(void 0, void 0, void 0, function () {
        var files, tree;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    files = {
                        'widgets/Component1/Component1.ts': "\n        data-cy-ctx=\"c/Component1\"\n      ",
                        'widgets/Component1/A/A.ts': "\n        data-cy-collection=\"A\"\n          data-cy-state='state-1'\n      ",
                        'widgets/Component1/A/B/B.ts': "\n        data-cy-collection=\"B\"\n          data-cy-state='state-2'\n      ",
                    };
                    return [4 /*yield*/, testHelper_1.createOutput(files)];
                case 1:
                    tree = (_a.sent()).tree;
                    e(tree[0].collections.length).toBe(1);
                    e(tree[0].collections[0].collections.length).toBe(1);
                    e(tree[0].collections[0].states.length).toBe(1);
                    e(tree[0].collections[0].collections[0].states.length).toBe(1);
                    e(tree[0].collections[0].states[0]).toEqual({
                        name: 'state-1',
                        file: 'widgets/Component1/A/A.ts'
                    });
                    e(tree[0].collections[0].collections[0].states[0]).toEqual({
                        name: 'state-2',
                        file: 'widgets/Component1/A/B/B.ts'
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
