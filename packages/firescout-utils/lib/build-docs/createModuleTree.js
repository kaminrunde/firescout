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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils = __importStar(require("./utils"));
function createModuleTree(moduleItems, fixtureItems, variableItems) {
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
    for (var _a = 0, moduleItems_1 = moduleItems; _a < moduleItems_1.length; _a++) {
        var item = moduleItems_1[_a];
        var _b = item.payload.split('.'), context = _b[0], name_1 = _b[1];
        if (!dict[context])
            dict[context] = {
                context: context,
                commands: [],
                variables: [],
                typesaveContext: utils.getTypesaveId(context)
            };
        dict[context].commands.push({
            name: name_1,
            file: item.file,
            folder: item.folder,
            typesaveId: utils.getTypesaveId(context + name_1),
            fixtures: fixtureDict[item.payload] || []
        });
    }
    for (var _c = 0, variableItems_1 = variableItems; _c < variableItems_1.length; _c++) {
        var item = variableItems_1[_c];
        var _d = item.payload.split('.'), context = _d[0], name_2 = _d[1];
        if (!dict[context])
            dict[context] = {
                context: context,
                commands: [],
                variables: [],
                typesaveContext: utils.getTypesaveId(context)
            };
        dict[context].variables.push({
            name: name_2,
            file: item.file,
            folder: item.folder,
            typesaveId: utils.getTypesaveId(context + name_2),
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
            .replace('*/', "* @file [" + item.file + "](" + (process.cwd() + item.file) + ")\n */"),
        file: item.file,
        folder: item.folder,
        variation: variationMatch ? variationMatch[1] : '',
        name: nameMatch ? nameMatch[1] : '',
        module: moduleMatch ? moduleMatch[1] : ''
    };
}
