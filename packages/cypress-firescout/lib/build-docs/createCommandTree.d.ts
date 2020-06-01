import parseComponendMdDocs from './parseComponentMdDocs';
import { HierarchieTree } from './createCommandHierarchie';
export declare type Tree = {
    context: string;
    typesaveContext: string;
    file: string;
    folder: string;
    docsFile?: string;
    docs?: ReturnType<typeof parseComponendMdDocs>;
    handles: {
        name: string;
        file: string;
    }[];
    states: {
        name: string;
        file: string;
    }[];
    collections: Tree[];
};
export default function createCommandTree(tree: HierarchieTree[]): Tree[];
