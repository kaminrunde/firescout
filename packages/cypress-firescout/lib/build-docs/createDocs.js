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
    return docs;
}
exports.default = createDocs;
