"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var build_docs_1 = require("@kaminrunde/firescout-utils/lib/build-docs");
var createFileContent_1 = __importDefault(require("./createFileContent"));
var config = build_docs_1.getConfig();
build_docs_1.getStructure()
    .then(function (_a) {
    var tree = _a.tree, docs = _a.docs, modules = _a.modules;
    return createFileContent_1.default(tree, docs, modules);
})
    .then(function (file) { return fs_1.default.writeFileSync(config.outPath, file, "utf8"); })
    .catch(console.log);
