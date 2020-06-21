import { Config } from '../config';
export declare function setup(): void;
export declare function createOutput(files: {
    [path: string]: string;
}, configExt?: Partial<Config>): Promise<void>;
