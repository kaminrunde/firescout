"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypesaveId = exports.getFileFolder = exports.normalizeFilePath = exports.readStats = exports.readFile = exports.readDir = exports.executeCmd = void 0;
var child_process_1 = require("child_process");
var fs_1 = __importDefault(require("fs"));
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
function readDir(path) {
    return new Promise(function (resolve, reject) {
        fs_1.default.readdir(path, function (err, filenames) {
            if (err)
                return reject(err);
            Promise.all(filenames.map(function (name) { return readStats(path + '/' + name, name); }))
                .then(resolve);
        });
    });
}
exports.readDir = readDir;
function readFile(path) {
    return new Promise(function (resolve, reject) {
        fs_1.default.readFile(path, 'utf8', function (err, content) {
            if (err)
                return reject(err);
            else
                return resolve(content);
        });
    });
}
exports.readFile = readFile;
function readStats(path, name) {
    return new Promise(function (resolve, reject) {
        fs_1.default.lstat(path, function (err, stats) {
            if (err)
                return reject(err);
            else
                return resolve({
                    name: name,
                    path: path,
                    isFile: stats.isFile(),
                    isDir: stats.isDirectory()
                });
        });
    });
}
exports.readStats = readStats;
function normalizeFilePath(file) {
    return file.replace(process.cwd(), '');
}
exports.normalizeFilePath = normalizeFilePath;
function getFileFolder(file) {
    file = normalizeFilePath(file);
    return file.split('/').slice(0, -1).join('/');
}
exports.getFileFolder = getFileFolder;
function getTypesaveId(id) {
    return 'Id' + id.replace(/[^a-zA-Z0-9]/g, '');
}
exports.getTypesaveId = getTypesaveId;
