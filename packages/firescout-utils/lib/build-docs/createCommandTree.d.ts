import { HierarchieTree } from './createCommandHierarchie';
type State = {
    name: string;
    file: string;
    hasRootRef: boolean;
    implementations: null | {
        name: string;
        file: string;
    }[];
};
export type Tree = {
    context: string;
    typesaveContext: string;
    file: string;
    folder: string;
    handles: {
        name: string;
        file: string;
    }[];
    states: State[];
    collections: Tree[];
};
export default function createCommandTree(tree: HierarchieTree[]): Tree[];
export {};
