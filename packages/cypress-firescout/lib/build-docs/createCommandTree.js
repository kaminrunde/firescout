"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createCommandTree(items) {
    return items
        .filter(function (item) { return item.type === 'ctx'; })
        .map(function (item) {
        var basePath = item.file.split('/').slice(0, -1).join('/');
        return ({
            context: item.payload,
            basePath: basePath,
            file: item.file,
            triggers: items
                .filter(function (item) { return item.type === 'trigger'; })
                .filter(function (item) { return item.file.includes(basePath); })
                .map(function (item) { return ({
                name: item.payload,
                file: item.file
            }); }),
            states: items
                .filter(function (item) { return item.type === 'trigger'; })
                .filter(function (item) { return item.file.includes(basePath); })
                .map(function (item) { return ({
                name: item.payload,
                file: item.file
            }); })
        });
    });
}
exports.default = createCommandTree;
