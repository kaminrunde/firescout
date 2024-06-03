import { RawItem as ModuleItem } from './searchWithNode';
export type ModuleTree = {
    context: string;
    typesaveContext: string;
    commands: {
        name: string;
        file: string;
        folder: string;
        typesaveId: string;
        fixtures: Fixture[];
    }[];
    variables: {
        name: string;
        file: string;
        folder: string;
        typesaveId: string;
        fixtures: Fixture[];
    }[];
};
type Fixture = {
    module: string;
    name: string;
    variation: string;
    description: string;
    file: string;
    folder: string;
};
export default function createModuleTree(moduleItems: ModuleItem[], fixtureItems: ModuleItem[], variableItems: ModuleItem[]): ModuleTree[];
export {};
