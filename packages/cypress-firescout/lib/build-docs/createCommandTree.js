"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var parseComponentMdDocs_1 = __importDefault(require("./parseComponentMdDocs"));
function createCommandTree(items) {
    var docs = items
        .filter(function (item) { return item.type === 'component-doc'; })
        .map(function (item) { return ({
        file: item.file,
        docs: parseComponentMdDocs_1.default(item.payload)
    }); })
        .reduce(function (p, n) { return (p[n.docs.context] = n) && p; }, {});
    return items
        .filter(function (item) { return item.type === 'ctx'; })
        .map(function (item) {
        var _a, _b;
        var basePath = item.file.split('/').slice(0, -1).join('/');
        return ({
            context: item.payload,
            typesaveContext: (item.payload.charAt(0).toUpperCase() + item.payload.slice(1)).replace(/\//g, ''),
            basePath: basePath,
            docsFile: (_a = docs[item.payload]) === null || _a === void 0 ? void 0 : _a.file,
            docs: (_b = docs[item.payload]) === null || _b === void 0 ? void 0 : _b.docs,
            file: item.file,
            triggers: items
                .filter(function (item) { return item.type === 'trigger'; })
                .filter(function (item) { return item.file.includes(basePath); })
                .map(function (item) { return ({
                name: item.payload,
                file: item.file
            }); }),
            states: items
                .filter(function (item) { return item.type === 'state'; })
                .filter(function (item) { return item.file.includes(basePath); })
                .map(function (item) { return ({
                name: item.payload,
                file: item.file
            }); })
        });
    });
}
exports.default = createCommandTree;
