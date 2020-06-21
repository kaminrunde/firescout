import { Config } from '../config';
export declare function setup(): void;
export declare function createOutput(files: {
    [path: string]: string;
}, configExt?: Partial<Config>, mdIndent?: number): Promise<{
    tree: any;
    docs: any;
    modules: any;
    content: any;
    warnings: any;
}>;
