"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var configRaw = fs_1.default.readFileSync(process.cwd() + '/firescout.json', 'utf8');
var config = JSON.parse(configRaw);
config.widgetFolders = config.widgetFolders.map(function (s) { return process.cwd() + "/" + s; });
config.outPath = process.cwd() + "/" + config.outPath;
config.fixturesFolder = process.cwd() + "/" + config.fixturesFolder;
exports.default = config;
