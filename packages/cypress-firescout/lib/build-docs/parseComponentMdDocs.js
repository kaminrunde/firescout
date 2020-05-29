"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var markdown_ast_1 = __importDefault(require("markdown-ast"));
var visitor_1 = __importDefault(require("./visitor"));
function parseComponentMdDocs(text) {
    var ast = markdown_ast_1.default(text);
    var result = {
        context: '',
        description: '',
        _description: '',
        triggers: {
            description: '',
            _description: '',
            bullets: []
        },
        states: {
            description: '',
            _description: '',
            bullets: []
        }
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
    var triggers = chapters.find(function (c) { return c.title === 'Triggers'; });
    var states = chapters.find(function (c) { return c.title === 'States'; });
    // chapter content is initially empty
    if (main)
        buildChapterContent(main);
    if (triggers)
        buildChapterContent(triggers);
    if (states)
        buildChapterContent(states);
    if (main) {
        result.context = main.title;
        result.description = main.content.description;
        result._description = main.content._description;
    }
    if (triggers) {
        result.triggers = triggers.content;
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
    // parse chapter description
    chapter.content.description = visitor_1.default.getText(descNodes);
    chapter.content._description = visitor_1.default.getMd(descNodes);
    chapter.content.bullets = bulletNodes.map(function (node) { return parseBullet(node); });
}
function parseBullet(node) {
    var _a = node.block, title = _a[0], rest = _a.slice(1);
    var name = visitor_1.default.getText([title]);
    var value = visitor_1.default.getText(rest);
    var _name = visitor_1.default.getMd([title]);
    var _value = visitor_1.default.getMd(rest);
    if (value.startsWith(': '))
        value = value.replace(': ', '');
    return { name: name, value: value, _name: _name, _value: _value };
}
