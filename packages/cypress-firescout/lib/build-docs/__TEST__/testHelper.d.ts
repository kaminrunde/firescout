import { Config } from '../config';
import { Tree } from '../createCommandTree';
import { Docs } from '../createDocs';
import { ModuleTree } from '../createModuleTree';
declare type Result = {
    tree: Tree[];
    docs: Docs;
    modules: ModuleTree[];
    content: string;
    warnings: [string, string][];
};
export declare function createOutput(files: {
    [path: string]: string;
}, configExt?: Partial<Config>, mdIndent?: number): Promise<Result>;
export {};
