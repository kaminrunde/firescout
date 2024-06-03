"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStructure = exports.getConfig = void 0;
var createCommandTree_1 = __importDefault(require("./createCommandTree"));
var searchWithNode_1 = __importDefault(require("./searchWithNode"));
var createCommandHierarchie_1 = __importDefault(require("./createCommandHierarchie"));
var createDocs_1 = __importDefault(require("./createDocs"));
var createModuleTree_1 = __importDefault(require("./createModuleTree"));
var validate_1 = __importDefault(require("./validate"));
var config_1 = require("./config");
Object.defineProperty(exports, "getConfig", { enumerable: true, get: function () { return config_1.getConfig; } });
function getStructure() {
    return (0, searchWithNode_1.default)()
        .then(createCommandHierarchie_1.default)
        .then(function (_a) {
        var tree = _a.tree, mdItems = _a.mdItems, moduleItems = _a.moduleItems, fixtureItems = _a.fixtureItems, variableItems = _a.variableItems;
        return ({
            tree: (0, createCommandTree_1.default)(tree),
            docs: (0, createDocs_1.default)(mdItems),
            modules: (0, createModuleTree_1.default)(moduleItems, fixtureItems, variableItems),
        });
    })
        .then(validate_1.default);
}
exports.getStructure = getStructure;
if (process.env.NODE_ENV !== 'test') {
    getStructure();
}
