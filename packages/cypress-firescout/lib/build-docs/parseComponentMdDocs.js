"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var markdown_ast_1 = __importDefault(require("markdown-ast"));
var visitor_1 = __importDefault(require("./visitor"));
var path_1 = __importDefault(require("path"));
function parseComponentMdDocs(mdItem, allCollections) {
    var text = mdItem.payload;
    var ast = markdown_ast_1.default(text);
    var result = {
        context: '',
        file: mdItem.file,
        folder: mdItem.folder,
        description: '',
        _description: '',
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
    var chapters = [];
    // create chapters. A chapter has title and content (until next title starts)
    for (var _i = 0, ast_1 = ast; _i < ast_1.length; _i++) {
        var node = ast_1[_i];
        switch (node.type) {
            case 'title': {
                chapters.push({
                    title: visitor_1.default.getText([node]),
                    rank: node.rank,
                    contentNodes: [],
                    content: {
                        description: '',
                        _description: '',
                        bullets: []
                    }
                });
                break;
            }
            default: {
                if (!chapters.length)
                    break;
                chapters[chapters.length - 1].contentNodes.push(node);
            }
        }
    }
    // find sections by title
    var main = chapters.find(function (c) { return c.rank === 1; });
    var handles = chapters.find(function (c) { return c.title.toLowerCase() === 'handles' && c.rank === 2; });
    var states = chapters.find(function (c) { return c.title.toLowerCase() === 'states' && c.rank === 2; });
    var collections = chapters.find(function (c) { return c.title.toLowerCase() === 'collections' && c.rank === 2; });
    // chapter content is initially empty
    if (main)
        buildChapterContent(main);
    if (handles)
        buildChapterContent(handles);
    if (states)
        buildChapterContent(states);
    if (collections) {
        getCollectionsContent(collections, mdItem, allCollections).forEach(function (col) {
            result.collections[col.context] = col;
        });
    }
    if (main) {
        result.context = main.title;
        result.description = main.content.description;
        result._description = main.content._description;
    }
    if (handles) {
        result.handles = handles.content;
    }
    if (states) {
        result.states = states.content;
    }
    return result;
}
exports.default = parseComponentMdDocs;
function buildChapterContent(chapter) {
    var descNodes = chapter.contentNodes.filter(function (node) { return node.type !== 'list'; });
    var bulletNodes = chapter.contentNodes.filter(function (node) { return node.type === 'list'; });
    var bulletNodesFiltered = [];
    var subMap = new Map();
    for (var _i = 0, bulletNodes_1 = bulletNodes; _i < bulletNodes_1.length; _i++) {
        var node = bulletNodes_1[_i];
        if (node.indent === '')
            bulletNodesFiltered.push(node);
        else {
            var parent_1 = bulletNodesFiltered[bulletNodesFiltered.length - 1];
            subMap.set(parent_1, __spreadArrays((subMap.get(parent_1) || []), [node]));
        }
    }
    // parse chapter description
    chapter.content.description = visitor_1.default.getText(descNodes);
    chapter.content._description = visitor_1.default.getMd(descNodes);
    chapter.content.bullets = bulletNodesFiltered.map(function (node) { return parseBullet(node); });
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
}
function getCollectionsContent(chapter, rootItem, allCollections) {
    var bulletNodes = chapter.contentNodes.filter(function (node) { return node.type === 'list'; });
    var list = bulletNodes
        .map(function (node) { return parseBullet(node); })
        .filter(function (row) { return row.name !== 'remove'; })
        .map(function (row) {
        var mdFile = allCollections.find(function (item) { return item.file === row.path; });
        if (!mdFile)
            return null;
        return parseComponentMdDocs(mdFile, allCollections);
    })
        .filter(Boolean);
    return list;
    function parseBullet(node) {
        var link = node.block[0];
        if (link.type !== 'link')
            return { name: 'remove', path: '' };
        return {
            name: visitor_1.default.getText([link]),
            path: path_1.default.resolve(rootItem.folder, link.url)
        };
    }
}
