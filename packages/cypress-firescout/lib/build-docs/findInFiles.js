"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var config_1 = __importDefault(require("./config"));
function findInFiles(matchers) {
    return new Promise(function (resolve, reject) {
        fs_1.default.readdir(config_1.default.widgetFolder, function (err, filenames) {
            if (err) {
                reject(err);
                return;
            }
            resolve(filenames);
            // filenames.forEach(function(filename) {
            //   fs.readFile(dirname + filename, 'utf-8', function(err, content) {
            //     if (err) {
            //       onError(err);
            //       return;
            //     }
            //     onFileContent(filename, content);
            //   });
            // });
        });
    });
}
exports.default = findInFiles;
