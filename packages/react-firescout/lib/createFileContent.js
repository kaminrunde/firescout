"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createFileContent(tree, docs, modules) {
    return "\n/* eslint-disable */\ndeclare module '@kaminrunde/react-firescout' {\n\ntype Func = (...args: any) => any\ntype MockConfig = {\n  value?: any\n  fixture?: string\n  sync?: boolean\n  timeout?: number\n  transform?: (data: any) => any\n}\n\ninterface Matchers {\n  should(m:'contain.text', s:string, x?:never):void\n  should(m:'not.contain.text', s:string, x?:never):void\n  should(m:'have.value', s:string, x?:never):void\n  should(m:'not.have.value', s:string, x?:never):void\n  should(m:'have.css', key:string, val:string):void\n  should(m:'not.have.css', key:string, val:string):void\n  should(m:'have.length', n:number, x?:never):void\n  should(m:'not.have.length', n:number, x?:never):void\n  should(m:'not.exist', n?:number, x?:never):void\n  should(m:'exist', n?:number, x?:never):void\n}\n\n" + modules.map(function (node) {
        return node.commands.map(function (cmd) {
            return "interface " + cmd.typesaveId + " {\n    " + cmd.fixtures.map(function (f) {
                return "mock<Wrapper extends Func>(name:'" + f.variation + "', wrapper?: Wrapper): Promise<ReturnType<Wrapper>>\n    ";
            }).join('\n') + "\n      mock<Wrapper extends Func>(config: MockConfig, wrapper?: Wrapper): Promise<ReturnType<Wrapper>>\n      stub<Wrapper extends Func>(wrapper?: Wrapper): Promise<ReturnType<Wrapper>>\n  }";
        }).join('') + "\n  \n  interface " + node.typesaveContext + " {\n    " + node.commands.map(function (cmd) { return "\n    /**\n     * @name " + cmd.name + "\n     * @file [" + cmd.file + "](" + (process.cwd() + cmd.file) + ")\n     */\n    fn(name:'" + cmd.name + "'):" + cmd.typesaveId + "\n  "; }).join('') + "\n}";
    }).join('\n') + "\n\n" + modules.map(function (node) { return "\n  interface " + node.typesaveContext + " {\n    " + node.variables.map(function (variable) { return "\n      var(name:'" + variable.name + "'): {\n        set(val:any):void\n        " + variable.fixtures.map(function (fix) { return ("fixture(name:'" + fix.variation + "'):Promise<void>"); }).join('\n') + "\n      }\n    "; }).join('\n') + "\n  }\n"; }).join('\n') + "\n\n\n\n" + modules.map(function (node) {
        return "export function getModule (name: '" + node.context + "'):" + node.typesaveContext + "\n";
    }).join('\n') + "\n\ninterface Interactable<Root> extends Matchers {\n  unwrap():Element\n  nth(n:number):Root\n  click(timeout?:number):Promise<void>\n  type(val:string, timeout?:number):Promise<void>\n  simulate(cb:(el:Element) => Promise<void> | void):Promise<void>\n  query: (s:string) => Interactable<unknown>\n}\n\n" + tree.map(function (node) { return recursiceCollection(node, docs); }).join('') + "\n\ninterface Mount {\n  wait(ms:number):Promise<void>\n  unwrap():Element\n\n  " + tree
        .map(function (node) {
        var _a;
        return " \n    /**\n    * " + (((_a = docs[node.context]) === null || _a === void 0 ? void 0 : _a.description) || '...') + "  * @name " + node.context + "\n    * @file [" + node.folder + "](" + (process.cwd() + node.file) + ")\n    * @docs_file " + (docs[node.context]
            ? "[" + docs[node.context].file + "](" + (process.cwd() + docs[node.context].file) + ")"
            : '-') + "\n    */\n    context (name:'" + node.context + "', ignoreError?:boolean):" + node.typesaveContext + "\n  ";
    }).join('\n') + "\n  }\n\n  export function mount(el:any, config:any): Mount\n  export function clearMocks(): void\n\n  export type Context = " + tree.map(function (node) { return "\"" + node.context + "\""; }).join('|') + "\n  }";
}
exports.default = createFileContent;
function recursiceCollection(node, docs) {
    return node.collections.map(function (colNode) {
        return "interface " + (node.typesaveContext + colNode.typesaveContext) + " extends Interactable<" + (node.typesaveContext + colNode.typesaveContext) + "> {\n      " + colNode.handles.map(function (handle) {
            var _a, _b, _c;
            return " /** \n        * " + (((_c = (_b = (_a = docs[node.context]) === null || _a === void 0 ? void 0 : _a.collections[colNode.context]) === null || _b === void 0 ? void 0 : _b.handles.bullets.find(function (row) { return row.name === handle.name; })) === null || _c === void 0 ? void 0 : _c.value) || '') + "\n        * @name " + handle.name + "\n        * @file [" + handle.file + "](" + (process.cwd() + handle.file) + ")\n        */\n        handle(name:'" + handle.name + "', ignoreError?:boolean): Interactable<" + (node.typesaveContext + colNode.typesaveContext) + ">";
        }).join('\n') + "\n\n    " + colNode.states.map(function (state) {
            var _a, _b, _c, _d, _e, _f;
            return "  /** \n        * " + (((_c = (_b = (_a = docs[node.context]) === null || _a === void 0 ? void 0 : _a.collections[colNode.context]) === null || _b === void 0 ? void 0 : _b.states.bullets.find(function (row) { return row.name === state.name; })) === null || _c === void 0 ? void 0 : _c.value) || '') + "\n        * @name " + state.name + "\n        * @file [" + state.file + "](" + (process.cwd() + state.file) + ")\n        */\n        shouldHaveState( name:'" + state.name + "' " + (state.implementations
                ? ", implementations: '" + state.implementations.map(function (i) { return i.name; }).join(',') + "'"
                : '') + "): " + (node.typesaveContext + colNode.typesaveContext) + "\n          \n        /** \n        * " + (((_f = (_e = (_d = docs[node.context]) === null || _d === void 0 ? void 0 : _d.collections[colNode.context]) === null || _e === void 0 ? void 0 : _e.states.bullets.find(function (row) { return row.name === state.name; })) === null || _f === void 0 ? void 0 : _f.value) || '') + "\n        * @name " + state.name + "\n        * @file [" + state.file + "](" + (process.cwd() + state.file) + ")\n        */\n        shouldNotHaveState(name:'" + state.name + "'): " + (node.typesaveContext + colNode.typesaveContext);
        }).join('\n') + "\n\n        " + colNode.collections.map(function (inner) { return "\n          collection(name:\"" + inner.context + "\", ignoreError?:boolean):" + (colNode.typesaveContext + inner.typesaveContext) + "\n        "; }).join('\n') + "\n    }";
    }).join('\n') + "\n\n    interface " + node.typesaveContext + " extends Interactable<" + node.typesaveContext + "> {\n    " + node.collections.map(function (colNode) {
        var _a, _b;
        return "  /**\n      * " + (((_b = (_a = docs[node.context]) === null || _a === void 0 ? void 0 : _a.collections[colNode.context]) === null || _b === void 0 ? void 0 : _b.description) || '...') + "\n      * @name " + colNode.context + "\n      * @file [" + colNode.file + "](" + (process.cwd() + colNode.file) + ")\n      * @docs_file " + (docs[node.context]
            ? "[" + docs[node.context].file + "](" + (process.cwd() + docs[node.context].file) + ")"
            : '-') + "\n      */\n      collection(name:'" + colNode.context + "', ignoreError?:boolean): " + (node.typesaveContext + colNode.typesaveContext) + "\n      ";
    }).join('\n') + "\n\n    " + node.handles.map(function (handle) {
        var _a, _b;
        return "/** \n        * " + (((_b = (_a = docs[node.context]) === null || _a === void 0 ? void 0 : _a.handles.bullets.find(function (row) { return row.name === handle.name; })) === null || _b === void 0 ? void 0 : _b.value) || '') + "\n        * @name " + handle.name + "\n        * @file [" + handle.file + "](" + (process.cwd() + handle.file) + ")\n        */\n        handle(name:'" + handle.name + "', ignoreError?:boolean): Interactable<" + node.typesaveContext + ">\n    ";
    }).join('\n') + "\n\n    " + node.states.map(function (state) {
        var _a, _b, _c, _d;
        return "  /** \n        * " + (((_b = (_a = docs[node.context]) === null || _a === void 0 ? void 0 : _a.states.bullets.find(function (row) { return row.name === state.name; })) === null || _b === void 0 ? void 0 : _b.value) || '') + "\n        * @name " + state.name + "\n        * @file [" + state.file + "](" + (process.cwd() + state.file) + ") " + (!state.implementations ? '' : "\n        * @implementations " + state.implementations.map(function (imp) {
            var _a, _b, _c, _d;
            return "\n        * - " + imp.name + " [(" + imp.file + ")](" + (process.cwd() + imp.file) + "): " + ((_d = (_c = (_b = (_a = docs[node.context]) === null || _a === void 0 ? void 0 : _a.states.bullets.find(function (row) { return row.name === state.name; })) === null || _b === void 0 ? void 0 : _b.bullets) === null || _c === void 0 ? void 0 : _c.find(function (row) { return row.name === imp.name; })) === null || _d === void 0 ? void 0 : _d.value);
        }).join('')) + "\n        */\n        shouldHaveState( name:'" + state.name + "' " + (state.implementations
            ? ", implementations: '" + state.implementations.map(function (i) { return i.name; }).join(',') + "'"
            : '') + "): " + node.typesaveContext + "\n\n    /** \n    * " + (((_d = (_c = docs[node.context]) === null || _c === void 0 ? void 0 : _c.states.bullets.find(function (row) { return row.name === state.name; })) === null || _d === void 0 ? void 0 : _d.value) || '') + "\n    * @name " + state.name + "\n    * @file [" + state.file + "](" + (process.cwd() + state.file) + ")\n    */\n    shouldNotHaveState(name:'" + state.name + "'): " + node.typesaveContext + "\n    ";
    }) + "}\n    " + node.collections.map(function (node) { return recursiceCollection(node, docs); }).join('\n') + "\n    ";
}
