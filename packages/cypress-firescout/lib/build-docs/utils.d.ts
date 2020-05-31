export declare function executeCmd(cmd: string): Promise<string>;
export declare type File = {
    name: string;
    path: string;
    isFile: boolean;
    isDir: boolean;
};
export declare function readDir(path: string): Promise<File[]>;
export declare function readFile(path: string): Promise<string>;
export declare function readStats(path: string, name: string): Promise<File>;
export declare function parseFile(file: string): string;
