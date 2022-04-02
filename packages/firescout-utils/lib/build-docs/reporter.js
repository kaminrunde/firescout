"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.report = exports.codes = void 0;
var safe_1 = __importDefault(require("colors/safe"));
exports.codes = {
    // HANDLE_WITHOUT_PARENT: (item:RawItem) => `You declared a "data-cy-handle='${item.payload}'" `
    // + `in "${item.file}" but there was no parent found. You have define a "data-cy-ctx" in `
    // + `either the same file or `,
    HANDLE_WITHOUT_PARENT: function (item) { return [item.payload, item.file]; },
    STATE_WITHOUT_PARENT: function (item) { return [item.payload, item.file]; },
    COLLECTION_WITHOUT_PARENT: function (item) { return [item.payload, item.file]; },
    HANDLE_HAS_NO_DOCS: function (item) { return [item.name, item.file]; },
    STATE_HAS_NO_DOCS: function (item) { return [item.name, item.file]; },
    HANDLE_HAS_NO_REF: function (item) { return [item.name, item.file]; },
    STATE_HAS_NO_REF: function (item) { return [item.name, item.file]; },
    NO_DOCS: function (item) { return [item.name, item.file]; },
    COLLECTION_HAS_NO_REF: function (item) { return [item.name, item.file]; },
    COLLECTION_HAS_NO_DOCS: function (item) { return [item.name, item.file]; },
    NO_CTX_REF: function (item) { return [item.name, item.file]; },
    STATE_IMPLEMENTATION_HAS_NO_REF: function (item) { return [item.name, item.file]; },
    STATE_IMPLEMENTATION_HAS_NO_DOCS: function (item) { return [
        item.name,
        item.file,
    ]; },
    MIXED_STATES_AND_IMPLEMENTATIONS: function (item) { return [
        item.name,
        item.file,
    ]; },
};
function report(code, ctx) {
    var _a = exports.codes[code](ctx), name = _a[0], file = _a[1];
    console.log(safe_1.default.yellow(code), safe_1.default.green(name), safe_1.default.grey(file.slice(1)));
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
    var docsStateImplementations = new Map();
    var treeStateImplementations = new Map();
    (function callTree(trees, prefix) {
        for (var _i = 0, trees_1 = trees; _i < trees_1.length; _i++) {
            var tree = trees_1[_i];
            prefix === ''
                ? treeCtx.set(prefix + tree.context, tree.file)
                : treeCollections.set(prefix + tree.context, tree.file);
            for (var _a = 0, _b = tree.handles; _a < _b.length; _a++) {
                var handle = _b[_a];
                treeHandles.set(prefix + tree.context + ' -> ' + handle.name, handle.file);
            }
            for (var _c = 0, _d = tree.states; _c < _d.length; _c++) {
                var state = _d[_c];
                if (state.hasRootRef && state.implementations) {
                    report('MIXED_STATES_AND_IMPLEMENTATIONS', state);
                }
                treeStates.set(prefix + tree.context + ' -> ' + state.name, state.file);
                if (state.implementations)
                    for (var _e = 0, _f = state.implementations; _e < _f.length; _e++) {
                        var imp = _f[_e];
                        treeStateImplementations.set(prefix + tree.context + ' -> ' + state.name + ':' + imp.name, imp.file);
                    }
            }
            callTree(tree.collections, prefix + tree.context + ' -> ');
        }
    })(input.tree, '');
    (function callDocs(docs, prefix) {
        for (var ctx in docs) {
            var doc = docs[ctx];
            prefix === ''
                ? docsCtx.set(prefix + doc.context, doc.file)
                : docsCollections.set(prefix + doc.context, doc.file);
            for (var _i = 0, _a = doc.handles.bullets; _i < _a.length; _i++) {
                var handle = _a[_i];
                docsHandles.set(prefix + doc.context + ' -> ' + handle.name, doc.file);
            }
            for (var _b = 0, _c = doc.states.bullets; _b < _c.length; _b++) {
                var state = _c[_b];
                docsStates.set(prefix + doc.context + ' -> ' + state.name, doc.file);
                if (state.bullets)
                    for (var _d = 0, _e = state.bullets; _d < _e.length; _d++) {
                        var bul = _e[_d];
                        docsStateImplementations.set(prefix + doc.context + ' -> ' + state.name + ':' + bul.name, doc.file);
                    }
            }
            callDocs(doc.collections, prefix + doc.context + ' -> ');
        }
    })(input.docs, '');
    for (var _i = 0, _a = Array.from(treeCtx); _i < _a.length; _i++) {
        var _b = _a[_i], name_1 = _b[0], file = _b[1];
        if (!docsCtx.has(name_1))
            report('NO_DOCS', { name: name_1, file: file });
    }
    for (var _c = 0, _d = Array.from(treeCollections); _c < _d.length; _c++) {
        var _e = _d[_c], name_2 = _e[0], file = _e[1];
        if (!docsCollections.has(name_2))
            report('COLLECTION_HAS_NO_DOCS', { name: name_2, file: file });
    }
    for (var _f = 0, _g = Array.from(treeHandles); _f < _g.length; _f++) {
        var _h = _g[_f], name_3 = _h[0], file = _h[1];
        if (!docsHandles.has(name_3))
            report('HANDLE_HAS_NO_DOCS', { name: name_3, file: file });
    }
    for (var _j = 0, _k = Array.from(treeStates); _j < _k.length; _j++) {
        var _l = _k[_j], name_4 = _l[0], file = _l[1];
        if (!docsStates.has(name_4))
            report('STATE_HAS_NO_DOCS', { name: name_4, file: file });
    }
    for (var _m = 0, _o = Array.from(treeStateImplementations); _m < _o.length; _m++) {
        var _p = _o[_m], name_5 = _p[0], file = _p[1];
        if (!docsStateImplementations.has(name_5))
            report('STATE_IMPLEMENTATION_HAS_NO_DOCS', { name: name_5, file: file });
    }
    for (var _q = 0, _r = Array.from(docsCtx); _q < _r.length; _q++) {
        var _s = _r[_q], name_6 = _s[0], file = _s[1];
        if (!treeCtx.has(name_6))
            report('NO_CTX_REF', { name: name_6, file: file });
    }
    for (var _t = 0, _u = Array.from(docsCollections); _t < _u.length; _t++) {
        var _v = _u[_t], name_7 = _v[0], file = _v[1];
        if (!treeCollections.has(name_7))
            report('COLLECTION_HAS_NO_REF', { name: name_7, file: file });
    }
    for (var _w = 0, _x = Array.from(docsHandles); _w < _x.length; _w++) {
        var _y = _x[_w], name_8 = _y[0], file = _y[1];
        if (!treeHandles.has(name_8))
            report('HANDLE_HAS_NO_REF', { name: name_8, file: file });
    }
    for (var _z = 0, _0 = Array.from(docsStates); _z < _0.length; _z++) {
        var _1 = _0[_z], name_9 = _1[0], file = _1[1];
        if (!treeStates.has(name_9))
            report('STATE_HAS_NO_REF', { name: name_9, file: file });
    }
    for (var _2 = 0, _3 = Array.from(docsStateImplementations); _2 < _3.length; _2++) {
        var _4 = _3[_2], name_10 = _4[0], file = _4[1];
        if (!treeStateImplementations.has(name_10))
            report('STATE_IMPLEMENTATION_HAS_NO_REF', { name: name_10, file: file });
    }
    return input;
}
exports.validate = validate;
