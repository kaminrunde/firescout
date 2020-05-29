"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var parseComponentMdDocs_1 = __importDefault(require("./parseComponentMdDocs"));
var text = fs_1.default.readFileSync(__dirname + '/README.md', 'utf8');
var result = parseComponentMdDocs_1.default(text);
console.log(JSON.stringify(result, null, 2));
