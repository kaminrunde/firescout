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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var visitor_1 = __importDefault(require("./visitor"));
var markdown_ast_1 = __importDefault(require("markdown-ast"));
var path_1 = __importDefault(require("path"));
function createDocs(item, allCollections) {
    var structure = createStructure(item, allCollections);
    if (!structure)
        return null;
    return structureToDocs(structure);
}
exports.default = createDocs;
function structureToDocs(structure) {
    var ast = (0, markdown_ast_1.default)(structure.content);
    var result = {
        context: structure.name,
        file: structure.item.file,
        folder: structure.item.folder,
        description: visitor_1.default.getText(ast),
        _description: visitor_1.default.getMd(ast),
        handles: {
            description: '',
            _description: '',
            bullets: []
        },
        states: {
            description: '',
            _description: '',
            bullets: []
        },
        collections: {}
    };
    var states = structure.children.find(function (c) { return c.name.toLowerCase() === 'states'; });
    var handles = structure.children.find(function (c) { return c.name.toLowerCase() === 'handles'; });
    var collections = structure.children.find(function (c) { return c.name.toLowerCase() === 'collections'; });
    if (states) {
        var ast_1 = (0, markdown_ast_1.default)(states.content);
        var descNodes = ast_1.filter(function (node) { return node.type !== 'list'; });
        result.states.description = visitor_1.default.getText(descNodes);
        result.states._description = visitor_1.default.getMd(descNodes);
        result.states.bullets = getBullets(ast_1);
    }
    if (handles) {
        var ast_2 = (0, markdown_ast_1.default)(handles.content);
        var descNodes = ast_2.filter(function (node) { return node.type !== 'list'; });
        result.handles.description = visitor_1.default.getText(descNodes);
        result.handles._description = visitor_1.default.getMd(descNodes);
        result.handles.bullets = getBullets(ast_2);
    }
    if (collections) {
        for (var _i = 0, _a = collections.children; _i < _a.length; _i++) {
            var coll = _a[_i];
            var collDocs = structureToDocs(coll);
            result.collections[collDocs.context] = collDocs;
        }
    }
    return result;
}
function getBullets(nodes) {
    var bulletNodes = nodes.filter(function (node) { return node.type === 'list'; });
    var bulletNodesFiltered = [];
    var subMap = new Map();
    for (var _i = 0, bulletNodes_1 = bulletNodes; _i < bulletNodes_1.length; _i++) {
        var node = bulletNodes_1[_i];
        if (node.indent.replace(/[\n\r]/, '') === '')
            bulletNodesFiltered.push(node);
        else {
            var parent_1 = bulletNodesFiltered[bulletNodesFiltered.length - 1];
            subMap.set(parent_1, __spreadArray(__spreadArray([], (subMap.get(parent_1) || []), true), [node], false));
        }
    }
    function parseBullet(node) {
        var _a;
        var _b = node.block, title = _b[0], rest = _b.slice(1);
        var name = visitor_1.default.getText([title]);
        var value = visitor_1.default.getText(rest);
        var _name = visitor_1.default.getMd([title]);
        var _value = visitor_1.default.getMd(rest);
        var bullets = ((_a = subMap.get(node)) === null || _a === void 0 ? void 0 : _a.map(parseBullet)) || null;
        if (value.startsWith(': '))
            value = value.replace(': ', '');
        return { name: name, value: value, _name: _name, _value: _value, bullets: bullets };
    }
    return bulletNodesFiltered.map(function (node) { return parseBullet(node); });
}
function createStructure(item, collections) {
    var content = item.payload;
    var lines = content.split('\n');
    var sections = [];
    // strip until context headline
    while (lines.length > 0) {
        if (!lines[0].startsWith('#'))
            lines.shift();
        else
            break;
    }
    // create sections
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        if (line.startsWith('#')) {
            sections.push({
                item: item,
                name: line.replace(/#* */, '').trim(),
                indent: line.replace(/[^#]/g, '').length,
                content: '',
                children: []
            });
        }
        else {
            sections[sections.length - 1].content += line + '\n';
        }
    }
    // fetch referenced collections
    sections.filter(function (s) { return s.name.toLowerCase() === 'collections'; }).map(function (section) {
        var ast = (0, markdown_ast_1.default)(section.content);
        var bulletNodes = ast.filter(function (node) { return node.type === 'list'; });
        bulletNodes.map(function (node) {
            var link = node.block[0];
            if (link.type !== 'link')
                return;
            var dest = path_1.default.resolve(item.folder, link.url);
            var childItem = collections.find(function (item) { return item.file === dest; });
            if (!childItem)
                return;
            var structure = createStructure(childItem, collections);
            if (!structure)
                return;
            section.children.push(structure);
        });
    });
    var target = sections.shift();
    if (!target || target.indent !== 1)
        return null;
    var structure = __assign({}, target);
    var chain = [structure];
    for (var _a = 0, sections_1 = sections; _a < sections_1.length; _a++) {
        var section = sections_1[_a];
        var structure_1 = __assign({}, section);
        var parent_2 = chain[chain.length - 1];
        if (section.indent === parent_2.indent) {
            chain.pop();
            parent_2 = chain[chain.length - 1];
        }
        if (section.indent < parent_2.indent) {
            chain.pop();
            chain.pop();
            parent_2 = chain[chain.length - 1];
        }
        if (!parent_2)
            break;
        parent_2.children.push(structure_1);
        chain.push(structure_1);
    }
    return structure;
}
