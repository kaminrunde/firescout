"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createFileContent(tree, docs, modules) {
    return "\n    /// <reference types=\"cypress\" />\n\n    type MockFnOptions = {\n      timeout?: number,\n      throws?:boolean,\n      transform?: (val:any) => any,\n      ts?: boolean,\n      sync?: boolean\n    }\n    \n    type MockVarOptions = {\n      transform?: (val:any) => any\n    }\n\n    ".concat(modules
        .map(function (node) { return "\n      ".concat(node.commands
        .map(function (cmd) { return "\n        interface ".concat(cmd.typesaveId, " {\n          ").concat(cmd.fixtures.map(function (f) { return "\n            ".concat(f.description, "\n            mock(name:'").concat(f.variation, "', opt?:Omit<MockFnOptions,'sync'>):").concat(node.typesaveContext, "\n          "); }), "\n\n          createStub():void\n\n          doesReturn(val:any, opt?:Omit<MockFnOptions,'transform'|'ts'>):void\n        }\n      "); })
        .join("\n"), "\n\n      ").concat(node.variables
        .map(function (cmd) { return "\n        interface ".concat(cmd.typesaveId, " {\n          ").concat(cmd.fixtures.map(function (f) { return "\n            ".concat(f.description, "\n            load(name:'").concat(f.variation, "', opt?:MockVarOptions):").concat(node.typesaveContext, "\n          "); }), "\n\n          set(val:any):void\n        }\n      "); })
        .join("\n"), "\n\n      interface ").concat(node.typesaveContext, " {\n        ").concat(node.commands
        .map(function (cmd) { return "\n          /**\n           * @name ".concat(cmd.name, "\n           * @file [").concat(cmd.file, "](").concat(process.cwd() + cmd.file, ")\n           */\n          fn(name:'").concat(cmd.name, "'):").concat(cmd.typesaveId, "\n        "); })
        .join("\n"), "\n      }\n\n      interface ").concat(node.typesaveContext, " {\n        ").concat(node.variables
        .map(function (cmd) { return "\n          /**\n           * @name ".concat(cmd.name, "\n           * @file [").concat(cmd.file, "](").concat(process.cwd() + cmd.file, ")\n           */\n          variable(name:'").concat(cmd.name, "'):").concat(cmd.typesaveId, "\n        "); })
        .join("\n"), "\n      }\n    "); })
        .join("\n"), "\n\n    ").concat(tree
        .map(function (node) { return "\n      ".concat(node.collections
        .map(function (colNode) { return "\n        interface ".concat(node.typesaveContext + colNode.typesaveContext, " extends Cypress.Chainable<Element> {\n          ").concat(colNode.handles
        .map(function (handle) {
        var _a, _b, _c;
        return "\n            /** \n             * ".concat(((_c = (_b = (_a = docs[node.context]) === null || _a === void 0 ? void 0 : _a.collections[colNode.context]) === null || _b === void 0 ? void 0 : _b.handles.bullets.find(function (row) { return row.name === handle.name; })) === null || _c === void 0 ? void 0 : _c.value) || "", "\n             * @name ").concat(handle.name, "\n             * @file [").concat(handle.file, "](").concat(process.cwd() + handle.file, ")\n             */\n            handle(name:'").concat(handle.name, "', index?:number|string): Cypress.Chainable<Element>\n          ");
    })
        .join("\n"), "\n\n          ").concat(colNode.states
        .map(function (state) {
        var _a, _b, _c, _d, _e, _f;
        return "\n            /** \n             * ".concat(((_c = (_b = (_a = docs[node.context]) === null || _a === void 0 ? void 0 : _a.collections[colNode.context]) === null || _b === void 0 ? void 0 : _b.states.bullets.find(function (row) { return row.name === state.name; })) === null || _c === void 0 ? void 0 : _c.value) || "", "\n             * @name ").concat(state.name, "\n             * @file [").concat(state.file, "](").concat(process.cwd() + state.file, ")\n             */\n            shouldHaveState( name:'").concat(state.name, "' ").concat(state.implementations
            ? ", implementations: '".concat(state.implementations
                .map(function (i) { return i.name; })
                .join(","), "'")
            : "", "): ").concat(node.typesaveContext + colNode.typesaveContext, "\n\n            /** \n             * ").concat(((_f = (_e = (_d = docs[node.context]) === null || _d === void 0 ? void 0 : _d.collections[colNode.context]) === null || _e === void 0 ? void 0 : _e.states.bullets.find(function (row) { return row.name === state.name; })) === null || _f === void 0 ? void 0 : _f.value) || "", "\n             * @name ").concat(state.name, "\n             * @file [").concat(state.file, "](").concat(process.cwd() + state.file, ")\n             */\n            shouldNotHaveState(name:'").concat(state.name, "'): ").concat(node.typesaveContext + colNode.typesaveContext, "\n          ");
    })
        .join("\n"), "\n        }\n      "); })
        .join("\n"), "\n\n      interface ").concat(node.typesaveContext, " extends Cypress.Chainable<Element> {\n        ").concat(node.collections
        .map(function (colNode) {
        var _a, _b;
        return "\n          /**\n           * ".concat(((_b = (_a = docs[node.context]) === null || _a === void 0 ? void 0 : _a.collections[colNode.context]) === null || _b === void 0 ? void 0 : _b.description) ||
            "...", "\n           * @name ").concat(colNode.context, "\n           * @file [").concat(colNode.file, "](").concat(process.cwd() + colNode.file, ")\n           * @docs_file ").concat(docs[node.context]
            ? "[".concat(docs[node.context].file, "](").concat(process.cwd() + docs[node.context].file, ")")
            : "-", "\n           */\n          collection(name:'").concat(colNode.context, "', index?:number|string): ").concat(node.typesaveContext + colNode.typesaveContext, "\n        ");
    })
        .join("\n"), "\n\n        ").concat(node.handles
        .map(function (handle) {
        var _a, _b;
        return "\n          /** \n           * ".concat(((_b = (_a = docs[node.context]) === null || _a === void 0 ? void 0 : _a.handles.bullets.find(function (row) { return row.name === handle.name; })) === null || _b === void 0 ? void 0 : _b.value) || "", "\n           * @name ").concat(handle.name, "\n           * @file [").concat(handle.file, "](").concat(process.cwd() + handle.file, ")\n           */\n          handle(name:'").concat(handle.name, "', index?:number|string): Cypress.Chainable<Element>\n        ");
    })
        .join("\n"), "\n\n        ").concat(node.states
        .map(function (state) {
        var _a, _b, _c, _d;
        return "\n          /** \n           * ".concat(((_b = (_a = docs[node.context]) === null || _a === void 0 ? void 0 : _a.states.bullets.find(function (row) { return row.name === state.name; })) === null || _b === void 0 ? void 0 : _b.value) || "", "\n           * @name ").concat(state.name, "\n           * @file [").concat(state.file, "](").concat(process.cwd() + state.file, ") ").concat(!state.implementations
            ? ""
            : "\n           * @implementations ".concat(state.implementations
                .map(function (imp) {
                var _a, _b, _c, _d;
                return "\n           * - ".concat(imp.name, " [(").concat(imp.file, ")](").concat(process.cwd() + imp.file, "): ").concat((_d = (_c = (_b = (_a = docs[node.context]) === null || _a === void 0 ? void 0 : _a.states.bullets.find(function (row) { return row.name === state.name; })) === null || _b === void 0 ? void 0 : _b.bullets) === null || _c === void 0 ? void 0 : _c.find(function (row) { return row.name === imp.name; })) === null || _d === void 0 ? void 0 : _d.value);
            })
                .join("\n")), "\n           */\n          shouldHaveState( name:'").concat(state.name, "' ").concat(state.implementations
            ? ", implementations: '".concat(state.implementations
                .map(function (i) { return i.name; })
                .join(","), "'")
            : "", "): ").concat(node.typesaveContext, "\n\n          /** \n           * ").concat(((_d = (_c = docs[node.context]) === null || _c === void 0 ? void 0 : _c.states.bullets.find(function (row) { return row.name === state.name; })) === null || _d === void 0 ? void 0 : _d.value) || "", "\n           * @name ").concat(state.name, "\n           * @file [").concat(state.file, "](").concat(process.cwd() + state.file, ")\n           */\n          shouldNotHaveState(name:'").concat(state.name, "'): ").concat(node.typesaveContext, "\n        ");
    })
        .join("\n"), "\n      }\n    "); })
        .join("\n"), "\n\n    declare namespace Firescout {\n      ").concat(tree
        .map(function (node) {
        var _a;
        return "\n        /**\n         * ".concat(((_a = docs[node.context]) === null || _a === void 0 ? void 0 : _a.description) || "...", " \n         * @name ").concat(node.context, "\n         * @file [").concat(node.folder, "](").concat(process.cwd() + node.file, ")\n         * @docs_file ").concat(docs[node.context]
            ? "[".concat(docs[node.context].file, "](").concat(process.cwd() + docs[node.context].file, ")")
            : "-", "\n         */\n        function context (name:'").concat(node.context, "', index?:number|string):").concat(node.typesaveContext, "\n      ");
    })
        .join("\n"), "\n\n      ").concat(modules
        .map(function (node) { return "\n        function module (name: '".concat(node.context, "'):").concat(node.typesaveContext, "\n      "); })
        .join("\n"), "\n    }\n\n    declare namespace Cypress {\n      interface Chainable {\n        context: typeof Firescout.context;\n        module: typeof Firescout.module;\n      }\n    }\n  ")
        .split("\n")
        .slice(1)
        .map(function (s) { return s.trim(); })
        .join("\n");
}
exports.default = createFileContent;
