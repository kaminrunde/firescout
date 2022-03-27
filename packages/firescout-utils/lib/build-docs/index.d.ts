export { default as getConfig } from "./config";
export { default as createFileContent } from "./createFileContent";
export declare function getStructure(): Promise<{
    tree: import("./createCommandTree").Tree[];
    docs: import("./createDocs").Docs;
    modules: import("./createModuleTree").ModuleTree[];
}>;
