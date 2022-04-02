export { default as getConfig } from './config';
export declare function getStructure(): Promise<{
    tree: import("./createCommandTree").Tree[];
    docs: Record<string, import("./parseMdDocs").Docs>;
    modules: import("./createModuleTree").ModuleTree[];
}>;
