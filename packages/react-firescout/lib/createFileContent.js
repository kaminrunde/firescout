"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createFileContent(tree, docs, modules) {
    return "\n  type Func = (...args: any) => any\n\n  " + modules.map(function (node) {
        return "export function getModule (name: '" + node.context + "'):" + node.typesaveContext;
    }) + "\n\n  " + modules.map(function (node) {
        return "" + node.commands.map(function (cmd) { return "interface " + cmd.typesaveId + " {\n    mock<Wrapper extends Func>(name: 'default', wrapper?: Wrapper): Promise<ReturnType<Wrapper>>\n    stub<Wrapper extends Func>(wrapper?: Wrapper): Promise<ReturnType<Wrapper>>\n  }"; });
    }) + "\n\n  " + modules.map(function (node) {
        return "export function getModule (name: '" + node.context + "'):" + node.typesaveContext;
    }) + "\n\n  interface Interactable<Root> {\n    unwrap():Element\n    nth(n:number):Root\n    click(timeout?:number):Promise<void>\n    type(timeout?:number):Promise<void>\n    simulate(cb:(el:Element) => Promise<void> | void):Promise<void>\n  }\n\n  " + tree.map(function (node) { return "\n  " + node.collections
        .map(function (colNode) { return "interface " + (node.typesaveContext + colNode.typesaveContext) + " extends Interactable<" + (node.typesaveContext + colNode.typesaveContext) + "> {\n  " + colNode.handles
        .map(function (handle) {
        var _a, _b, _c;
        return " /** \n  * " + (((_c = (_b = (_a = docs[node.context]) === null || _a === void 0 ? void 0 : _a.collections[colNode.context]) === null || _b === void 0 ? void 0 : _b.handles.bullets.find(function (row) { return row.name === handle.name; })) === null || _c === void 0 ? void 0 : _c.value) || "") + "\n  * @name " + handle.name + "\n  * @file [" + handle.file + "](" + (process.cwd() + handle.file) + ")\n  */\n  handle(name:'" + handle.name + "', index?:number|string): Interactable<" + (node.typesaveContext + colNode.typesaveContext) + ">\n  ";
    })
        .join("\n") + "\n\n  " + colNode.states
        .map(function (state) {
        var _a, _b, _c, _d, _e, _f;
        return "  /** \n   * " + (((_c = (_b = (_a = docs[node.context]) === null || _a === void 0 ? void 0 : _a.collections[colNode.context]) === null || _b === void 0 ? void 0 : _b.states.bullets.find(function (row) { return row.name === state.name; })) === null || _c === void 0 ? void 0 : _c.value) || "") + "\n  * @name " + state.name + "\n  * @file [" + state.file + "](" + (process.cwd() + state.file) + ")\n  */\n  shouldHaveState( name:'" + state.name + "' " + (state.implementations
            ? ", implementations: '" + state.implementations
                .map(function (i) { return i.name; })
                .join(",") + "'"
            : "") + "): " + (node.typesaveContext + colNode.typesaveContext) + "\n  /** \n   * " + (((_f = (_e = (_d = docs[node.context]) === null || _d === void 0 ? void 0 : _d.collections[colNode.context]) === null || _e === void 0 ? void 0 : _e.states.bullets.find(function (row) { return row.name === state.name; })) === null || _f === void 0 ? void 0 : _f.value) || "") + "\n  * @name " + state.name + "\n  * @file [" + state.file + "](" + (process.cwd() + state.file) + ")\n  */\n  shouldNotHaveState(name:'" + state.name + "'): " + (node.typesaveContext + colNode.typesaveContext) + "\n  ";
    })
        .join("\n") + "\n  }\n  "; })
        .join("\n") + "\n\n  interface " + node.typesaveContext + " extends Interactable<" + node.typesaveContext + "> {\n  " + node.collections
        .map(function (colNode) {
        var _a, _b;
        return "  /**\n   * " + (((_b = (_a = docs[node.context]) === null || _a === void 0 ? void 0 : _a.collections[colNode.context]) === null || _b === void 0 ? void 0 : _b.description) || "...") + "\n  * @name " + colNode.context + "\n  * @file [" + colNode.file + "](" + (process.cwd() + colNode.file) + ")\n  * @docs_file " + (docs[node.context]
            ? "[" + docs[node.context].file + "](" + (process.cwd() + docs[node.context].file) + ")"
            : "-") + "\n  */\n  collection(name:'" + colNode.context + "', index?:number|string): " + (node.typesaveContext + colNode.typesaveContext);
    })
        .join("\n") + "\n  " + node.handles
        .map(function (handle) {
        var _a, _b;
        return "/** \n  * " + (((_b = (_a = docs[node.context]) === null || _a === void 0 ? void 0 : _a.handles.bullets.find(function (row) { return row.name === handle.name; })) === null || _b === void 0 ? void 0 : _b.value) || "") + "\n  * @name " + handle.name + "\n  * @file [" + handle.file + "](" + (process.cwd() + handle.file) + ")\n  */\n  handle(name:'" + handle.name + "', index?:number|string): Interactable<" + node.typesaveContext + ">\n  ";
    })
        .join("\n") + "\n\n  " + node.states
        .map(function (state) {
        var _a, _b, _c, _d;
        return "  /** \n  * " + (((_b = (_a = docs[node.context]) === null || _a === void 0 ? void 0 : _a.states.bullets.find(function (row) { return row.name === state.name; })) === null || _b === void 0 ? void 0 : _b.value) || "") + "\n  * @name " + state.name + "\n  * @file [" + state.file + "](" + (process.cwd() + state.file) + ") " + (!state.implementations
            ? ""
            : "\n  * @implementations " + state.implementations
                .map(function (imp) {
                var _a, _b, _c, _d;
                return "\n  * - " + imp.name + " [(" + imp.file + ")](" + (process.cwd() + imp.file) + "): " + ((_d = (_c = (_b = (_a = docs[node.context]) === null || _a === void 0 ? void 0 : _a.states.bullets.find(function (row) { return row.name === state.name; })) === null || _b === void 0 ? void 0 : _b.bullets) === null || _c === void 0 ? void 0 : _c.find(function (row) { return row.name === imp.name; })) === null || _d === void 0 ? void 0 : _d.value);
            })
                .join("")) + "\n  */\n  shouldHaveState( name:'" + state.name + "' " + (state.implementations
            ? ", implementations: '" + state.implementations
                .map(function (i) { return i.name; })
                .join(",") + "'"
            : "") + "): " + node.typesaveContext + "\n  \n  /** \n  * " + (((_d = (_c = docs[node.context]) === null || _c === void 0 ? void 0 : _c.states.bullets.find(function (row) { return row.name === state.name; })) === null || _d === void 0 ? void 0 : _d.value) || "") + "\n  * @name " + state.name + "\n  * @file [" + state.file + "](" + (process.cwd() + state.file) + ")\n  */\n  shouldNotHaveState(name:'" + state.name + "'): " + node.typesaveContext + "\n  ";
    })
        .join("\n") + "\n  }\n  "; }) + "\n  \n  interface Mount {\n    wait(ms:number):Promise<void>\n    unwrap():Element\n\n  }\n\n  export function mount(el:any, config:any): Mount\n  export function clearMocks(): void\n\n";
}
exports.default = createFileContent;
