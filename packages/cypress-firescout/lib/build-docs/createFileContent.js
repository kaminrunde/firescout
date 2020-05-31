"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createFileContent(tree) {
    return ("\n    /// <reference types=\"cypress\" />\n\n    " + tree.map(function (node) { return "\n      interface " + node.typesaveContext + " extends Cypress.Chainable<Element> {\n        " + node.handles.map(function (handle) {
        var _a, _b;
        return "\n          /** \n           * " + (((_b = (_a = node.docs) === null || _a === void 0 ? void 0 : _a.handles.bullets.find(function (row) { return row.name === handle.name; })) === null || _b === void 0 ? void 0 : _b.value) || '') + "\n           * @name " + handle.name + "\n           * @file " + handle.file + "\n           */\n          handle(name:'" + handle.name + "', index?:number|string): Cypress.Chainable<Element>\n        ";
    }).join('\n') + "\n\n        " + node.states.map(function (state) {
        var _a, _b, _c, _d;
        return "\n          /** \n           * " + (((_b = (_a = node.docs) === null || _a === void 0 ? void 0 : _a.states.bullets.find(function (row) { return row.name === state.name; })) === null || _b === void 0 ? void 0 : _b.value) || '') + "\n           * @name " + state.name + "\n           * @file " + state.file + "\n           */\n          hasState(name:'" + state.name + "', index?:number|string): Cypress.Chainable<Element>\n\n          /** \n           * " + (((_d = (_c = node.docs) === null || _c === void 0 ? void 0 : _c.states.bullets.find(function (row) { return row.name === state.name; })) === null || _d === void 0 ? void 0 : _d.value) || '') + "\n           * @name " + state.name + "\n           * @file " + state.file + "\n           */\n          notHasState(name:'" + state.name + "', index?:number|string): Cypress.Chainable<Element>\n        ";
    }).join('\n') + "\n      }\n    "; }) + "\n\n    declare namespace Firescout {\n      " + tree.map(function (node) {
        var _a;
        return "\n        /** \n         * " + (((_a = node.docs) === null || _a === void 0 ? void 0 : _a.description) || '...') + " \n         * @name " + node.context + "\n         * @file " + node.file + "\n         * @docs_file " + (node.docsFile || '-') + "\n         */\n        function component (name:'" + node.context + "', index?:number|string):" + node.typesaveContext + "\n      ";
    }).join('\n') + "\n    }\n  ").split('\n').slice(1).map(function (s) { return s.trim(); }).join('\n');
}
exports.default = createFileContent;
