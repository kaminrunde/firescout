"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.report = void 0;
var codes = {
    // HANDLE_WITHOUT_PARENT: (item:RawItem) => `You declared a "data-cy-handle='${item.payload}'" `
    // + `in "${item.file}" but there was no parent found. You have define a "data-cy-ctx" in `
    // + `either the same file or `,
    HANDLE_WITHOUT_PARENT: function (item) { return item.file; },
    STATE_WITHOUT_PARENT: function (item) { return item.file; },
    COLLECTION_WITHOUT_PARENT: function (item) { return item.file; },
    HANDLE_HAS_NO_DOCS: function (file) { return file; },
    STATE_HAS_NO_DOCS: function (file) { return file; },
};
function report(code, ctx) {
    console.log(code, codes[code](ctx));
}
exports.report = report;
function validate(input) {
    /**
     * all sets have the same signature: "[ctx]-[collection]?-[handle]":file
     * the collection is optional or can be multiple
     */
    var treeCtx = new Map();
    var treeCollections = new Map();
    var treeHandles = new Map();
    var treeStates = new Map();
    var docsCtx = new Map();
    var docsCollections = new Map();
    var docsHandles = new Map();
    var docsStates = new Map();
    for (var _i = 0, _a = input.tree; _i < _a.length; _i++) {
        var tree = _a[_i];
        treeCtx.set(tree.context, tree.file);
        for (var _b = 0, _c = tree.handles; _b < _c.length; _b++) {
            var handle = _c[_b];
            treeHandles.set(tree.context + '-' + handle.name, handle.file);
        }
        for (var _d = 0, _e = tree.states; _d < _e.length; _d++) {
            var state = _e[_d];
            treeStates.set(tree.context + '-' + state.name, state.file);
        }
    }
    for (var ctx in input.docs) {
        var doc = input.docs[ctx];
        docsCtx.set(doc.context, doc.file);
        for (var _f = 0, _g = doc.handles.bullets; _f < _g.length; _f++) {
            var handle = _g[_f];
            docsHandles.set(doc.context + '-' + handle.name, doc.file);
        }
        for (var _h = 0, _j = doc.states.bullets; _h < _j.length; _h++) {
            var state = _j[_h];
            docsStates.set(doc.context + '-' + state.name, doc.file);
        }
    }
    for (var handle in treeHandles) {
        if (!docsHandles.has(handle)) { }
    }
    for (var state in treeStates) {
        if (!docsStates.has(state)) { }
    }
    for (var handle in docsHandles) {
        if (!treeHandles.has(handle)) { }
    }
    for (var state in docsStates) {
        if (!treeStates.has(state)) { }
    }
    return input;
}
exports.validate = validate;
