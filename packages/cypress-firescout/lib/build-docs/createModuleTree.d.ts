import { RawItem as GrepRawItem } from './searchWithGrep';
import { RawItem as NodeRawItem } from './searchWithNode';
declare type ModuleItem = GrepRawItem | NodeRawItem;
export declare type ModuleTree = {
    context: string;
    typesaveContext: string;
    commands: {
        name: string;
        file: string;
        folder: string;
    }[];
};
export default function createModuleTree(items: ModuleItem[]): ModuleTree[];
export {};
