"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var reporter = __importStar(require("./reporter"));
/**
 * creates the hierarchie tree and enshures that collection commands won't be
 * stored on the root component. It splits the result
 */
function createCommandHierarchie(rawItems) {
    var tree = [];
    var handleItems = [];
    var collectionItems = [];
    var stateItems = [];
    var ctxItems = [];
    var mdItems = [];
    var moduleItems = [];
    var variableItems = [];
    var fixtureItems = [];
    for (var _i = 0, rawItems_1 = rawItems; _i < rawItems_1.length; _i++) {
        var item = rawItems_1[_i];
        switch (item.type) {
            case 'ctx':
                ctxItems.push(item);
                break;
            case 'collection-doc':
                mdItems.push(item);
                break;
            case 'component-doc':
                mdItems.push(item);
                break;
            case 'handle':
                handleItems.push(item);
                break;
            case 'state':
                stateItems.push(item);
                break;
            case 'collection':
                collectionItems.push(item);
                break;
            case 'module-fn':
                moduleItems.push(item);
                break;
            case 'fixture':
                fixtureItems.push(item);
                break;
            case 'module-var':
                variableItems.push(item);
                break;
        }
    }
    // sort collection items to ensure that deeper collections are parsed first
    collectionItems = collectionItems
        .sort(function (a, b) { return a.file.localeCompare(b.file); })
        .sort(function (a, b) {
        if (a.folder.includes(b.folder))
            return -1;
        if (b.folder.includes(a.folder))
            return 1;
        return 0;
    });
    var enhancedCollections = [];
    /**
     * On each iteration we remove the matched handes/states/colls from the buffer. Otherwise
     * they would be accidentally added to the parent
     */
    for (var _a = 0, collectionItems_1 = collectionItems; _a < collectionItems_1.length; _a++) {
        var collectionItem = collectionItems_1[_a];
        var _b = extractItems(collectionItem, handleItems), includeHandles = _b[0], excludeHandles = _b[1];
        var _c = extractItems(collectionItem, stateItems), includeStates = _c[0], excludeStates = _c[1];
        var _d = extractItems(collectionItem, enhancedCollections), includeColls = _d[0], excludeColls = _d[1];
        handleItems = excludeHandles;
        stateItems = excludeStates;
        enhancedCollections = excludeColls;
        enhancedCollections.push(Object.assign({}, collectionItem, {
            handles: includeHandles,
            states: includeStates,
            collections: includeColls,
        }));
    }
    for (var _e = 0, ctxItems_1 = ctxItems; _e < ctxItems_1.length; _e++) {
        var ctx = ctxItems_1[_e];
        var _f = extractItems(ctx, handleItems), includeHandles = _f[0], excludeHandles = _f[1];
        var _g = extractItems(ctx, stateItems), includeStates = _g[0], excludeStates = _g[1];
        var _h = extractItems(ctx, enhancedCollections), includeColls = _h[0], excludeColls = _h[1];
        handleItems = excludeHandles;
        stateItems = excludeStates;
        enhancedCollections = excludeColls;
        tree.push(__assign(__assign({}, ctx), { handles: includeHandles, states: includeStates, collections: includeColls }));
    }
    if (handleItems.length)
        for (var _j = 0, handleItems_1 = handleItems; _j < handleItems_1.length; _j++) {
            var item = handleItems_1[_j];
            reporter.report('HANDLE_WITHOUT_PARENT', item);
        }
    if (stateItems.length)
        for (var _k = 0, stateItems_1 = stateItems; _k < stateItems_1.length; _k++) {
            var item = stateItems_1[_k];
            reporter.report('STATE_WITHOUT_PARENT', item);
        }
    if (enhancedCollections.length)
        for (var _l = 0, enhancedCollections_1 = enhancedCollections; _l < enhancedCollections_1.length; _l++) {
            var item = enhancedCollections_1[_l];
            reporter.report('COLLECTION_WITHOUT_PARENT', item);
        }
    return { tree: tree, mdItems: mdItems, moduleItems: moduleItems, fixtureItems: fixtureItems, variableItems: variableItems };
}
exports.default = createCommandHierarchie;
/**
 * group all items that are in subfolder related to target
 * @returns [include,exclude]
 */
function extractItems(target, rawItems) {
    var exclude = [];
    var include = [];
    for (var _i = 0, rawItems_2 = rawItems; _i < rawItems_2.length; _i++) {
        var item = rawItems_2[_i];
        if (item.folder === target.folder || item.folder.includes(target.folder + '/'))
            include.push(item);
        else
            exclude.push(item);
    }
    return [include, exclude];
}
