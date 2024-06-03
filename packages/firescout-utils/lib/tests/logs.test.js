"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var utils = __importStar(require("./test-utils"));
describe('logs', function () {
    it('shows NO_DOCS when markdown is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var t, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    t = utils.create();
                    t.addReactComponent('src/components/C1/C1.ts', {
                        jsx: ['ctx', 'C1']
                    });
                    return [4 /*yield*/, t.execute()];
                case 1:
                    result = _a.sent();
                    expect(result).toContainLog('NO_DOCS', 'C1', 'src/components/C1/C1.ts');
                    return [2 /*return*/];
            }
        });
    }); });
    it('shows NO_CTX_REF when no context was found for markdown', function () { return __awaiter(void 0, void 0, void 0, function () {
        var t, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    t = utils.create();
                    t.addMarkdown('src/components/C1/README.md', {
                        type: 'component',
                        name: 'C1',
                    });
                    return [4 /*yield*/, t.execute()];
                case 1:
                    result = _a.sent();
                    expect(result).toContainLog('NO_CTX_REF', 'C1', 'src/components/C1/README.md');
                    return [2 /*return*/];
            }
        });
    }); });
    describe('HANDLE_WITHOUT_PARENT', function () {
        it('shows when same file does not have a data-cy-ctx', function () { return __awaiter(void 0, void 0, void 0, function () {
            var t, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        t = utils.create();
                        t.addReactComponent('src/components/C1/C1.ts', {
                            jsx: ['handle', 'handle-1']
                        });
                        return [4 /*yield*/, t.execute()];
                    case 1:
                        result = _a.sent();
                        expect(result).toContainLog('HANDLE_WITHOUT_PARENT', 'handle-1', 'src/components/C1/C1.ts');
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not show up when sibling file has a data-cy-ctx', function () { return __awaiter(void 0, void 0, void 0, function () {
            var t, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        t = utils.create();
                        t.addReactComponent('src/components/C1/C1.ts', {
                            jsx: ['handle', 'handle-1']
                        });
                        t.addReactComponent('src/components/C1/Other.ts', {
                            jsx: ['ctx', 'C1']
                        });
                        return [4 /*yield*/, t.execute()];
                    case 1:
                        result = _a.sent();
                        expect(result).not.toContainLog('HANDLE_WITHOUT_PARENT');
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not show up when file has a data-cy-ctx', function () { return __awaiter(void 0, void 0, void 0, function () {
            var t, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        t = utils.create();
                        t.addReactComponent('src/components/C1/C1.ts', {
                            jsx: ['ctx', 'C1', [
                                    ['handle', 'handle-1']
                                ]]
                        });
                        t.addReactComponent('src/components/C1/Other.ts', {
                            jsx: ['ctx', 'C1']
                        });
                        return [4 /*yield*/, t.execute()];
                    case 1:
                        result = _a.sent();
                        expect(result).not.toContainLog('HANDLE_WITHOUT_PARENT');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('STATE_WITHOUT_PARENT', function () {
        it('shows when same file does not have a data-cy-ctx', function () { return __awaiter(void 0, void 0, void 0, function () {
            var t, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        t = utils.create();
                        t.addReactComponent('src/components/C1/C1.ts', {
                            jsx: ['state', 'state-1']
                        });
                        return [4 /*yield*/, t.execute()];
                    case 1:
                        result = _a.sent();
                        expect(result).toContainLog('STATE_WITHOUT_PARENT', 'state-1', 'src/components/C1/C1.ts');
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not show up when sibling file has a data-cy-ctx', function () { return __awaiter(void 0, void 0, void 0, function () {
            var t, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        t = utils.create();
                        t.addReactComponent('src/components/C1/C1.ts', {
                            jsx: ['state', 'state-1']
                        });
                        t.addReactComponent('src/components/C1/Other.ts', {
                            jsx: ['ctx', 'C1']
                        });
                        return [4 /*yield*/, t.execute()];
                    case 1:
                        result = _a.sent();
                        expect(result).not.toContainLog('STATE_WITHOUT_PARENT');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('COLLECTION_WITHOUT_PARENT', function () {
        it('shows when same file does not have a data-cy-ctx', function () { return __awaiter(void 0, void 0, void 0, function () {
            var t, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        t = utils.create();
                        t.addReactComponent('src/components/C1/C1.ts', {
                            jsx: ['col', 'col-1']
                        });
                        return [4 /*yield*/, t.execute()];
                    case 1:
                        result = _a.sent();
                        expect(result).toContainLog('COLLECTION_WITHOUT_PARENT', 'col-1', 'src/components/C1/C1.ts');
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not show up when sibling file has a data-cy-ctx', function () { return __awaiter(void 0, void 0, void 0, function () {
            var t, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        t = utils.create();
                        t.addReactComponent('src/components/C1/C1.ts', {
                            jsx: ['col', 'col-1']
                        });
                        t.addReactComponent('src/components/C1/Other.ts', {
                            jsx: ['ctx', 'C1']
                        });
                        return [4 /*yield*/, t.execute()];
                    case 1:
                        result = _a.sent();
                        expect(result).not.toContainLog('COLLECTION_WITHOUT_PARENT');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('HANDLE_HAS_NO_DOCS', function () {
        it('shows when no corresponding README was found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var t, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        t = utils.create();
                        t.addReactComponent('src/components/C1/C1.ts', {
                            jsx: ['ctx', 'C1', [
                                    ['handle', 'handle-1']
                                ]]
                        });
                        return [4 /*yield*/, t.execute()];
                    case 1:
                        result = _a.sent();
                        expect(result).toContainLog('HANDLE_HAS_NO_DOCS', 'C1 -> handle-1', 'src/components/C1/C1.ts');
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not show up when corresponding README was found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var t, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        t = utils.create();
                        t.addReactComponent('src/components/C1/C1.ts', {
                            jsx: ['ctx', 'C1', [
                                    ['handle', 'handle-1']
                                ]]
                        });
                        t.addMarkdown('src/components/C1/README.md', {
                            type: 'component',
                            name: 'C1',
                            handles: [{ name: 'handle-1', description: '' }]
                        });
                        return [4 /*yield*/, t.execute()];
                    case 1:
                        result = _a.sent();
                        expect(result).not.toContainLog('HANDLE_HAS_NO_DOCS');
                        expect(result.logs).toHaveLength(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('STATE_HAS_NO_DOCS', function () {
        it('shows when no corresponding README was found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var t, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        t = utils.create();
                        t.addReactComponent('src/components/C1/C1.ts', {
                            jsx: ['ctx', 'C1', [
                                    ['state', 'state-1']
                                ]]
                        });
                        return [4 /*yield*/, t.execute()];
                    case 1:
                        result = _a.sent();
                        expect(result).toContainLog('STATE_HAS_NO_DOCS', 'C1 -> state-1', 'src/components/C1/C1.ts');
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not show up when corresponding README was found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var t, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        t = utils.create();
                        t.addReactComponent('src/components/C1/C1.ts', {
                            jsx: ['ctx', 'C1', [
                                    ['state', 'state-1']
                                ]]
                        });
                        t.addMarkdown('src/components/C1/README.md', {
                            type: 'component',
                            name: 'C1',
                            states: [{ name: 'state-1', description: '' }]
                        });
                        return [4 /*yield*/, t.execute()];
                    case 1:
                        result = _a.sent();
                        expect(result).not.toContainLog('STATE_HAS_NO_DOCS');
                        expect(result.logs).toHaveLength(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('HANDLE_HAS_NO_REF', function () {
        it('shows when only found in README', function () { return __awaiter(void 0, void 0, void 0, function () {
            var t, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        t = utils.create();
                        t.addMarkdown('src/components/C1/README.md', {
                            type: 'component',
                            name: 'C1',
                            handles: [{ name: 'handle-1', description: '' }]
                        });
                        return [4 /*yield*/, t.execute()];
                    case 1:
                        result = _a.sent();
                        expect(result).toContainLog('HANDLE_HAS_NO_REF', 'C1 -> handle-1', 'src/components/C1/README.md');
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not show up when corresponding README and Component was found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var t, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        t = utils.create();
                        t.addReactComponent('src/components/C1/C1.ts', {
                            jsx: ['ctx', 'C1', [
                                    ['handle', 'handle-1']
                                ]]
                        });
                        t.addMarkdown('src/components/C1/README.md', {
                            type: 'component',
                            name: 'C1',
                            handles: [{ name: 'handle-1', description: '' }]
                        });
                        return [4 /*yield*/, t.execute()];
                    case 1:
                        result = _a.sent();
                        expect(result).not.toContainLog('HANDLE_HAS_NO_REF');
                        expect(result.logs).toHaveLength(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('STATE_HAS_NO_REF', function () {
        it('shows when only found in README', function () { return __awaiter(void 0, void 0, void 0, function () {
            var t, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        t = utils.create();
                        t.addMarkdown('src/components/C1/README.md', {
                            type: 'component',
                            name: 'C1',
                            states: [{ name: 'state-1', description: '' }]
                        });
                        return [4 /*yield*/, t.execute()];
                    case 1:
                        result = _a.sent();
                        expect(result).toContainLog('STATE_HAS_NO_REF', 'C1 -> state-1', 'src/components/C1/README.md');
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not show up when corresponding README and Component was found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var t, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        t = utils.create();
                        t.addReactComponent('src/components/C1/C1.ts', {
                            jsx: ['ctx', 'C1', [
                                    ['state', 'state-1']
                                ]]
                        });
                        t.addMarkdown('src/components/C1/README.md', {
                            type: 'component',
                            name: 'C1',
                            states: [{ name: 'state-1', description: '' }]
                        });
                        return [4 /*yield*/, t.execute()];
                    case 1:
                        result = _a.sent();
                        expect(result).not.toContainLog('STATE_HAS_NO_REF');
                        expect(result.logs).toHaveLength(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('COLLECTION_HAS_NO_REF', function () {
        it.skip('shows when collection was only found in README', function () { return __awaiter(void 0, void 0, void 0, function () {
            var t, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        t = utils.create();
                        t.addReactComponent('src/components/C1/C1.ts', {
                            jsx: ['ctx', 'C1']
                        });
                        t.addMarkdown('src/components/C1/README.md', {
                            type: 'component',
                            name: 'C1',
                            collections: [{ name: 'collection-1', path: './Inner/README.md' }]
                        });
                        t.addMarkdown('src/components/C1/Inner/README.md', {
                            type: 'collection',
                            name: 'Collection-1',
                        });
                        return [4 /*yield*/, t.execute()];
                    case 1:
                        result = _a.sent();
                        expect(result).toContainLog('COLLECTION_HAS_NO_REF', 'C1 -> collection-1', 'src/components/C1/README.md');
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not show up when corresponding README and Component was found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var t, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        t = utils.create();
                        t.addReactComponent('src/components/C1/C1.ts', {
                            jsx: ['ctx', 'C1', [
                                    ['col', 'col-1']
                                ]]
                        });
                        t.addMarkdown('src/components/C1/README.md', {
                            type: 'component',
                            name: 'C1',
                            collections: [{ name: 'col-1', path: '' }]
                        });
                        return [4 /*yield*/, t.execute()];
                    case 1:
                        result = _a.sent();
                        expect(result).not.toContainLog('COLLECTION_HAS_NO_REF');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('COLLECTION_HAS_NO_DOCS', function () {
        it.todo('shows when collection has no corresponding README');
        it.todo('does not show when collection has a corresponding README');
    });
});
