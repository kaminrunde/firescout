"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils = __importStar(require("./utils"));
function createModuleTree(items, fixtureItems) {
    var dict = {};
    var fixtures = fixtureItems.map(function (item) { return createFixture(item); });
    var fixtureDict = {};
    for (var _i = 0, fixtures_1 = fixtures; _i < fixtures_1.length; _i++) {
        var f = fixtures_1[_i];
        var id = f.module + "." + f.name;
        if (!fixtureDict[id])
            fixtureDict[id] = [];
        fixtureDict[id].push(f);
    }
    for (var _a = 0, items_1 = items; _a < items_1.length; _a++) {
        var item = items_1[_a];
        var _b = item.payload.split('.'), context_1 = _b[0], name_1 = _b[1];
        if (!dict[context_1])
            dict[context_1] = {
                context: context_1,
                commands: [],
                typesaveContext: utils.getTypesaveId(context_1)
            };
        dict[context_1].commands.push({
            name: name_1,
            file: item.file,
            folder: item.folder,
            typesaveId: utils.getTypesaveId(context_1 + name_1),
            fixtures: fixtureDict[item.payload] || []
        });
    }
    return Object.values(dict);
}
exports.default = createModuleTree;
function createFixture(item) {
    var moduleMatch = item.payload.match(/@module (.*)/);
    var nameMatch = item.payload.match(/@name (.*)/);
    var variationMatch = item.payload.match(/@variation (.*)/);
    return {
        description: item.payload
            .replace('*/', "* @file " + item.file + "\n */"),
        file: item.file,
        folder: item.folder,
        variation: variationMatch ? variationMatch[1] : '',
        name: nameMatch ? nameMatch[1] : '',
        module: moduleMatch ? moduleMatch[1] : ''
    };
}
