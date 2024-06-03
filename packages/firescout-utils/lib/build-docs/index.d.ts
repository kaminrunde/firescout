export { getConfig } from './config';
export declare function getStructure(): Promise<{
    tree: import("./createCommandTree").Tree[];
    docs: import("./createDocs").Docs;
    modules: import("./createModuleTree").ModuleTree[];
}>;
