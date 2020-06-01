"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var parseComponentMdDocs_1 = __importDefault(require("./parseComponentMdDocs"));
function createDocs(mdItems) {
    var componentDocs = mdItems.filter(function (item) { return item.type === 'component-doc'; });
    var collectionDocs = mdItems.filter(function (item) { return item.type === 'collection-doc'; });
    var docs = componentDocs.map(function (item) { return parseComponentMdDocs_1.default(item, collectionDocs); });
    var result = {};
    for (var _i = 0, docs_1 = docs; _i < docs_1.length; _i++) {
        var doc = docs_1[_i];
        result[doc.context] = doc;
    }
    return result;
}
exports.default = createDocs;
