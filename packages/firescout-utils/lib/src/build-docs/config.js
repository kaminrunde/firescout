"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
var fs_1 = __importDefault(require("fs"));
var config = null;
function getConfig() {
    if (!config) {
        var configRaw = fs_1.default.readFileSync(process.cwd() + '/firescout.json', 'utf8');
        config = JSON.parse(configRaw);
        config.widgetFolders = config.widgetFolders.map(function (s) { return process.cwd() + "/" + s; });
        config.outPath = process.cwd() + "/" + config.outPath;
        config.fixturesFolder = process.cwd() + "/" + config.fixturesFolder;
    }
    return config;
}
exports.getConfig = getConfig;
