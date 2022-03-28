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
function createCommandTree(tree) {
    return tree.map(function (target) { return ({
        context: target.payload,
        typesaveContext: utils.getTypesaveId(target.payload),
        file: target.file,
        folder: target.folder,
        handles: target.handles.map(function (item) { return ({
            name: item.payload,
            file: item.file
        }); }),
        states: getStates(target),
        collections: createCommandTree(target.collections)
    }); });
}
exports.default = createCommandTree;
function getStates(tree) {
    var stateDict = {};
    // let states:State[] = []
    // let lastState:string = ''
    for (var _i = 0, _a = tree.states; _i < _a.length; _i++) {
        var state = _a[_i];
        var _b = state.payload.split(':'), name_1 = _b[0], implementation = _b[1];
        if (!stateDict[name_1])
            stateDict[name_1] = {
                name: name_1,
                hasRootRef: false,
                file: 'null',
                implementations: null
            };
        if (implementation) {
            var target = stateDict[name_1];
            if (!target.implementations)
                target.implementations = [];
            target.implementations.push({ name: implementation, file: state.file });
        }
        else {
            var target = stateDict[name_1];
            target.hasRootRef = true;
            target.file = state.file;
        }
    }
    return Object.values(stateDict);
}
