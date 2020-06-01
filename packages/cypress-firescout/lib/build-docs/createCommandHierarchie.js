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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * creates the hierarchie tree and enshures that collection commands won't be
 * stored on the root component. It splits the result
 *
 * @returns [HierarchieTree,mdItems]
 */
function createCommandHierarchie(rawItems) {
    var handleItems = [];
    var collectionItems = [];
    var stateItems = [];
    var ctxItems = [];
    var mdItems = [];
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
        }
    }
    // sort collection items to ensure that deeper collections are parsed first
    collectionItems = collectionItems.sort(function (a, b) {
        if (a.folder.includes(b.folder))
            return 1;
        if (b.folder.includes(a.folder))
            return -1;
        return 0;
    });
    var enhancedCollections = [];
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
    var tree = ctxItems.map(function (item) { return (__assign(__assign({}, item), { states: stateItems, handles: handleItems, collections: enhancedCollections.filter(function (col) { return col.folder.includes(item.folder); }) })); });
    return [tree, mdItems];
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
        if (item.folder.includes(target.folder))
            include.push(item);
        else
            exclude.push(item);
    }
    return [include, exclude];
}
