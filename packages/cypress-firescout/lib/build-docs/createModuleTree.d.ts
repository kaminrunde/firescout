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
        typesaveId: string;
        fixtures: Fixture[];
    }[];
};
declare type Fixture = {
    module: string;
    name: string;
    variation: string;
    description: string;
    file: string;
    folder: string;
};
export default function createModuleTree(items: ModuleItem[], fixtureItems: ModuleItem[]): ModuleTree[];
export {};
