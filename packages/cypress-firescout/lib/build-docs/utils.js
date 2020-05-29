"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFile = exports.executeCmd = void 0;
var child_process_1 = require("child_process");
function executeCmd(cmd) {
    return new Promise(function (resolve, reject) {
        child_process_1.exec(cmd, function (error, stdout) {
            if (error)
                resolve(''); //reject(error)
            else
                resolve(stdout);
        });
    });
}
exports.executeCmd = executeCmd;
function parseFile(file) {
    return file.replace(process.cwd(), '');
}
exports.parseFile = parseFile;
