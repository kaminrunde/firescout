"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = executeCmd;
