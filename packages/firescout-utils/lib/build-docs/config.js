"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var config = null;
function getConfig() {
    if (!config) {
        var configRaw = fs_1.default.readFileSync(process.cwd() + "/firescout.json", "utf8");
        config = JSON.parse(configRaw);
        config.widgetFolders = config.widgetFolders.map(function (s) { return "".concat(process.cwd(), "/").concat(s); });
        config.outPath = "".concat(process.cwd(), "/").concat(config.outPath);
        config.fixturesFolder = "".concat(process.cwd(), "/").concat(config.fixturesFolder);
    }
    return config;
}
exports.default = getConfig;
